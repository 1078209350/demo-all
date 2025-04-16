import type { ExampleItems } from '@/api/example/types'
import request from '@/axios'
import { useChatStoreWithOut } from '@/store/modules/chat'

// 点赞 | 取消点赞 ｜ 点踩 ｜ 取消点踩
export const saveQuestionPraise = (
  type: string,
  chatId: string,
  feedbackOption: any[],
  feedbackContent: string
): Promise<IResponse<ExampleItems>> => {
  return request.post({
    url: `/ai/uua/user/systemConfig/saveQuestionPraise`,
    data: {
      type,
      chatId,
      feedbackOption,
      feedbackContent
    }
  })
}

// 获取点踩配置
export const getUpvoteConfig = (): Promise<IResponse<ExampleItems>> => {
  const type = useChatStoreWithOut().getChatMode
  return request.post({
    url: `/ai/uua/user/systemConfig/getUpvoteConfig`,
    data: {
      modelName: type
    }
  })
}
