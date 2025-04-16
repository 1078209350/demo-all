import { defineStore } from 'pinia'
import { store } from '../index'
import { ChatMessage } from '@/api/chat/types'
import { uuid } from '@/utils'
import { isNeedHistory } from '@/utils/source'

interface ChatInfo {
  chatMode: string
  chatType: string
  chatHistorySwitch: boolean
  chatTopicIds: Map<string, string>
  userLocalId: string
}

export const useChatStore = defineStore('chat', {
  state: (): ChatInfo => {
    return {
      chatMode: 'jlts-制度',
      chatType: 'text',
      chatHistorySwitch: false,
      chatTopicIds: new Map<string, string>(),
      userLocalId: ''
    }
  },
  getters: {
    getChatMode(): string {
      return this.chatMode
    },
    getChatType(): string {
      return this.chatType
    },
    getChatTopicId(): string {
      if (this.chatTopicIds[this.chatMode]) {
        return this.chatTopicIds[this.chatMode]
      } else {
        const topicId = uuid()
        this.chatTopicIds[this.chatMode] = topicId
      }
      return this.chatTopicIds[this.chatMode]
    },
    getChatHistorySwitch(): boolean {
      return this.chatHistorySwitch
    },
    getChatTopicIds(): Map<string, string> {
      return this.chatTopicIds
    },
    getUserLocalId(): string {
      if (!this.userLocalId) {
        this.userLocalId = uuid()
      }
      return this.userLocalId
    }
  },
  actions: {
    setChatList(type: string, list: ChatMessage[]) {
      if (isNeedHistory()) {
        this.persistChatList(type, list)
      }
    },
    readChatList(): ChatMessage[] {
      const listStr = sessionStorage.getItem(`chatList_${this.chatType}`)
      if (listStr) {
        return JSON.parse(listStr)
      } else {
        return []
      }
    },
    persistChatList(type: string, list: ChatMessage[]) {
      // 持久化逻辑
      sessionStorage.setItem(`chatList_${type}`, JSON.stringify(list))
    },
    setChatMode(mode: string) {
      this.chatMode = mode
    },
    resetChatList() {
      this.chatTopicIds = new Map()
      this.chatMode = 'jlts-制度'
    },
    toggleChatHistorySwitch() {
      this.chatHistorySwitch = !this.chatHistorySwitch
      if (!this.chatHistorySwitch) {
        this.clearChatHistory()
      }
    },
    clearChatHistory() {
      sessionStorage.removeItem(`chatList_${this.chatType}`)
    },
    setDeepThink(flag: boolean | undefined) {
      console.log('setDeepThink ----', JSON.stringify(flag))
      sessionStorage.setItem(`deepThink_${this.chatMode}`, JSON.stringify(flag))
    }
  },
  persist: true
})

export const useChatStoreWithOut = () => {
  return useChatStore(store)
}
