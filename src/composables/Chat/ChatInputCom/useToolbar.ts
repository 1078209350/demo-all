import { computed, ref } from 'vue'
import thinkAbleIcon from '@/assets/imgs/tool-think-able-icon.png'
import thinkDisableIcon from '@/assets/imgs/tool-think-disable-icon.png'
import thinkAbleDotIcon from '@/assets/imgs/tool-bt-able-dot.png'
import thinkDisableDotIcon from '@/assets/imgs/tool-bt-disable-dot.png'
import { getStoredThinkingState, setStoredThinkingState } from '@/utils/chatUtils'

export function useToolbar(type: string) {
  // 深度思考选项状态
  const searchTypes = ref<string[]>(getStoredThinkingState(type) ? ['deepSeek'] : [])

  // 是否显示工具栏
  const isShowTool = computed(() => {
    return type === 'text' || type === 'testMenu'
  })

  // 是否显示文件上传
  const showFileUpload = computed(() => type === 'deepSeek' || type === 'testMenu')

  // 思考图标状态
  const thinkIconSrc = computed(() => {
    return searchTypes.value.includes('deepSeek') ? thinkAbleIcon : thinkDisableIcon
  })

  // 思考点图标状态
  const thinkDotIconSrc = computed(() => {
    return searchTypes.value.includes('deepSeek') ? thinkAbleDotIcon : thinkDisableDotIcon
  })

  // 更新深度思考状态
  const updateThinkingState = (newTypes: string[]) => {
    const isDeepThinking = newTypes.includes('deepSeek')
    setStoredThinkingState(type, isDeepThinking)
  }

  return {
    searchTypes,
    isShowTool,
    showFileUpload,
    thinkIconSrc,
    thinkDotIconSrc,
    updateThinkingState
  }
}
