<template>
  <section>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <!-- <keep-alive>    -->
        <component :is="Component" :key="route.path" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import appStore from '@/stores';
import { useRoute } from 'vue-router'

const { LayoutStore } = appStore()
const route = useRoute()

// cachedViews
/* keep-alive
 * include 匹配的组件会被缓存 
 * exclude 匹配的组件都不会缓存 
 * max     最多可以缓存多少组件实例
 * 
 * transition
 * bug: 切换页面不刷新
 * 原因: 因为vue3中是支持template中还有多个子节点，transition还未能兼容。在transition多个子节点可以使用transition-gruop,但在router-view中使用transition-gruop会报错
 * 解决：.vue 文件放入 div标签  
 */
</script>

<style scoped></style>