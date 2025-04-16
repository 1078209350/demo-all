<script setup lang="ts">
import { ChatMessage } from '@/api/chat/types'
import userHeader from '@/assets/imgs/user-header.png'
import { formatRelativeTime } from '@/utils/dateUtil'
import FilePreview from '@/components/ChatInputCom/FilePreview.vue'

interface Props {
  message: ChatMessage
}

const formatContent = (content: string) => {
  return content.replace(/\n/g, '<br>')
}

defineProps<Props>()
</script>

<template>
  <div class="question">
    <img class="img-avatar" :src="userHeader" fit="cover" alt="" />
    <div class="question-word">
      <div class="message-header">
        <div class="question-desc" v-html="formatContent(message.content)"></div>
        <span class="question-time">{{ formatRelativeTime(message.time) }}</span>
      </div>
      <div v-if="message.files && message.files.length > 0" class="file-previews">
        <FilePreview
          v-for="(file, index) in message.files"
          :key="index"
          :file="file"
          :readonly="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.question {
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: flex-start;

  .img-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    user-select: none; // 添加禁止选中
  }

  .question-word {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: calc(100% - 36px);

    .message-header {
      display: flex;
      width: 100%;
      padding-left: 20px;
      margin-top: 5px;
      justify-content: space-between;
      align-items: flex-end;
    }

    .question-desc {
      margin-right: 20px;
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.165px;
      color: #484f5f;
      word-break: break-word; // 添加此行以支持长单词换行
      white-space: pre-line; // 添加此行以支持换行
      flex: 1;
    }

    .question-time {
      margin-right: 22px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.165px;
      color: #90949e;
      flex-shrink: 0;
    }

    .file-previews {
      display: flex;
      padding: 8px 0;
      margin-left: 20px;
      overflow-x: auto;
      white-space: nowrap;
      flex-flow: row nowrap;
      gap: 8px;
    }
  }
}
</style>
