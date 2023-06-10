<template>
  <div>
    <Header></Header>
    <div class="nav__menu">
      <el-scrollbar style="width: calc(100% - 150px);">
        <!-- tag.path -->
        <!--  -->
        <div style="display: flex;">
          <router-link v-for="tag in store.LayoutStore.navList" ref="tag" :key="tag.path" :to="{ path: tag.path, query: tag.query }"
            class="nav__menu--tab" @click.middle.native="" @contextmenu.prevent.native="">
            {{ tag.meta.title }}
            <svg-icon icon="close" :size="12" class="nav__menu--icon" @click.prevent.stop="closeTag(tag)"></svg-icon>
          </router-link>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import Header from './Header.vue'
import appStore from '@/stores'
import { useRoute } from 'vue-router'
const store = appStore()
const route = useRoute()

const closeTag = (tag: any) => {
  console.log(tag);
  store.LayoutStore.removeNavList(tag)
}
// 页面刷新
const reload = () => {
  window.location.reload();
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<style lang="scss" scoped>
.nav {



  &__menu {
    width: 100%;
    height: 32px;

    align-items: center;


    &--tab {
      height: 28px;
      line-height: 20px;
      margin: 2px 5px;
      padding: 2px 8px;
      font-size: 12px;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      text-align: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      color: #495060;
      background: #fff;
      text-decoration: none;
    }

    &--tab:first-child {
      margin-left: 10px;
    }

    &--tab:hover {
      color: #6599ff;
    }

    &--icon {
      vertical-align: middle;
      margin-left: 8px;
    }

  }
}

.el-icon-close {
  width: 16px;
  height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;

  &:before {
    transform: scale(0.6);
    display: inline-block;
    vertical-align: -3px;
  }

  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
}
</style>