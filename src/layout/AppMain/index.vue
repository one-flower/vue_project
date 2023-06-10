<template>
  <section>
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive >  -->
        <!-- :include="" -->
        <router-view :key="route.path"/>
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script setup lang="ts">
import appStore from '@/stores';
import {useRoute} from 'vue-router'
const route = useRoute()

const { LayoutStore } = appStore()
// cachedViews
</script>

<style scoped></style>