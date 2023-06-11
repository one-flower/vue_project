<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <main class="main-container">
      <Navbar />
      <AppMain class="appmain-container" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar/index.vue'
import Sidebar from './Sidebar/index.vue'
import AppMain from './AppMain/index.vue'
import appStore from '@/stores'
const { LayoutStore } = appStore()
const classObj = computed(() => {
  return {
    hideSidebar: LayoutStore.silderStatus
  }
})
</script>