<template>
  <div>
    <div class="nav__header">
      <!-- aside控制 -->
      <div @click="changeSider" class="nav__header__sign">
        <svg-icon :icon="store.asiderStatus ? 'indent' : 'outdent'" :size="20"></svg-icon>
      </div>
      <!-- 面包屑 -->
      <div class="nav__header__breadcrumb">
        <el-breadcrumb separator="/" size="large">
          <transition-group name='breadcrumb'>
            <!-- <el-breadcrumb-item key='/' to="/">主页</el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="(item, index) in route.matched" :key='item.path'>
              <!-- <span v-if="item.redirect === 'noRedirect' || index == route.matched.length - 1"> -->
              {{ item.meta.title }}
              <!-- </span> -->
              <!-- <a v-else @click.prevent="handleLink(item, index)">{{ item.meta.title + '1111' }}</a> -->
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
      <el-scrollbar style="width: calc(100% - 150px);">
        <!-- tag.path -->
        <!--  -->
        <div style="display: flex;">
          <router-link v-for="tag in store.navList" ref="tag" :key="tag.path" :to="{ path: tag.path, query: tag.query }" class="nav__menu--tab"
            @click.middle.native="" @contextmenu.prevent.native="">
            {{tag.meta.title}}
            <svg-icon icon="close" :size="12" class="nav__menu--icon" @click.prevent.stop="closeTag(tag)"></svg-icon>
          </router-link>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import { UserStore } from '@/stores'
import { useRoute } from 'vue-router'
const store = UserStore()
const route = useRoute()


// 控制aside
let asideStatus = ref(true)
const changeSider = () => {
  store.changeAsideStatus()
}

const closeTag = (tag: any)=>{
  console.log(tag);
  store.removeNavList(tag)
}
// 页面刷新
const reload = () => {
  window.location.reload();
}

// 登出
const loginOut = () => {
  store.logout(
  ).then(res => {
  }).catch(err => {
  })
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<style lang="scss" scoped>
.nav {
  overflow: hidden;

  &__header {
    height: 48px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(178, 178, 178);
    box-sizing: border-box;

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
    width: 100%;
    height: 32px;

    align-items: center;


    &--tab {
      height: 28px;
      line-height: 20px;
      margin: 2px 5px;
      padding: 2px 8px;
      font-size: 12px;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      text-align: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      color: #495060;
      background: #fff;
      text-decoration: none;
    }

    &--tab:first-child {
      margin-left: 10px;
    }

    &--tab:hover {
      color: #6599ff;
    }

    &--icon {
      vertical-align: middle;
      margin-left: 8px;
    }

  }
}

@keyframes avatar {
  100% {
    transform: rotate(360deg)
  }
}

.el-icon-close {
  width: 16px;
  height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;

  &:before {
    transform: scale(0.6);
    display: inline-block;
    vertical-align: -3px;
  }

  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
}
</style>