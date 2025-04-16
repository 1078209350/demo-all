<template>
  <div class="file-preview">
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <div class="content-wrapper">
        <div class="file-main">
          <div class="file-icon-wrapper">
            <img :src="iconSrc" class="file-icon" alt="File Icon" />
            <!-- 上传进度遮罩 -->
            <div v-if="file.status === 'uploading'" class="upload-progress">
              <div class="progress-bar" :style="{ height: file.percentage + '%' }"></div>
              <span class="progress-text">{{ file.percentage }}%</span>
            </div>
            <!-- 上传失败重试按钮 -->
            <div v-if="file.status === 'error'" class="upload-error" @click="handleRetry">
              <img :src="RetryIcon" class="retry-icon" alt="retry" />
            </div>
          </div>
          <div class="file-details">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-meta">{{ showFileType }}, {{ formattedFileSize }}</span>
          </div>
        </div>
        <i
          v-if="!readonly && file.status !== 'uploading'"
          class="file-delete-btn"
          @click="handleDelete"
        >
          <img :src="deleteIcon" alt="delete" />
        </i>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import { computed, PropType } from 'vue'
import { validTypes, getFileIcon, formatFileSize } from '@/utils/fileUtils'
import deleteIcon from '@/assets/imgs/file-delete-btn.png'
import { AIFile } from '@/api/chat/types'
import RetryIcon from '@/assets/imgs/retry.png'

const props = defineProps({
  file: {
    type: Object as PropType<AIFile>,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete-file', 'retry-upload'])

const showFileType = computed(() => {
  return validTypes[props.file.type] || props.file.type
})

const iconSrc = computed(() => {
  return getFileIcon(showFileType.value)
})

const formattedFileSize = computed(() => {
  return formatFileSize(props.file.size)
})

const handleDelete = () => {
  emit('delete-file', props.file)
}

const handleRetry = () => {
  emit('retry-upload', props.file)
}
</script>

<style scoped lang="less">
.file-preview {
  position: relative; /* 添加相对定位 */
  width: 100%;
  max-width: 240px;
  padding: 5px;
}

.el-card {
  overflow: visible; /* 允许内容溢出 */
  background: #fff;
  border: none;
  border-radius: 12px;
}

.content-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-main {
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 24px;
}

.file-icon {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  flex-shrink: 0;
  user-select: none; // 添加禁止选中
}

.file-details {
  display: flex;
  max-width: 160px; /* 添加最大宽度限制 */
  min-width: 0;
  flex-direction: column;
  flex: 1;
}

.file-name {
  width: 100%; /* 确保宽度占满父容器 */
  margin-bottom: 4px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  text-align: left; /* 文本仍然左对齐 */
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  /* 恢复正常文本方向 */
  font-size: 11px;
  color: #90949e;
}

.file-delete-btn {
  position: absolute;
  top: -14px;
  right: -14px;
  display: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.file-delete-btn img {
  width: 100%;
  height: 100%;
}

.el-card:hover .file-delete-btn {
  display: block;
}

.file-info {
  display: none;
}

.file-icon-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  flex-shrink: 0;
}

.file-icon {
  width: 100%;
  height: 100%;
}

.upload-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(0 0 0 / 10%);
  border-radius: 4px;

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgb(9 87 172 / 30%);
    transition: height 0.3s ease;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 12px;
    font-weight: bold;
    color: #0957ac;
    transform: translate(-50%, -50%);
  }
}

.upload-error {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: rgb(245 108 108 / 10%);
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .retry-icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgb(245 108 108 / 20%);
  }
}
</style>
