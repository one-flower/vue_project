<template>
  <section>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive >  -->
        <!-- :include="" -->
        <component :is="Component" :key="route.path"/>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import appStore from '@/stores';
import { useRoute } from 'vue-router'
const route = useRoute()

const { LayoutStore } = appStore()
// cachedViews
</script>

<style scoped></style>