<template>
  <div class="pagination">
    <el-pagination
      :currentPage="props.pageNo"
      @current-change="currentChange"
      @size-change="sizeChange"
      :page-size="props.pageNum"
      :page-sizes="props.pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      background
    >
      :pager-count="7">
    </el-pagination>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["update:pageNo", "update:pageNum", "change"])
const props = defineProps({
  pageNo: {
    type: Number,
    default: 1,
  },
  pageNum: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => {
      return [10, 20, 50, 100]
    },
  },
})

// 修改尺寸
const sizeChange = (pageNum: number) => {
  emit("update:pageNum", pageNum)
  emit("change")
}
// 修改页码
const currentChange = (pageNo: number) => {
  emit("update:pageNo", pageNo)
  emit("change")
}
</script>
<style scoped lang="scss">
.pagination {
  float: right;
  margin-top: 10px;
  height: 45px;
}
</style>
