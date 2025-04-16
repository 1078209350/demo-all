<script setup lang="ts">
import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue'
import close from '@/assets/imgs/close-gray.png'
import noCollect from '@/assets/imgs/no-collect.png'
import { ElDrawer, ElMessage } from 'element-plus'
import { SwipeCell, Loading } from 'vant'
import { queryCollect, collectOperation } from '@/api/collect'

const emit = defineEmits(['update-collect-visible', 'update-chat', 'navigate-to-chat'])

interface Props {
  collectVisible: boolean
  isAnswerPage: boolean
  chatModel: string
}

interface CollectItem {
  collectText?: string
  chatId?: string
  id?: string
}

const props = defineProps<Props>()
let saveMinHeight = 300
let collectListTimer
let deleteItem: CollectItem // 删除当前item
const localCollectVisible = ref(props.collectVisible) // 收藏显隐
const deleteStyle = ref({
  paddingLeft: '18px',
  paddingRight: '0px'
}) // 删除样式
const minHeight = ref('300px') // 最小高度
const loading = ref(false) // 加载中
const collectList = ref<CollectItem[]>([]) // 收藏列表

watch(
  () => props.collectVisible,
  (newVal) => {
    if (newVal) {
      minHeight.value = `${saveMinHeight}px`
      getCollectList()
    }
    localCollectVisible.value = newVal
  }
)

onMounted(() => {
  initCollectPadding()
})

// 删除间距
const initCollectPadding = () => {
  if (window.innerWidth) {
    const padding = (window.innerWidth / 2 - 14) / 2
    if (padding < 18) {
      return
    }
    deleteStyle.value = {
      paddingLeft: `${padding}px`,
      paddingRight: `${padding - 18}px`
    }
  }

  if (window.innerHeight) {
    const compareMinHeight = Math.max(300, window.innerHeight * 0.7 - 50)
    saveMinHeight = compareMinHeight
    minHeight.value = `${compareMinHeight}px`
  }
}

// 更新弹窗显隐
const handleDrawerClose = () => {
  emit('update-collect-visible', false)
}

// 收藏列表
const getCollectList = async () => {
  loading.value = true
  const res = await queryCollect(props.isAnswerPage, props.chatModel)
  if (res.code == 200) {
    collectList.value = res.data
  }
  collectListTimer = setTimeout(() => {
    loading.value = false
    let listLength = collectList.value.length
    minHeight.value = listLength > 0 ? `${56 * listLength + 20}px` : `${saveMinHeight}px`
  }, 500)
}

// 删除当前收藏
const deleteCurrentItem = (item) => {
  item.collect = true
  deleteItem = item
}

onUnmounted(() => {
  collectListTimer && clearTimeout(collectListTimer)
})

// 跳转至聊天页
const navigateToChat = (item) => {
  emit('update-collect-visible', false)
  emit('navigate-to-chat', item)
}

const handleCollectList = () => {
  const index = collectList.value.findIndex((item) => item.id === deleteItem.id)
  if (index !== -1) {
    collectList.value.splice(index, 1)
    let listLength = collectList.value.length
    minHeight.value = listLength > 0 ? `${56 * listLength + 20}px` : `${saveMinHeight}px`
  }
}

const beforeClose = ({ position }) => {
  switch (position) {
    case 'right':
      return new Promise((resolve) => {
        collectOperation(deleteItem, true, props.chatModel)
          .then((res) => {
            if (res.code == 200) {
              const container = document.querySelector('#home-container')
              ElMessage({
                message: res.data,
                type: 'success',
                appendTo: container instanceof HTMLElement ? container : undefined
              })
              resolve(true)
              handleCollectList()
              if (deleteItem.chatId) {
                emit('update-chat', deleteItem)
              }
            }
          })
          .catch(() => resolve(false))
      })
    default:
      return true
  }
}
</script>

<template>
  <div class="collect-drawer">
    <ElDrawer
      v-model="localCollectVisible"
      direction="btt"
      :show-close="false"
      @close="handleDrawerClose"
    >
      <template #header>
        <div>收藏夹</div>
        <div class="collect-close" @click="handleDrawerClose">
          <img :src="close" fit="cover" alt="" />
        </div>
      </template>
      <div
        :style="{ minHeight }"
        :class="['collect-content', loading || collectList.length <= 0 ? 'collect-loading' : '']"
      >
        <Loading v-if="loading" type="spinner" color="#B1B1B1" />
        <template v-else-if="!loading && collectList.length <= 0">
          <img :src="noCollect" fit="cover" alt="" class="collect-img" />
          暂无收藏内容
        </template>
        <div
          v-else
          v-for="(item, index) in collectList"
          :key="item.id"
          @click="navigateToChat(item)"
        >
          <SwipeCell :before-close="beforeClose">
            <div
              :class="['collect-item', index === collectList.length - 1 ? 'collect-last-item' : '']"
            >
              <div class="collect-text"> {{ item.collectText }} </div>
            </div>
            <template #right>
              <div class="collect-delete" :style="deleteStyle" @click="deleteCurrentItem(item)">
                删除
              </div>
            </template>
          </SwipeCell>
        </div>
      </div>
    </ElDrawer>
  </div>
</template>

<style scoped lang="less">
.collect-drawer {
  :deep(.el-drawer) {
    height: auto !important;
    max-height: 70%;
    border-radius: 8px 8px 0 0;

    .el-drawer__header {
      position: relative;
      padding: 15px 20px;
      margin-bottom: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;

      .collect-close {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        height: 100%;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
          margin: 0 20px;
        }
      }
    }

    .el-drawer__body {
      padding: 0 18px;
      overflow-y: scroll;
      scrollbar-width: none;

      ::-webkit-scrollbar {
        display: none;
      }

      .collect-content {
        transition:
          height 0.5s ease,
          min-height 0.5s ease;
      }

      .collect-loading {
        display: flex;
        height: 100%;
        min-height: 300px;
        font-size: 16px;
        color: #b1b1b1;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .collect-img {
          width: 195px;
          height: 187px;
          margin-bottom: 20px;
        }
      }

      .collect-item {
        position: relative;
        height: 50px;
        margin-top: 6px;
        background-image: linear-gradient(white, white),
          linear-gradient(-45deg, #0a3f97, #48b7eb, #445bbf, #2c41a2);
        border: 1px solid transparent;
        border-radius: 8px;
        box-sizing: border-box;
        background-clip: padding-box, border-box;

        .collect-text {
          margin: 0 15px;
          overflow: hidden;
          font-weight: 400;
          line-height: 50px;
          color: #3875c5;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .collect-last-item {
        margin-bottom: 20px;
      }
    }
  }

  .collect-delete {
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    color: #f56c6c;
    text-align: center;
  }
}
</style>
