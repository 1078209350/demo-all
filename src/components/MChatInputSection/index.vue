<script setup lang="ts">
import { defineProps, ref, onUnmounted, onMounted, watch, computed } from 'vue'
import { ElInput, ElMessageBox, ElPopover, ElMessage } from 'element-plus'
import collect from '@/assets/imgs/collect.png'
import collectDisabled from '@/assets/imgs/collect-disabled.png'
import send from '@/assets/imgs/send.png'
import sendDisabled from '@/assets/imgs/send-disabled.png'
import stop from '@/assets/imgs/stop.png'
import listen from '@/assets/imgs/listen.png'
import close from '@/assets/imgs/close-white.png'
import deepThink from '@/assets/imgs/tool-think-able-icon.png'
import deepThinkDisabled from '@/assets/imgs/tool-think-disable-icon.png'
import VoiceInput from './Voiceing.vue'
import Collect from './Collect.vue'
import { isAndroid, needVoiceInput } from '@/utils/source'
import { getRandomString } from '@/utils/utils'
import { getCurrentTimeStamp } from '@/utils/dateUtil'
import { getJsapiTicket, getSignature } from '@/api/voice'
import { useChatStoreWithOut } from '@/store/modules/chat'
import { containsCode } from '@/utils/is'

interface Props {
  isAnswerPage: boolean
  isTalking: boolean
  chatModel: string
}

const props = defineProps<Props>()
let collectTimer
const inputValue = ref('')
const collectVisible = ref(false) // 收藏弹窗显隐
const collectGuideVisible = ref(false) // 收藏指引气泡显隐
const isVoicing = ref(false) // 是否在语音识别
const isDeepThink = ref(false) // 是否在深度思考
const refInput = ref()
const emit = defineEmits([
  'send-message',
  'handle-stop',
  'update-chat',
  'change-model',
  'change-is-answer-page'
])

