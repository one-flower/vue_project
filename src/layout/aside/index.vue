<template>
  <div class="aside-container">
    <template v-for="item in menuList">
      <h2 v-if="item.level === 1" class="aside-container__title">{{ item.name }}</h2>
      <router-link v-else :to="item.path || ''">
        <p class="aside-container__item" :title="item.name" :class="{ 'is-active': checkPath === item.path }">
          {{ item.name }}
        </p>
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, } from 'vue';
interface menuType {
  id: number,
  name: string,
  level: number,
  path?: string,
  isGo?: boolean,
  children?: menuType[]
}
const menuList: menuType[] = reactive([
  { id: 100, name: '基础', level: 1 },
  { id: 101, name: '响应式基础写法', level: 2, path: '/basicInfo' },
  { id: 102, name: 'computed', level: 2, path: '/computed' },
  { id: 200, name: '2', level: 1 },
])

import { useRouter } from 'vue-router'
const router = useRouter()
let checkPath = ref('')
watch(() =>
  router.currentRoute.value.path,
  (toPath) => {
    checkPath.value = toPath
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.aside-container {
  border: 1px solid #666;

  a {
    text-decoration: inherit;
  }


  &__title,
  &__item {
    padding: 5px 15px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #3c3c3c;
    transition: color .5s;
  }

  &__title {
    margin-top: 20px;
    margin-bottom: 10px;
    cursor: default;
  }
  &__item {
    line-height: 20px;
  }
  .is-active {
    color: #35eb9a;
    transition: color .25s;
  }
}
</style>