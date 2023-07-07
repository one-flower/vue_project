<template>
  <div class="loaidngConainer" v-show="props.show">
    <div class="main">
      <img src="@assets/default_images/loading.png">
      <div class="text">{{ props.tip?.value }}</div>
    </div>

  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  show: {
    type: Object,
  },
  tip: {
    type: Object,
  }
})
</script>
<style scoped lang="scss">
.loaidngConainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(240, 242, 245, 0.4);
  z-index: 5000;

  .main {
    width: 200px;
    height: 200px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    text-align: center;

    img {
      width: 60px;
      height: 60px;
      position: relative;
      animation: loading 1.5s infinite linear;
    }

    .text {
      margin-top: 15px;
      text-align: center;
      font-size: 20px;
    }
  }
}

@keyframes loading {
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
}
</style>