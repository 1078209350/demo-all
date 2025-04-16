<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from 'vue'
import { getExampleQuestion } from '@/api/home'

interface Props {
  chatModelId: number
}

interface GuideInfo {
  modelPrologue?: string
  sampleProblem?: string[]
}

const props = defineProps<Props>()
const emit = defineEmits(['handle-ask'])
const guideInfo = ref<GuideInfo>({}) // 指引信息

onMounted(async () => {
  // 查询引导问题
  const res = await getExampleQuestion(props.chatModelId)
  guideInfo.value = res.data
})

// 点击示例问题
const handleGuideQuestion = (item) => {
  emit('handle-ask', item, false)
}
</script>

<template>
  <div class="chat-guide">
    <div class="guide-desc">{{ guideInfo.modelPrologue }}</div>
    <div
      class="guide-question"
      v-for="(item, index) in guideInfo.sampleProblem"
      :key="index"
      @click="handleGuideQuestion(item)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.chat-guide {
  padding: 15px 3px;
  color: #666;

  .guide-desc {
    padding: 15px;
    margin-bottom: 7px;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 138.462% */
    letter-spacing: -0.165px;
    background: white;
    border-radius: 0 20px 20px;
  }

  .guide-question {
    display: flex;

    span {
      padding: 8px 15px;
      margin-top: 10px;
      overflow: hidden; /* 隐藏超出容器的内容 */
      font-size: 13px;
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      white-space: nowrap; /* 禁止文本换行 */
      background: linear-gradient(180deg, rgb(255 255 255 / 80%), rgb(232 247 255 / 80%));
      border-radius: 20px;
    }
  }
}
</style>
