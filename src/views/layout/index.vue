<template>
  <div id="layout">
    <router-view />

    <van-tabbar v-model="active" active-color="#21b994" inactive-color="#888888" route>
      <van-tabbar-item icon="home-o" route to="/home/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" route to="/home/house">找房</van-tabbar-item>
      <van-tabbar-item icon="friends-o" route to="/home/message">咨询</van-tabbar-item>
      <van-tabbar-item icon="setting-o" route to="/home/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
#layout{
  padding-bottom:50px;
}
</style>
