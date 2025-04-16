<script setup lang="ts">
import { ChatMessage, DislikeContent } from '@/api/chat/types'
import { ElImage } from 'element-plus'
import { md } from '@/utils/markdown'
import Loading from './Loading.vue'
import Dislike from './Dislike.vue'
import AnswerHead from '@/assets/imgs/answer-head.png'
import CosHead from '@/assets/imgs/cos-header.png'
import refresh from '@/assets/imgs/refresh.png'
import like from '@/assets/imgs/like.png'
import likeL from '@/assets/imgs/like-light.png'
import dislike from '@/assets/imgs/dislike.png'
import dislikeL from '@/assets/imgs/dislike-light.png'
import stop from '@/assets/imgs/stop.png'
import loadFail from '@/assets/imgs/loadFail.png'
import thinkClose from '@/assets/imgs/thinking-open-icon.png'
import thinkOpen from '@/assets/imgs/thinking-close-icon.png'
import thinkAbleIcon from '@/assets/imgs/tool-think-able-icon.png'
import { ref, computed } from 'vue'
import { getJumpUrl } from '@/api/chat'
import { isCoscosTestAccount } from '@/api/menu/menuConfig'

interface Props {
  item: ChatMessage
  index: number
  type: string
  length: number
  position: string
  dislikeContent: DislikeContent
  chatIdSelected: string
}

const props = defineProps<Props>()

const emit = defineEmits([
  'handle-ask',
  'handle-ask-guess',
  'handle-stop',
  'handle-like',
  'handle-dislike',
  'handle-close-dislike'
])

// 添加控制思考内容显示的状态
const isThinkingExpanded = ref(true)
const isThinking = ref(false)
const questionList = ref([])

const thingText = computed(() => {
  if (!props.item.isItemTalking) {
    if (isThinking.value) {
      return '思考已停止'
    }
    return '已深度思考'
  }
  return isThinking.value ? '思考中...' : '已深度思考'
})

// 添加自定义渲染方法
const renderContent = (content: string) => {
  // 处理思考内容块
  content = content.replace(/<T([\s\S]*?)<\/T/g, (_, text) => {
    isThinking.value = false
    if (!isThinkingExpanded.value) {
      return '' // 收起状态不显示思考内容
    }
    return (
      '> ' +
      text
        .split('\n')
        .filter((line) => line.trim())
        .join('\n> ')
    )
  })
  // 处理未闭合的思考内容块（正在输出中的内容）
  content = content.replace(/<T([\s\S]*?)$/, (_, text) => {
    isThinking.value = true
    if (!isThinkingExpanded.value) {
      return '' // 收起状态不显示思考内容
    }
    return (
      '> ' +
      text
        .split('\n')
        .filter((line) => line.trim())
        .join('\n> ')
    )
  })
  // 提取内容到数组
  // @ts-ignore
  questionList.value = (content.match(/<ansQues>(.*?)<\/ansQues>/g) || []).map((item) =>
    item.replace(/<\/?ansQues>/g, '')
  )

  // 删除原字符串中的标签部分
  const cleanedStr = content.split('<ansQues>')[0]
  return md.render(cleanedStr)
}

// 自定义链接渲染规则（添加 class 和 data-href 属性）
// @ts-ignore
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx]

  // 添加自定义 class 属性
  token.attrPush(['class', 'custom-link'])

  return self.renderToken(tokens, idx, options)
}

