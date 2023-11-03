<template>
  <div style="padding: 20px 20px">
    <el-tabs v-model="noteActive" tab-position="top" @tab-click="" @tabClick="noteClick">
      <el-tab-pane :label="`通知 (${tipTable.total})`" name="tip">
        <div class="noteBox" v-for="(item, index) in tipTable.result">
          <div
            class="noteBox__title omit"
            :class="{ 'is-read': item.flag }"
            :title="item.title"
            @click="changeTitle('tip', index)"
          >
            {{ item.title }}
          </div>
          <div class="noteBox__time">{{ item.time }}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`消息(${msgTable.total})`" name="msg"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
// 消息通知
const noteActive = ref("tip")
const tipTable = reactive({
  pageNo: 1,
  pageNum: 10,
  total: 2,
  result: [
    {
      id: 1,
      title: "我是标题我是标题我是标题我是标题我是标题我是标题111111",
      time: "2020-01-01 11:12:24",
      flag: true,
    },
    {
      id: 2,
      title: "我是标题我是标题我是标题我是标题我是标题我是标题",
      time: "2020-01-01 11:12:24",
      flag: false,
    },
  ],
})
const msgTable = reactive({
  pageNo: 1,
  pageNum: 10,
  total: 0,
  result: [],
})
const noteClick = (e: any) => {
  if (e.paneName === "tip") {
    //通知
  } else {
    //消息
  }
}

const changeTitle = (type: string, id: number) => {
  tipTable.result[id].flag = !tipTable.result[id].flag
}
// 默认查询tip
</script>

<style scoped lang="scss">
.noteBox {
  width: 150px;
  height: 60px;
  padding: 10px;

  &__title {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }

  &__time {
    color: #a5a5a5;
    height: 20px;
  }

  .is-read {
    text-decoration: line-through;
  }
}
</style>
