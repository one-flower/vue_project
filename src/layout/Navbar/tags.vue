<template>
  <div>
    <el-scrollbar class="navTags__scroll" ref="scrollbarRef" wrap-style="overflow-x: hidden"
      @wheel.prevent="onHandleScroll">
      <router-link v-for="(tag, index) in LayoutStore.navList" :ref="tag.path" :key="tag.path"
        :to="{ path: tag.path, query: tag.query }" class="navTags__scroll--tab" @click.middle.native=""
        @contextmenu.prevent.native="">
        {{ tag.meta.title }}{{ tag.path }} 111111111111111111111-- {{ LayoutStore.navIndex }}
        <svg-icon icon="close" :size="12" class="navTags__scroll--icon" @click.prevent.stop="closeTag(tag)"></svg-icon>
      </router-link>
    </el-scrollbar>
    <!-- <div class="navTags__menu">
      <div>关闭其他</div>
      <div>关闭全部</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import appStore from '@/stores'
import { useRoute } from 'vue-router'
const { LayoutStore } = appStore()
const route = useRoute()

const closeTag = (tag: any) => {
  LayoutStore.removeNavList(tag)
}
const { proxy } = getCurrentInstance() as any


const scrollbarRef = ref(null)
const tagsRefs = reactive<HTMLDivElement>([])
watch(() => route.path, () => {
  nextTick(() => {
    let scroll = proxy.$refs.scrollbarRef.$refs.wrapRef
    if(LayoutStore.navIndex === 0) scroll.scrollLeft = 0

    let el = proxy.$refs[route.path][LayoutStore.navIndex].$el
    // let el
    if(el.offsetLeft + el.offsetWidth <= scroll.scrollWidth){ 
      // 不用动
    }else {

    }
    // let leftWidth = proxy.$refs[route.path][0].$el.offsetLeft -  proxy.$refs[route.path][0].$el.offsetWidth
    // proxy.$refs.scrollbarRef.$refs.wrapRef.scrollLeft = leftWidth
  })
})

const onHandleScroll = (e: any) => {
  console.log(proxy.$refs.scrollbarRef.$refs.wrap);
  // console.log(e, 'e');

  // proxy.$refs.scrollbarRef.$refs.wrap.scrollLeft += e.wheelDelta / 4
}
</script>

<style scoped lang="scss">
.navTags {
  width: 100%;
  height: $tagsHeight;
  align-items: center;

  &__scroll {
    position: relative;
    width: 100%;
    // width: calc(100% - 200px);
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;

    &--tab {
      position: relative;
      display: inline-block;
      color: #fff;
      background-color: #42b983;
      border: #42b983;
      line-height: $tagsHeight - 8px;
      margin: 4px;
      padding: 0 8px;
      box-sizing: border-box;
      text-decoration: none;
    }

    &--tab:first-child {
      margin-left: 10px;
    }

    &--icon {
      margin-left: 5px;
      padding: 2px;
    }

    &--icon:hover {
      border-radius: 50%;

      background-color: #b4bccc;
      color: #fff;
    }

    :deep() {
      .el-scrollbar__bar {
        bottom: 0px;
      }

      .el-scrollbar__wrap {
        height: $tagsHeight;
      }
    }

  }

  // &__menu {
  //   position: relative;
  //   width: 200px;
  //   height: 100%;
  //   display: inline-block;
  //   vertical-align: top;
  // }
}
</style>