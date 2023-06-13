<template>
  <div>
    <Header></Header>
    <Tabs class="navTabs"></Tabs>
  </div>
</template>
    
<script setup lang="ts">
import Header from './Header.vue'
import Tabs from './Tabs.vue'
</script>

<style scoped lang="scss">
.navTabs {
  width: 100%;
  height: $tabsHeight;
  align-items: center;
  overflow: hidden;
  // box-sizing: border-box;

}
</style>