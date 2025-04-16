import { defineStore } from 'pinia'
import { store } from '../index'
import { SSOLoginResultType } from '@/api/login/types'
import { needSSO } from '@/utils/source'
interface LoginInfo {
  ssoLoginInfo: SSOLoginResultType
}

export const useLoginStore = defineStore('login_v3', {
  state: (): LoginInfo => {
    return {
      ssoLoginInfo: {
        access_token: '',
        expires_in: 0,
        accountId: 0,
        account: '',
        hadDeepSeekPermission: false
      }
    }
  },
  getters: {
    getLoginInfo(): SSOLoginResultType {
      return this.ssoLoginInfo
    },
    getAccountId(): number {
      if (!needSSO()) {
        return 34
      }
      return this.ssoLoginInfo.accountId
    }
  },
  actions: {
    setLoginInfo(loginInfo: SSOLoginResultType) {
      this.ssoLoginInfo.access_token = loginInfo.access_token
      this.ssoLoginInfo.expires_in = loginInfo.expires_in * 1000 + Date.now()
      this.ssoLoginInfo.accountId = loginInfo.accountId
      this.ssoLoginInfo.account = loginInfo.account
      this.ssoLoginInfo.hadDeepSeekPermission = loginInfo.hadDeepSeekPermission || false
    },
    setUserDeepSeekPermission(hadDeepSeekPermission: boolean) {
      this.ssoLoginInfo.hadDeepSeekPermission = hadDeepSeekPermission
    }
  },
  persist: true
})

export const useLoginStoreWithOut = () => {
  return useLoginStore(store)
}
