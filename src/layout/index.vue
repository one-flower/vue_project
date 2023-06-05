<template>
  <Aside-item class="layout__aside" :style="'width'" />
  <main class="layout__main">
    <Nav-item class="layout__main__nav" />
    <Artive-item class="layout__main__article" />
  </main>
</template>

<script setup lang="ts">
import NavItem from './nav/index.vue'
import AsideItem from './aside/index.vue'
import ArtiveItem from './article/index.vue'

// import { UserStore } from '@/stores';
// const store = UserStore()
// const asideWidth = store.asideWidth
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
    width: calc(100% - $asideWidth);
    height: 100%;
    margin-left: $asideWidth;
    background-color: #f0f2f5;
    &__nav {
      width: 100%;
      height: 64px;
      position: fixed;
    }

    &__article {
      height: 100%;
      padding-top: 64px;
      padding-left: $asideWidth;
      overflow: hidden;
    }
  }
}
</style>