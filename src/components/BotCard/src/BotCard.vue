<template>
  <div class="feature-card" ref="cardRef">
    <!-- <div class="share-button" @click="clickShare">
      <img class="share-img" src="@/assets/imgs/share.png" alt="share" />
    </div> -->
    <div
      class="content"
      @touchstart="handleMouseDown"
      @touchend="handleMouseUp"
      @touchcancel="handleMouseLeave"
      @click="clickContent"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div v-if="button">{{ button }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps<{
  id: number
  title: string
  description: string
  backgroundImage: string
  model: string
  button: string | null | undefined
}>()

const cardRef = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  (e: 'card-click', id: number): void
  (e: 'card-share-click', id: number): void
}>()

const handleMouseDown = () => {
  if (cardRef.value) {
    cardRef.value.style.transform = 'scale(1.1)'
    cardRef.value.style.boxShadow = '0 8px 16px #a6c6ff40'
  }
}

const handleMouseUp = () => {
  if (cardRef.value) {
    cardRef.value.style.transform = 'scale(1)'
    cardRef.value.style.boxShadow = '0 4px 8px #a6c6ff40'
  }
}

const handleMouseLeave = () => {
  if (cardRef.value) {
    cardRef.value.style.transform = 'scale(1)'
    cardRef.value.style.boxShadow = '0 4px 8px #a6c6ff40'
  }
}
const clickContent = () => {
  emit('card-click', props.id)
}

// const clickShare = () => {
//   emit('card-share-click', props.id)
// }
</script>

<style scoped>
.feature-card {
  position: relative;
  display: flex;
  height: 140px;
  overflow: hidden;
  background-color: transparent;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 4px 8px #a6c6ff40;
  transition:
    -webkit-transform 0.3s ease,
    transform 0.3s ease,
    -webkit-box-shadow 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.5s ease;
}

.opacity-0 {
  opacity: 0;
}

.opacity-1 {
  opacity: 1;
}

.content {
  width: 100%;
  padding: 20px;
  overflow: hidden;
  text-align: left;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}

.share-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-top-right-radius: 20px;
}

.share-img {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 18px;
  height: 18px;
}

.content h3 {
  margin: 0;
  overflow: hidden;
  font-size: 20px;
  font-weight: 500;
  color: #1c4caa;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content p {
  display: -webkit-box;
  margin: 8px 0 0;
  overflow: hidden;
  font-size: 12px;
  font-weight: 400;
  color: #4f74bd;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

.content div {
  display: flex;
  width: fit-content;
  height: 24px;
  max-width: 7em;
  padding: 0 10px;
  margin-top: 5px;
  overflow: hidden;
  font-size: 12px;
  color: white;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #3875c5;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
}
</style>
