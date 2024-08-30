<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ settingsStore.title }}</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <SvgIcon name="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="请输入用户名"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon name="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin(ruleFormRef)"
        />
        <span class="show-pwd" @click="showPwd">
          <SvgIcon :name="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        class="lg-btn"
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin(ruleFormRef)"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useSettingsStore from '@/store/module/settings'
import useUserStore from '@/store/module/user'
import { type FormInstance, FormRules, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const passwordType = ref('password')
const loginForm = reactive({
  account: 'admin',
  password: 'Pass@Word'
})

const loginRules = reactive<FormRules>({
  account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
})
// 登录
const router = useRouter()
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      userStore
        .login({
          ...loginForm
        })
        .then(() => {
          ElMessage.success('登录成功')
          router.push('/')
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
}
</script>

<style lang="scss">
$bg: #295c9e;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  display: flex;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .el-form {
    border-radius: 5px;
    background: #204576;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    &.is-error {
      .el-input {
        .el-input__wrapper {
          width: 100% !important;
          &.is-focus {
            box-shadow: none !important;
          }
        }
      }
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__wrapper {
      height: 100% !important;
      box-shadow: none !important;
      background: transparent !important;
      input {
        background: transparent;
        padding: 12px 5px 12px 15px;
        color: #fff;
        height: 47px;
        caret-color: #fff;
      }
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 75px 35px 75px;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .lg-btn {
    height: 40px;
    line-height: 40px;
    width: 100%;
    margin-bottom: 30px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
