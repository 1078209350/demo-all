<template>
  <div class="login-container">
    <!-- 登录表单主体 -->
    <ElForm
      ref="loginForm"
      :model="formData"
      :rules="formRules"
      class="login-form"
      @submit.prevent="handleLogin"
    >
      <h2 class="title">欢迎登录</h2>

      <!-- 用户名输入 -->
      <ElFormItem prop="account">
        <ElInput v-model="formData.account" placeholder="用户名" prefix-icon="User" size="large" />
      </ElFormItem>

      <!-- 密码输入 -->
      <ElFormItem prop="pwd">
        <ElInput
          v-model="formData.pwd"
          type="password"
          placeholder="密码"
          prefix-icon="Lock"
          show-password
          size="large"
        />
      </ElFormItem>

      <!-- 验证码计算 -->
      <ElFormItem prop="captcha">
        <ElInput v-model="formData.captcha" placeholder="请输入计算结果 例：4+0=？" size="large">
          <template #prepend>
            <img :src="captcha" alt="验证码" @click="refreshCaptchaKey" />
          </template>
        </ElInput>
      </ElFormItem>

      <!-- 记住密码和登录操作 -->
      <div class="form-footer">
        <ElCheckbox v-model="rememberPassword">记住密码</ElCheckbox>
        <ElButton
          :loading="btnLoading"
          native-type="submit"
          type="primary"
          size="large"
          class="login-btn"
        >
          登录
        </ElButton>
      </div>
    </ElForm>

    <!-- 背景装饰元素 -->
    <div class="decorations">
      <div class="light-effect"></div>
      <div class="geometric-pattern"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElForm, ElFormItem, ElButton, ElInput, ElCheckbox, ElMessage } from 'element-plus'
import { getMathAuthCode, login } from '@/api/login'
import { defaultCaptcha } from './data'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'

const { push } = useRouter()

// 表单数据
const formData = reactive({
  account: '',
  pwd: localStorage.getItem('pwd'),
  captcha: ''
})
const loginForm = ref(null)
const captcha = ref(defaultCaptcha.code.src)
const captchaKey = ref('')
const btnLoading = ref(false)

onMounted(() => {
  refreshCaptchaKey()
})

// 请求验证码
const refreshCaptchaKey = async () => {
  try {
    const res = await getMathAuthCode()
    console.log(res)
    if (res.code === 2000) {
      captcha.value = res.data.imageBase64
      captchaKey.value = res.data.resultTest
    }
  } catch (error) {
    console.log(`refreshCaptchaKey error ${error}`)
  }
}

// 表单验证规则
const formRules = reactive({
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 记住密码状态
const rememberPassword = ref(false)

// 登录处理
const handleLogin = async () => {
  btnLoading.value = true
  await loginForm.value.validate()
  // 进行md5加密
  formData.accountPwd = md5(`ym${formData.pwd}`)
  const res = await login(formData)
  if (res?.code === 2000) {
    btnLoading.value = false
    // 存储token到session
    sessionStorage.setItem('token', res.data.token)
    if (rememberPassword.value) {
      localStorage.setItem('pwd', formData.pwd)
    }
    ElMessage.success('登录成功！')
    push({ path: '/' })
  } else {
    btnLoading.value = false
  }
}
</script>

<style scoped lang="less">
.login-container {
  min-height: 100vh;
  background-image: url('@/assets/imgs/loginBackground.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  // 科技感光效
  .light-effect {
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    animation: lightFlow 15s linear infinite;
  }

  .login-form {
    width: 420px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);

    .title {
      text-align: center;
      color: #1a73e8;
      margin-bottom: 32px;
      font-size: 28px;
      font-weight: 600;
    }

    .captcha-label {
      color: #666;
      font-size: 14px;
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
    }

    .login-btn {
      width: 120px;
      background: linear-gradient(45deg, #1a73e8, #0d47a1);
      border: none;
      letter-spacing: 2px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
      }
    }
  }
}

@keyframes lightFlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

:deep(.el-input-group__prepend) {
  border: 1px solid #dddfe5;
  padding: 0;
}
</style>
