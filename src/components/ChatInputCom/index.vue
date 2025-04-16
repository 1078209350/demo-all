<template>
  <div class="ai-input" :class="{ 'text-mode': isShowTool }">
    <div class="file-previews">
      <FilePreview
        v-for="(file, index) in selectedFiles"
        :key="index"
        :file="file"
        @delete-file="removeFile(file)"
        @retry-upload="retryUpload"
      />
    </div>

    <div class="input-wrapper">
      <ElInput
        v-model="inputValue"
        type="textarea"
        :autosize="{ minRows: isShowTool ? 2 : 1, maxRows: 8 }"
        :class="{ 'text-input': isShowTool }"
        style="width: 100%"
        placeholder="有问题，尽管问"
        @keydown.enter.prevent="handleKeydown"
      />

      <div class="bottom-toolbar" :class="{ 'text-mode': isShowTool }">
        <div v-if="isShowTool" class="left-options">
          <el-checkbox-group v-model="searchTypes" size="small">
            <el-checkbox-button label="deepSeek">
              <img :src="thinkIconSrc" alt="" class="option-icon" />
              深度思考 (R1)
              <img :src="thinkDotIconSrc" alt="" class="option-dot-icon" />
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="right-actions">
          <ElUpload
            v-if="showFileUpload"
            v-model:file-list="uploadFileList"
            class="upload-file"
            :action="uploadFileUlr"
            :headers="headers"
            ref="uploadRef"
            :beforeUpload="beforeUploadAction"
            :onSuccess="handleSuccess"
            :onError="handleError"
            :onProgress="handleProgress"
            :on-exceed="handleExceed"
            :accept="validExtensions"
            :limit="3"
            name="file"
            :multiple="true"
            :autoUpload="true"
            :show-file-list="false"
            :disabled="isTalking"
          >
            <ElTooltip
              :content-style="{ padding: '8px 12px' }"
              effect="dark"
              placement="top"
              raw-content
            >
              <template #content>
                <div class="tooltip-content">
                  <div class="title">上传附件（仅识别文字）</div>
                  <div class="limit">可同时上传3个文件 (每个 5 MB)</div>
                  <div class="support">支持 Word / PDF / txt / Markdown</div>
                </div>
              </template>
              <img
                class="upload"
                :src="isTalking ? uploadButtonImgDisable : uploadButtonImg"
                fit="cover"
                alt=""
              />
            </ElTooltip>
          </ElUpload>
          <img
            class="subtract"
            :src="isTalking ? subtractDisabled : subtract"
            fit="cover"
            alt=""
            @click="handleSearch($event)"
          />
        </div>
      </div>
    </div>
    <div class="tip">{{ bottomTip }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {
  ElInput,
  ElUpload,
  ElMessage,
  UploadInstance,
  UploadUserFile,
  ElTooltip,
  ElCheckboxGroup,
  ElCheckboxButton
} from 'element-plus'
import uploadButtonImg from '@/assets/imgs/upload-button.png'
import uploadButtonImgDisable from '@/assets/imgs/upload-button-disable.png'
import subtract from '@/assets/imgs/tool-bt-able-send.png'
import subtractDisabled from '@/assets/imgs/tool-bt-disable-send.png'
import { refreshTokenLogic } from '@/utils/utils'
import FilePreview from './FilePreview.vue'
import { validExtensionsMap } from '@/utils/fileUtils'
import { AIFile } from '@/api/chat/types'
import { fileUploadHeaders, uploadFileUlr } from '@/api/chat/index'
import { useToolbar } from '@/composables/Chat/ChatInputCom/useToolbar'
import { containsCode } from '@/utils/is'

interface Props {
  isTalking: boolean
  bottomTip: string
  type: string
}

const validExtensions = Object.values(validExtensionsMap).join(',')

const props = defineProps<Props>()

const emit = defineEmits(['handle-search', 'files-change', 'height-change'])

// 使用工具栏 composable
const {
  searchTypes,
  isShowTool,
  showFileUpload,
  thinkIconSrc,
  thinkDotIconSrc,
  updateThinkingState
} = useToolbar(props.type)

// 监听深度思考状态变化
watch(searchTypes, (newTypes) => {
  updateThinkingState(newTypes)
})

const selectedFiles = ref<AIFile[]>([])

const inputValue = ref('')

const uploadRef = ref<UploadInstance>()
const uploadFileList = ref<UploadUserFile[]>([])

const headers = fileUploadHeaders()

watch(selectedFiles, (newFiles) => {
  emit('files-change', newFiles.length > 0)
})

// 监听元素高度变化
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const height = entry.contentRect.height
      // console.log(' 输入框height 变化了', height)
      emit('height-change', height)
    }
  })

  // 观察 ai-input 元素
  const aiInput = document.querySelector('.ai-input')
  if (aiInput) {
    resizeObserver.observe(aiInput)
  }

  // 组件卸载时清理
  onUnmounted(() => {
    resizeObserver.disconnect()
  })
})

