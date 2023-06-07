<template>
  <div>
    <Aside-item class="layout__aside" />
    <main class="layout__main">
      <Nav-item class="layout__main__nav" />
      <Artive-item class="layout__main__article" />
    </main>

    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import NavItem from './nav/index.vue'
import AsideItem from './aside/index.vue'
import ArtiveItem from './article/index.vue'
import { UserStore } from '@/stores'
const store = UserStore()
let width = ref('200px')
watch(()=>store.asiderStatus,()=>{
  width.value = store.asiderStatus ? '64px' : '200px'
})
</script>

<style lang="scss" scoped>

.showMenu{
  width: 64px;
}
.layout {
  width: 100%;
  height: 100%;
  position: relative;

  &__aside {
    width: v-bind('width');
    position: fixed;
    top: 0px;
    bottom: 0px;
    transition: all .2s ease;
  }

  &__main {
    position: relative;
    width: calc(100% - v-bind('width'));
    height: 100%;
    margin-left: v-bind('width');
    background-color: #f0f2f5;
    animation: asd 0.5s 0.5s linear both;
    &__nav {
      width: calc(100% - v-bind('width'));
      height: 80px; // 48 + 32
      position: fixed;
      background-color: #fff;
    }

    &__article {
      height: 100%;
      padding-top: 64px;
      overflow: hidden;
    }
  }
}
</style>