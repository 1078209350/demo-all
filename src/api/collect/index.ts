import request from '@/axios'
import type { CollectItems } from './types'

// 收藏列表
export const queryCollect = (isAnswerPage, type): Promise<IResponse<CollectItems[]>> => {
  return request.post({
    url: '/ai/uua/user/collect/queryCollect',
    data: {
      modelCode: isAnswerPage ? type : null
    }
  })
}

// 删除/取消收藏 添加收藏
export const collectOperation = (collectInfo, hasCollect, type): Promise<IResponse<string>> => {
  const path = hasCollect ? 'delCollect' : 'addCollect'
  return request.post({
    url: `/ai/uua/user/collect/${path}`,
    data: {
      ...collectInfo,
      modelCode: type
    }
  })
}
