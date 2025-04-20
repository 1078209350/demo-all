import { cancelRequest } from '@/api/chat'

export function useErrorHandler(messageList, talkingEnd, processor) {
  const handleError = (message: string = ' **（网络似乎有些问题，鲸宝发呆中）**') => {
    if (!processor.stopTalking) {
      processor.stopTalking = true
      const lastMessage = messageList.value[messageList.value.length - 1]
      lastMessage.content += message
      const contentLength = lastMessage.contentArray.length
      lastMessage.contentArray[contentLength - 1].value += message
      talkingEnd()
    }
  }

  const handleStopAnswer = () => {
    processor.stopTalking = true
    cancelRequest()
    const lastMessage = messageList.value[messageList.value.length - 1]
    const stopMessage = ` **（您中止了仪迈的回答）**`
    lastMessage.content += stopMessage
    const contentLength = lastMessage.contentArray.length
    lastMessage.contentArray[contentLength - 1].value += stopMessage
    talkingEnd()
  }

  return {
    handleError,
    handleStopAnswer
  }
}
