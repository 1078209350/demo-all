<script setup lang="ts">
import { useStorage } from '@/hooks/web/useStorage'
import { isPC } from '@/utils/source'

if (isPC()) {
  const { clear } = useStorage('localStorage')
  if (!localStorage.getItem('clear_v3')) {
    console.log('will clear localStorage')
    clear()
    localStorage.setItem('clear_v3', 'true')
  } else {
    console.log('had clear localStorage')
  }
}
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-app';

.size {
  width: 100%;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}

.@{prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
</style>
