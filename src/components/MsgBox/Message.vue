<template>
  <transition name="fade" @after-leave="handleAfterLeave">
    <div v-if="visible" class="message-box">
      <div class="message-content">
        <img src="@/assets/imgs/token_overdue.png" alt="提示图标" class="message-image" />
        <span>登录即将失效</span>
        <strong>{{ countdown }}</strong>
        <span>秒后自动跳转登录页面</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  duration: {
    type: Number,
    default: () => 5000
  }
})
const emit = defineEmits(['close'])

const visible = ref(true)
const countdown = ref(Math.floor(props.duration / 1000))
let timer: number

const handleAfterLeave = () => {
  emit('close')
}

const startCountdown = () => {
  timer = window.setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer)
      visible.value = false
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.message-image {
  width: 16px; /* 根据实际图片尺寸调整 */
  height: 16px;
  margin-right: 10px;
}

.message-box {
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 1000;
  display: flex;
  padding: 10px;
  font-size: 12px;
  color: #777f89;
  background-color: #eef3ff;
  border: 1px solid #1c4caa;
  border-radius: 6px;
  transform: translateX(-50%);
  align-items: center;
}

.message-content {
  display: flex;
  align-items: center;
}

.message-content strong {
  margin: 0 8px;
  font-size: 18px;
  font-weight: 500;
  color: #1c4caa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
