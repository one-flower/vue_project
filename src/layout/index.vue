<template>
  <Nav-item class="layout__nav"/>
  <Aside-item class="layout__aside"/>
  <Artive-item class="layout__article"/>
</template>

<script setup lang="ts">
import NavItem from './nav/index.vue'
import AsideItem from './aside/index.vue'
import ArtiveItem from './article/index.vue'
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  &__nav{
    width: 100%;
    height: 64px;
    position: fixed;
  }
  &__aside{
    width: 150px;
    position: fixed;
    top: 64px;
    bottom: 0px;
  }
  &__article{
    height: 100%;
    padding-top: 64px;
    padding-left: 150px;
    overflow: hidden;
  }
}
</style>