/* eslint-disable */
import { useChatStoreWithOut } from '@/store/modules/chat'
import type { ChatMessage, ChatExtraParams, ChatRequestConfig, ChatResponse } from './types'
import { handleLoginExpired } from '@/utils/utils'
import { getStoredThinkingState } from '@/utils/chatUtils'
import { requestHeaders } from './headers'
import { isMobile } from '@/utils/source'

const chatStore = useChatStoreWithOut()
let controller: AbortController | null = null

// 消息处理逻辑
function prepareMessages(
  userMessages: ChatMessage[],
  chatMode: string
): {
  requestMessages: ChatMessage[]
  fileIds: string[]
} {
  const requestMessages: ChatMessage[] = []
  let fileIds: string[] = []
  const lastTenUserMessages = userMessages.slice(-21, -1)
  requestMessages.push(...lastTenUserMessages.filter((msg) => msg.content?.length > 0))
  if (chatMode === 'DeepSeek') {
    if (userMessages.length > 1) {
      const lastMessage = userMessages[userMessages.length - 2]
      fileIds =
        lastMessage?.files?.map((file) => file.id).filter((id): id is string => id !== undefined) ||
        []
    }
  }

  return { requestMessages, fileIds }
}

// 请求配置
function prepareChatConfig(
  requestMessages: ChatMessage[],
  fileIds: string[],
  conversationId: string,
  reasoning: boolean
): ChatRequestConfig {
  return {
    messages: [
      {
        role: 'system',
        content: `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09
Current model: jlts-2.0
Current time: ${new Date().toLocaleString()}
Latex inline: $x^2$
Latex block: $$e=mc^2$$
`
      },
      ...requestMessages
    ],
    stream: true,
    model: chatStore.getChatMode,
    userId: '22222',
    temperature: 0.5,
    presence_penalty: 0,
    frequency_penalty: 0,
    top_p: 1,
    topicId: chatStore.getChatTopicId,
    env: import.meta.env.VITE_NODE_ENV,
    fileIds,
    conversationId,
    reasoning
  }
}

// 获取聊天接口URL
function getChatApiUrl(chatMode: string): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const apiPathMap: Record<string, string> = {
    DeepSeek: '/cozeAi/v1/chat/coze',
    'haifa-ds': '/ai/jlts/v1/bloc/chat/completions',
    default: '/cozeAi/v1/chat/coze'
  }

  const apiPath = apiPathMap[chatMode] || apiPathMap.default
  return baseUrl + apiPath
}

export async function chatAi(
  userMessages: ChatMessage[],
  conversationId: string = '',
  options: ChatExtraParams | null = null,
  timeout = 1200000
): Promise<ChatResponse> {
  const fetchUrl = getChatApiUrl(chatStore.getChatMode)

  const { requestMessages, fileIds } = prepareMessages(userMessages, chatStore.getChatMode)
  let reasoning = options?.chatType ? getStoredThinkingState(options.chatType) : false
  if (isMobile()) {
    reasoning = sessionStorage.getItem(`deepThink_${chatStore.getChatMode}`) === 'true'
  }

  controller = new AbortController()
  const timeoutId = setTimeout(() => controller?.abort(), timeout)

  try {
    const response = await fetch(fetchUrl, {
      signal: controller.signal,
      method: 'post',
      // eslint-disable-next-line no-console
      headers: requestHeaders(),
      body: JSON.stringify(prepareChatConfig(requestMessages, fileIds, conversationId, reasoning))
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 401) {
        handleLoginExpired()
      }
      throw new Error(`Request failed: ${errorText}`)
    }

    if (!response.body) {
      throw new Error('Response body is null')
    }

    return {
      body: response.body,
      status: response.status
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw error
  } finally {
    controller = null
  }
}

// 当需要取消请求时调用
export function cancelRequest() {
  if (controller !== null) {
    controller.abort()
  }
}
