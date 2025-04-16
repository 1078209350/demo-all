<template>
  <div class="com__box">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: #000;
}

.loading.la-dark {
  color: #333;
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentcolor;
  border: 0 solid currentcolor;
}

.loading {
  width: 17px;
  height: 17px;
}

.loading > div {
  width: 3px;
  height: 3px;
  margin: 1px;
  border-radius: 100%;
  animation-iteration-count: infinite;
  animation-name: ball-grid-beat;
}

.loading > div:nth-child(1) {
  animation-delay: 0.03s;
  animation-duration: 0.65s;
}

.loading > div:nth-child(2) {
  animation-delay: 0.09s;
  animation-duration: 1.02s;
}

.loading > div:nth-child(3) {
  animation-delay: -0.69s;
  animation-duration: 1.06s;
}

.loading > div:nth-child(4) {
  animation-delay: -0.41s;
  animation-duration: 1.5s;
}

.loading > div:nth-child(5) {
  animation-delay: 0.04s;
  animation-duration: 1.6s;
}

.loading > div:nth-child(6) {
  animation-delay: 0.07s;
  animation-duration: 0.84s;
}

.loading > div:nth-child(7) {
  animation-delay: -0.66s;
  animation-duration: 0.68s;
}

.loading > div:nth-child(8) {
  animation-delay: -0.76s;
  animation-duration: 0.93s;
}

.loading > div:nth-child(9) {
  animation-delay: -0.76s;
  animation-duration: 1.24s;
}

@keyframes ball-grid-beat {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }

  100% {
    opacity: 1;
  }
}
</style>
