<template>
  <div class="aside-container">
    <div class="aside-container__title">
      <svg-icon icon="poke" class="aside-container__title--icon" />
      <div class="aside-container__title--info">精灵球</div>
    </div>
    <div class="aside-container__menu">
      <el-menu router unique-opened background-color="#001529" text-color="#f4f7f9" active-text-color="#6599ff"
        size="large" :collapse="store.asiderStatus" :default-active="route.fullPath">
        <el-sub-menu :index="item.path" v-for="item in store.menuList" :key="item.menuId">
          <template #title>
            <el-icon>
              <svg-icon :size="18" :icon="(item.meta?.icon as string)" />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <menu-item :basePath="item.path" :menuItemList="item.children">
          </menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue';
import { UserStore } from '@/stores'
import { useRoute } from 'vue-router';
const store = UserStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
$bgColor: #001529;

.aside-container {
  background-color: $bgColor;

  // #6599ff
  // #76ddfe
  &__title {
    width: 100%;
    height: 48px;
    padding: 0 15px;
    color: #fff;
    box-sizing: border-box;

    &--icon {
      padding: 8px;
      height: 32px;
      width: 32px;
      display: inline-block;
      vertical-align: middle;
      animation: amplifyIcon .8s ease-in-out;
    }

    &--info {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      vertical-align: middle;
      animation: rotateTitle .8s ease-in-out;
    }
  }

  &__menu {
    width: 100%;
    height: calc(100% - 48px);

    :deep(.el-menu) {
      height: 100%;
      border-right: none !important;
      background: $bgColor;
      color: #fff !important;
    }
  }
}

@keyframes amplifyIcon {
  0% {
    transform: scale(0)
  }

  80% {
    transform: scale(1.2)
  }

  to {
    transform: scale(1)
  }
}

@keyframes rotateTitle {
  from {
    transform: scale(0) rotate(0deg)
  }

  to {
    transform: scale(1) rotate(360deg)
  }
}
</style>
