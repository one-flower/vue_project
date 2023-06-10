<template>
  <div class="login-container">
    <div class="login-container__header">
      <!-- <img src="@assets/login_images/logoTop.png" /> -->
    </div>
    <div class="login-container__body">
      <div class="login-container__body__img">
        <!-- <img src="@assets/login_images/login.jpg" /> -->
      </div>
      <div class="login-container__body__form">
        <div class="title">登录</div>
        <el-form :model="loginForm" ref="refLoginForm" :rules="rules" size="large">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入账号">
              <template #prefix>
                <svg-icon :size="25" icon="user"></svg-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" :type="pwdType">
              <template #prefix>
                <svg-icon :size="25" icon="pwd"></svg-icon>
              </template>
              <template #suffix>
                <svg-icon :size="25" :icon="pwdType === 'password' ? 'show' : 'hide'" @click="changePwd"
                  style="cursor: pointer;"></svg-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" placeholder="请输入验证码" class="code">
              <template #prefix>
                <svg-icon :size="25" icon="captcha"></svg-icon>
              </template>
            </el-input>
            <img :src="imgBase" class="code-img" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="loginSubmit(refLoginForm)" :loading="loading"
              class="wid">登录</el-button>
          </el-form-item>
        </el-form>


      </div>
    </div>
    <div class="login-container__footer">
      <p>中国-杭州  2023-06-01  开始划水.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus/es';
import { isCode } from '@/utils/verify'
import { loginCode } from '@/api/user';
import appStore from '@/stores';
import { toast } from '@/utils/tips';

const loginForm = reactive({
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

// 验证码
const imgBase = ref('')
onMounted(() => {
  loginCode().then(res => {
    console.log(res);
    
    imgBase.value = res.data
  })
})
// 登录
const loading = ref(false)
const store = appStore()
const router = useRouter();
const refLoginForm = ref();
const loginSubmit = async (refLoginForm: FormInstance) => {
  if (!refLoginForm) return
  await refLoginForm.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      store.UserStore.login(loginForm).then(res => {
        toast('登录成功')
        router.replace('/');
      }).catch(err => {
        toast(err.message, 'error')
      })
      loading.value = false
    } else {
    }
  })
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