import { delay } from '@/utils/utils'
import type { ChatMessage } from '@/api/chat/types'
import type { Ref } from 'vue'

export interface StreamProcessor {
  conversationId: string
  chatId: string
  stopTalking: boolean
  responseFinish: boolean
  displayFinish: boolean
  decoder: TextDecoder
}

export function useStreamProcessor(
  messageList: Ref<ChatMessage[]>,
  scrollToBottom: () => Promise<void>,
  talkingEnd: () => Promise<void>,
  handleChatEntry?: () => void
) {
  const processor = {
    decoder: new TextDecoder('utf-8'),
    responseContent: '',
    displayContent: '',
    chatId: '',
    conversationId: '',
    beginDisplay: false,
    delayStatus: true,
    displayFinish: false,
    responseFinish: false,
    responseResetContent: '',
    stopTalking: false,
    isThinking: false
  }

  const reset = () => {
    processor.responseContent = ''
    processor.displayContent = ''
    processor.beginDisplay = false
    processor.delayStatus = true
    processor.displayFinish = false
    processor.responseFinish = false
    processor.responseResetContent = ''
    processor.chatId = ''
    processor.stopTalking = false
  }

  const appendContent = async (originContent: string) => {
    let content = originContent
    if (originContent.includes('<think>')) {
      processor.isThinking = true
      content = content.replace('<think>', '<T')
    } else if (processor.isThinking) {
      if (originContent.includes('</think>')) {
        processor.isThinking = false
        content = content.replace('</think>', '</T\n\n**思考结束，总结如下：**\n\n')
      } else {
        content = originContent
      }
    }

    processor.responseContent += content
    const newContent = processor.responseResetContent + content
    await processImages(newContent)
  }

  const processImages = async (content: string) => {
    const imgRegex = /!\[([^\]]*)\]\(([^\)]*)\)/g
    let newContent = content
    let match

    while ((match = imgRegex.exec(newContent))) {
      const [, , src] = match
      const messageListLast = messageList.value[messageList.value.length - 1]
      const contentLength = messageListLast.contentArray.length

      messageListLast.imgList.push(src)
      messageListLast.contentArray[contentLength - 1].value = newContent.slice(0, match.index)
      messageListLast.contentArray.push({
        type: 'image',
        value: src,
        index: messageListLast.imgList.length - 1
      })
      messageListLast.contentArray.push({ type: 'word', value: '' })

      newContent = ''
      processor.responseResetContent = ''
      await scrollToBottom()
    }

    processor.responseResetContent = newContent
    doDisplay()
  }

  const doDisplay = () => {
    if (processor.responseContent && processor.responseContent.length > 0) {
      if (!processor.beginDisplay || !processor.delayStatus) {
        delayDisplay()
      }
    }
  }

  const delayDisplay = async () => {
    processor.beginDisplay = true
    processor.delayStatus = true
    const contentLength = messageList.value[messageList.value.length - 1].contentArray.length

    while (
      processor.responseResetContent.length > processor.displayContent.length &&
      !processor.stopTalking
    ) {
      processor.displayContent = processor.responseResetContent.substring(
        0,
        processor.displayContent.length + 1
      )
      messageList.value[messageList.value.length - 1].content = processor.responseContent
      messageList.value[messageList.value.length - 1].contentArray[contentLength - 1].value =
        processor.displayContent
      if (messageList.value.length > 0) {
        messageList.value[messageList.value.length - 1].chatId = processor.chatId
      }
      await scrollToBottom()
      await delay(15)
    }

    processor.delayStatus = false
    if (processor.responseFinish) {
      processor.displayFinish = true
      if (handleChatEntry) {
        handleChatEntry()
      }
      talkingEnd()
    } else {
      processor.displayFinish = true
    }
  }

  return {
    processor,
    reset,
    appendContent,
    doDisplay
  }
}
