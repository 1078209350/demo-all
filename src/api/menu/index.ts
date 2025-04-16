import request from '@/axios'

//  获取 DeepSeek 菜单权限 /uua/user/login/dsPrivilege
export const getDeepSeekMenuPermission = (account: string): Promise<IResponse> => {
  return request.post({ url: '/ai/uua/user/login/dsPrivilege', data: { account } })
}
