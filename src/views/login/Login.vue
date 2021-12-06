<template>
  <div class="login">
    <NavBar title="账号登录"/>

    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="user.username"
        name="username"
        placeholder="请输入账号"
        :rules="usernameRules"
      />
      <van-field
        v-model="user.password"
        name="password"
        placeholder="请输入密码"
        :rules="passwordRules"
      />

      <van-button
        block
        type="info"
        native-type="submit"
        class="submit-btn"
      >
        登录
      </van-button>
    </van-form>
     <div class="register">
       <router-link to="/">还没有账号, 去注册~</router-link>
     </div>

  </div>
</template>

<script>
import { passwordRules, usernameRules } from './config'
import { onLogin } from '@/api/login'
import NavBar from '@/components/NavBar'
import { Toast } from 'vant'
export default {
  name: 'Login',
  components: { NavBar },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      passwordRules,
      usernameRules
    }
  },
  methods: {
    async onSubmit(data) {
      try {
        // 获取登录信息
        const ret = await onLogin(data)
        if (ret.status === 200) {
          Toast.success({
            message: '账号密码正确',
            duration: 2000
          })
          this.$store.commit('user/setToken', ret.body.token)
          this.back()
        } else {
          Toast.fail('账号密码错误')
          this.user.username = ''
        }
      } catch (err) {
        console.dir(err)
        Toast.fail('网络异常')
      }
    },
    back() {
      setTimeout(_ => {
        this.$router.back()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  padding-top:50px;
  height: 100%;

  .submit-btn{
    display: block;
    height: 50px;
    background-color: @green;
    border:0;
    width: 90%;
    margin: 20px auto;
    // font-weight: 700;
    font-size: 18px;
    letter-spacing: 10px;
  }

  .form{
    /deep/.van-cell{
      font-weight: 400;
      font-size: 18px;
      padding:25px 20px;
    }
  }
  .register{
    margin-top: 50px;
    text-align: center;
    a{
      color:#666;
    }
  }

  /deep/.van-field__control{
    font-weight: 400;
    font-size: 17px;
  }
}
</style>
