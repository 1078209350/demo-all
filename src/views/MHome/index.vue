<template>
  <div id="home-container" @touchmove="handleInputBlur()">
    <CarouselSection />
    <CardSection
      class="card-container"
      :isAnswerPageCard="isAnswerPageCard"
      @card-click="handleCardClick"
      @card-share-click="handleCardShareClick"
      @update-chat-mode-list="updateChatModeList"
    />
    <Transition name="fade">
      <div v-if="isAnswerPage" class="chat-box">
        <DialogSection
          ref="ChatContainerRef"
          :chat-model="chatModel"
          :isTalking="isTalking"
          :chatModelId="chatModelId"
          @change-is-talking="changeIsTalking"
          @change-is-answer-page="changeIsAnswerPage"
          @show-collect-guide="changeCollectGuide"
        />
      </div>
    </Transition>
    <ChatInputSection
      ref="ChatInputRef"
      :isAnswerPage="isAnswerPage"
      :isTalking="isTalking"
      :chat-model="chatModel"
      @send-message="sendMessage"
      @handle-stop="handleStop"
      @update-chat="updateChatInfo"
      @change-model="changeModel"
      @change-is-answer-page="changeIsAnswerPage"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import CarouselSection from '@/components/CarouselSection/index.vue'
import CardSection from '@/components/CardSection/index.vue'
import DialogSection from '@/components/DialogSection/index.vue'
import ChatInputSection from '@/components/MChatInputSection/index.vue'
// import { useChatStoreWithOut } from '@/store/modules/chat'

const isAnswerPage = ref(false) // 是否切换问答页面
const isAnswerPageCard = ref(false) // 是否切换问答页面(用于动画延时)
const isTalking = ref(false) // 是否正在回答
const ChatContainerRef = ref<any>()
const ChatInputRef = ref<any>()
const chatModel = ref('jlts-制度')
const chatModelId = ref(0)
const chatModeList = ref<any>([])

// 子组件改变isTalking的值
const changeIsTalking = (res: boolean) => {
  isTalking.value = res
}

// 子组件改变isAnswerPage的值
const changeIsAnswerPage = (res: boolean) => {
  if (res) {
    isAnswerPageCard.value = true
    setTimeout(() => {
      isAnswerPage.value = true
    }, 500)
  } else {
    isAnswerPageCard.value = false
    isAnswerPage.value = false
    // 重制模型为“制度”
    chatModel.value = chatModeList.value[0]?.modelCode
    chatModelId.value = chatModeList.value[0]?.id
  }
}

const updateChatModeList = (list) => {
  chatModeList.value = list
  chatModelId.value = list[0].id
  chatModel.value = list[0].modelCode
}

const handleCardClick = async (model) => {
  if (model && model.modelCode) {
    chatModel.value = model.modelCode
    chatModelId.value = model.id
    isAnswerPageCard.value = true
    // 如果选择的是DeepSeek模型，设置为深度思考
    // if (model.modelCode == 'DeepSeek') {
    //   useChatStoreWithOut().setDeepThink(true)
    // }
    setTimeout(() => {
      isAnswerPage.value = true
    }, 500)
  }
}

const handleCardShareClick = (model) => {
  console.log(`点击了${model.modelName}模型的分享按钮`)
}

// 发送消息
const sendMessage = async (inputValue, isCollect) => {
  isAnswerPage.value = true
  await nextTick()
  ChatContainerRef.value.handleAsk(inputValue, isCollect)
}

// 更新聊天信息
const updateChatInfo = (deleteItem) => {
  const chatContainerRef = ChatContainerRef.value
  chatContainerRef && chatContainerRef.refreshChatInfo(deleteItem)
}

// 显示收藏指引
const changeCollectGuide = () => {
  const chatInputRef = ChatInputRef.value
  chatInputRef && chatInputRef.showCollectGuide(true)
}

// 模型切换
const changeModel = (model) => {
  chatModel.value = model
}

// 终止发送
const handleStop = () => {
  ChatContainerRef.value.handleStopAnswer()
}

// 手动触发input失焦事件
const handleInputBlur = () => {
  ChatInputRef.value.handleInputBlur()
}
</script>

<style scoped lang="less">
#home-container {
  user-select: none;
}

.chat-box {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
}

.fade-enter-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.van-dialog) {
  width: 70%;
  border-radius: 8px !important;
}
</style>
