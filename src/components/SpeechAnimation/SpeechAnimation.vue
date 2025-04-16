<template>
  <div class="bars">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar" style="margin: 0"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.bars {
  display: flex;
}

.bar {
  width: 2px;
  height: 5px;
  margin-right: 8px;
  background: #484f5f;
  border-radius: 3px;
  animation: bounce 1s infinite;
}

.bar:nth-child(2) {
  animation-delay: 0.1s;
}

.bar:nth-child(3) {
  animation-delay: 0.2s;
}

.bar:nth-child(4) {
  animation-delay: 0.3s;
}

.bar:nth-child(5) {
  animation-delay: 0.4s;
}

.bar:nth-child(6) {
  animation-delay: 0.5s;
}

.bar:nth-child(7) {
  animation-delay: 0.6s;
}

.bar:nth-child(8) {
  animation-delay: 0.7s;
}

.bar:nth-child(9) {
  animation-delay: 0.8s;
}

.bar:nth-child(10) {
  animation-delay: 0.9s;
}

.bar:nth-child(11) {
  animation-delay: 1s;
}

.bar:nth-child(12) {
  animation-delay: 1.1s;
}

.bar:nth-child(13) {
  animation-delay: 1.2s;
}

.bar:nth-child(14) {
  animation-delay: 1.3s;
}

.bar:nth-child(15) {
  animation-delay: 1.4s;
}

.bar:nth-child(16) {
  animation-delay: 1.5s;
}

.bar:nth-child(17) {
  animation-delay: 1.6s;
}

.bar:nth-child(18) {
  animation-delay: 1.7s;
}

@keyframes bounce {
  0%,
  100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(3);
  }
}
</style>
