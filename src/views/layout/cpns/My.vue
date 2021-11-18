<template>
  <div>
    <van-button
      type="primary"
      @click="onLogin"
    >
      登录
  </van-button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
