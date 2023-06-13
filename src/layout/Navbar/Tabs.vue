<template>
  <el-tabs v-model="LayoutStore.navIndex" type="card" class="navTabs-demo" closable @tab-click="clickTab"
    @tab-remove="removeTab">
    <el-tab-pane v-for="tag in LayoutStore.navList" :key="tag.path" :label="tag.meta.title" :name="tag.path">
      <template #label>
        <span class="custom-tabs-label">
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
import { useRouter } from 'vue-router'
const { LayoutStore } = appStore()
const router = useRouter()

const clickTab = (panb: TabsPaneContext) => {
  for (const item of LayoutStore.navList) {
    if (item.path === panb.paneName) {
      router.push({
        path: item.path,
        query: item.query,
        params: item.params,
      })
      break
    }
  }
}

const removeTab = (routePath: string) => {
  LayoutStore.removeNavList(routePath)
}
</script>

<style lang="scss">
.navTabs-demo {
  color: #333;

  .el-tabs__header {
    border-bottom: 1px solid #e4e7ed;
  }

  .el-tabs__content {
    display: none;
  }

  .el-tabs__item {
    height: $tabsHeight !important;
  }

  // .el-tabs__item:hover {
  //   color:  #95d475;
  // }
  .is-active {
    background: #ecf5ff;
    color: #79bbff;
  }
}
</style>