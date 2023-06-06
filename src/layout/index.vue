<template>
  <Aside-item class="layout__aside" :style="'width'" />
  <main class="layout__main">
    <Nav-item class="layout__main__nav" />
    <Artive-item class="layout__main__article" />
  </main>

  <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import NavItem from './nav/index.vue'
import AsideItem from './aside/index.vue'
import ArtiveItem from './article/index.vue'
</script>

<style lang="scss" scoped>
$asideWidth: 200px;

.layout {
  width: 100%;
  height: 100%;
  position: relative;

  &__aside {
    width: $asideWidth;
    position: fixed;
    top: 0px;
    bottom: 0px;
  }

  &__main {
    position: relative;
    width: calc(100% - $asideWidth);
    height: 100%;
    margin-left: $asideWidth;
    background-color: #f0f2f5;

    &__nav {
      width: calc(100% - $asideWidth);
      height: 70px;  // 48 + 32
      position: fixed;
      background-color: #fff;
    }

    &__article {
      height: 100%;
      padding-top: 64px;
      overflow: hidden;
    }
  }
}</style>