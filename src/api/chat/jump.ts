import request from '@/axios'

//  通过ID获取跳转地址
export const getJumpUrl = (id: string): Promise<IResponse> => {
  return request.get({ url: `/ai/knowledge/dify/getDifyFileUrl/${id}` })
}
