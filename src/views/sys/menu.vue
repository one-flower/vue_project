<template>
  <div class="container">
    <el-form :model="searchObj" ref="searchRef" label-width="60px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="searchObj.title" placeholder="菜单名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="地址：" prop="url">
            <el-input v-model="searchObj.path" placeholder="菜单地址" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <el-button @click="reset">重置</el-button> -->
          <el-button type="primary" @click="initTable">查询</el-button>
          <el-button type="primary" @click="onAdd">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData.result" border stripe row-key="menuId" default-expand-all>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="id" prop="menuId" align="" />
      <el-table-column label="父id" prop="pid" align="center" width="80" />
      <el-table-column label="名称" prop="title" align="center" />
      <el-table-column label="图标" prop="icon" align="center" width="80" />
      <el-table-column label="地址" prop="path" align="center" />
      <el-table-column label="重定向" prop="redirect" align="center" />
      <el-table-column label="路由" prop="component" align="center" />
      <el-table-column label="操作" prop="component" align="center" width="180">
        <template v-slot="{ row }">
          <el-button type="primary" @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" @click="onDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加菜单" v-model="addDio" width="50%" :before-close="onCancel">
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
        <el-form-item label="菜单id" prop="menuId">
          <el-input v-model.number="addForm.menuId"></el-input>
        </el-form-item>
        <el-form-item label="父id" prop="pid">
          <el-select v-model="addForm.pid" placeholder="请选择父Id" filterable>
            <el-option v-for="item in formObj.menuIdList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="addForm.pid === -1">
          <div style="width:calc(100% - 80px);">
            <el-select v-model="addForm.icon" placeholder="请选择图标" filterable>
              <el-option v-for="item in formObj.iconList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div style="width: 80px;text-align:right;">
            <svg-icon :icon="addForm.icon" :size="30"></svg-icon>
          </div>
        </el-form-item>
        <el-form-item label="地址" prop="path">
          <el-input v-model="addForm.path"></el-input>
        </el-form-item>
        <el-form-item label="重定向" prop="redirect" v-if="addForm.pid === -1">
          <el-input v-model="addForm.redirect"></el-input>
        </el-form-item>
        <el-form-item label="路由" prop="component">
          <el-select v-model="addForm.component" placeholder="请选择路由" filterable>
            <el-option v-for="item in formObj.compoentList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit(addFormRef)">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>
<script setup lang="ts">
import { handleTree } from '@/utils/index';
import { menuQuery, menuAdd, menuUpdate, menuDelete } from '@/api/user';
import { FormInstance } from 'element-plus/es';
import { toast } from '@/utils/tips';

const searchRef = ref()
const searchObj = reactive({
  title: '',
  path: '',
})
// 新增 编辑表单下拉信息
const formObj = reactive({
  menuIdList: <any[]>[],
  iconList: <any[]>[],
  compoentList: <any[]>[]
})
let tableData = reactive({
  result: <any[]>[]
})


const initTable = () => {
  menuQuery(searchObj).then(res => {
    // 添加菜单信息
    const modules = import.meta.glob('@/views/**/*.vue') //vue文件
    const svgModules = import.meta.glob('@assets/icon/**/*.svg') //svg文件 
    formObj.menuIdList = [{ value: -1, label: '根目录' }]
      .concat(res.data.map((item: { menuId: number, title: string }) => {
        return {
          value: item.menuId,
          label: item.title,
        }
      }))
    formObj.iconList = Object.keys(svgModules).map(item => {
      return item.replace('/src/assets/icon/', '').replace('.svg', '')
    })
    formObj.compoentList = Object.keys(modules).map(item => {
      return item.replace('/src/views', '').replace('.vue', '')
    })

    tableData.result = handleTree(res.data, 'menuId')
  })
}
initTable()

const addFormRef = ref()
const addForm = ref({
  id: undefined,
  menuId: undefined,
  pid: -1,
  title: undefined,
  icon: 'vue',
  path: undefined,
  redirect: undefined,
  component: undefined,
})
const addDio = ref(false)
const onAdd = () => {
  addDio.value = true
}

const onEdit = (row: any) => {
  addDio.value = true
  delete row.children
  addForm.value = { ...row }
}
const onDelete = (id: number) => {
  menuDelete({ id: id }).then(res => {
    toast('操作成功')
    initTable()
  })
}
// 
const onCancel = () => {
  addDio.value = false
  const form = unref(addFormRef)
  form.resetFields()
}
//
const onSubmit = async (addFormRef: FormInstance) => {
  if (!addFormRef) return
  await addFormRef.validate((valid, fields) => {
    if (valid) {
      if (addForm.value.id) {
        menuUpdate(addForm.value).then(res => {
          toast('操作成功')
          initTable()
        })
      } else {
        menuAdd(addForm.value).then(res => {
          toast('操作成功')
          initTable()
        })
      }
      addDio.value = true
    }
  })
}
</script>
<style scoped lang="scss"></style>