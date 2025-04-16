<script setup lang="ts">
import avatar from '@/assets/imgs/path-to-whale-icon.png'
import { ChatMessage } from '@/api/chat/types'
import deepThink from '@/assets/imgs/tool-think-able-icon.png'
import expandIcon from '@/assets/imgs/thinking-open-icon.png'
import refresh from '@/assets/imgs/refresh.png'
import likeL from '@/assets/imgs/like-light.png'
import like from '@/assets/imgs/like.png'
import dislikeL from '@/assets/imgs/dislike-light.png'
import dislike from '@/assets/imgs/dislike.png'
import { ElDivider, ElMessage } from 'element-plus'
import Loading from '@/components/ChatCore/Loading.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { getUpvoteConfig, saveQuestionPraise } from '@/api/feedback'
import { md } from '@/utils/markdown'
import { defineProps, ref, computed } from 'vue'

interface Props {
  chatModel: string
  item: ChatMessage
  index: number
  messageList: ChatMessage[]
}

const props = defineProps<Props>()
const emit = defineEmits([
  'update-history',
  'change-if-dislike',
  'handle-ask',
  'change-dislike-info'
])

const isThinking = ref(false)

// 赞一下
const handleLike = async (item) => {
  item.likeLight = !item.likeLight
  if (item.likeLight) {
    const res = await saveQuestionPraise('0', item.chatId, [], '')
    if (res.code == 200) {
      // @ts-ignore
      ElMessage({
        message: '点赞成功',
        type: 'success',
        appendTo: document.querySelector('#home-container')
      })
      // 点赞后取消点踩
      item.dislikeLight = false
    }
  } else {
    await saveQuestionPraise('2', item.chatId, [], '')
    // @ts-ignore
    ElMessage({
      message: '已取消',
      type: 'info',
      appendTo: document.querySelector('#home-container')
    })
  }
  emit('update-history')
}

// 踩一下
const handleDislike = async (item) => {
  item.dislikeLight = !item.dislikeLight
  if (item.dislikeLight) {
    // 请求点踩配置
    const res = await getUpvoteConfig()
    // @ts-ignore
    emit('change-dislike-info', item.chatId, res.data)
    emit('change-if-dislike', true)
    // 点踩后取消点赞
    item.likeLight = false
  } else {
    await saveQuestionPraise('3', item.chatId, [], '')
    emit('change-if-dislike', false)
    // @ts-ignore
    ElMessage({
      message: '已取消',
      type: 'info',
      appendTo: document.querySelector('#home-container')
    })
  }
  emit('update-history')
}

// 思考过程是否折叠
const handleDeepThinkFold = (item) => {
  item.deepThinkFold = !item.deepThinkFold
}

