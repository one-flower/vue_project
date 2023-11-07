<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <main class="main-container">
      <Navbar class="navbar-container" />
      <AppMain class="appmain-container" id="appmain-container" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar/index.vue"
import Sidebar from "./Sidebar/index.vue"
import AppMain from "./AppMain/index.vue"
import { LayoutStore } from "@/stores"

const classObj = computed(() => {
  return {
    hideSidebar: LayoutStore().silderStatus,
  }
})

// 监听浏览器大小
const getTabsize = () => {
  let rect = document.body.getBoundingClientRect()
  if (rect.width <= 768) {
    LayoutStore().silderStatus = true
  } else {
    LayoutStore().silderStatus = false
  }
}

window.addEventListener("resize", getTabsize)

onUnmounted(() => {
  window.addEventListener("resize", getTabsize)
})
</script>
<style scoped lang="scss">
.app-wrapper {
  height: 100%;
}
</style>
