<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import ChatCore from '@/components/ChatCore/index.vue'
import ChatInput from '@/components/ChatInputCom/index.vue'
import { useToolbar } from '@/composables/Chat/ChatInputCom/useToolbar'
import { refreshTokenLogic } from '@/utils/utils'
import { usePageData } from './data'
import IntroduceSection from '@/components/IntroduceSection/index.vue'
import QuestionSection from '@/components/QuestionSection/index.vue'
import { AIFile, ChatExtraParams } from '@/api/chat/types'
import { getExampleQuestion } from '@/api/example'

interface Props {
  type: string
  greeting: string
  modelConfigIntro: {
    showIcon: boolean
    prefix: string
    suffix: string
    url: string
  }
  modelConfigTips: {
    title: string
    items: string[]
  }
}

const props = defineProps<Props>()

const { bottomTip, setTitleTip, setBottomTip, setIntroContent } = usePageData(props.type)
let isTalking = ref(false)
const isChat = ref(false)
const chatCoreRef = ref<any>()
const hasSelectedFiles = ref(false)
const inputHeight = ref(88)
const { isShowTool } = useToolbar(props.type)
const dataList = ref([])
const textList = ref([])
const publicList = ref([])
const ticketList = ref([])

onMounted(async () => {
  inputHeight.value = isShowTool ? 198 : 88
  setTitleTip()
  setBottomTip()
  setIntroContent()
  // await fetchData()
  const res = await getExampleQuestion()
  dataList.value = res.data['ym_product']
  textList.value = res.data['ym_coder']
  publicList.value = res.data['ym_teacher']
})

// 子组件改变isTalking的值
const changeIsTalking = (res: boolean) => {
  isTalking.value = res
}

const handleModel = async (event, model: string) => {
  refreshTokenLogic()
  event.preventDefault()
  isChat.value = true
  await nextTick()
  chatCoreRef.value.handleAsk(model)
}

const handleSearch = async (text: string, files?: AIFile[], options?: ChatExtraParams | null) => {
  console.log('send page begin handleModel text:', text, files, options)
  isChat.value = true
  await nextTick()
  chatCoreRef.value.handleAsk(text, undefined, files, options)
}

const questionList = computed(() => {
  switch (props.type) {
    case 'ym_product':
      return dataList.value
    case 'ym_coder':
      return textList.value
    case 'ym_teacher':
      return publicList.value
    case 'ticket':
      return ticketList.value
    default:
      return []
  }
})

// 添加文件状态变化处理函数
const handleFilesChange = (hasFiles: boolean) => {
  hasSelectedFiles.value = hasFiles
}

// 添加更新输入框高度的方法
const updateInputHeight = (height: number) => {
  inputHeight.value = height + 20
  nextTick()
}

defineExpose({ isTalking })
</script>

<template>
  <div class="container-ai">
    <div class="guide-page" v-if="!isChat" :style="{ marginBottom: inputHeight + 'px' }">
      <IntroduceSection
        :type="props.type"
        :greeting="greeting"
        :modelConfigIntro="modelConfigIntro"
        :modelConfigTips="modelConfigTips"
      />
      <QuestionSection
        v-if="questionList.length > 0"
        :type="props.type"
        :questionList="questionList"
        @question-click="handleModel"
      />
    </div>
    <div class="chat-core" v-else :style="{ marginBottom: inputHeight + 'px' }">
      <ChatCore
        ref="chatCoreRef"
        :type="props.type"
        :isTalking="isTalking"
        @change-is-talking="changeIsTalking"
      />
    </div>
    <ChatInput
      :isTalking="isTalking"
      @handle-search="handleSearch"
      :bottomTip="bottomTip"
      :type="props.type"
      @files-change="handleFilesChange"
      @height-change="updateInputHeight"
    />
  </div>
</template>

<style scoped lang="less">
.container-ai {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC';

  .guide-page {
    width: 100%;
    padding: 0 15%;
    overflow-y: auto;
    background: #eef3ff;
  }

  .chat-core {
    width: 100%;
    color: black;
    background: #eef3ff;
  }
}
</style>
