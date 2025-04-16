import { useLoginStoreWithOut } from '@/store/modules/login'
import service from './service'
import { CONTENT_TYPE } from '@/constants'
import { needSSO } from '@/utils/source'

const request = (option: AxiosConfig) => {
  const { url, method, params, data, headers, responseType } = option
  const loginStore = useLoginStoreWithOut()
  let accessToken = loginStore.getLoginInfo.access_token || ''
  if (!needSSO()) {
    accessToken = 'magic@1234!'
  }

  return service.request({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': CONTENT_TYPE,
      'Mate-Auth': accessToken,
      ...headers
    }
  })
}

export default {
  get: <T = any>(option: AxiosConfig) => {
    return request({ method: 'get', ...option }) as Promise<IResponse<T>>
  },
  post: <T = any>(option: AxiosConfig) => {
    return request({ method: 'post', ...option }) as Promise<IResponse<T>>
  },
  delete: <T = any>(option: AxiosConfig) => {
    return request({ method: 'delete', ...option }) as Promise<IResponse<T>>
  },
  put: <T = any>(option: AxiosConfig) => {
    return request({ method: 'put', ...option }) as Promise<IResponse<T>>
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url)
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest()
  }
}
