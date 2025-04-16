import { ref, computed } from 'vue'
import {
  pcfMenuConfig,
  coscosMenuConfig,
  isCoscosTestAccount,
  isTestAccount
} from '@/api/menu/menuConfig'
import { useLoginStoreWithOut } from '@/store/modules/login'
import { useUserStoreWithOut, localDataAuthorization } from '@/store/modules/user'

export function useMenu() {
  const loginStore = useLoginStoreWithOut()
  const userStore = useUserStoreWithOut()
  const whaleSelected = ref('ym-product')
  const chatRef = ref()

  // 计算可见的菜单项
  const visibleMenuItems = computed(() => {
    let menuConfig
    if (isCoscosTestAccount()) {
      menuConfig = coscosMenuConfig.items
    } else {
      menuConfig = pcfMenuConfig.items
    }
    const menus = menuConfig.filter((item) => {
      // 权限检查
      if (item.permission && !loginStore.getLoginInfo[item.permission]) {
        return false
      }
      // 测试菜单检查
      if (item.testOnly) {
        if (import.meta.env.VITE_NODE_ENV === 'pro') {
          return false
        }
        const isTestUser = isTestAccount()
        return isTestUser
      }
      return true
    })
    return menus
  })

  // 初始化选中项
  const initSelectedItem = () => {
    // 获取visibleMenuItems中对应的第一个的id
    const firstId = visibleMenuItems.value[0]?.id
    whaleSelected.value = firstId
    // if (loginStore.getLoginInfo.hadDeepSeekPermission) {
    //   whaleSelected.value = 'deepSeek'
    // } else {
    //   whaleSelected.value = 'text'
    // }
  }

  // 切换菜单项
  const changeWhaleItem = async (type: string, isCancel = false) => {
    if (isCancel) return

    // 检查是否正在对话
    if (chatRef.value?.isTalking) return

    // 数据权限检查
    if (type === 'data') {
      if (userStore.dataAuthorization !== localDataAuthorization) {
        return {
          needAuth: true,
          authorization: userStore.dataAuthorization
        }
      }
    }

    if (whaleSelected.value === type) return

    whaleSelected.value = type
    return { needAuth: false }
  }

  return {
    whaleSelected,
    chatRef,
    visibleMenuItems,
    initSelectedItem,
    changeWhaleItem
  }
}
