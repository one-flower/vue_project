<template>
  <el-form :model="pwdForm" ref="pwdRef" label-width="80px" :rules="rules">
    <el-form-item label="当前密码" prop="oldPass">
      <el-input v-model="pwdForm.oldPass" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="pwdForm.password" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input v-model="pwdForm.checkPass" placeholder="" :type="pwdType" autocomplete="off">
        <template #suffix>
          <svg-icon
            size="25px"
            :icon="pwdType === 'password' ? 'show' : 'hide'"
            @click="changePwd"
            style="cursor: pointer"
          ></svg-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>

  <div style="text-align: center">
    <el-button type="primary" @click="confirm(pwdRef)">确定</el-button>
    <el-button @click="cancel">取消</el-button>
  </div>
</template>

<script setup lang="ts">
import { psdUpdate } from "@/api/sys/user"
import { toast } from "@/utils/tips"
import { vPwd } from "@/utils/verify"
import type { FormRules, FormInstance } from "element-plus/es"

const pwdRef = ref()
const pwdForm = reactive({
  oldPass: "",
  password: "",
  checkPass: "",
})

const checkPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"))
  } else if (value !== pwdForm.password) {
    callback(new Error("密码不一致!"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  oldPass: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, validator: vPwd, trigger: "blur" }],
  checkPass: [{ required: true, validator: checkPass, trigger: "blur" }],
})

// 切换代码显隐
let pwdType = ref("password")
const changePwd = () => {
  pwdType.value = pwdType.value === "password" ? "" : "password"
}

const emit = defineEmits(["cancel"])
const cancel = () => {
  emit("cancel")
}

const confirm = async (pwdRef: FormInstance) => {
  if (!pwdRef) return

  await pwdRef.validate(valid => {
    if (valid) {
      psdUpdate(pwdForm).then(() => {
        toast.success("操作成功")
        emit("cancel")
      })
    }
  })
}
</script>

<style scoped lang="scss"></style>
