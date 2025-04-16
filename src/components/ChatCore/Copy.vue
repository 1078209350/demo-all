<script setup lang="ts">
import { Copy, Loading, CheckOne, CloseOne } from '@icon-park/vue-next'
import type { Theme } from '@icon-park/vue-next/lib/runtime'
import { ref } from 'vue'
import * as clipboard from 'clipboard-polyfill'
import { ElMessage } from 'element-plus'

const props = defineProps<{ content: string }>()
const btnConfig: {
  size: number
  fill: string
  theme: Theme
} = {
  size: 14,
  fill: '#999',
  theme: 'outline'
}
const btnTips = {
  copy: '',
  loading: '',
  success: '',
  error: '复制失败！'
}
const btnStatus = ref<'copy' | 'loading' | 'success' | 'error'>('copy')

const copyToClipboard = async (content: string = props.content) => {
  console.log('正在复制的内容为', navigator.clipboard)
  try {
    // 使用 navigator.clipboard 的代码
    btnStatus.value = 'loading'
    clipboard
      .writeText(content)
      .then(() => setTimeout(() => (btnStatus.value = 'success'), 150))
      .catch(() => (btnStatus.value = 'error'))
      .finally(() => setTimeout(() => (btnStatus.value = 'copy'), 1500))
    console.log('复制成功')
    ElMessage.success('复制成功')
  } catch (error) {
    console.log('复制出错', error)
    ElMessage.error('复制出错')
  } finally {
    btnStatus.value = 'copy'
  }
}
</script>

<template>
  <div class="flex items-center cursor-pointer" @click="copyToClipboard()">
    <copy
      v-show="btnStatus === 'copy'"
      :theme="btnConfig.theme"
      :size="btnConfig.size"
      :fill="btnConfig.fill"
    />
    <loading
      class="rotate"
      v-show="btnStatus === 'loading'"
      :theme="btnConfig.theme"
      :size="btnConfig.size"
      :fill="btnConfig.fill"
    />
    <check-one
      v-show="btnStatus === 'success'"
      :theme="btnConfig.theme"
      :size="btnConfig.size"
      :fill="btnConfig.fill"
    />
    <close-one
      v-show="btnStatus === 'error'"
      :theme="btnConfig.theme"
      :size="btnConfig.size"
      :fill="btnConfig.fill"
    />
    <span class="text-xs ml-0.5 text-gray-500 leading-none">{{ btnTips[btnStatus] }}</span>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: spin 2s linear infinite;
}
</style>
