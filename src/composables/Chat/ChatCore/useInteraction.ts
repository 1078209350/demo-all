import { ref } from 'vue'
import { saveQuestionPraise, getUpvoteConfig } from '@/api/feedback'
import { ElMessage } from 'element-plus'
import type { DislikeContent } from '@/api/chat/types'

export function useInteraction() {
  const chatIdSelected = ref('')
  const position = ref('')
  const dislikeContent = ref<DislikeContent>({
    greeting: '',
    question: '',
    showOption: []
  })

  const handleLike = async (item: any) => {
    item.likeLight = !item.likeLight
    if (item.likeLight) {
      const res = await saveQuestionPraise('0', item.chatId, [], '')
      if (res.code == 200) {
        ElMessage.success('点赞成功')
        item.dislikeLight = false
      }
    } else {
      await saveQuestionPraise('2', item.chatId, [], '')
      ElMessage.info('已取消')
    }
  }

  const handleDislike = async (item, index, event) => {
    event.stopPropagation()
    console.log('handleDislike index', index)
    const y = event.clientY
    position.value = y < window.innerHeight / 2 ? 'top' : 'bottom'

    item.dislikeLight = !item.dislikeLight
    if (item.dislikeLight) {
      item.isDislikeContent = true
      const res = await getUpvoteConfig()
      // @ts-ignore
      dislikeContent.value = res.data
      chatIdSelected.value = item.chatId
      item.likeLight = false
    } else {
      item.isDislikeContent = false
      await saveQuestionPraise('3', item.chatId, [], '')
      ElMessage.info('已取消')
    }
  }

  return {
    chatIdSelected,
    position,
    dislikeContent,
    handleLike,
    handleDislike
  }
}
