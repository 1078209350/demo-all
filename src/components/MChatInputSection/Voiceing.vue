<script setup lang="ts">
import whaleImg from '@/assets/imgs/path-to-whale-icon.png'
import voiceStop from '@/assets/imgs/voice-stop.png'
import SpeechAnimation from '@/components/SpeechAnimation/SpeechAnimation.vue'

const emit = defineEmits(['change-voice'])

const changeIsVoice = () => {
  emit('change-voice', false)
}
</script>

<template>
  <div class="speech-mask">
    <div class="speech-mask-center">
      <div class="speech-mask-center-desc">
        <img class="stop-btn" :src="whaleImg" mode="widthFix" />
        <span style="color: #484f5f">鲸宝</span>
        <span>正在听</span>
      </div>
      <div class="speech-mask-center-gif">
        <SpeechAnimation />
      </div>
    </div>
    <div class="speech-mask-bottom">
      <img class="speech-mask-bottom-img" :src="voiceStop" mode="widthFix" @click="changeIsVoice" />
    </div>
  </div>
</template>

<style scoped lang="less">
.speech-mask {
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 40%);

  &-center {
    position: absolute;
    top: calc(50% - 53px);
    left: calc(50% - 108px);
    width: 214px;
    height: 106px;
    background: #e4ebff;
    border-radius: 8px;

    &-desc {
      display: flex;
      padding: 15px;
      font-size: 14px;
      color: #777f89;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
    }

    &-gif {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
  }

  &-bottom {
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100vw;
    height: 129px;
    background-image: url('../../../../assets/imgs/voice-background.png');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    justify-content: center;
    align-items: center;

    &-img {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
