<template>
  <div>
     <van-nav-bar
      :title="title"
      :border="false"
      left-arrow
      fixed
      @click-left="$router.push('/home/')"
    />
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: { type: String, required: true }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar{
    background-color: #21b97a;

    .van-nav-bar__title{
      color:#fff;
      font-size: 18px;
    }

    .van-icon{
      color:#fff;
    }
  }
</style>
