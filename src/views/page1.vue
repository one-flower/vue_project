<template>
  <div class="container">
    <div class="leaf"></div>
    <div class="leaf"></div>
    <div class="leaf"></div>
  </div>
</template>
<script setup lang="ts">
const value = ref(0)
</script>
<style scoped lang="scss">
.container {
  .leaf {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 100px;
    margin-left: -25px;
    border-radius: 50%;
    background-color: rgb(106, 106, 235);
    margin-top: -100px;
  }

  .leaf:nth-child(2) {
    transform: rotate(240deg);
    left: 440px;
    top: 600px;
  }

  .leaf:nth-child(3) {
    transform: rotate(120deg);
    left: 560px;
    top: 600px;
  }
}
</style>
