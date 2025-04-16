import { ref } from 'vue'
import type { ChatMessage } from '@/api/chat/types'

export function useMessageListMobile() {
  const messageList = ref<ChatMessage[]>([])

  const addUserMessage = (content: string, isCollect?: boolean) => {
    // console.log('addUserMessage: ', content)
    messageList.value.push({
      role: 'user',
      content,
      time: new Date(),
      collect: isCollect
    })
  }

  const addAssistantMessage = () => {
    messageList.value.push({
      role: 'assistant',
      content: '',
      contentArray: [{ type: 'word', value: '' }],
      imgList: [],
      previewIndex: 0, // 图片预览的index
      previewVisible: false, // 图片预览组件是否显示
      isItemTalking: true,
      chatId: '',
      likeLight: false,
      dislikeLight: false,
      deepThinkFold: false // 深度思考是否折叠
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
