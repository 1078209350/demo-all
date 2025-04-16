<script setup lang="ts">
import { defineProps, nextTick, onMounted, ref } from 'vue'
import { showConfirmDialog } from 'vant'
import { useChatStoreWithOut } from '@/store/modules/chat'
import MDislike from './MDislike.vue'
import MGuide from './MGuide.vue'
import MUserMessage from './MUserMessage.vue'
import MAssistantMessage from './MAssistantMessage.vue'
import home from '@/assets/imgs/home.png'
import homeDisabled from '@/assets/imgs/home-disabled.png'
import clear from '@/assets/imgs/clear-new.png'
import clearDisabled from '@/assets/imgs/clear-new-disabled.png'
import { useMessageListMobile } from '@/composables/Chat/ChatCore/useMessageListMobile'
import { useScroll } from '@/composables/Chat/ChatCore/useScroll'
import { useInteraction } from '@/composables/Chat/ChatCore/useInteraction'
import { useStreamProcessor } from '@/composables/Chat/ChatCore/useStreamProcessor'
import { useChatRequest } from '@/composables/Chat/ChatCore/useChatRequest'
import { useErrorHandler } from '@/composables/Chat/ChatCore/useErrorHandler'

interface Props {
  chatModel: string
  isTalking: boolean
  chatModelId: number
}

const props = defineProps<Props>()

const scrollDirection = ref<string>('')
const chatStore = useChatStoreWithOut()
const hadClear = ref(false)
const ifDislike = ref(false) // 是否展示“点踩反馈”
const isRegenerate = ref(false) //是否重新生成
const emit = defineEmits([
  'change-is-talking',
  'change-is-answer-page',
  'show-collect-guide',
  'change-chat-model-id'
])
// 添加新的状态控制
const userMessageRef = ref<any>()

const talkingEnd = async () => {
  emit('change-is-talking', false)
  messageList.value.length > 0
    ? (messageList.value[messageList.value.length - 1].isItemTalking = false)
    : null
  updateHistory()
  await nextTick()
  await scrollToBottom()
}

// 聊天入口 是否从收藏列表进入
const handleChatEntry = () => {
  if (isRegenerate.value) {
    return
  }
  const messageLength = messageList.value.length
  if (messageLength < 2) {
    return
  }
  if (messageList.value[messageLength - 2].collect) {
    userMessageRef.value.handleCollect(
      messageList.value[messageLength - 2],
      messageLength - 2,
      false
    )
  }
}

const { messageList, addUserMessage, addAssistantMessage } = useMessageListMobile()
const { containerRef, scrollToBottom, initScrollListeners } = useScroll()
const { chatIdSelected, dislikeContent } = useInteraction()
const {
  processor,
  reset: resetProcessor,
  appendContent
} = useStreamProcessor(messageList, scrollToBottom, talkingEnd, handleChatEntry)
const { sendChatRequest } = useChatRequest(messageList, processor, appendContent)

const { handleError, handleStopAnswer } = useErrorHandler(messageList, talkingEnd, processor)

const updateHistory = () => {
  if (hadClear.value) {
    chatStore.clearChatHistory()
    return
  }
  chatStore.setChatList(props.chatModel, messageList.value)
}

const clearMessage = () => {
  hadClear.value = true
  messageList.value = []
  chatStore.clearChatHistory()
}

// 更新聊天信息
const refreshChatInfo = (deleteItem) => {
  const chatIdArray = deleteItem.chatId.split(',')
  if (chatIdArray instanceof Array && chatIdArray.length) {
    for (let i = 0; i < messageList.value.length; i++) {
      if (chatIdArray.indexOf(messageList.value[i].chatId) > -1) {
        if (messageList.value[i].role === 'user') {
          messageList.value[i].collect = false
        } else {
          messageList.value[i - 1].collect = false
        }
        break
      }
    }
  }
}

const changeDislikeInfo = (chatId, data) => {
  chatIdSelected.value = chatId
  dislikeContent.value = data
}

onMounted(() => {
  initScrollListeners()
})

// 回到初始页面
const handleBack = () => {
  if (props.isTalking) {
    return
  }
  emit('change-is-answer-page', false)
}

// 清空聊天内容
const handleClear = () => {
  if (props.isTalking) {
    return
  }
  showConfirmDialog({
    title: '确认要清空页面吗?',
    teleport: '#home-container',
    message: '',
    confirmButtonText: '清空',
    confirmButtonColor: '#F56C6C'
  })
    .then(() => {
      messageList.value = []
    })
    .catch(() => {
      console.log('已取消')
    })
}

const changeIfDislike = (val) => {
  ifDislike.value = val
}

// 发送问题请求
const handleAsk = async (content: string, isCollect?: boolean, index?: number) => {
  // 滑动到页面底部-聊天内容定位到底部
  scrollDirection.value = 'down'
  if (!content.length || props.isTalking) return
  isRegenerate.value = !!index
  resetProcessor()
  try {
    emit('change-is-talking', true)
    // 重新提问时，删除当前重新提问的问题及回答
    if (index) {
      messageList.value.splice(index - 1, 2)
    }
    addUserMessage(content, isCollect)
    addAssistantMessage()
    await nextTick()
    // 发送新消息时强制滚动到底部
    await scrollToBottom(true)

    await sendChatRequest(props.chatModel, processor.conversationId)
  } catch (error: any) {
    console.log('chatAction error', error)
    handleError()
  } finally {
    console.log('finally')
  }
}

defineExpose({ handleAsk, handleStopAnswer, clearMessage, refreshChatInfo })
</script>

<template>
  <div class="chat-header">
    <img :src="isTalking ? homeDisabled : home" alt="" @click="handleBack" />
    <img :src="isTalking ? clearDisabled : clear" alt="" @click="handleClear" />
  </div>
  <div
    class="chat-area"
    :style="{ paddingBottom: chatModel == 'jlts-制度' ? '120px' : '80px' }"
    ref="containerRef"
  >
    <template v-if="messageList.length == 0">
      <MGuide :chatModelId="chatModelId" @handle-ask="handleAsk" />
    </template>
    <template v-else>
      <div v-for="(item, index) in messageList" :key="index">
        <MUserMessage
          v-if="item.role == 'user'"
          ref="userMessageRef"
          :item="item"
          :index="index"
          :messageList="messageList"
          :chatModel="chatModel"
          @update-history="updateHistory"
          @show-collect-guide="emit('show-collect-guide')"
        />
        <MAssistantMessage
          v-if="item.role == 'assistant'"
          :chatModel="chatModel"
          :item="item"
          :index="index"
          :messageList="messageList"
          @update-history="updateHistory"
          @change-if-dislike="changeIfDislike"
          @handle-ask="handleAsk"
          @change-dislike-info="changeDislikeInfo"
        />
      </div>
    </template>

    <MDislike
      :ifDislike="ifDislike"
      :dislikeContent="dislikeContent"
      :chatIdSelected="chatIdSelected"
      @change-if-dislike="changeIfDislike"
    />
  </div>
</template>

<style scoped lang="less">
.chat-header {
  display: flex;
  height: 60px;
  background: #3875c5;
  justify-content: space-between;

  img {
    width: 24px;
    height: 24px;
    padding: 10px 22px;
  }
}

.chat-area {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: calc(100% - 40px);
  padding: 0 18px 70px;
  overflow-y: auto;
  background-color: #dbe7f7;
  background-image: url('@/assets/imgs/m-content-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 8px 20px rgb(0 0 0 / 20%);
  box-sizing: border-box;
}
</style>