const showImage = (item, index) => {
  item.previewIndex = index
  item.previewVisible = true
}

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
const renderContent = (item, content: string) => {
  // 处理思考内容块
  content = content.replace(/<T([\s\S]*?)<\/T/g, (_, text) => {
    isThinking.value = false
    if (item.deepThinkFold) {
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
    if (item.deepThinkFold) {
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
  return md.render(content)
}
</script>

<template>
  <div class="answer">
    <div>
      <div class="avatar ai-common-select" @mousedown.stop>
        <img @dragstart="(e) => e.preventDefault()" :src="avatar" fit="cover" alt="" />
      </div>
      <div class="answer-box">
        <div v-for="(cont, contIndex) in item.contentArray" :key="contIndex">
          <div
            v-if="props.item.content?.includes('<T')"
            class="deep-think-result"
            @mousedown.stop
            @click="handleDeepThinkFold(item)"
          >
            <img :src="deepThink" fit="cover" alt="" />
            <span>{{ thingText }}</span>
            <img
              :src="expandIcon"
              :class="item.deepThinkFold ? 'arrow' : 'arrow-flip'"
              fit="cover"
              alt=""
            />
          </div>
          <img
            style="width: 150px; height: 150px; object-fit: cover"
            v-if="cont.type == 'image'"
            :src="cont.value"
            :key="contIndex"
            @click="showImage(item, cont.index)"
            alt="preview"
            width="200"
          />
          <div
            class="answer-desc markdown-body"
            @mousedown.stop
            v-else
            v-html="renderContent(item, cont.value)"
          ></div>
        </div>
        <el-divider v-if="!item.isItemTalking && chatModel != 'jlts-差旅'" />
        <div v-if="!item.isItemTalking && chatModel != 'jlts-差旅'" class="imgs" @mousedown.stop>
          <div
            class="ai-common-select img-cont"
            @click="
              emit(
                'handle-ask',
                messageList[index - 1].content,
                messageList[index - 1].collect,
                index
              )
            "
          >
            <img
              class="refresh"
              @dragstart="(e) => e.preventDefault()"
              :src="refresh"
              alt="重新提问"
            />
          </div>
          <div class="ai-common-select img-cont" @click="handleLike(item)">
            <img
              class="like"
              :src="item.likeLight ? likeL : like"
              alt="点赞"
              @dragstart="(e) => e.preventDefault()"
            />
          </div>
          <div class="ai-common-select img-cont" @click="handleDislike(item)">
            <img
              class="dislike"
              :src="item.dislikeLight ? dislikeL : dislike"
              alt="踩一下"
              @dragstart="(e) => e.preventDefault()"
            />
          </div>
        </div>
        <Loading v-if="!(item as ChatMessage).content" />
      </div>
      <VueEasyLightbox
        :visible="item.previewVisible"
        :imgs="item.imgList"
        :index="item.previewIndex"
        :moveDisabled="false"
        :teleport="'#app'"
        @hide="!item.previewVisible"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.answer {
  position: relative;
  z-index: 6;
  width: 100%;
  margin-top: 10px;

  .avatar {
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 14px;
    color: #484f5f;
    pointer-events: none;

    img {
      width: 36px;
      height: 36px;
      margin-right: 6px;
      border-radius: 50%;
    }
  }

  .answer-box {
    display: inline-block;
    height: auto;
    max-width: 100%;
    padding: 10px 15px;
    margin-top: 10px;
    background: rgb(255 255 255 / 70%);
    border-radius: 10px 10px 10px 0;
    box-shadow: 4px 2px 8px rgb(0 0 0 / 8%);
    box-sizing: border-box;

    .deep-think-result {
      display: inline-flex;
      align-items: center;
      padding: 5px;
      border-radius: 10px;

      span {
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        letter-spacing: -0.165px;
        color: #484f5f;
      }

      img {
        width: 16px;
        height: 16px;
        margin-right: 3px;
      }

      .arrow {
        width: 16px;
        height: 16px;
        margin-left: 5px;
      }

      .arrow-flip {
        width: 16px;
        height: 16px;
        margin-left: 5px;
        transform: rotate(180deg); /* 翻转180度 */
      }
    }

    .answer-desc {
      overflow-x: auto;
      font-size: 13px;
      line-height: 1.6em;
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
        ul {
          padding-left: 1.2em;
          margin: 0.8em 0;
          list-style: disc;
        }

        ol {
          padding-left: 1.2em;
          margin: 0.8em 0;
          list-style: decimal;
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

      :deep(ul) {
        padding-left: 2em;
        margin: 8px 0;
        list-style: disc;
      }

      :deep(ol) {
        padding-left: 2em;
        margin: 8px 0;
        list-style: decimal;
      }

      :deep(h1) {
        font-size: 22px;
      }

      :deep(h2) {
        font-size: 18px;
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

    :deep(.el-divider--horizontal) {
      margin: 5px 0;
    }

    .imgs {
      display: flex;
      margin-top: 10px;
      text-align: right;
      align-items: center;

      .img-cont {
        display: flex;

        img {
          pointer-events: none;
        }
      }

      .refresh,
      .like,
      .dislike {
        position: relative;
        z-index: 6;
        height: 16px;
        margin-right: 15px;
        cursor: pointer;
      }
    }
  }
}
</style>
