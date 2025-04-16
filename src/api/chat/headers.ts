import { useUserStoreWithOut } from '@/store/modules/user'
import { useChatStoreWithOut } from '@/store/modules/chat'
import { useLoginStoreWithOut } from '@/store/modules/login'
import { needSSO } from '@/utils/source'

const chatStore = useChatStoreWithOut()
const userStore = useUserStoreWithOut()

export const uploadFileUlr = import.meta.env.VITE_API_BASE_URL + '/ai/jlts/v1/bloc/upload'

export const requestHeaders = () => {
  const authorization = 'Bearer nk-' + userStore.getCurrentAuthorization
  const loginStore = useLoginStoreWithOut()
  let accessToken = loginStore.getLoginInfo.access_token || ''
  if (!needSSO()) {
    accessToken = 'magic@1234!'
  }
  return {
    'Content-type': 'application/json',
    Authorization: authorization,
    accept: 'text/event-stream',
    user: chatStore.getUserLocalId,
    'Access-Control-Allow-Origin': '*',
    'Mate-Auth': accessToken,
    token: sessionStorage.getItem('token')
  }
}

export const fileUploadHeaders = () => {
  const authorization = 'Bearer nk-' + userStore.getCurrentAuthorization
  const loginStore = useLoginStoreWithOut()
  let accessToken = loginStore.getLoginInfo.access_token || ''
  if (!needSSO()) {
    accessToken = 'magic@1234!'
  }
  return {
    Authorization: authorization,
    user: chatStore.getUserLocalId,
    'Access-Control-Allow-Origin': '*',
    'Mate-Auth': accessToken
  }
}
