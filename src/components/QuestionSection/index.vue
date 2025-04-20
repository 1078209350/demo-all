<template>
  <div style="margin-left: 190px">
    <div class="ai-question-title">您可以这样问我：</div>
    <div class="ai-question-container">
      <div
        class="question-item"
        v-for="(item, index) in props.questionList"
        :key="index"
        @click="handleQuestionClick($event, item)"
      >
        <div class="question-desc">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Question {
  type: string
  desc: string
}

const props = defineProps<{
  type: string
  questionList: Question[]
}>()

console.log(props.questionList)

const emit = defineEmits(['question-click'])

const handleQuestionClick = (event: Event, desc: any) => {
  emit('question-click', event, desc)
}
</script>

<style scoped lang="less">
.ai-question-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #484f5f;
}

.ai-question-container {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  justify-content: space-between;

  .question-item {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    cursor: pointer;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgb(0 0 0 / 5%);
    box-sizing: border-box;

    .question-desc {
      display: -webkit-box;
      margin-top: 0;
      overflow: hidden;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: -0.165px;
      color: #484f5f;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      // -webkit-line-clamp: 3;/
    }
  }
}
</style>
