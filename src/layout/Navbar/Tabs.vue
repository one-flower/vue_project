<template>
  <el-tabs v-model="LayoutStore.navIndex" type="card" class="navTabs-demo"
    :closable="LayoutStore.navList.length === 1 ? false : true" @tab-click="clickTab" @tab-remove="removeTab">
    <el-tab-pane v-for="(tag, key) in LayoutStore.navList" :key="tag.path" :label="tag.meta.title" :name="key">
      <template #label>
        <span>
          {{ tag.meta.title }}
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>

  <!-- <div class="navTabs__menu">
    <div>关闭其他</div>
    <div>关闭全部</div>
  </div> -->
</template>

<script setup lang="ts">
import appStore from '@/stores'
import { TabsPaneContext } from 'element-plus/es/components/tabs/src/constants'
import { useRouter } from "vue-router";
const { LayoutStore } = appStore()
const router = useRouter();

const clickTab = (panb: TabsPaneContext) => {
  toPath(LayoutStore.navList[Number(panb.index)])
}

const removeTab = (index: number) => {
  if (index + 1 === LayoutStore.navList.length) {
    // 处理尾数组
    index--
    LayoutStore.removeNavList(index + 1)
  } else {
    LayoutStore.removeNavList(index)
  }
  toPath(LayoutStore.navList[index])
}

// 跳转路由
const toPath = (routerInfo: any) => {
  router.push({
    path: routerInfo.path,
    query: routerInfo.query,
    params: routerInfo.params,
  });
}
</script>

<style lang="scss">
.navTabs-demo {
  color: #333;

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__content {
    display: none;
  }

  .el-tabs__item {
    height: $tabsHeight !important;
  }

  .el-tabs__item:nth-child(1)>i {
    display: none;
  }

  .el-tabs__item::before {
    content: '';
    position: relative;
    right: 5px;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    background-color: #a0cfff;
  }

  .is-active {
    background: #ecf5ff;
    color: #79bbff;
  }
}
</style>