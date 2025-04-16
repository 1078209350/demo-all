// 在适当的位置（例如同一个文件或单独的文件）定义该函数
export const getChatMode = (type: string): string => {
  const typeToChatModeMap: { [key: string]: string } = {
    data: 'jlts-稽核',
    text: 'jlts-制度',
    general: 'jlts-2.0',
    public: 'jlts-制度-对公',
    ticket: 'jlts-小E通',
    deepSeek: 'DeepSeek',
    testMenu: 'jlts-制度-test',
    coscosText: 'haifa-ds',
    'ym-product': 'ym-product'
  }

  return typeToChatModeMap[type] || ''
}
