<script setup lang="ts">
import { Swipe, SwipeItem } from 'vant'
import 'vant/lib/index.css'
import { onMounted, ref } from 'vue'
import { getBannerInfo } from '@/api/home'

interface DataList {
  title: string
  titleResult: string
  textMessage: string
  iconUrl: string
  type: string
  desc1: string
  desc2: string
  descPlace: string[]
  imgUrl: string
}

let dataList = ref<DataList[]>([])

onMounted(async () => {
  const res = await getBannerInfo()
  res.data.forEach((item: any) => {
    if (item.type == 'iconText' && item.descPlace != undefined && item.descPlace.length > 0) {
      const arr = item.textMessage.split('{PLACE}')
      item.desc1 = arr[0]
      item.desc2 = arr[1]
    }
  })
  dataList.value = res.data
})

// 点击banner 跳转
const handleCarousel = (item) => {
  if (item.isJump == 'Y') {
    window.location.href = `${item.appJumpUrl}`
  }
}
</script>

<template>
  <div class="carousel">
    <Swipe :autoplay="3000" :loop="true" height="173" indicator-color="white">
      <SwipeItem v-for="(item, index) in dataList" :key="index">
        <div v-if="item.type == 'iconText'" class="item-classify" @click="handleCarousel(item)">
          <div class="cust-left">
            <img :src="item.iconUrl" fit="cover" alt="" />
          </div>
          <div class="cust-right">
            <div class="title">{{ item.titleResult || item.title }}</div>
            <div class="desc">
              <template v-if="item.descPlace == undefined || item.descPlace.length == 0">
                <span class="desc-detail">{{ item.textMessage }}</span>
              </template>
              <template v-else>
                <span class="desc-detail">{{ item.desc1 }}</span>
                <span class="desc-detail-num">{{ item.descPlace[0] }}</span>
                <span class="desc-detail">{{ item.desc2 }}</span>
              </template>
            </div>
          </div>
        </div>
        <div v-if="item.type == 'img'" class="item-classify-img" @click="handleCarousel(item)">
          <img :src="item.imgUrl" fit="cover" alt="图片" />
        </div>
      </SwipeItem>
    </Swipe>
  </div>
</template>

<style scoped lang="less">
.carousel {
  height: 173px;
  background-image: url('@/assets/imgs/banner-occupy.png');
  background-position: center center; /* 垂直水平居中 */
  background-repeat: no-repeat; /* 防止图片重复 */
  background-size: 52px 52px; /* 设置背景图片的大小 */

  .item-classify {
    display: flex;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/imgs/banner-bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .cust-left {
      display: flex;
      width: 45%;
      padding-bottom: 15px;
      box-sizing: border-box;
      justify-content: center;
    }

    .cust-right {
      display: flex;
      width: 55%;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 100% */
        letter-spacing: -0.165px;
        color: #fff;
      }

      .desc {
        margin: 15px 45px 0 0;
        line-height: 22px;

        .desc-detail,
        .desc-detail-num {
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px; /* 100% */
          letter-spacing: -0.165px;
          color: rgb(255 255 255 / 80%);
        }

        .desc-detail-num {
          margin: 0 3px;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
        }
      }
    }

    img {
      height: 100%;
    }
  }

  .item-classify-img {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

:deep(.van-swipe__indicators) {
  bottom: 25px;
}
</style>
