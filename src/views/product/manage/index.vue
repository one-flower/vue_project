<template>
  <div class="container">
    <el-form :model="searchObj" label-width="60px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="searchObj.name" placeholder="菜单名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="模块：" prop="appCode">
            <el-select v-model="searchObj.appCode" placeholder="请选择模块" filterable clearable>
              <el-option
                v-for="item in dictList.appCodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="initTable">查询</el-button>
          <el-button type="primary" @click="onAdd">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div v-loading="tableLoading">
      <el-table :data="tableData.result" border stripe row-key="id" default-expand-all>
        <el-table-column label="名称" prop="name" />
        <el-table-column label="图标" prop="icon" align="center" width="80">
          <template #default="{ row }">
            <svg-icon :icon="row.icon" size="25px" v-if="row.icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="模块" prop="appCode" align="center" width="110" />
        <el-table-column label="地址" prop="path" align="center" />
        <el-table-column label="重定向" prop="redirect" width="150" align="center" />
        <el-table-column label="路由" prop="component" align="center" />
        <el-table-column label="操作" prop="component" align="center" width="220">
          <template v-slot="{ row }">
            <el-button type="primary" :icon="Edit" @click="onEdit(row)" title="编辑" />
            <el-button type="success" :icon="Link" @click="onPermission(row.id)" title="接口" />
            <el-button type="danger" :icon="Delete" @click="onDelete(row.id)" title="删除" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 菜单 -->
      <el-drawer
        :title="formData.id ? '修改菜单' : '添加菜单'"
        v-model="formShow"
        size="500px"
        :before-close="onCancel"
      >
        <el-form :model="formData" ref="formDataRef" :rules="formDataRules" label-width="80px">
          <el-form-item label="上级地址" prop="parentId">
            <el-cascader
              :options="dictList.menuTree"
              v-model="formData.parentId"
              placeholder="请选择父Id"
              clearable
              filterable
              show-all-levels
              :props="{
                expandTrigger: 'click',
                checkStrictly: true,
                emitPath: false,
                label: 'name',
                value: 'id',
                children: 'childrenVoList',
              }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon" v-if="formData.parentId === -1">
            <el-select v-model="formData.icon" placeholder="请选择图标" filterable popper-class="grid-list">
              <el-option v-for="item in dictList.iconList" :key="item" :label="item" :value="item" class="grid-item">
                <svg-icon :icon="item"></svg-icon>
                <div>{{ item }}</div>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="formData.sort" :min="0" :max="9999" :step="1" :controls="true"></el-input-number>
          </el-form-item>
          <el-form-item label="模块" prop="appCode">
            <el-select v-model="formData.appCode" placeholder="请选择模块" filterable>
              <el-option
                v-for="item in dictList.appCodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="path">
            <el-input v-model="formData.path"></el-input>
          </el-form-item>
          <el-form-item label="重定向" prop="redirect" v-if="formData.parentId === -1">
            <el-input v-model="formData.redirect"></el-input>
          </el-form-item>
          <el-form-item label="路由" prop="component">
            <el-select v-model="formData.component" placeholder="请选择路由" clearable filterable>
              <el-option v-for="item in dictList.compoentList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </el-drawer>

      <!-- 接口 -->
      <el-dialog v-model="apiDio" title="接口信息" width="800px" top="5vh" destroy-on-close>
        <api-item v-model="menuId" @cancel="apiCancel" @confirm="apiConfirm"></api-item>
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { menuQuery, menuAdd, menuUpdate, menuDelete, menuApiAdd, menuOptios } from "@/api/sys/menu"
import { allCode } from "@/api/sys/api"
import apiItem from "./api.vue"
import type { FormInstance, FormRules } from "element-plus/es"
import { Edit, Delete, Link } from "@element-plus/icons-vue"
import { handleTree } from "@/utils/index"
import { toast, confirm } from "@/utils/tips"
import { vEg } from "@/utils/verify"
import { i_table } from "@/type/global"

