import { ref } from 'vue'
import type { ChatMessage } from '@/api/chat/types'

export function useMessageList() {
  const messageList = ref<ChatMessage[]>([])

  const addUserMessage = (content: string, files?: any[]) => {
    // console.log('addUserMessage: ', content)
    messageList.value.push({
      role: 'user',
      content,
      time: new Date(),
      files
    })
  }

  const addAssistantMessage = () => {
    messageList.value.push({
      role: 'assistant',
      content: '',
      contentArray: [{ type: 'word', value: '' }],
      imgList: [],
      isItemTalking: true,
      chatId: '',
      likeLight: false,
      dislikeLight: false,
      isDislikeContent: false
    })
  }

  const updateLastMessage = (content: string) => {
    if (messageList.value.length > 0) {
      messageList.value[messageList.value.length - 1].content = content
    }
  }

  const removeMessages = (startIndex: number, count: number) => {
    messageList.value.splice(startIndex, count)
  }

  return {
    messageList,
    addUserMessage,
    addAssistantMessage,
    updateLastMessage,
    removeMessages
  }
}
