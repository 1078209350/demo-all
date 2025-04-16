import { createApp, h, App } from 'vue'
import Message from '@/components/MsgBox/Message.vue'

interface MessageOptions {
  duration?: number
  onClose?: () => void
}

let instance: App<Element> | null = null
let container: HTMLDivElement | null = null

const useMessage = () => {
  const showMessage = (options: MessageOptions = {}) => {
    if (instance) {
      // 如果弹框已经存在，直接返回，不创建新的弹框
      return
    }

    const { duration = 5000, onClose } = options
    container = document.createElement('div')
    document.body.appendChild(container)

    instance = createApp({
      render() {
        return h(Message, {
          duration,
          onClose: () => {
            if (onClose) {
              onClose()
            }
            if (instance && container) {
              instance.unmount()
              document.body.removeChild(container)
              instance = null
              container = null
            }
          }
        })
      }
    })

    instance.mount(container)

    setTimeout(() => {
      if (instance && container) {
        instance.unmount()
        document.body.removeChild(container)
        instance = null
        container = null
        if (onClose) {
          onClose()
        }
      }
    }, duration + 500) // Duration + fade out transition time
  }

  return {
    showMessage
  }
}

export default useMessage
