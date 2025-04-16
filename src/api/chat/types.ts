// 文件相关类型
export type AIFile = {
  type: string
  name: string
  size: number
  id?: string
  status?: 'uploading' | 'success' | 'error'
  percentage?: number
  raw?: File
}

// 聊天相关类型
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
  contentArray?: any
  imgList?: any
  time?: Date
  isItemTalking?: boolean
  chatId?: string
  likeLight?: boolean
  dislikeLight?: boolean
  isDislikeContent?: boolean
  files?: AIFile[]
  previewIndex?: number // 图片预览的index
  collect?: boolean // 收藏
  previewVisible?: boolean // 图片预览组件是否显示
  deepThinkFold?: boolean // 深度思考是否折叠
}

export type ChatRequestConfig = {
  messages: ChatMessage[]
  stream: boolean
  model: string
  userId: string
  temperature: number
  presence_penalty: number
  frequency_penalty: number
  top_p: number
  topicId: string
  env: string
  fileIds: string[]
  conversationId: string
  reasoning: boolean
}

export type ChatResponse = {
  body: ReadableStream<Uint8Array> | null
  status: number
}

export type ChatExtraParams = {
  reasoning?: boolean
  chatType: string
}

// 反馈相关类型
type ShowOption = {
  label: string
  value: object
  checked: boolean
}

export type DislikeContent = {
  greeting: string
  showOption: ShowOption[]
  question: string
}
