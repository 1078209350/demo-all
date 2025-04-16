import deepSeekIcon from '@/assets/imgs/whale-deepSeek.png'
import textIcon from '@/assets/imgs/whale-text-ds.png'
// import dataIcon from '@/assets/imgs/whale-data.png'
// import publicIcon from '@/assets/imgs/whale-public.png'
import { useLoginStoreWithOut } from '@/store/modules/login'

export const pcfMenuConfig = {
  items: [
    {
      id: 'ym-product',
      name: 'DeepSeek',
      icon: deepSeekIcon,
      type: 'ym-product',
      permission: 'hadDeepSeekPermission',
      component: 'chat'
    }
    // {
    //   id: 'text',
    //   name: '制度问答',
    //   icon: textIcon,
    //   type: 'text',
    //   component: 'chat'
    // },
    // {
    //   id: 'data',
    //   name: '数据分析',
    //   icon: dataIcon,
    //   type: 'data',
    //   component: 'chat'
    // },
    // {
    //   id: 'public',
    //   name: '公共服务',
    //   icon: publicIcon,
    //   type: 'public',
    //   component: 'chat'
    // },
    // {
    //   id: 'coscosText',
    //   name: '海发制度菜单',
    //   icon: deepSeekIcon,
    //   type: 'coscosText',
    //   testOnly: true,
    //   component: 'chat'
    // }
  ]
}

export const coscosMenuConfig = {
  items: [
    {
      id: 'coscosText',
      name: '海发制度菜单',
      icon: textIcon,
      type: 'coscosText',
      testOnly: false,
      component: 'chat'
    }
  ]
}

// 根据type判断是否展示QuestionSection组件
export function isShowQuestionSection(type: string) {
  return type != 'deepSeek' && type != 'testMenu'
}

const loginStore = useLoginStoreWithOut()
const TEST_ACCOUNTS = ['lijiaming'] as const
const COS_TEST_ACCOUNTS = ['cheny'] as const
export const isCoscosTestAccount = (): boolean => {
  return COS_TEST_ACCOUNTS.includes(
    loginStore.getLoginInfo.account as (typeof COS_TEST_ACCOUNTS)[number]
  )
}

export const isTestAccount = (): boolean => {
  return TEST_ACCOUNTS.includes(loginStore.getLoginInfo.account as (typeof TEST_ACCOUNTS)[number])
}