const handleContainer = async (e) => {
  e.preventDefault() // 阻止默认跳转
  if (e.target.classList.contains('custom-link')) {
    if (props.type == 'coscosText') {
      console.log('点击了：', e.target.href)
      const match = e.target.href.match(/\/\/(?:[^/]+)\/([^/?#]+)/)
      // 提取匹配结果
      const param = match ? match[1] : null
      const res = await getJumpUrl(param)
      window.open(res.data, '_blank')
    } else {
      window.open(e.target.href, '_blank')
    }
  }
}

// 添加切换思考内容显示的方法
const toggleThinking = () => {
  isThinkingExpanded.value = !isThinkingExpanded.value
}
</script>

<template>
  <div>
    <div class="answer" @click="handleContainer">
      <img
        class="answer-head"
        :style="{
          width: isCoscosTestAccount() ? '39px' : '36px',
          height: isCoscosTestAccount() ? '26px' : '42px',
          marginTop: isCoscosTestAccount() ? '10px' : '0'
        }"
        :src="isCoscosTestAccount() ? CosHead : AnswerHead"
        fit="cover"
        alt=""
      />
      <div class="answer-box">
        <div
          v-if="props.item.content?.includes('<T')"
          class="thinking-toggle"
          @click="toggleThinking"
        >
          <img :src="thinkAbleIcon" alt="" class="thinking-icon" />
          <span class="thinking-text">{{ thingText }}</span>
          <img :src="isThinkingExpanded ? thinkOpen : thinkClose" alt="" class="thinking-icon" />
        </div>
        <div v-for="(cont, contIndex) in props.item.contentArray" :key="contIndex">
          <ElImage
            v-if="cont.type == 'image'"
            style="width: 320px; height: 320px"
            :src="cont.value"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="props.item.imgList"
            :initial-index="cont.index"
            fit="cover"
          >
            <template #error>
              <div class="image-slot">
                <img style="width: 50px; height: 50px" :src="loadFail" fit="cover" alt="" />
              </div>
            </template>
          </ElImage>
          <!-- <div class="answer-desc markdown-body" v-else v-html="md.render(cont.value)"></div> -->
          <div class="answer-desc markdown-body" v-else v-html="renderContent(cont.value)"></div>
        </div>
        <Loading v-if="!props.item.content" />
      </div>
    </div>
    <div v-if="item.isItemTalking" class="stop-answer" @click="$emit('handle-stop')">
      <img class="stop-answer-img" :src="stop" fit="cover" alt="" />
      <span class="stop-answer-word">停止生成</span>
    </div>
    <div v-if="!item.isItemTalking && index == length - 1" class="guess-question">
      <span
        v-for="(item, indexx) in questionList"
        :key="indexx"
        @click="$emit('handle-ask-guess', item)"
        >{{ item }}</span
      >
    </div>
    <div v-if="!item.isItemTalking" class="bottom-tools">
      <img class="refresh" :src="refresh" alt="重新提问" @click="$emit('handle-ask', index)" />
      <div class="line"></div>
      <img
        class="like"
        :src="item.likeLight ? likeL : like"
        alt="点赞"
        @click="$emit('handle-like', item)"
      />
      <div class="line"></div>
      <img
        class="dislike"
        :src="item.dislikeLight ? dislikeL : dislike"
        alt="踩一下"
        @click="(e) => $emit('handle-dislike', item, index, e)"
      />
      <Dislike
        :index="index"
        :position="position"
        :isDislikeContent="item.isDislikeContent"
        :dislikeContent="dislikeContent"
        :chatIdSelected="chatIdSelected"
        @handle-close-dislike="$emit('handle-close-dislike', index)"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.answer {
  display: flex;
  margin-top: 20px;

  .answer-head {
    user-select: none; // 添加禁止选中
  }

  .answer-box {
    width: 100%;
    height: auto;
    padding: 15px;
    margin-left: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgb(0 0 0 / 5%);
    box-sizing: border-box;

    .thinking-toggle {
      display: inline-flex;
      height: 28px;
      padding: 0 8px; // 添加水平内边距
      margin-bottom: 12px;
      cursor: pointer;
      background-color: #e3edff;
      border-radius: 6px;
      align-items: center;
      user-select: none; // 添加禁止选中

      .thinking-icon {
        width: 16px;
        height: 16px;
      }

      .thinking-text {
        margin: 0 4px;
        font-size: 13px;
        color: #484f5f;
        white-space: nowrap; // 防止文本换行
      }
    }

    .image-slot {
      display: flex;
      width: 100%;
      height: 100%;
      font-size: 30px;
      color: var(--el-text-color-secondary);
      background: var(--el-fill-color-light);
      justify-content: center;
      align-items: center;
    }

    .answer-desc {
      overflow-x: auto;
      font-size: 14px;
      line-height: 2em;
      color: #484f5f;

      :deep(blockquote) {
        padding: 0 1em;
        margin: 1em 0;
        font-size: 12px;
        line-height: 1.7em;
        color: #90949e;
        border-left: 0.15em solid #dfe2e5;

        // 调整引用块内部样式
        p {
          margin: 0.8em 0;

          & + p {
            margin-top: 1.2em;
          }
        }

        // 处理列表样式
        ul,
        ol {
          padding-left: 1.2em;
          margin: 0.8em 0;
        }

        // br {
        //   display: block;
        //   margin: 1em 0; // 设置上下间距为 1em
        //   content: '';
        // }
      }

      :deep(pre) {
        padding: 16px;
        margin: 8px 0;
        overflow: auto;
        font-size: 14px;
        line-height: 1.45;
        color: #24292e;
        background-color: #f6f8fa;
        border-radius: 6px;
      }

      :deep(code) {
        padding: 0.2em 0.4em;
        margin: 0;
        font-size: 85%;
        color: #24292e;
        background-color: #f6f8fa;
        border-radius: 6px;
      }

      :deep(table) {
        width: 100%;
        margin: 8px 0;
        border-collapse: collapse;

        th,
        td {
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
        }

        tr:nth-child(2n) {
          background-color: #f6f8fa;
        }
      }

      :deep(img) {
        height: auto;
        max-width: 100%;
      }

      // :deep(ul),
      // :deep(ol) {
      //   padding-left: 2em;
      //   margin: 8px 0;
      // }

      :deep(ul),
      :deep(ol) {
        padding-left: 2em;
        margin: 8px 0;
        list-style: auto;

        li ul li {
          list-style: disc;
        }
      }

      :deep(h1),
      :deep(h2),
      :deep(h3),
      :deep(h4),
      :deep(h5),
      :deep(h6) {
        margin: 16px 0 8px;
        font-weight: 600;
        line-height: 1.25;
      }

      :deep(hr) {
        height: 2px;
        margin: 16px 0;
        background-color: #e1e4e8;
        border: 0;
      }
    }
  }
}

.stop-answer {
  display: flex;
  width: 88px;
  height: 28px;
  margin: 10px 0 0 50px;
  cursor: pointer;
  border: 1px solid #042346;
  border-radius: 10px;
  align-items: center;

  &-img {
    width: 14px;
    margin: 0 6px 0 10px;
  }

  &-word {
    font-size: 12px;
    background: linear-gradient(180deg, #042346 0%, #0957ac 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.guess-question {
  margin: 10px 0 0 55px;
  position: absolute;
  display: flex;
  flex-direction: column;
  span {
    border-radius: 5px;
    color: white;
    background: #1a73e8;
    margin-bottom: 5px;
    border: 1px solid #1a73e8;
    padding: 10px;
  }
}

.bottom-tools {
  position: relative;
  display: flex;
  margin-top: 10px;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  user-select: none; // 添加禁止选中

  .refresh,
  .like,
  .dislike {
    height: 16px;
    padding: 2px;
    margin: 0 8px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .refresh:hover,
  .like:hover,
  .dislike:hover {
    display: flex;
    padding: 2px;
    background-color: #e7e7e8;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
  }

  .line {
    width: 1px;
    height: 10px;
    background: #484f5f;
  }
}
</style>
