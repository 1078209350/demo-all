<template>
  <div class="introduce">
    <div class="introduce-img">
      <img
        :style="{ width: isCoscosTestAccount() ? '143px' : '170px' }"
        :src="isCoscosTestAccount() ? CosBigHeader : cute"
        fit="cover"
        alt=""
      />
    </div>
    <div class="introduce-desc">
      <div class="ai-introduction">{{ greeting }}</div>
      <div class="ai-introduction">
        <template v-for="(part, index) in processedParts" :key="index">
          <span v-if="part.isClickable" @click="handleClick" class="clickable-text">
            {{ part.content }}
          </span>
          <template v-else>
            {{ part.content }}
          </template>
        </template>
        <img v-if="modelConfigIntro.showIcon" class="x-icon" :src="XIcon" alt="X" />
        {{ modelConfigIntro.suffix }}
      </div>
      <!--      <div class="ai-function" v-html="md.render(titleTip)"></div>-->
      <div class="ai-tips-container">
        <div class="tips-title">{{ modelConfigTips.title }}</div>
        <div class="tips-desc" v-for="(tip, index) in modelConfigTips.items" :key="index">
          {{ tip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cute from '@/assets/imgs/cute.png'
import CosBigHeader from '@/assets/imgs/cos-big-header.png'
import XIcon from '@/assets/imgs/x-icon.png'
// import { md } from '@/utils/markdown'
import { isCoscosTestAccount } from '@/api/menu/menuConfig'
import { onMounted, ref } from 'vue'

interface ProcessedParts {
  isClickable: boolean
  content: string
}

const props = defineProps<{
  type: string
  greeting: string
  modelConfigIntro: {
    showIcon: boolean
    prefix: string
    suffix: string
    url: string
  }
  modelConfigTips: {
    title: string
    items: string[]
  }
}>()

const processedParts = ref<ProcessedParts[]>([])

onMounted(() => {
  const res = processString(props.modelConfigIntro.prefix)
  console.log(res)
  processedParts.value = res
})

// 处理方法
const processString = (str) => {
  const regex = /<html>(.*?)<html>/g
  const parts: any = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(str)) !== null) {
    // 添加前置普通文本
    if (match.index > lastIndex) {
      parts.push({
        content: str.slice(lastIndex, match.index),
        isClickable: false
      })
    }
    // 添加可点击内容
    parts.push({
      content: match[1],
      isClickable: true
    })
    lastIndex = regex.lastIndex
  }
  // 添加剩余文本
  if (lastIndex < str.length) {
    parts.push({
      content: str.slice(lastIndex),
      isClickable: false
    })
  }
  return parts
}

const handleClick = () => {
  window.open(props.modelConfigIntro.url)
}
</script>

<style scoped lang="less">
.introduce {
  display: flex;
  margin: 50px 0 30px;

  :deep(.ai-function) {
    strong {
      font-weight: 800;
      // color: #000;
    }
  }

  .introduce-img {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .introduce-desc {
    width: calc(100% - 40px);
    height: 100%;
    padding: 20px;
    margin-top: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgb(0 0 0 / 5%);
    box-sizing: border-box;

    .ai-introduction {
      font-size: 26px;
      font-style: normal;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: -0.165px;
      color: #484f5f;

      .clickable-text {
        color: #0957ac;
        //text-decoration: underline;
        cursor: pointer;
      }

      .x-icon {
        width: 13px;
        height: 13px;
        margin: 0 4px;
        vertical-align: middle;
      }
    }

    .ai-function {
      margin-top: 10px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.165px;
      color: #777f89;
    }

    .ai-tips-container {
      width: 100%;
      height: calc(100% - 112px);
      padding: 18px;
      margin-top: 10px;
      background: #eef3ff;
      border-radius: 8px;
      box-sizing: border-box;

      .tips-title {
        margin-bottom: 10px;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -0.165px;
        color: #0957ac;
      }

      .tips-desc {
        margin-bottom: 8px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.165px;
        color: #777f89;
      }
    }
  }
}
</style>
