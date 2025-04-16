import { ref, Ref } from 'vue'
import { getExampleQuestion } from '@/api/example/index'

interface IntroContent {
  greeting: string
  introduction: {
    prefix: string
    suffix: string
    showIcon?: boolean
  }
  tips: {
    title: string
    items: string[]
  }
}

export interface exQuestion {
  type: string
  desc: string
}

export const usePageData = (type: string) => {
  const titleTip = ref('')
  const bottomTip = ref('')
  const introContent = ref<IntroContent>({
    greeting: '你好吖~',
    introduction: {
      prefix: '',
      suffix: '',
      showIcon: false
    },
    tips: {
      title: '友情提示：',
      items: []
    }
  })
  const dataList = ref<exQuestion[]>([])
  const textList = ref<exQuestion[]>([])
  const publicList = ref<exQuestion[]>([])
  const ticketList = ref<exQuestion[]>([])

  const fetchData = async () => {
    try {
      const res = await getExampleQuestion()
      const exampleItems = res.data

      const processData = (items: any[], typeStr: string, list: Ref<exQuestion[]>) => {
        if (items && Array.isArray(items)) {
          list.value = items.slice(0, 3).map((item: string) => ({
            type: `鲸宝·${typeStr}`,
            desc: item
          }))
        } else {
          console.warn(`exampleItems.${typeStr} is undefined or not an array`)
        }
      }

      processData(exampleItems.data || [], '数据', dataList)
      processData(exampleItems.text || [], '文本', textList)
      processData(exampleItems.public || [], '对公', publicList)
      processData(exampleItems.ticket || [], '工单', ticketList)
    } catch (e) {
      console.log(e)
      // 示例问题兜底
      const defaultData: exQuestion[] = [
        {
          type: '鲸宝·数据',
          desc: '请帮我导出2023年10月1号到2024年4月30号公司全员不同开票方10以内连号的发票'
        },
        {
          type: '鲸宝·数据',
          desc: '请帮我导出2023年10月1号到2024年4月30号公司全员的发票抬头与拜访地不一致的信息'
        },
        {
          type: '鲸宝·数据',
          desc: '请帮我导出2023年10月1号到2024年4月30号公司全员的发票抬头与打卡地不一致的信息'
        }
      ]
      const defaultText: exQuestion[] = [
        {
          type: '鲸宝·文本',
          desc: '《中国共产党纪律处分条例》适用于哪些对象？'
        },
        {
          type: '鲸宝·文本',
          desc: '什么是直接责任者和领导责任者？'
        },
        {
          type: '鲸宝·文本',
          desc: '违反政治纪律的行为有哪些？'
        }
      ]
      const defaultPublic: exQuestion[] = [
        {
          type: '鲸宝·对公',
          desc: '债项转让明细表中需要填写哪些信息要素？'
        },
        {
          type: '鲸宝·对公',
          desc: '售后回租照片（场地照、铭牌照），能否租后提供？'
        },
        {
          type: '鲸宝·对公',
          desc: '如何判断保理基础交易合同中债项是否过期，如果债项过期怎么办？'
        }
      ]
      const defaultTicket: exQuestion[] = [
        {
          type: '鲸宝·工单',
          desc: '债项转让明细表中需要填写哪些信息要素？'
        },
        {
          type: '鲸宝·工单',
          desc: '售后回租照片（场地照、铭牌照），能否租后提供？'
        },
        {
          type: '鲸宝·工单',
          desc: '如何判断保理基础交易合同中债项是否过期，如果债项过期怎么办？'
        }
      ]

      dataList.value = defaultData
      textList.value = defaultText
      publicList.value = defaultPublic
      ticketList.value = defaultTicket
    }
  }

  const setTitleTip = () => {
    switch (type) {
      case 'deepSeek':
        titleTip.value = '我可以帮你读文件、写作、写代码...数据安全有保障，请放心的把任务交给我吧~'
        break
      case 'data':
        titleTip.value = '我可以帮助你更高效地获取和分析数据，欢迎随时提问~'
        break
      case 'text':
        titleTip.value =
          '我正在努力学习中，**现已完成DeepSeek智能升级**，可以帮助你更好地理解和遵守公司的各项规定，同时也为你在工作中遇到的任何疑问提供及时的支持。期待您的提问~'
        break
      case 'public':
        titleTip.value =
          '我正在努力学习中，现在我可以帮助您解答与公司对公方向相关的问题，欢迎随时提问~'
        break
      case 'ticket':
        titleTip.value =
          '我正在努力学习中，现在我可以帮助您解答与公司对公方向相关的问题，欢迎随时提问~'
        break
      default:
        titleTip.value = ''
        break
    }
  }

  const setIntroContent = () => {
    switch (type) {
      case 'deepSeek':
        introContent.value.introduction = {
          prefix: '欢迎使用',
          suffix: 'DeepSeek深度思考版！',
          showIcon: true
        }
        introContent.value.tips.items = []
        break
      case 'text':
        introContent.value.introduction = {
          prefix: '欢迎使用',
          suffix: 'DeepSeek制度问答版！',
          showIcon: true
        }
        introContent.value.tips.items = [
          '擅长中文，也会英文，其他语言正在学习；',
          '请注意互动用语，我可能无法回答不合适的问题；',
          '我正在持续学习成长中，希望获得你的反馈，这将有利于我变得更好。'
        ]
        break
      case 'data':
        introContent.value.introduction = {
          prefix: '我是你的AI伙伴！请多关照',
          suffix: '!',
          showIcon: false
        }
        introContent.value.tips.items = [
          '结合设定的稽核规则，我目前可以做到对部分异常报销行为的监控；',
          '搜索时间自2023年12月之后我的回答会更准确哦~',
          '我正在持续学习成长中，期待与你一起探索数据的无限可能！'
        ]
        break
      case 'coscosText':
        introContent.value.introduction = {
          prefix: '我是产融平台规章制度AI助手',
          suffix: '!',
          showIcon: false
        }
        introContent.value.tips.items = [
          '擅长中文，也会英文，其他语言正在学习；',
          '请注意互动用语，我可能无法回答不合适的问题；',
          '我正在持续学习成长中，希望获得你的反馈，这将有利于我变得更好。'
        ]
        break
      default:
        introContent.value.introduction = {
          prefix: '我是你的AI伙伴！请多关照',
          suffix: '!',
          showIcon: false
        }
        introContent.value.tips.items = [
          '擅长中文，也会英文，其他语言正在学习；',
          '请注意互动用语，我可能无法回答不合适的问题；',
          '我正在持续学习成长中，希望获得你的反馈，这将有利于我变得更好。'
        ]
    }
  }

  const setBottomTip = () => {
    switch (type) {
      case 'deepSeek':
        bottomTip.value = '所有内容均由AI生成仅供参考，联网搜索还在学习中，敬请期待'
        break
      default:
        bottomTip.value = '所有内容均由AI生成仅供参考'
        break
    }
  }

  return {
    titleTip,
    bottomTip,
    dataList,
    textList,
    publicList,
    ticketList,
    fetchData,
    setTitleTip,
    setBottomTip,
    introContent,
    setIntroContent
  }
}
