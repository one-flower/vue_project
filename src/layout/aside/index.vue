<template>
  <div class="aside-container">
    <div class="aside-container__title">
      <svg-icon icon="poke" class="aside-container__title__icon" />
      <div class="aside-container__title__info">精灵球</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import route from '@/router'
const router = route
console.log(route.options.routes,'ssss',);

</script>

<style lang="scss" scoped>
.aside-container {
  background-color: #001529;

  // #6599ff
  // #76ddfe
  &__title {
    width: 100%;
    height: 64px;
    color: #fff;


    &__icon {
      padding: 12px;
      height: 40px;
      width: 40px;
      display: inline-block;
      vertical-align: middle;
    }

    &__info {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>