<template>
  <div class="container">
    <el-form :model="searchObj" ref="searchRef" label-width="60px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="searchObj.name" placeholder="菜单名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地址：" prop="url">
            <el-input v-model="searchObj.url" placeholder="菜单地址" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="模块：" prop="model">
            <el-select v-model="searchObj.model" placeholder="接口模块" clearable class="wid">
              <el-option v-for="item in modelList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="onAdd">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table :data="tableData.result" border stripe row-key="menuId" default-expand-all>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="id" prop="menuId" align="" />
        <el-table-column label="父id" prop="pid" align="center" />
        <el-table-column label="名称" prop="title" align="center" />
        <el-table-column label="图标" prop="icon" align="center" />
        <el-table-column label="地址" prop="path" align="center" />
        <el-table-column label="路由" prop="component" align="center" />
      </el-table>
    </div>

    <el-dialog title="添加菜单" v-model="addDio" width="50%" :before-close="onCancel">
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
        <el-form-item label="菜单id" prop="menuId">
          <el-input v-model="addForm.menuId"></el-input>
        </el-form-item>
        <el-form-item label="父id" prop="pid">
          <el-input v-model="addForm.pid"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="addForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="path">
          <el-input v-model="addForm.path"></el-input>
        </el-form-item>
        <el-form-item label="路由" prop="component">
          <el-input v-model="addForm.component"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>
<script setup lang="ts">
import { handleTree } from '@/utils/index';
import { menuQuery, menuAdd } from '@/api/user';

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
})

interface tableData {
  result: any[]
}
let tableData: tableData = reactive({
  result: []
})

const initTable = () => {
  menuQuery().then(res => {
    tableData.result = handleTree(res.data, 'menuId')
  })

}
initTable()

const reset = () => {
  const form = unref(searchRef)
  form.resetFields()
}

const onSearch = () => {
  initTable()
}
// 添加菜单信息
const addFormRef = ref()
const addForm = reactive({
  menuId: undefined,
  pid: undefined,
  title: undefined,
  icon: undefined,
  path: undefined,
  component: undefined,
})
const addDio = ref(false)
const onAdd = () => {
  addDio.value = true
}

// 
const onCancel = () => {
  addDio.value = false
  const form = unref(addFormRef)
  form.resetFields()
}
//
const onSubmit = () => {
  menuAdd(addForm).then(res => {
    console.log(res);
    
  })
}
</script>
<style scoped lang="scss"></style>