import request from '@/axios'
import { SSOLoginResultType } from './types'

// SSO登录接口 /uua/user/login/ssologin
export const ssoLogin = (code: string): Promise<IResponse<SSOLoginResultType>> => {
  return request.post({ url: '/ai/uua/user/login/ssologin', data: { code, loginType: '1' } })
}

// 更新Token
export const updateToken = (): Promise<IResponse<SSOLoginResultType>> => {
  return request.get({
    url: '/ai/uua/user/login/account/refresh'
  })
}

// 获取验证码接口 /ai/uua/user/login/getMathAuthCode
export const getMathAuthCode = (): Promise<IResponse> => {
  return request.get({ url: '/login/getMathAuthCode' })
}

export const login = (info): Promise<IResponse> => {
  return request.post({ url: '/login/userLogin', data: { ...info } })
}
