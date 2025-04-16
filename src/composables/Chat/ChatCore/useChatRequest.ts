import { chatAi } from '@/api/chat'
import type { ChatMessage } from '@/api/chat/types'
import { getChatMode } from '@/utils/modeUtil'
import type { StreamProcessor } from './useStreamProcessor'
import { useChatStoreWithOut } from '@/store/modules/chat'
import type { Ref } from 'vue'

export function useChatRequest(
  messageList: Ref<ChatMessage[]>,
  processor: StreamProcessor,
  appendContent: (content: string) => Promise<void>
) {
  const chatStore = useChatStoreWithOut()

  // 处理流数据
  const processStream = async (reader: ReadableStreamDefaultReader<Uint8Array>, status: number) => {
    let partialLine = ''
    while (true && !processor.stopTalking) {
      const { value, done } = await reader.read()
      if (done) {
        processor.responseFinish = true
        if (processor.displayFinish) {
          await appendContent('')
        }
        break
      }

      const decodedText = processor.decoder.decode(value, { stream: true })
      if (status !== 200) {
        await appendContent('服务异常')
        return
      }

      const chunk = partialLine + decodedText
      const newLines = chunk.split(/\r?\n/)
      partialLine = newLines.pop() ?? ''

      for (const line of newLines) {
        if (!line.length || line.startsWith(':') || !line.startsWith('data:')) continue

        const json = JSON.parse(line.substring(5))
        if (json.content !== undefined) {
          processor.chatId = json.chatId
          processor.conversationId = json.conversationId
          await appendContent(json.content)
        }
      }
    }
  }

  // 发送聊天请求
  const sendChatRequest = async (type: string, conversationId: string, options?: any) => {
    const chatMode = getChatMode(type)
    // pc端
    if (chatMode) {
      chatStore.setChatMode(chatMode)
    }
    // 移动端
    if (!chatMode && type) {
      chatStore.setChatMode(type)
    }

    const safeOptions = {
      chatType: type,
      ...(options || {})
    }

    const { body, status } = await chatAi(messageList.value, conversationId, safeOptions)
    processor.conversationId = ''

    if (body) {
      await processStream(body.getReader(), status)
    }
  }

  return {
    sendChatRequest
  }
}
