<template>
  <el-config-provider :size="LayoutStore.elSize" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>


<script lang="ts" setup>
import appStore from '@/stores'
const { LayoutStore } = appStore()
const zIndex = 3000

// 切换head信息
const titleName = ref('')
function changeIcon(icon: string) {
  let link: HTMLElement = document.getElementById('linkIcon') || document.createElement("link");
  //@ts-ignore
  link.href = icon
}
const changeHead = () => {
  if (document.visibilityState === "hidden") {
    titleName.value = document.title;
    document.title = "你快回来~~~";
    changeIcon('/cry.svg')
  } else {
    document.title = titleName.value;
    changeIcon('/default.svg')
  }

}
window.addEventListener("visibilitychange", changeHead, false);
// 注销事件
onUnmounted(() => {
  document.removeEventListener("visibilitychange", changeHead)
})
</script>