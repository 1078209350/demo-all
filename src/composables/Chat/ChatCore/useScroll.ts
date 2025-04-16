import { ref } from 'vue'
import { nextTick } from 'vue'

export function useScroll() {
  const containerRef = ref<HTMLElement | null>(null)
  const lastScrollTop = ref(0)
  const scrollDirection = ref('')
  const isUserScrolling = ref(false)
  const shouldAutoScroll = ref(true)
  const lastUserInteraction = ref(0)

  const handleScroll = () => {
    if (!containerRef.value) return

    const currentScrollTop = containerRef.value.scrollTop
    const maxScroll = containerRef.value.scrollHeight - containerRef.value.clientHeight

    scrollDirection.value = currentScrollTop > lastScrollTop.value ? 'down' : 'up'

    const now = Date.now()
    if (now - lastUserInteraction.value > 100) {
      isUserScrolling.value = true
    }

    shouldAutoScroll.value = maxScroll - currentScrollTop < 10
    lastScrollTop.value = currentScrollTop <= 0 ? 0 : currentScrollTop
  }

  const scrollToBottom = async (force = false) => {
    await nextTick()
    if (!containerRef.value || (!force && !shouldAutoScroll.value)) return

    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }

  const initScrollListeners = () => {
    if (!containerRef.value) return

    containerRef.value.addEventListener('scroll', handleScroll)
    containerRef.value.addEventListener('mousewheel', () => {
      lastUserInteraction.value = Date.now()
    })
    containerRef.value.addEventListener('touchmove', () => {
      lastUserInteraction.value = Date.now()
    })
  }

  return {
    containerRef,
    scrollDirection,
    isUserScrolling,
    shouldAutoScroll,
    scrollToBottom,
    initScrollListeners
  }
}
