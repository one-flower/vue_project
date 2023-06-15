<template>
  <div class="container">
    <el-form :model="searchObj" ref="searchRef" label-width="60px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="searchObj.name" placeholder="接口名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址：" prop="url">
            <el-input v-model="searchObj.url" placeholder="接口地址" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模块：" prop="model">
            <el-select v-model="searchObj.model" placeholder="接口模块" clearable  class="wid">
              <el-option v-for="item in modelList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="searchObj.status" placeholder="接口状态" clearable>
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table :data="tableData.result" border stripe>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="名称" prop="name" align="center" />
        <el-table-column label="地址" prop="url" align="center" />
        <el-table-column label="模块" prop="model" align="center" />
        <el-table-column label="状态" prop="status" align="center" width="80px" />
      </el-table>
      <pagiation :page-no="searchObj.pageNo"></pagiation>

    </div>
  </div>
</template>
<script setup lang="ts">
import { apiPage } from '@/api/sys';

const statusList = [
  { label: '禁用', value: 0 },
  { label: '启用', value: 1 },
]
const modelList = [
  { label: '模块1', value: 0 },
  { label: '模块2', value: 1 },
]
const searchRef = ref()
const searchObj = reactive({
  name: '',
  url: '',
  model: undefined,
  status: undefined,
  pageNo: 1,
  pageSize: 10,
  total: 0,
})
let tableData = reactive({
  result: []
})

const initTable = () => {
  apiPage(searchObj).then(res => {
    tableData.result = res.data.result
    searchObj.total = res.data.total
    searchObj.pageNo = 2
  })
}
initTable()

const onSearch = () => {
  searchObj.pageNo = 1
  initTable()
}

const reset = () => {
  const form = unref(searchRef)
  console.log(form);

  form.resetFields()
  console.log(searchObj);

}
</script>
<style scoped lang="scss"></style>