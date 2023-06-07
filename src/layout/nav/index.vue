<template>
  <div>
    <div class="nav__header">
      <!-- aside控制 -->
      <div @click="changeSider" class="nav__header__sign">
        <svg-icon :icon="asideStatus ? 'indent' : 'outdent'" :size="20"></svg-icon>
      </div>
      <!-- 面包屑 -->
      <div class="nav__header__breadcrumb">
        <el-breadcrumb separator="/" size="large">
          <transition-group name='breadcrumb'>
            <el-breadcrumb-item key='/' to="/">主页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in route.matched" :key='item.path' :to="item.path">
              {{ item.meta.title }}
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
      </div>
      <!-- 功能按钮 -->
      <div class="nav__header__icons">
        <div title="刷新" @click="reload"><svg-icon icon="reload" :size="20"></svg-icon></div>
        <div title="设置"><svg-icon icon="setting" :size="20"></svg-icon></div>
      </div>
      <!-- 个人功能菜单 -->
      <div class="nav__header__avatar">
        <el-dropdown trigger="click">
          <!-- 头像 -->
          <span class="nav__header__avatar__head">
            <el-avatar class="nav__header__avatar__head--img" :src="store.headImg" v-if="store.headImg"></el-avatar>
            <svg-icon class="nav__header__avatar__head--img" v-else icon="poke" :size="36"></svg-icon>
            <span class="nav__header__avatar__head--text" :title="store.$state.name">{{ store.$state.name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
    <div class="nav__menu">

    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from '@/stores'
import { useRoute } from 'vue-router';
const route = useRoute()
const store = UserStore()

// 控制aside
let asideStatus = ref(true)
const changeSider = () => {
  asideStatus.value = !asideStatus.value
}
// 页面刷新
const reload = () => {
  window.location.reload();
}
console.log(route.matched);

// 登出
const loginOut = () => {
  store.logout(
  ).then(res => {
  }).catch(err => {
  })
}

</script>

<style lang="scss" scoped>
.nav {
  overflow: hidden;

  &__header {
    height: 48px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(178, 178, 178);

    &__sign {
      width: 48px;
      height: 20px;
      text-align: center;
      cursor: pointer;
    }

    &__breadcrumb {}

    &__icons {
      margin-left: auto;
      display: flex;

      >div {
        margin-right: 16px;
        cursor: pointer
      }
    }

    &__avatar {
      display: flex;
      margin-right: 16px;
      cursor: pointer;

      &__head {
        display: flex;
        align-items: center;

        &--img {
          animation: avatar 1s infinite linear;
        }

        &--text {
          margin-left: 10px;
          width: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  &__menu {
    height: 32px;
  }
}

@keyframes avatar {
  100% {
    transform: rotate(360deg)
  }
}
</style>