onMounted(async () => {
  if (needVoiceInput()) {
    // 生成签名的时间戳
    const timestamp = getCurrentTimeStamp()
    // 生成签名的随机串
    const nonceStr = getRandomString(16)
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    // 生成签名的url
    const url = baseUrl + '/pcf-ai-window/'
    // 获取签名signature
    const res = await getJsapiTicket()
    // 使用sha1加密
    const str = `jsapi_ticket=${res.data}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
    const signature = await getSignature(str)
    console.log('signature', signature)
    // @ts-ignore
    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx9935ad89131a5cce', // 必填，企业微信的corpID，必须是本企业的corpID，不允许跨企业使用
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature.data, // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: ['startRecord', 'stopRecord', 'translateVoice'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    })
  }
})

watch(
  () => props.isAnswerPage,
  (newVal) => {
    // 监听是否回到首页，是就取消“深度思考”按钮的点击
    if (!newVal) {
      useChatStoreWithOut().setDeepThink(false)
      isDeepThink.value = false
    }
  },
  { immediate: true }
)

const paddingLeft = computed(() => {
  return inputValue.value.length > 0 ? '10px' : '45px'
})

// 输入框聚焦
const handleInputFocus = () => {
  emit('change-is-answer-page', true)
}

// 输入框失焦
const handleInputBlur = () => {
  refInput.value.blur()
}

// 点击发送 ｜ 停止发送
const handleSend = (isCollect, value = inputValue.value) => {
  // 添加代码检测
  if (containsCode(inputValue.value)) {
    ElMessage.warning(`请不要输入代码！`)
    return false
  }
  // 发送
  if (!props.isTalking) {
    // 过滤制表符 & 空格符
    if (typeof value === 'string') {
      value = value.replace(/\t/g, '').replace(/^\s*/, '')
    }
    // 流式输出进行中 或 输入空为空 禁止请求
    if (props.isTalking || value == '') {
      return false
    }
    emit('send-message', value, isCollect)
    // 清空输入框
    inputValue.value = ''
  }
  // 停止
  if (props.isTalking) {
    emit('handle-stop')
  }
}

// 切换收藏弹窗显隐
const changeCollectVisible = (visible: boolean) => {
  if (props.isTalking) {
    return
  }
  collectVisible.value = visible
}

// 点击收藏项跳转聊天页 切换模型&发送问题
const handleCollectClick = (item) => {
  emit('change-model', item.modelCode)
  handleSend(true, item.collectText)
}

// 显示收藏指引
const showCollectGuide = (visible) => {
  if (visible !== collectGuideVisible.value) {
    collectGuideVisible.value = visible
  }

  if (collectGuideVisible.value) {
    collectTimer = setTimeout(() => {
      collectGuideVisible.value = false
    }, 2000)
  }
}

// 点击深度思考按钮
const handleDeepThink = () => {
  isDeepThink.value = !isDeepThink.value
  useChatStoreWithOut().setDeepThink(isDeepThink.value)
}

onUnmounted(() => {
  collectTimer && clearTimeout(collectTimer)
})

// 取消收藏更新聊天信息
const updateChatInfo = (deleteItem) => {
  emit('update-chat', deleteItem)
}

const startVoice = () => {
  changeVoice(true)
}

// 开始录音 | 结束录音
const changeVoice = (val) => {
  isVoicing.value = val
  if (val) {
    console.log('开始录音')
    emit('change-is-answer-page', true)
    // @ts-ignore
    wx.startRecord({
      success: function () {},
      fail: function (err) {
        console.log(err)
        if (isAndroid()) {
          ElMessageBox.alert('请在手机设置中，允许企业微信访问你的手机麦克风', '无法录音', {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: '确定',
            callback: () => {}
          })
        }
        // ElMessage.error('请在手机设置中，允许企业微信访问你的手机麦克风')
      }
    })
  }
  if (!val) {
    console.log('结束录音')
    // @ts-ignore
    wx.stopRecord({
      success: function (res) {
        // @ts-ignore
        wx.translateVoice({
          localId: res.localId, // 需要识别的音频的本地Id，由录音相关接口获得，音频时长不能超过60秒
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            inputValue.value = inputValue.value + res.translateResult
          }
        })
      }
    })
  }
}

defineExpose({ showCollectGuide, handleInputBlur })
</script>

<template>
  <div
    class="chat-input"
    :style="{ background: props.isAnswerPage ? '#DBE8F7' : 'none' }"
    @click="
      (e) => {
        e.stopPropagation()
      }
    "
  >
    <div
      v-if="chatModel == 'jlts-制度'"
      :class="isDeepThink ? 'deep-btn' : 'deep-btn-disabled'"
      @click="handleDeepThink"
    >
      <img :src="isDeepThink ? deepThink : deepThinkDisabled" fit="cover" alt="" />
      <span>深度思考(R1)・</span>
    </div>
    <div class="input-component">
      <div v-if="inputValue.length == 0" class="input-collect">
        <ElPopover
          popper-style="width: auto; --el-text-color-primary: rgba(69, 72, 74, 0.9)"
          popper-class="ai-collect-guide-popover"
          :visible="collectGuideVisible"
          placement="top-start"
          effect="dark"
        >
          <template #reference>
            <img
              :src="isTalking ? collectDisabled : collect"
              alt=""
              @click.stop="changeCollectVisible(true)"
            />
          </template>
          <div class="collect-guide">
            收藏的问题在这里
            <img :src="close" alt="" @click.stop="showCollectGuide(false)" />
          </div>
        </ElPopover>
      </div>
      <ElInput
        ref="refInput"
        v-model="inputValue"
        maxlength="300"
        :autosize="{ minRows: 1 }"
        type="textarea"
        placeholder="请输入问题或需求～"
        @focus="handleInputFocus"
      />
      <div class="input-btn ai-common-select">
        <img
          v-if="inputValue.length == 0 && !isTalking"
          @dragstart="(e) => e.preventDefault()"
          :src="listen"
          @click="startVoice"
          fit="cover"
          alt=""
        />
        <img
          v-else
          :src="isTalking ? stop : inputValue ? send : sendDisabled"
          alt=""
          @click="handleSend(false)"
        />
      </div>
    </div>
  </div>
  <VoiceInput v-if="isVoicing" @change-voice="changeVoice" />
  <Collect
    :collectVisible="collectVisible"
    :isAnswerPage="isAnswerPage"
    :chat-model="chatModel"
    @update-collect-visible="changeCollectVisible"
    @navigate-to-chat="handleCollectClick"
    @update-chat="updateChatInfo"
  />
</template>

<style scoped lang="less">
.chat-input {
  position: fixed;
  bottom: 0;
  z-index: 9;
  width: 100%;
  padding: 5px 18px 10px;
  box-sizing: border-box;

  .deep-btn {
    display: inline-flex;
    align-items: center;
    padding: 8px 5px;
    margin-bottom: 10px;
    border: 1px solid var(--logo, #0a3f97);
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
  }

  .deep-btn-disabled {
    display: inline-flex;
    align-items: center;
    padding: 8px 5px;
    margin-bottom: 10px;
    border: 1px solid #90949e;
    border-radius: 10px;

    span {
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: -0.165px;
      color: #90949e;
    }

    img {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }

  .input-component {
    position: relative;
    width: 100%;
    padding: 10px 0;
    background-image:
      linear-gradient(white, white),
      /* 输入框的背景色 */ linear-gradient(-45deg, #0a3f97, #48b7eb, #445bbf, #2c41a2); /* 渐变色 */

    border: 1px solid transparent; /* 设置透明的边框 */
    border-radius: 15px; /* 可选，给边框设置圆角 */
    background-clip: padding-box, border-box; /* 定义背景的裁剪范围 */
    background-origin: border-box; /* 渐变背景从边框开始 */

    .input-collect {
      position: absolute;
      top: 0;
      left: 10px;
      z-index: 10;
      display: flex;
      height: 100%;
      align-items: center;

      img {
        width: 28px;
        height: 28px;
      }
    }

    .input-btn {
      position: absolute;
      right: 10px;
      bottom: 15px;
      display: flex;
      height: 24px;
      align-items: center;

      img {
        width: 24px;
        height: 24px;
      }
    }
  }

  .input-send {
    width: 24px;
    height: 24px;
    margin-left: 10px;

    img {
      width: 100%;
    }
  }
}

.collect-guide {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #f4f4f5;

  img {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
}

:deep(.el-textarea__inner) {
  max-height: 125px !important;
  min-height: 32px !important;
  padding: 5px 40px 5px 45px;
  padding-left: v-bind('paddingLeft');
  overflow: auto;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  resize: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

:deep(.el-textarea__inner:focus) {
  outline: none; /* 移除输入框聚焦时的默认高亮效果 */
}
</style>

<style lang="less">
.ai-collect-guide-popover[data-popper-placement^='top'] .el-popper__arrow::before {
  background: transparent;
  border-width: 5px;
}
</style>
