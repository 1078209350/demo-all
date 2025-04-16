import { updateToken } from '@/api/login'
import { getDeepSeekMenuPermission } from '@/api/menu'
import { useLoginStoreWithOut } from '@/store/modules/login'
import useMessage from '@/composables/Home/MsgBox/useMessage'
import { useStorage } from '@/hooks/web/useStorage'
import { needSSO } from '@/utils/source'

let refreshTokenLock = false

export const noRefreshAbleUrls = [
  '/ai/uua/user/login/account/refresh',
  '/ai/uua/user/login/ssologin',
  '/ai/uua/user/login/dsPrivilege',
  '/ai/uua/user/login/sdk'
]

export const delay = async (time) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
export const tripartitePlatformLogin = (query: any) => {
  try {
    const loginStore = useLoginStoreWithOut()
    console.log('tripartitePlatformLogin query', query)
    const token = loginStore.getLoginInfo.access_token
    console.log('路由检查 token', token)
    const expires = loginStore.getLoginInfo.expires_in
    console.log('路由检查 expiresIn', expires)
    const time = (expires - Date.now()) / 1000
    console.log('路由检查 time', time)
    const enable = checkTokenValidity(token, time)
    if (enable && time <= 5) {
      return false
    }
    console.log('路由检查 enable', enable)
    return enable
  } catch (err) {
    return false
  }
}

export const getDeepSeekPermission = async () => {
  const loginStore = useLoginStoreWithOut()
  try {
    const account = loginStore.getLoginInfo.account
    if (account == null || account == '') {
      loginStore.setUserDeepSeekPermission(false)
      return false
    }
    const result = await getDeepSeekMenuPermission(account)
    if (result && result.code && result.code == 200) {
      if (typeof result.data === 'boolean') {
        loginStore.setUserDeepSeekPermission(result.data)
        return result.data
      }
    }
    loginStore.setUserDeepSeekPermission(false)
    return false
  } catch (error) {
    console.error('getDeepSeekPermission error:', error)
    loginStore.setUserDeepSeekPermission(false)
    return false
  }
}

export const checkNeedRefreshToken = (needShowMsg: boolean = false): boolean => {
  const loginStore = useLoginStoreWithOut()
  const token = loginStore.getLoginInfo.access_token
  const expires = loginStore.getLoginInfo.expires_in
  const time = (expires - Date.now()) / 1000
  // token可用
  if (checkTokenValidity(token, time)) {
    // 5s < 过期时间 < 15min  -> 刷新token
    if (time > 5 && time < 900) {
      return true
    } else if (time > 0 && time <= 5 && needShowMsg) {
      handleLoginExpired(true)
    } else if (time <= 0) {
      handleLoginExpired()
    }
  }
  return false
}

export const checkTokenValidity = (token: string, time: number): boolean => {
  if (token === null || token === undefined || token == '' || time == null || time === undefined) {
    return false
  }
  return true
}

// 刷新token
export const refreshTokenLogic = async (needGetDeepSeekPermission: boolean = false) => {
  if (!needSSO()) return
  console.log('refreshTokenLogic')
  const needRefresh = checkNeedRefreshToken(true)
  if (!needRefresh || refreshTokenLock) {
    console.log('refreshTokenLogic end with not refresh')
    if (needGetDeepSeekPermission) {
      await getDeepSeekPermission()
    }
    return
  }
  refreshTokenLock = true
  console.log('refreshTokenLogic begin refresh')
  try {
    const result = await updateToken()
    if (result && result.code && result.code == 200) {
      console.log('refreshTokenLogic success refresh')
      const loginStore = useLoginStoreWithOut()
      loginStore.setLoginInfo(result.data)
      if (needGetDeepSeekPermission) {
        await getDeepSeekPermission()
      }
    } else {
      console.log('refreshTokenLogic error refresh with code:', result.code)
    }
  } catch (error) {
    console.error('refreshTokenLogic error refresh with exception:', error)
  } finally {
    refreshTokenLock = false
    console.log('refreshTokenLogic finally refresh')
  }
}

export const updateLoginInfo = async (
  loginInfo: any,
  needGetDeepSeekPermission: boolean = false
) => {
  const loginStore = useLoginStoreWithOut()
  loginStore.setLoginInfo(loginInfo)
  const info = loginStore.getLoginInfo
  console.log('updateLoginInfo', info.access_token)
  if (needGetDeepSeekPermission) {
    await getDeepSeekPermission()
  }
}

// 登录过期处理
const { showMessage } = useMessage()
const { clear } = useStorage('localStorage')
export const handleLoginExpired = (isShowMessage: boolean = false) => {
  if (isShowMessage) {
    showMessage({
      duration: 5000,
      onClose: () => {
        clear()
        window.location.href = '/pcf-ai-bot/#/sso'
      }
    })
  } else {
    clear()
    window.location.href = '/pcf-ai-bot/#/sso'
  }
}
// 生成字母数字随机数字符串
export const getRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
