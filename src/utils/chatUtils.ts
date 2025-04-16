// 添加获取存储的深度思考状态方法
export const getStoredThinkingState = (type: string): boolean => {
  const key = `deepThinking_${type}`
  const stored = sessionStorage.getItem(key)
  return stored ? JSON.parse(stored) : false
}

// 添加设置存储的深度思考状态方法
export const setStoredThinkingState = (type: string, value: boolean) => {
  const key = `deepThinking_${type}`
  sessionStorage.setItem(key, JSON.stringify(value))
}
