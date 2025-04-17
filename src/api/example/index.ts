import type { ExampleItems } from './types'
import request from '@/axios'

// 获取事例问题
export const getExampleQuestion = (): Promise<IResponse<ExampleItems>> => {
  return request.get({ url: '/config/getModelSampleProblem' })
}
