<template>
  <template v-for="item in menuItemList" :key="item.menuId">
    <el-sub-menu :index="resolvePath(item.path)" v-if="item.children" teleported>
      <template #title>{{ item.meta?.title }}</template>
      <menu-item :basePath="resolvePath(item.path)" :menuItemList="item.children"></menu-item>
    </el-sub-menu>
    <el-menu-item :index="resolvePath(item.path)" :route="resolvePath(item.path)" v-else>
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import type { RouteRecordRaw } from "vue-router"

const props = defineProps({
  // 父地址
  basePath: {
    type: String,
  },
  // 循环体
  menuItemList: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => {
      return []
    },
  },
})
// 路径补全
const resolvePath = (routePath = "") => {
  const isExternal = /^(https?:|mailto:|tel:)/
  if (isExternal.test(routePath)) {
    return routePath
  }
  return props.basePath + "/" + routePath
}
</script>

<style scoped lang="scss"></style>
