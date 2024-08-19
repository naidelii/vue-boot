<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <el-form ref="loginForm" :model="loginForm" :rules="dataRule" status-icon @keyup.enter.native="handleLogin">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="帐号" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="密码" />
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="loginForm.captcha" placeholder="验证码" />
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <div class="loginCodeImg" @click="getCaptcha">
                    <img :src="captchaPath">
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" class="login-btn-submit" type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/login'
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        realKey: '',
        captcha: ''
      },
      dataRule: {
        username: [{ required: true, message: '帐号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      },
      captchaPath: ''
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    // 提交表单
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return
        // 执行登录
        this.loading = true
        this.$store.dispatch('user/login', this.loginForm).then(() => {
          this.$router.push({ path: '/' })
        }).finally(() => {
          this.loading = false
        })
      })
    },
    // 获取验证码
    getCaptcha() {
      const key = Date.now()
      getCaptcha({ key }).then(resp => {
        this.captchaPath = 'data:image/png;base64,' + resp.data.img
        this.loginForm.realKey = resp.data.realKey
      }).catch(() => {
        // 如果获取失败，保留默认的404图片
        this.captchaPath = require('@/assets/login/404.png')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-image: url(~@/assets/login/login_bg.jpg);
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }
  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }
  .login-title {
    font-size: 16px;
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
</style>
