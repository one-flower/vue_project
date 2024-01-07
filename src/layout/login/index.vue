<template>
  <div class="login-container">
    <div class="loginMain">
      <div class="loginMain__body">
        <!-- left -->
        <div class="loginMain-sideBox mainBox">
          <img src="@assets/icons/future.svg" />
        </div>
        <!-- right -->
        <div class="loginMain-form mainBox">
          <div class="loginMain-form__container">
            <!-- 头 -->
            <header class="loginMain-form__header">
              <h2 class="loginMain-form__title">登录</h2>
              <span class="loginMain-form__switch">
                没有账号？
                <a href="javascript:void 0" @click="onSign">{{ "点击注册" }}</a>
              </span>
            </header>
            <!-- 登录from -->
            <el-form :model="loginForm" ref="loginFormRef" :rules="rules" size="large">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入账号" @keyup.enter="loginSubmit">
                  <template #prefix>
                    <svg-icon size="25px" icon="user"></svg-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  :type="pwdType"
                  @keyup.enter="loginSubmit"
                >
                  <template #prefix>
                    <svg-icon size="25px" icon="pwd"></svg-icon>
                  </template>
                  <template #suffix>
                    <svg-icon
                      size="25px"
                      :icon="pwdType === 'password' ? 'show' : 'hide'"
                      @click="changePwd"
                      style="cursor: pointer; display: flex"
                    ></svg-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" @click="loginSubmit" :loading="loading" class="wid">
                  登录
                </el-button>
              </el-form-item>
            </el-form>
            <!-- tip -->
            <div style="text-align: center">
              <a href="javascript:void 0" @click="changeForm">
                已有账号？忘记密码
                <!-- {{ formType === "login" ? "已有账号？忘记密码" : "返回登录" }} -->
              </a>
            </div>
            <!-- icon -->
            <div class="loginMain-form__other-login">
              <el-divider content-position="center">其他登录方式</el-divider>
              <div class="loginMain-form__other-login__icon">
                <svg-icon icon="eat-m" size="32px" @click="otherLogin" class="icon-hover"></svg-icon>
                <svg-icon icon="eat-kfc" size="32px" @click="otherLogin" class="icon-hover"></svg-icon>
                <svg-icon icon="eat-pizzahut" size="32px" @click="otherLogin" class="icon-hover"></svg-icon>
                <svg-icon icon="eat-starbucks" size="32px" @click="otherLogin" class="icon-hover"></svg-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 脚注 -->
      <div class="loginMain__footer">
        <a href="javascript:void 0">开发文档</a>
        <a href="javascript:void 0">操作手册</a>
        <a href="javascript:void 0">占位符</a>
        <a href="javascript:void 0">占位符</a>
        <a href="javascript:void 0">占位符</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from "element-plus/es"
import { vPwd } from "@/utils/verify"
import { toast } from "@/utils/tip"
import { UserStore } from "@/stores"

const loading = ref(false)
let pwdType = ref("password")
const changePwd = () => {
  pwdType.value = pwdType.value === "password" ? "" : "password"
}

// 登录
const loginForm = reactive({
  username: "",
  password: "",
})
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, validator: vPwd, trigger: "blur" }],
})

const router = useRouter()
const loginFormRef = ref<FormInstance>()
// const formType = ref<string>("login")
const loginSubmit = () => {
  loginFormRef.value!.validate(valid => {
    if (valid) {
      loading.value = true
      UserStore()
        .login(loginForm)
        .then(() => {
          loading.value = false
          toast.success("登录成功")
          router.replace("/")
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}

// 注册
const onSign = () => {
  toast.warning("未开放功能")
}

// const forgetFormRef = ref<FormInstance>()
// const forgetForm = reactive({
//   oldPsd: '',
//   newPsd: '',
//   checkPsd: ''
// })
// const checkPass = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('请再次输入密码'))
//   } else if (value !== forgetForm.newPsd) {
//     callback(new Error("密码不一致!"))
//   } else {
//     callback()
//   }
// }
// const frogetRules = reactive<FormRules>({
//   oldPsd: [{ required: true, validator: vPwd, trigger: 'blur' }],
//   newPsd: [{ required: true, validator: vPwd, trigger: 'blur' }],
//   checkPsd: [{ required: true, validator: checkPass, trigger: 'blur' }],
// })
// const forgetSubmit = () => {
//   forgetFormRef.value!.validate((valid, fields) => {
//     if (valid) {

//     }
//   })
// }
// 忘记密码
const changeForm = () => {
  toast.warning("未开放功能")
  // formType.value = formType.value === 'login' ? 'forget' : 'login'
}

// 其他方式登录
const otherLogin = () => {
  toast.success("V我50")
}
</script>

<style lang="scss" scoped>
$mWidth: 500px;

h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
}

h3,
h4 {
  margin: 0.5rem 0;
  font-weight: bold;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #005980;
}

.login-container {
  width: 100%;
  height: 100%;
  min-width: $mWidth;

  :deep(.el-input__wrapper) {
    height: 50px;
    font-size: 20px;
  }
}

.loginMain {
  min-width: 1000px;
  margin: 0 auto;
  margin-top: 10%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  &__body {
    min-height: $mWidth;
    display: flex;
    box-shadow: 0px 20px 80px 0px rgba(0, 0, 0, 0.3);
  }

  &__footer {
    margin-top: 60px;
    text-align: center;

    a {
      margin: 0 20px;
    }
  }
}

.loginMain-sideBox {
  display: flex;
  background-color: rgb(241, 243, 255);

  img {
    padding: 50px;
  }
}

.loginMain-form {
  background-color: #fff;

  &__container {
    padding: 64px 70px 48px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
  }

  // &__title {
  // }

  &__switch {
    float: right;
  }

  &__other-login {
    margin-top: 80px;

    &__icon {
      display: flex;
      justify-content: space-evenly;
    }
  }
}

.mainBox {
  margin: 0 auto;
  width: 50%;
  min-height: $mWidth;
}

// 媒体
@media screen and (max-width: 800px) {
  .loginMain {
    min-width: 500px;
  }

  .loginMain-sideBox {
    display: none;
  }

  .loginMain-form {
    min-width: $mWidth;
  }
}

.h2 {
  font-size: 1.5rem;
}

.icon-hover {
  cursor: pointer;
}
</style>
