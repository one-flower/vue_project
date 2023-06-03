<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>


<script lang="ts" setup>

const size: "" | "large" | "default" | "small" = 'default'
const zIndex = 3000

</script>