// 添加键盘事件处理
const handleKeydown = (event) => {
  if ((event.shiftKey || event.metaKey || event.ctrlKey) && event.target) {
    // Shift/Command/Shift + Enter: 插入换行符
    const target = event.target as HTMLTextAreaElement
    const start = event.target.selectionStart
    const end = event.target.selectionEnd
    const newValue = inputValue.value.slice(0, start) + '\n' + inputValue.value.slice(end)
    inputValue.value = newValue
    // 使用 nextTick 确保 DOM 更新后再设置光标位置和滚动
    nextTick(() => {
      target.selectionStart = target.selectionEnd = start + 1
      // 滚动到底部
      target.scrollTop = target.scrollHeight
    })
  } else {
    // 仅 Enter: 发送消息
    handleSearch(event)
  }
}

const handleSearch = async (event: Event) => {
  refreshTokenLogic()
  event.preventDefault()
  inputValue.value = inputValue.value.replace(/\t/g, '').replace(/^\s*/, '')

  // 添加代码检测
  if (containsCode(inputValue.value)) {
    ElMessage.warning('请不要输入代码！')
    return false
  }
  if (props.isTalking || inputValue.value === '') {
    return false
  }
  const selectedAIFiles: AIFile[] = []
  for (const file of selectedFiles.value) {
    const aiFile: AIFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      id: file.id // 假设接口返回文件ID
    }
    selectedAIFiles.push(aiFile)
  }
  // 添加深度思考参数
  // const options: ChatExtraParams = {
  //   reasoning: searchTypes.value.includes('deepSeek')
  // }
  // console.log('input send:', inputValue.value, selectedAIFiles)
  emit('handle-search', inputValue.value, selectedAIFiles)
  inputValue.value = ''
  selectedFiles.value = []
  uploadFileList.value = []
}

const removeFile = (file: AIFile) => {
  selectedFiles.value = selectedFiles.value.filter((f) => f !== file)
  uploadFileList.value = uploadFileList.value.filter((f) => f.name !== file.name)
}

const beforeUploadAction = (file: File) => {
  const fileName = file.name || ''
  const fileExtension = `.${fileName.split('.').pop()?.toLowerCase()}`

  // 检查文件名是否重复
  const isDuplicate = selectedFiles.value.some((existingFile) => existingFile.name === fileName)
  if (isDuplicate) {
    ElMessage.error('已存在同名文件，请重命名后再上传')
    return false
  }

  if (!Object.values(validExtensionsMap).includes(fileExtension)) {
    ElMessage.error('仅支持Word, PDF, txt, Markdown类型文件上传')
    return false
  }

  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('单个文件大小不能超过5MB')
    return false
  }
  const files = [file]
  const aiFiles: AIFile[] = files.map((file) => {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      raw: file,
      status: 'uploading',
      percentage: 0
    }
  })
  selectedFiles.value = [...selectedFiles.value, ...aiFiles]
  return true
}

const handleSuccess = (response, file, fileList) => {
  console.log('handleSuccess', response, file, fileList)
  const uploadedFile = selectedFiles.value.find((f) => f.name === file.name)
  if (response && response.code && response.code == 0) {
    // 上传成功
    // console.log('上传成功', response)
    if (uploadedFile) {
      uploadedFile.status = 'success'
      uploadedFile.percentage = 100
      uploadedFile.id = response.data // 假设接口返回文件ID
    }
    // console.log('上传成功', uploadedFile.id)
  } else {
    // 上传失败
    // console.log('上传失败', response)
    ElMessage.error(' 文件上传失败，请重试')
    if (uploadedFile) {
      uploadedFile.status = 'error'
    }
  }
}

const handleError = (err, file) => {
  console.log('handleError', err)
  const uploadedFile = selectedFiles.value.find((f) => f.name === file.name)
  if (uploadedFile) {
    uploadedFile.status = 'error'
  }
}

// 添加上传进度处理
const handleProgress = (event: any, file: any) => {
  const uploadedFile = selectedFiles.value.find((f) => f.name === file.name)
  if (uploadedFile) {
    uploadedFile.percentage = Math.round(event.percent)
  }
}