// 字典
const dictList = reactive({
  iconList: <any[]>[],
  compoentList: <any[]>["Layout"],
  appCodeList: [{ label: "sys_admin", value: "sys_admin" }],
  menuTree: <any[]>[],
})
;(() => {
  allCode().then(res => {
    dictList.appCodeList = res.map((item: string) => {
      return {
        label: item,
        value: item,
      }
    })
  })
})()

onMounted(() => {
  const modules = import.meta.glob("@/views/**/**.vue") //vue文件
  const svgModules = import.meta.glob("@assets/icon/**/*.svg") //svg文件
  // 图标list
  dictList.iconList = Object.keys(svgModules).map(item => {
    return item.replace("/src/assets/icon/", "").replace(".svg", "")
  })
  // 路由list
  Object.keys(modules).forEach(item => {
    dictList.compoentList.push(item.replace("/src/views", "").replace(".vue", ""))
  })
})

const searchObj = reactive({
  name: "",
  appCode: "",
  menuId: 1,
})

const tableLoading = ref<boolean>(false)
const tableData = reactive<i_table>({
  result: [],
})
const initTable = () => {
  tableLoading.value = true
  menuQuery(searchObj).then(res => {
    tableData.result = handleTree(res, "id", "parentId")
    tableLoading.value = false
  })

  menuOptios().then(res => {
    dictList.menuTree = [res]
  })
}
initTable()

// 表单
interface FormData {
  id?: number
  parentId: number
  name: string
  icon: string
  appCode: string
  sort: number
  path: string
  redirect: string
  component: string
}
const formShow = ref(false)
const formData = reactive<FormData>({
  id: undefined,
  parentId: -1,
  name: "",
  icon: "vue",
  appCode: "sys_admin",
  sort: 0,
  path: "",
  redirect: "",
  component: "Layout",
})
const formDataRef = ref<FormInstance>()
const formDataRules = reactive<FormRules>({
  parentId: [{ required: true, message: "请选择父Id", trigger: "change" }],
  name: [{ required: true, message: "请填写菜单名称", trigger: "change" }],
  appCode: [{ required: true, message: "请选择模块", trigger: "change" }],
  path: [{ required: true, validator: vEg, trigger: "blur" }],
  redirect: [{ required: false, message: "", trigger: "blur" }],
})

// 新增
const onAdd = () => {
  formShow.value = true
  formData.id = undefined
}
// 编辑
const onEdit = (row: any) => {
  formShow.value = true
  nextTick(() => {
    formData.id = row.id
    formData.parentId = row.parentId
    formData.name = row.name
    formData.icon = row.icon
    formData.sort = row.sort || 0
    formData.appCode = row.appCode
    formData.path = row.path
    formData.redirect = row.redirect || ""
    formData.component = row.component
  })
}
// 删除
const onDelete = (id: number) => {
  confirm("是否确认删除").then(() => {
    menuDelete({ id: id })
      .then((res: any) => {
        toast.success(res)
        initTable()
      })
      .catch((rej: any) => {
        toast.error(rej)
      })
  })
}

// 取消
const onCancel = () => {
  formDataRef.value?.resetFields()
  formShow.value = false
}
// 提交
const onSubmit = () => {
  formDataRef.value?.validate(valid => {
    if (valid) {
      if (formData.parentId !== -1) {
        formData.icon = ""
        formData.redirect = ""
      }
      if (formData.id) {
        menuUpdate(formData).then(() => {
          toast.success("操作成功")
          onCancel()
          initTable()
        })
      } else {
        menuAdd(formData).then(() => {
          toast.success("操作成功")
          onCancel()
          initTable()
        })
      }
    }
  })
}

// 接口
const apiDio = ref<boolean>(false)
const menuId = ref<number>()
// 查询接口
const onPermission = (id: number) => {
  menuId.value = id
  apiDio.value = true
}
// 接口保存
const apiCancel = () => {
  apiDio.value = false
}
const apiConfirm = (list: any[]) => {
  menuApiAdd(list).then(() => {
    toast.success("操作成功")
    apiDio.value = false
  })
}
</script>
<style scoped lang="scss">
.grid-item {
  display: flex;
}

.grid-item > div {
  margin-left: 8px;
}
</style>
<style lang="scss">
// 图标下拉样式
.grid-list .el-select-dropdown__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
