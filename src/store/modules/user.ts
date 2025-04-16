import { defineStore } from 'pinia'
import { store } from '../index'
import { useChatStoreWithOut } from './chat'

interface ChatInfo {
  // 数据授权
  dataAuthorization: string
  // 文本授权
  textAuthorization: string
}

export const localDataAuthorization = 'jingbaodata@1234!'

const chatStore = useChatStoreWithOut()

export const useUserStore = defineStore('user', {
  state: (): ChatInfo => {
    return {
      // jingbaodata@1234!
      dataAuthorization: '',
      textAuthorization: 'jingbaoai@1234!'
    }
  },
  getters: {
    getDataAuthorization(): string {
      return this.dataAuthorization
    },
    getTextAuthorization(): string {
      return this.textAuthorization
    },
    getCurrentAuthorization(): string {
      if (chatStore.getChatMode == 'jlts-稽核') {
        return this.dataAuthorization
      } else if (chatStore.getChatMode == 'jlts-制度') {
        return this.textAuthorization
      } else {
        return this.textAuthorization
      }
      return ''
    }
  },
  actions: {
    setDataAuthorization(authorization: string) {
      this.dataAuthorization = authorization
    }
  },
  persist: false
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
