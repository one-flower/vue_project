<template>
  <div class="aside-container">
    <Logo></Logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router unique-opened :background-color="variables.menuColor" :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText" size="large" :collapse="store.LayoutStore.silderStatus"
        :collapse-transition="false" :default-active="route.fullPath">
        <el-sub-menu :index="item.path" v-for="item in store.UserStore.menuList" :key="item.menuId">
          <template #title>
            <el-icon>
              <svg-icon :size="18" :icon="(item.meta?.icon as string)" />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <menu-item :basePath="item.path" :menuItemList="item.children">
          </menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import variables from '@/styles/variables.module.scss'
import Logo from './logo.vue';
import MenuItem from './menu-item.vue';
import appStore from '@/stores'
import { useRoute } from 'vue-router';

const store = appStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.aside-container {
  background-color: $menuColor ;

  &__menu {
    width: 100%;
    height: calc(100% - $logoHeight);
  }
}
</style>
