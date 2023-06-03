<template>
  <div class="login-container">
    <!-- <img src="@assets/login_images/login_bg.png"/> -->
    <div class="login-container__header">
      <img src="@assets/login_images/logoTop.png" />
    </div>
    <div class="login-container__body">
      <div class="login-container__body__img">
        <img src="@assets/login_images/login.png" />
      </div>
      <div class="login-container__body__form">
        <div class="title">登录</div>
        <el-form :model="loginForm" ref="refLogin" :rules="rules" size="large">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入账号">
              <template #prefix>
                <svg-icon :width="25" :height="25" icon="vue"></svg-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" :type="pwdType">
              <template #prefix>
                <svg-icon :width="25" :height="25" icon="vue"></svg-icon>
              </template>
              <template #suffix>
                <svg-icon :width="25" :height="25" :icon="pwdType === 'password' ? 'show' : 'hide'" @click="changePwd"
                  style="cursor: pointer;"></svg-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" class="code">
              <template #prefix>
                <svg-icon :width="25" :height="25" icon="vue"></svg-icon>
              </template>
            </el-input>
            <img :src="imgBase" class="code-img" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="loginSubmit()" class="wid">登录</el-button>
          </el-form-item>
        </el-form>


      </div>
    </div>
    <div class="login-container__footer">
      <p>Copyright @ 2018-2021 观安观鼎在线培训平台 All Rights Reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormRules } from 'element-plus/es';
import { isCode } from '@/utils/verify'
import { loginCode } from '@/api/user';
let loginForm = reactive({
  username: '',
  password: '',
  code: '',
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, validator: isCode, trigger: 'blur' }],
});

let pwdType = ref('password')
const changePwd = () => {
  pwdType.value = pwdType.value === 'password' ? '' : 'password'
}

const imgBase = ref('')

onMounted(() => {
  loginCode().then(res => {
    console.log('---');
    
    imgBase.value = res.data
  })
})

const loginSubmit = async () => {

}

</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url('@assets/login_images/background.png') no-repeat;
  background-size: 100% 100%;

  &__header {
    height: 60px;
    box-sizing: border-box;
    padding: 20px 0 0 20px;
  }

  &__body {
    height: calc(100% - 100px);
    display: flex;
    align-items: center;

    &__img {
      flex: 1;
      text-align: center;
    }

    &__form {
      min-width: 420px;
      height: 450px;
      margin-right: 10%;
      padding: 25px;
      background-color: #fff;
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.15);
      border-radius: 5px;

      .title {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
        margin-bottom: 25px;
      }

      .code {
        width: 300px;
      }

      .code-img {
        width: 100px;
        margin-left: 15px;
      }
    }
  }

  &__footer {
    height: 40px;
    text-align: center;
    color: #6e727e;
  }

  :deep(.el-input__wrapper) {
    height: 50px;
    font-size: 20px;
  }
}
</style>