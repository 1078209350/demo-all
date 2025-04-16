<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { saveQuestionPraise } from '@/api/feedback'
import UserMessage from '@/components/ChatCore/UserMessage.vue'
import AssistantMessage from './AssistantMessage.vue'
import { useMessageList } from '@/composables/Chat/ChatCore/useMessageList'
import { useScroll } from '@/composables/Chat/ChatCore/useScroll'
import { useInteraction } from '@/composables/Chat/ChatCore/useInteraction'
import { useStreamProcessor } from '@/composables/Chat/ChatCore/useStreamProcessor'
import { useErrorHandler } from '@/composables/Chat/ChatCore/useErrorHandler'
import { useChatRequest } from '@/composables/Chat/ChatCore/useChatRequest'

const props = defineProps<{
  type: string
  isTalking: boolean
}>()

const emit = defineEmits(['change-is-talking'])
// Composables
const { messageList, addUserMessage, addAssistantMessage } = useMessageList()
const { containerRef, scrollToBottom, initScrollListeners } = useScroll()
const { chatIdSelected, position, dislikeContent, handleLike, handleDislike } = useInteraction()

const talkingEnd = async () => {
  emit('change-is-talking', false)
  messageList.value[messageList.value.length - 1].isItemTalking = false
  await nextTick()
  await scrollToBottom()
}

const {
  processor,
  reset: resetProcessor,
  appendContent
} = useStreamProcessor(messageList, scrollToBottom, talkingEnd)
const { sendChatRequest } = useChatRequest(messageList, processor, appendContent)

const { handleError, handleStopAnswer } = useErrorHandler(messageList, talkingEnd, processor)

// 核心方法
const handleAsk = async (content, index?, files?, options?) => {
  if (!content.length || props.isTalking) return
  resetProcessor()

  try {
    emit('change-is-talking', true)
    if (index) {
      messageList.value.splice(index - 1, 2)
    }

    addUserMessage(content, files)
    addAssistantMessage()
    await scrollToBottom(true)
    await sendChatRequest(props.type, processor.conversationId, options)
  } catch (error) {
    console.error('Chat error:', error)
    handleError()
  }
}

// 点赞处理
const clickLike = async (item) => {
  messageList.value.forEach((msg) => {
    if (msg.role === 'assistant') {
      msg.isDislikeContent = false
    }
  })
  handleLike(item)
}

// 点踩处理
const clickDislike = async (item, index, event) => {
  event.stopPropagation()
  messageList.value.forEach((msg) => {
    if (msg.role === 'assistant') {
      msg.isDislikeContent = false
    }
  })
  handleDislike(item, index, event)
}

// 点击空白区域-隐藏点踩弹框
const handleHideDislike = async () => {
  // 发送点踩请求
  const res = messageList.value.filter((item) => item.isDislikeContent)
  if (res.length == 1) {
    const chatId = chatIdSelected.value
    await saveQuestionPraise('1', chatId, [], '')
  }

  messageList.value.forEach((item) => {
    if (item.role == 'assistant') {
      item.isDislikeContent = false
    }
  })
}

// 关闭/提交-隐藏点踩弹框
const handleCloseDislike = (index) => {
  messageList.value[index].isDislikeContent = false
}

onMounted(() => {
  initScrollListeners()
})

defineExpose({ handleAsk })
</script>

<template>
  <div ref="containerRef" class="container-chat" @click="handleHideDislike">
    <div v-for="(item, index) in messageList" :key="index">
      <UserMessage v-if="item.role == 'user'" :message="item" />
      <AssistantMessage
        v-if="item.role == 'assistant'"
        :item="item"
        :index="index"
        :length="messageList.length"
        :type="type"
        :position="position"
        :dislike-content="dislikeContent"
        :chat-id-selected="chatIdSelected"
        @handle-ask="
          (index) => handleAsk(messageList[index - 1].content, index, messageList[index - 1].files)
        "
        @handle-ask-guess="(content) => handleAsk(content)"
        @handle-stop="handleStopAnswer"
        @handle-like="clickLike"
        @handle-dislike="clickDislike"
        @handle-close-dislike="handleCloseDislike"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.container-chat {
  height: 100%;
  padding: 0 15% 30px;
  overflow-y: auto;
  box-sizing: border-box;
}

:deep(p) {
  margin: 0;
}
</style>
