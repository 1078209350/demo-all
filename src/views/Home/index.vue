<template>
  <ElContainer class="home-container">
    <ElAside class="aside collapse" width="113px">
      <img width="60" class="logo" src="@/assets/imgs/whale-logo.png" alt="" />
      <div class="whale">
        <div
          v-for="item in visibleMenuItems"
          :key="item.model"
          class="whale-item"
          @click="handleMenuClick(item.model)"
        >
          <span :class="[whaleSelected === item.model ? 'whale-selected' : '']">{{
            item.modelName
          }}</span>
          <!--          <img height="50" :src="item.icon" :alt="item.name" />-->
        </div>
      </div>
      <img width="60" class="exit" src="@/assets/imgs/exit.png" alt="" @click="handleExit()" />
    </ElAside>
    <div class="aside preload-img"></div>
    <ElMain :style="{ width: 'calc(100% - 128px)', padding: 0 }">
      <template v-for="item in visibleMenuItems" :key="item.model">
        <chat
          v-if="whaleSelected === item.model"
          ref="chatRef"
          :type="item.model"
          :greeting="item.greeting"
          :modelConfigIntro="item.modelConfigIntro"
          :modelConfigTips="item.modelConfigTips"
        />
      </template>
    </ElMain>
  </ElContainer>
  <div>
    <ElDialog v-model="userInfoDialogVisible" width="380" :show-close="false" title="请输入授权码">
      <TokenWrite :current-row="currentRow" @close="closeUserInfoDialog" />
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ElContainer, ElAside, ElMain, ElDialog, ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { TokenWrite } from '@/components/TokenWrite'
import chat from '@/views/Chat/index.vue'
import { refreshTokenLogic } from '@/utils/utils'
import { useMenu } from '@/composables/Home/useMenu'
import { getModelList } from '@/api/home'
import { useRouter } from 'vue-router'

const { push } = useRouter()

interface VisibleMenuItems {
  model: string
  modelName: string
  greeting: string
  modelConfigIntro: {
    showIcon: boolean
    prefix: string
    suffix: string
  }
  modelConfigTips: {
    title: string
    items: string[]
  }
}

const { whaleSelected, chatRef, changeWhaleItem } = useMenu()
const userInfoDialogVisible = ref(false)
const currentRow = ref('')
const visibleMenuItems = ref<VisibleMenuItems[]>([])

// 监听登录状态变化
onMounted(() => {
  init()
})

const init = async () => {
  const res = await getModelList()
  visibleMenuItems.value = res.data
  console.log(res)
}

const handleMenuClick = async (type: string) => {
  console.log(type)
  const result = await changeWhaleItem(type)
  if (result?.needAuth) {
    currentRow.value = result.authorization || ''
    userInfoDialogVisible.value = true
    return
  }
  refreshTokenLogic()
}

const closeUserInfoDialog = (isCancel) => {
  userInfoDialogVisible.value = false
  changeWhaleItem('data', isCancel)
}

// 退出
const handleExit = () => {
  sessionStorage.removeItem('token')
  ElMessage.success('登出成功')
  push({ path: '/login' })
}
</script>

<style lang="less" scoped>
@screen-mh: 600px;

.home-container {
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC';
  font-size: 14px;
  //color: #1a73e8;
  background: #eef3ff;

  .el-divider--vertical {
    width: 0.5px;
    height: 100%;
    margin: 0;
    background: rgb(255 255 255 / 20%);
    border-left: none;
  }

  .aside {
    background: #ddd;
    //background-image: url('@/assets/imgs/aside.png');
    //background-repeat: no-repeat;
    //background-size: cover;
  }

  .preload-img {
    position: absolute;
    top: -9999px;
    left: -9999px;
    width: 0;
    height: 0;
  }

  .expand {
    display: flex;
    margin: 53px auto 20px;
    flex-direction: row;
    align-items: center;

    span {
      flex: 1;
      font-size: 15px;
    }

    svg {
      margin-right: 6px;
      margin-left: 30px;
    }

    div {
      position: relative;

      .line {
        position: absolute;
        right: 0;
        width: 120px;
        height: 1px;
        background-color: #eef3ff;
      }

      .circle {
        position: absolute;
        top: -1.5px;
        right: 118px;
        width: 4px;
        height: 4px;
        background-color: #eef3ff;
        border-radius: 50%;
      }
    }
  }

  .no-notice {
    margin-top: 68px;
    font-size: 16px;
    text-align: center;
  }

  .notice-content {
    padding: 15px;
    margin: 15px 15px 0;
    text-align: left;
    background-color: #eef3ff;
    border-radius: 10px;

    p {
      margin: 6px auto 0;
      font-size: 12px;
      color: #777f89;
      word-wrap: break-word;
    }

    div {
      color: #0957ac;
    }
  }

  .collapse-btn {
    margin: auto 0 auto 6px;
  }

  .collapse {
    display: flex;
    text-align: center;
    background-image: url('@/assets/imgs/collapse.png');
    background-repeat: no-repeat;
    background-size: cover;
    flex-direction: column;

    .logo {
      width: 100%;
      margin: 20px auto 13px;
    }

    .exit {
      width: 30%;
      margin: 20px auto 50px;
      cursor: pointer;
    }

    .cosLogo {
      margin: 0 auto;
    }

    .whale {
      min-height: 100px;
      flex: 1;
      overflow: auto;

      .whale-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        cursor: pointer;

        img {
          margin-top: 25px;
        }
      }

      .whale-selected {
        padding: 25px 5px;
        background: rgb(255 255 255 / 90%);
        border-radius: 10px;
      }
    }

    .whale::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }

    .whale::-webkit-scrollbar-thumb {
      background: #e4e4e4;
      border-radius: 4px;
      box-shadow: inset 0 0 2px #d1d1d1;
    }

    .notice {
      margin-bottom: 30px;

      @media screen and (max-height: @screen-mh) {
        margin-bottom: 20px;
      }
    }

    .notice-selected {
      width: 36px;
      height: 36px;
      background: rgb(255 255 255 / 20%);
      border-radius: 10px;
    }

    .version-title {
      margin-top: 50px;
      font-size: 12px;
      color: #fff;

      @media screen and (max-height: @screen-mh) {
        margin-top: 30px;
      }
    }

    .version-value {
      display: inline-block;
      height: 20px;
      max-width: 93px;
      padding: 0 10px;
      margin: 8px auto 20px;
      overflow: hidden;
      line-height: 20px;
      color: #0957ac;
      background-color: #eef3ff;
      border-radius: 10px;
    }
  }
}

:deep(.el-dialog) {
  background-color: #fff;
  background-image: url('@/assets/imgs/authorize.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

:deep(.el-dialog__header) {
  height: auto;
  padding: 20px 30px 0;
  margin-right: auto;
  font-weight: 500;
  color: #484f5f;
}

:deep(.el-dialog__body) {
  padding: 25px 30px 20px !important;
}
</style>
