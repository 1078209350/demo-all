<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ssoLogin } from '@/api/login/index'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { ref, unref, watch } from 'vue'
import { updateLoginInfo } from '@/utils/utils'

const { push, currentRoute } = useRouter()

const { query } = unref(currentRoute)

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

const initToken = (code: string) => {
  ssoLogin(code)
    .then((res: any) => {
      if (res.code === 200) {
        if (res.data.access_token) {
          updateLoginInfo(res.data, true)
          loginLogic()
        } else {
          console.log('SSO error - 0')
          errorProcess()
        }
      } else {
        console.log('SSO error - 1')
        errorProcess()
      }
    })
    .catch((err) => {
      console.log('SSO Catch error', err)
      errorProcess()
    })
}

const errorProcess = () => {
  console.log('SSO errorProcess')
  loginLogic(true)
}

const loginLogic = async (isError: boolean = false) => {
  console.log('SSO loginLogic', isError)
  push({ path: '/' })
}

const getCode = () => {
  const code = query.code as string
  console.log('SSO code', code)
  if (!code || code === '') {
    console.log('SSO code 不存在')
    const ssoWholeUrl = getSSOWholeUrl(window.location.href)
    console.log('ssoWholeUrl is', ssoWholeUrl)
    window.location.href = ssoWholeUrl
  } else {
    initToken(code)
  }
}

const getSSOWholeUrl = (redirectUri: string) => {
  const encodeUrl = encodeURIComponent(redirectUri)
  const SSO_PATH_URL = import.meta.env.VITE_APP_SSO_BASE_URL
  return `${SSO_PATH_URL}&redirect_uri=${encodeUrl}`
}

getCode()
</script>

<template>
  <div class="app-loading">
    <div class="app-loading-title">
      <img src="/logo.png" class="app-loading-logo" alt="Logo" />
    </div>
    <div class="app-loading-item">
      <div class="app-loading-outter"></div>
      <div class="app-loading-inner"></div>
    </div>
  </div>
</template>

<style scoped>
.app-loading {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f0f2f5;
}

.app-loading .app-loading-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate3d(-50%, -50%, 0);
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.app-loading .app-loading-title {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.app-loading .app-loading-logo {
  width: 100px;
  margin: 0 auto 15px;
}

.app-loading .app-loading-item {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;
  vertical-align: middle;
  border-radius: 50%;
}

.app-loading .app-loading-outter {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #2d8cf0;
  border-bottom: 0;
  border-left-color: transparent;
  border-radius: 50%;
  animation: loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
}

.app-loading .app-loading-inner {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border: 4px solid #87bdff;
  border-right: 0;
  border-top-color: transparent;
  border-radius: 50%;
  animation: loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
}

@keyframes loader-outter {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-outter {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

@keyframes loader-inner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
