<template>
  <el-config-provider :size="LayoutStore().elSize" :z-index="3000" :locale="local">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { LayoutStore } from "@/stores"
import { messages } from "@/locales"

const local = computed(() => {
  return messages[LayoutStore().language]
})
</script>
