<template>
  {{ props }}
  <div class="pagination">
    <el-pagination v-model:currentPage="props.pageNo" @current-change="currentChange" @size-change="sizeChange"
    :page-size="props.pageNum" :page-sizes="props.pageSizes" layout="total, sizes, prev, pager, next, jumper"
    :total="props.total" background>
    :pager-count="7">
  </el-pagination>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  pageNo: {
    type: Number,
    default: 1
  },
  pageNum: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 50, 100]
    }
  }
})

// 修改尺寸
const sizeChange = () => {
  // emit(update: pageNum, 2)
}
// 修改页码
const currentChange = () => {

}
</script>
<style scoped lang="scss">
.pagination{
  float: right;
  margin: 5px 0;
}
</style>