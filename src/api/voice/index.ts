import request from '@/axios'
import type { ExampleItems } from './types'

// 后端sha1算法加密
export const getSignature = (str): Promise<IResponse<ExampleItems>> => {
  return request.post({
    url: `/ai/uua/wecom/voice/jsapiSign`,
    data: {
      signText: str
    }
  })
}

// 获取JsapiTicket
export const getJsapiTicket = (): Promise<IResponse<ExampleItems>> => {
  return request.get({ url: '/ai/uua/wecom/voice/getApiTicket' })
}
