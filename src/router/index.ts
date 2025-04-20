import { useNProgress } from '@/hooks/web/useNProgress'
import { createRouter, createWebHashHistory } from 'vue-router'
import { isMobileOnly } from '@/utils/source'

const { start, done } = useNProgress()

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        isMobileOnly() ? import('@/views/MHome/index.vue') : import('@/views/Home/index.vue')
    },
    {
      path: '/guide',
      name: 'Guide',
      component: () => import('@/views/Chat/index.vue')
    },
    {
      path: '/sso',
      component: () => import('@/views/Login/SSO.vue'),
      name: 'SSOLogin'
    },
    {
      path: '/ticket',
      component: () => import('@/views/Chat/index.vue'),
      name: 'Ticket'
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      name: 'Login'
    }
  ]
})

// router guard
router.beforeEach(async (to, _, next) => {
  start()
  console.log('router beforeEach to.path is ', to.path)
  const enable = sessionStorage.getItem('token')
  if (enable) {
    console.log('已登录... -1')
    if (to.path === '/login') {
      next('/')
    }
    next()
    console.log('已登录... -2')
  } else if (to.path === '/login') {
    console.log('前往登录')
    next()
  } else {
    console.log('未登录.... to.path is ', to.path)
    next(`/login`) // 否则全部重定向到登录页
  }
  console.log('路由检查... -0')
})

router.afterEach(() => {
  done() // 结束Progress
})

export default router
