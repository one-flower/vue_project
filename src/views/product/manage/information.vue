<template>
  <div class="container">
    <el-form :model="searchObj" ref="searchRef" label-width="70px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('forms.name')" prop="name">
            <el-input v-model="searchObj.name" placeholder="" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('forms.barcode')" prop="barcode">
            <el-input v-model="searchObj.barcode" placeholder="" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('forms.category')" prop="category">
            <el-select v-model="searchObj.category" value-key="" placeholder="" clearable>
              <el-option
                v-for="item in dictList.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onSearch">{{ $t("buttons.search") }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData.result" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="id" label="label" width="width"></el-table-column>
    </el-table>
    <Pagiation :page-no="tableData.pageNo" :page-num="tableData.pageNum" :total="tableData.total"></Pagiation>
  </div>
</template>

<script setup lang="ts">
import { toast } from "@/utils/tips"
import { FormInstance } from "element-plus"
import { i18n } from "@/locales"

const { t } = i18n.global

const dictList = {
  options: [
    { label: "分类1", value: "1" },
    { label: "分类2", value: "2" },
    { label: "分类3", value: "3" },
  ],
}

const searchRef = ref<FormInstance>()
const searchObj = reactive({
  name: "",
  barcode: "",
  category: "",
})

const onSearch = () => {
  toast.success(t("tips.success"))
}

const tableData = reactive<TablePage>({
  result: [],
  total: 0,
  pageNo: 1,
  pageNum: 10,
})

const init = () => {}
</script>
<style scoped lang="scss"></style>
