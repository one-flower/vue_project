<template>
  <div class="navHeader">
    <!-- aside控制 -->
    <div @click="changeSider" class="navHeader__sign">
      <svg-icon :icon="LayoutStore().silderStatus ? 'indent' : 'outdent'" size="20px"></svg-icon>
    </div>
    <!-- 面包屑 -->
    <div class="navHeader__breadcrumb">
      <el-breadcrumb separator="/" size="large">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="item in matched" :key="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="navHeader__menu">
      <div class="navHeader__menu__item">
        <el-dropdown trigger="click" title="设置" @command="setSize" class="img-icon">
          <span>
            <svg-icon icon="setting" size="20px"></svg-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="large">大尺寸</el-dropdown-item>
              <el-dropdown-item command="default">中尺寸</el-dropdown-item>
              <el-dropdown-item command="small">小尺寸</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="navHeader__menu__item w100">
        <el-select v-model="LayoutStore().language" @change="LayoutStore().setLanguage">
          <el-option v-for="item in messages" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 个人功能菜单 -->
      <el-dropdown trigger="click" class="navHeader__menu__item">
        <!-- 头像 -->
        <span class="navHeader__menu__item--imgSpan">
          <ElAvatar class="navHeader__menu--img" :src="UserStore().avatarUrl" v-if="UserStore().avatarUrl"></ElAvatar>
          <svg-icon class="navHeader__menu--img" v-else icon="poke" size="36px"></svg-icon>
          <span class="navHeader__menu--text omit" :title="UserStore().name">{{ UserStore().name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="">占位1</el-dropdown-item>
            <el-dropdown-item @click="">占位1</el-dropdown-item>
            <el-dropdown-item @click="loginOut">{{ $t("value") }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { messages } from "@/locales"
import { UserStore, LayoutStore } from "@/stores"

console.log(messages, localStorage.getItem("language"))
const route = useRoute()
// 控制aside
const changeSider = () => {
  LayoutStore().changeAsideStatus()
}

// 更改默认尺寸
const setSize = (e: "" | "large" | "default" | "small") => {
  LayoutStore().setSize(e)
}
// 登出
const loginOut = () => {
  UserStore()
    .logout()
    .then(() => {
      // 重置pinia
      LayoutStore().$reset()
    })
    .catch(() => {})
}

const matched = computed(() => {
  return route.matched.filter((item: any) => {
    return item.path !== "/"
  })
})
</script>

<style scoped lang="scss">
.navHeader {
  height: $logoHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
  display: flex;

  &__sign {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
    cursor: pointer;
  }

  &__breadcrumb {
    font-size: 14px;
    line-height: $logoHeight;
    margin-left: 8px;

    .el-breadcrumb {
      line-height: inherit;
    }
  }

  &__menu {
    margin-left: auto;
    height: $logoHeight;
    display: flex;
    align-items: center;

    &__item {
      width: fit-content;
      height: inherit;
      padding: 0 8px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .el-dropdown {
        height: inherit;
        width: inherit;
        align-items: center;
        justify-content: center;
      }

      .el-dropdown > span {
        width: inherit;
        height: inherit;
        display: flex;
        align-items: center;
      }

      &--imgSpan {
        display: inline-flex;
        align-items: center;
      }
    }

    &__item:hover {
      background: #f6f6f6;

      .img-icon {
        animation: img-icon 1s 1 forwards;
      }
    }

    &--text {
      margin-left: 10px;
      width: 80px;
    }
  }
}

@keyframes img-icon {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