// 添加重试上传方法
const retryUpload = (file: AIFile) => {
  if (file.raw) {
    file.status = 'uploading'
    file.percentage = 0
    const formData = new FormData()
    formData.append('file', file.raw)
    // 这里重新调用上传接口
    // ... 上传逻辑
    // 自定义上传逻辑
    fetch(uploadFileUlr, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          file.status = 'success'
          file.percentage = 100
          file.id = data.data.id
        } else {
          file.status = 'error'
          ElMessage.error('文件上传失败，请重试')
        }
      })
      .catch((_) => {
        file.status = 'error'
        ElMessage.error('文件上传失败，请重试')
      })
  }
  console.log('retryUpload', file)
}

const handleExceed = (_files, _fileList) => {
  ElMessage.error('最多支持上传3个文件, 您上传了' + _files.length + '个文件')
}

const getPaddingRight = () => {
  if (isShowTool.value) return '15px'
  if (showFileUpload.value) return '78px'
  return '48px'
}
</script>

<style scoped lang="less">
.ai-input {
  position: absolute;
  bottom: 20px;
  left: calc(15% + 50px);
  width: calc(70% - 50px);

  .file-previews {
    display: flex;
    padding-bottom: 8px;
    margin-bottom: 3px;
    overflow-x: auto;
    white-space: nowrap;
    flex-flow: row nowrap;
    gap: 8px;
  }

  .input-wrapper {
    position: relative;
    padding: 10px 0 10px 10px;
    background: #fff;
    border: 1px solid #0957ac;
    border-radius: 10px;

    &:focus-within {
      border-color: #0957ac;
    }
  }

  :deep(.el-textarea__inner) {
    // margin: 15px;
    padding: 5px;
    padding-right: v-bind('getPaddingRight()');
    background: transparent;
    border: none !important; // 强制移除边框
    // border-radius: 10px;
    outline: none; // 移除轮廓
    box-shadow: none; // 移除阴影
    resize: none;
    // -ms-overflow-style: none;
    // scrollbar-width: none;
    // 自定义滚动条样式
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #4c4d50;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 4px;
    }

    // 鼠标悬停时滚动条样式
    &:hover::-webkit-scrollbar-thumb {
      background-color: #909399;
    }
  }

  .bottom-toolbar {
    position: absolute;
    right: 15px;
    bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;

    .left-options {
      :deep(.el-checkbox-button__inner) {
        display: flex;
        padding: 6px 12px;
        font-size: 13px;
        font-weight: 500;
        color: #90949e;
        background: #eef3ff; // 未选中时的背景色
        border: none; // 移除边框
        border-radius: 6px; // 设置圆角
        transition: all 0.3s; // 添加过渡效果
        align-items: center;
        gap: 4px;

        &:focus {
          outline: none; // 移除 checkbox 按钮的焦点边框
        }
      }

      :deep(.el-checkbox-button.is-checked .el-checkbox-button__inner) {
        color: #484f5f;
        background-color: #e3edff; // 选中时的背景色
        border: none; // 确保选中状态也没有边框
        box-shadow: none;

        &:focus {
          outline: none; // 移除选中状态下的焦点边框
        }
      }

      .option-icon {
        width: 16px;
        height: 16px;
        opacity: 1;
        transition: opacity 0.3s; // 添加图标过渡效果
      }

      .option-dot-icon {
        width: 4px;
        height: 4px;
        opacity: 1;
        transition: opacity 0.3s; // 添加图标过渡效果
      }
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 10px;

      .upload-file {
        position: static;
        width: 24px;
        height: 24px;
      }

      .upload {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      .subtract {
        position: static;
        width: 28px;
        height: 28px;
        cursor: pointer;
      }
    }
  }

  .tip {
    margin-top: 5px;
    font-size: 8px;
    color: #90949e;
    text-align: center;
  }

  &.text-mode {
    position: absolute;
    bottom: 20px;
    left: calc(15% + 50px);
    width: calc(70% - 50px);
    padding: 0;

    .input-wrapper {
      border: 1px solid #0957ac;

      &:focus-within {
        border-color: #0957ac;
      }
    }

    :deep(.el-textarea__inner) {
      min-height: 80px;
      border-radius: 10px 10px 0 0;
    }

    .bottom-toolbar {
      position: relative;
      right: auto;
      bottom: auto;
      height: 33px;
      margin-top: 15px;
      // padding: 0 15px;
      margin-right: 15px;
      justify-content: space-between;
    }
  }
}

.tooltip-content {
  .title {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }

  .limit {
    margin-bottom: 2px;
    font-size: 12px;
    font-weight: 400;
    color: #acacac;
  }

  .support {
    font-size: 12px;
    font-weight: 400;
    color: #acacac;
  }
}

:deep(.el-tooltip__trigger) {
  outline: none;
}
</style>
