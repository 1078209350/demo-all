<template>
  <div :class="['card-container', props.isAnswerPageCard ? 'height-low' : '']">
    <div class="card-list">
      <transition-group name="card-fade" tag="div" class="card-list-inner">
        <BotCard
          :class="[props.isAnswerPageCard ? 'opacity-0' : 'opacity-1']"
          v-for="card in cards"
          :key="card.id"
          :id="card.id"
          :title="card.modelName"
          :model="card.modelCode"
          :button="card.modelButton"
          :description="card.modelIntroduce"
          :backgroundImage="card.modelBackgroundUrl"
          @card-click="handleCardClick"
          @card-share-click="handleCardShareClick"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BotCard } from '@/components/BotCard'
import type { Card } from '@/api/home/types'
import { defineProps, onMounted, ref } from 'vue'
import { getModelCards } from '@/api/home'
import { useLoginStoreWithOut } from '@/store/modules/login'
import { getDeviceType } from '@/utils/source'

interface Props {
  isAnswerPageCard: boolean
}

const props = defineProps<Props>()
const cards = ref<Card[]>([])

const emit = defineEmits<{
  (e: 'card-click', card: Card | undefined): void
  (e: 'card-share-click', card: Card | undefined): void
  (e: 'update-chat-mode-list', list: Object | undefined): void
}>()

onMounted(() => {
  const loginStore = useLoginStoreWithOut()
  const accountId = loginStore.getAccountId
  const deviceType = getDeviceType()
  getModelCards(accountId, deviceType).then((response) => {
    cards.value = response.data
    emit('update-chat-mode-list', response.data)
  })
})

const handleCardClick = (id: number) => {
  emit('card-click', getCardById(id))
}

const handleCardShareClick = (id: number) => {
  emit('card-share-click', getCardById(id))
}

// 根据id获取Card
const getCardById = (id: number): Card | undefined => {
  return cards.value.find((card) => card.id === id)
}
</script>

<style scoped lang="less">
.card-container {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: calc(100% - 155px);
  padding-bottom: 30px;
  background-color: #dbe7f7;
  background-image: url('@/assets/imgs/m-content-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 8px 20px rgb(0 0 0 / 20%);
  box-sizing: border-box;
  transition: height 0.5s ease;

  .card-list {
    display: grid;
    max-height: calc(100% - 66px);
    padding: 20px 16px 30px;
    overflow-y: auto;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    mask: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
  }

  .card-list-inner {
    display: contents;
  }
}

.height-low {
  height: calc(100% - 40px);
}

.card-fade-enter-active,
.card-fade-leave-active {
  transition: opacity 1.5s ease; // transform 1s ease;;
}

.card-fade-enter-from {
  opacity: 0;
  // transform: translateY(100px);
}

.card-fade-leave-to {
  opacity: 0;
  // transform: translateY(100px);
}
</style>
