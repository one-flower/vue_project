<template>
  <div class="aside-container">
    <Logo></Logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        unique-opened
        :background-color="variables.menuColor"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        size="large"
        :collapse="LayoutStore().silderStatus"
        :collapse-transition="false"
        :default-active="route.fullPath"
      >
        <template v-for="item in UserStore().menuList" :key="item.menuId">
          <!-- 多级菜单 -->
          <el-sub-menu :index="item.path" v-if="item.children && !item.redirect">
            <template #title>
              <el-icon>
                <svg-icon size="18px" :icon="item.meta?.icon as string" />
              </el-icon>
              <span>{{ item.meta?.title }}</span>
            </template>
            <menu-item :basePath="item.path" :menuItemList="item.children"></menu-item>
          </el-sub-menu>
          <!-- 单菜单 -->
          <el-menu-item :index="item.path" :route="item.path" v-else>
            <el-icon>
              <svg-icon size="18px" :icon="item.meta?.icon"></svg-icon>
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import variables from "@/styles/variables.module.scss"

import { LayoutStore, UserStore } from "@/stores"
import Logo from "./logo.vue"
import { storeRoutes } from "@router/storeMenu"

import MenuItem from "./menu-item.vue"

const route = useRoute()
</script>

<style lang="scss" scoped>
.aside-container {
  background-color: $menuColor;

  &__menu {
    width: 100%;
    height: calc(100% - $logoHeight);
  }
}
</style>
