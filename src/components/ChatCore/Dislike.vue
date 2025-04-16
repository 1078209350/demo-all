<script setup lang="ts">
import { ref, watch } from 'vue'
import { DislikeContent } from '@/api/chat/types'
import { ElButton, ElInput, ElMessage } from 'element-plus'
import { saveQuestionPraise } from '@/api/feedback/index'
import close from '@/assets/imgs/close.png'

interface Props {
  index: number
  position: string
  isDislikeContent: boolean | undefined
  dislikeContent: DislikeContent
  chatIdSelected: string
}

const props = defineProps<Props>()

const textarea = ref('')
const allowSubmit = ref(false)
const emit = defineEmits(['handle-close-dislike']) //定义一个变量来接收父组件传来的方法

watch(
  () => props.isDislikeContent,
  (newValue) => {
    if (newValue == false) {
      // 重制初始状态
      textarea.value = ''
      allowSubmit.value = false
    }
  }
)

const handleButton = (item) => {
  if (item.checked == undefined) {
    item.checked = true
  } else {
    item.checked = !item.checked
  }
  const feedback = props.dislikeContent.showOption.filter((item) => item.checked)
  if (feedback.length > 0) {
    allowSubmit.value = true
  } else {
    allowSubmit.value = false
  }
}

const handleSubmit = async (type) => {
  const chatId = props.chatIdSelected
  const feedback = props.dislikeContent.showOption.filter((item) => item.checked)
  const feedbackOption = feedback.map((item) => {
    return item.value
  })
  const res = await saveQuestionPraise('1', chatId, feedbackOption, textarea.value)
  if (res.code == 200) {
    emit('handle-close-dislike', props.index)
    if (type == 'submit') {
      ElMessage.success('反馈成功')
    }
  }
}

// 关闭
const handleClose = () => {
  emit('handle-close-dislike', props.index)
  handleSubmit('close')
}

// 阻止事件冒泡
const handleStopPropagation = (e) => {
  e.stopPropagation() // 阻止事件冒泡
}
</script>

<template>
  <div
    class="container"
    :style="{
      top: props.position == 'top' ? '25px' : 'auto',
      bottom: props.position == 'top' ? 'auto' : '25px'
    }"
    v-if="props.isDislikeContent"
    @click="handleStopPropagation"
  >
    <div class="title">
      <span class="title-desc">进一步反馈</span>
      <img :src="close" alt="关闭" @click="handleClose()" />
    </div>
    <span class="ques-desc">{{ props.dislikeContent.greeting }}</span>
    <div class="ques-btn">
      <div
        v-for="item in props.dislikeContent.showOption"
        :key="item.label"
        :class="[item.checked ? 'btn-checked' : 'btn']"
        @click="handleButton(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <span class="ques-supplement">{{ props.dislikeContent.question }}</span>
    <ElInput v-model="textarea" :rows="2" maxlength="200" type="textarea" placeholder="请输入" />
    <div class="dialog-footer">
      <ElButton :disabled="!allowSubmit" type="primary" @click="handleSubmit('submit')"
        >提交</ElButton
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  position: absolute;
  z-index: 99;
  width: 300px;
  padding: 15px;
  text-align: left;
  background: white;
  border-radius: 6px;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 25%);
  //:deep(.el-button) {
  //  background: rgba(100, 148, 231, 0.8);
  //}
  :deep(.el-dialog__body) {
    padding: 0 20px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-desc {
      font-size: 16px;
    }
  }

  .ques-desc,
  .ques-supplement {
    display: inline-block;
    margin: 10px 0 15px;
    font-size: 12px;
    color: #666;
  }

  .ques-btn {
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    color: #484f5f;

    .btn {
      padding: 5px 10px;
      margin: 0 15px 10px 0;
      cursor: pointer;
      background: #eef3ff;
      border: 1px dashed rgb(10 86 170 / 40%);
      border-radius: 4px;
      box-sizing: border-box;
    }

    .btn-checked {
      max-width: 40%;
      padding: 5px 10px;
      margin: 0 15px 10px 0;
      color: #0957ac;
      cursor: pointer;
      background: #deeeff;
      border: 1px dashed #0957ac;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }

  .dialog-footer {
    margin-top: 20px;
    text-align: center;

    :deep(.el-button) {
      width: 80px;
      height: 30px;
      background: #0957ac;
    }

    :deep(.el-button.is-disabled) {
      background: #0957ac;
      opacity: 0.5;
    }
  }

  :deep(.el-textarea__inner) {
    height: 40px;
    min-height: 40px !important;
    padding: 10px;
    overflow: auto;
    background: #eef3ff;
    border: none;
    border-radius: 4px;
    resize: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
