<template>
  <div class="container">
    <el-form :model="loadingObj" ref="form" label-width="120px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="loading时间：">
            <el-input v-model.number="loadingObj.number" placeholder="loading时间"></el-input>
          </el-form-item></el-col>
        <el-col :span="12">
          <el-form-item label="loading信息：">
            <el-input v-model="loadingObj.title" placeholder="loading信息"></el-input>
          </el-form-item></el-col>
      </el-row>
    </el-form>
    <el-button type="primary" @click="enterLoading">页面loading</el-button>
    <el-button type="primary" @click="enterLoading2">全局loading</el-button>
  </div>
</template>

<script setup lang="ts">
import load from '@/components/Loading/index';

nextTick(() => {
  load.setTarget(document.getElementsByClassName('container')[0])
})

const loadingObj = reactive({
  number: 3,
  title: '进入loading'
})
const enterLoading = () => {
  load.setTarget(document.getElementsByClassName('container')[0])
  load.open(loadingObj.title)
  load.close(loadingObj.number)
}
const enterLoading2 = () => {
  load.setTarget(document.body)
  load.open(loadingObj.title)
  load.close(loadingObj.number)
}
</script>

<style scoped lang="scss">
</style>