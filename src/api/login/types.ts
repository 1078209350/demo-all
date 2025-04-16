export type UserLoginType = {
  username: string
  password: string
}

export type UserType = {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}

export type SSOLoginResultType = {
  access_token: string
  expires_in: number
  accountId: number
  account: string
  hadDeepSeekPermission: boolean
}
