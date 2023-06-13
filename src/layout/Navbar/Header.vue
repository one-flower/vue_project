<template>
  <div class="navHeader">
    <!-- aside控制 -->
    <div @click="changeSider" class="navHeader__sign">
      <svg-icon :icon="LayoutStore.silderStatus ? 'indent' : 'outdent'" :size="20"></svg-icon>
    </div>
    <!-- 面包屑 -->
    <div class="navHeader__breadcrumb">
      <el-breadcrumb separator="/" size="large">
        <transition-group name='breadcrumb'>
          <el-breadcrumb-item key='/' to="/">主页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in route.matched" :key='item.path'>
            <!-- <span v-if="item.redirect === 'noRedirect' || index == route.matched.length - 1"> -->
            {{ item.meta.title }}
            <!-- </span> -->
            <!-- <a v-else @click.prevent="handleLink(item, index)">{{ item.meta.title + '1111' }}</a> -->
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="navHeader__menu">
      <!-- 功能按钮 -->
      <div title="刷新" @click="reload" class="navHeader__menu__item">
        <svg-icon icon="reload" :size="20"></svg-icon>
      </div>
      <el-dropdown trigger="click" title="设置" class="navHeader__menu__item" @command="changeSize">
        <span>
          <svg-icon icon="setting" :size="20"></svg-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="large">大尺寸</el-dropdown-item>
            <el-dropdown-item command="default">中尺寸</el-dropdown-item>
            <el-dropdown-item command="small">小尺寸</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div title="格式" @click="reload" class="navHeader__menu__item">
        <svg-icon icon="setting" :size="20"></svg-icon>
      </div>
      <!-- 个人功能菜单 -->
      <el-dropdown trigger="click" class="navHeader__menu__item">
        <!-- 头像 -->
        <span class="navHeader__menu__item--imgSpan">
          <ElAvatar class="navHeader__menu--img" :src="UserStore.headImg" v-if="UserStore.headImg"></ElAvatar>
          <svg-icon class="navHeader__menu--img" v-else icon="poke" :size="36"></svg-icon>
          <span class="navHeader__menu--text" :title="UserStore.name">{{ UserStore.name }}</span>
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
</template>

<script setup lang="ts">
import appStore from '@/stores'
import { useRoute } from 'vue-router'
const { UserStore, LayoutStore } = appStore()
const route = useRoute()

// 控制aside
const changeSider = () => {
  LayoutStore.changeAsideStatus()
}

// 页面刷新
const reload = () => {
  window.location.reload();
}

// 更改默认尺寸
const changeSize = (e: "" | "large" | "default" | "small") => {
  LayoutStore.changeSize(e)
}
// 登出
const loginOut = () => {
  UserStore.logout(
  ).then(res => {
  }).catch(err => {
  })
}
</script>

<style scoped lang="scss">
.navHeader {
  height: $logoHeight;
  line-height: $logoHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &__sign {
    width: $logoHeight;
    height: $logoHeight;
    line-height: $logoHeight;
    text-align: center;
    cursor: pointer;
    transition: background 0.3s;
    float: left;
  }

  &__breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: $logoHeight;
    margin-left: 8px;
    vertical-align: middle;
  }

  &__menu {
    float: right;
    height: $logoHeight;

    &__item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      // vertical-align: text-bottom;
      line-height: $logoHeight;
      cursor: pointer;

      &--imgSpan {
        display: inline-flex;
        align-items: center;
      }
    }

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

@keyframes avatar {
  100% {
    transform: rotate(360deg)
  }
}
</style>