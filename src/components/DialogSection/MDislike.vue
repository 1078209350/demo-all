<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { DislikeContent } from '@/api/chat/types'
import { ElDialog, ElButton, ElInput, ElMessage } from 'element-plus'
import { saveQuestionPraise } from '@/api/feedback'

interface Props {
  ifDislike: boolean
  dislikeContent: DislikeContent
  chatIdSelected: string
}

const props = defineProps<Props>()

const textarea = ref('')
const allowSubmit = ref(false)
const isSubmit = ref(false)
const emit = defineEmits(['change-if-dislike']) //定义一个变量来接收父组件传来的方法

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

const handleSubmit = async () => {
  const chatId = props.chatIdSelected
  const feedback = props.dislikeContent.showOption.filter((item) => item.checked)
  const feedbackOption = feedback.map((item) => {
    return item.value
  })
  const res = await saveQuestionPraise('1', chatId, feedbackOption, textarea.value)
  if (res.code == 200) {
    emit('change-if-dislike', false)
    if (isSubmit.value) {
      // @ts-ignore
      ElMessage({
        message: '反馈成功',
        type: 'success',
        appendTo: document.querySelector('#home-container')
      })
    }
  }
  // 重制初始状态
  textarea.value = ''
  allowSubmit.value = false
  isSubmit.value = false
}
</script>

<template>
  <div
    class="container"
    @touchmove="
      (e) => {
        e.preventDefault()
      }
    "
  >
    <ElDialog
      :model-value="ifDislike"
      :close-on-click-modal="false"
      title="进一步反馈"
      width="80%"
      @close="
        () => {
          handleSubmit()
        }
      "
    >
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
      <template #footer>
        <div class="dialog-footer">
          <ElButton
            :disabled="!allowSubmit"
            type="primary"
            @click="
              () => {
                isSubmit = true
                emit('change-if-dislike', false)
              }
            "
            >提交</ElButton
          >
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped lang="less">
.container {
  //:deep(.el-button) {
  //  background: rgba(100, 148, 231, 0.8);
  //}
  :deep(.el-dialog__body) {
    padding: 0 20px;
  }

  //:deep(.el-overlay) {
  //  position: absolute;
  //}
  //
  //:deep(.el-overlay-dialog) {
  //  position: absolute;
  //}

  .ques-desc,
  .ques-supplement {
    display: inline-block;
    margin: 10px 0 20px;
    font-size: 12px;
  }

  .ques-btn {
    display: flex;
    font-size: 13px;
    flex-wrap: wrap;

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
    text-align: center;
  }
}
</style>
