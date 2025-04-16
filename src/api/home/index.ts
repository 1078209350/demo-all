import request from '@/axios'
import type { Card } from './types'

// 获取banner信息
export const getBannerInfo = () => {
  return request.get({
    url: `/ai/uua/user/carousel/query`
  })
}

// 获取模型卡片
export const getModelCards = (accountId: number, type: string): Promise<IResponse<Card[]>> => {
  return request.get({
    url: '/ai/uua/user/model/queryModelInfo/' + type + '/' + accountId
  })
}

// 获取引导问题
export const getExampleQuestion = (id) => {
  return request.get({
    url: `/ai/uua/user/model/queryModelProblem/${id}`
  })
}

// 获取模型配置
export const getModelList = () => {
  return request.get({
    url: `/config/getModelConfig/test`
  })
}
