<template>
  <div class="container">
    <el-form :model="searchObj" ref="searchRef" label-width="60px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="名称：">
            <el-input v-model="searchObj.name" placeholder="接口名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址：">
            <el-input v-model="searchObj.url" placeholder="接口地址" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模块：">
            <el-select v-model="searchObj.model" placeholder="接口模块" clearable>
              <el-option v-for="item in modelList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态：">
            <el-select v-model="searchObj.status" placeholder="接口状态" clearable>
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table :data="tableData.result" border stripe>
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="名称" prop="" align="center" />
        <el-table-column label="地址" prop="" align="center" />
        <el-table-column label="模块" prop="" align="center" />
        <el-table-column label="状态" prop="" align="center" />
      </el-table>
      <!-- <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        v-model:currentPage="currentPage"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum" background>
        :pager-count="7">
      </el-pagination> -->

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

const searchObj = reactive({
  name: '',
  url: '',
  model: undefined,
  status: undefined,
})

let tableData = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  result: []
})
const initTable = () => {
  apiPage(searchObj).then(res => {
    tableData = res.data
    console.log(tableData, 'tableData');
  })
}

</script>
<style scoped lang="scss"></style>