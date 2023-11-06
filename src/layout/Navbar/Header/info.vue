<template>
  <div class="container">
    <el-form :model="formData" ref="fromRef" label-width="60px" :rules="formDataRules" label-position="right">
      <el-form-item label="账号" prop="account">
        <el-input v-model="formData.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatarUrl">
        <u-head v-model:imageUrl="formData.avatarUrl"></u-head>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from "element-plus/es"
import { UserStore } from "@/stores"
import { toast } from "@/utils/tip.js"
import { vPhone } from "@/utils/verify"

interface FormDate {
  account: string
  name: string
  avatarUrl: string
}
const formData = reactive<FormDate>({
  account: UserStore().account,
  name: UserStore().name,
  avatarUrl: UserStore().avatarUrl,
})

const fromRef = ref<FormInstance>()
const formDataRules = reactive<FormRules>({
  account: [{ required: true, validator: vPhone, trigger: "blur" }],
  name: [{ required: true, message: "请填写昵称", trigger: "blur" }],
  avatarUrl: [{ required: true, message: "请选择照片", trigger: "blur" }],
})

const emit = defineEmits(["cancel"])
const confirm = () => {
  fromRef.value?.validate(valid => {
    if (valid) {
      toast.success("操作成功")
      emit("cancel")
    }
  })
}
const cancel = () => {
  emit("cancel")
}
</script>
<style lang="scss" scoped></style>
