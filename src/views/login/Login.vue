<template>
  <div id="login">
    <van-nav-bar
      title="账号登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="用户名"
        :rules="usernameRules"
      />
      <van-field
        v-model="password"
        name="password"
        placeholder="密码"
        :rules="passwordRules"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
  </van-form>
  </div>
</template>

<script>
import { passwordRules, usernameRules } from './config'

export default {
  data() {
    return {
      username: '',
      password: '',
      passwordRules,
      usernameRules
    }
  },
  methods: {
    async onSubmit(data) {
      try {
        await this.$axios({ url: '/user/login', method: 'POST', data })
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
