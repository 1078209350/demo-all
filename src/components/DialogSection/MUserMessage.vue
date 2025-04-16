<script setup lang="ts">
import { ChatMessage } from '@/api/chat/types'
import { defineProps } from 'vue'
import { ElMessage, ElDivider } from 'element-plus'
import { collectOperation } from '@/api/collect/index'
import { useStorage } from '@/hooks/web/useStorage'
import collect from '@/assets/imgs/collect-question.png'
import collectSuccess from '@/assets/imgs/collect-success.png'

interface Props {
  chatModel: string
  item: ChatMessage
  index: number
  messageList: ChatMessage[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update-history', 'show-collect-guide'])

// 收藏
const handleCollect = async (item, index, isAdd?: boolean) => {
  if (props.messageList.length > index + 1) {
    item.chatId = props.messageList[index + 1].chatId
  }
  item.collectText = item.content
  const record = isAdd !== undefined && isAdd !== null // 为了更新chatId
  const collect = record ? isAdd : item.collect
  const res = await collectOperation(item, collect, props.chatModel)
  if (record) {
    return
  }
  if (res.code == 200) {
    item.collect = !item.collect
    const container = document.querySelector('#home-container')
    ElMessage({
      message: res.data,
      type: item.collect ? 'success' : 'info',
      appendTo: container instanceof HTMLElement ? container : undefined
    })
    if (item.collect) {
      handleFirstCollect()
    }
  }
  emit('update-history')
}

// 首次收藏弹气泡
const handleFirstCollect = () => {
  const storage = useStorage('localStorage')
  const collectGuided = storage.getStorage('AI_Collect_Guide')
  if (!collectGuided) {
    emit('show-collect-guide')
    storage.setStorage('AI_Collect_Guide', true)
  }
}

const formatContent = (content: string) => {
  return content.replace(/\n/g, '<br>')
}
</script>

<template>
  <div class="question" v-if="item.role == 'user'">
    <div class="question-desc" @mousedown.stop>
      <span v-html="formatContent(item.content)"></span>
      <el-divider />
      <div class="question-img" @click="handleCollect(item, index)">
        <img
          @dragstart="(e) => e.preventDefault()"
          :src="item.collect ? collectSuccess : collect"
          fit="cover"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.question {
  position: relative;
  z-index: 6;
  margin-top: 20px;
  text-align: right;

  .question-desc {
    display: inline-block;
    max-width: 100%;
    padding: 10px 15px;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.5em;
    color: #fff;
    text-align: left;
    word-break: break-word; // 添加此行以支持长单词换行
    word-wrap: break-word;
    white-space: pre-line; // 添加此行以支持换行
    background: #3875c5;
    border-radius: 10px 10px 0;
    box-shadow: 0 4px 4px rgb(0 0 0 / 5%);
    box-sizing: border-box;

    .question-img {
      height: 18px;

      img {
        width: 18px;
        height: 18px;
      }
    }

    :deep(.el-divider--horizontal) {
      margin: 10px 0 5px;
      opacity: 0.2;
    }
  }
}
</style>
