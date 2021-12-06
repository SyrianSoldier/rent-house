<template>
  <div class="footer-bar">
    <div class="collect" @click="onClick">
      <Collect
        size="20px"
        v-model="isFavorite"
        :id="id"
        ref="collect"
      />
      <span>收藏</span>
    </div>
    <div class="consult">在线咨询</div>
    <div class="phone-subscribe">电话预约</div>
  </div>
</template>

<script>
import Collect from '@/components/Collect'
import { queryIsCollect } from '@/api/house'
export default {
  name: 'FooterBar',
  components: { Collect },
  props: {
    id: { type: [Object, String, Number], required: true }
  },

  created() {
    this.queryIsCollect()
  },
  data() {
    return {
      isFavorite: false
    }
  },
  methods: {
    onClick() {
      this.$refs.collect.onCollect(true)
    },
    async queryIsCollect() {
      this.isFavorite = (await queryIsCollect(this.id)).body.isFavorite
    }
  }
}
</script>

<style lang="less" scoped>
.footer-bar{
  position: sticky;
  bottom: 0;
  display: flex;
  height: 50px;
  border-top:1px solid #cecece;
  background-color: #fff;
  font-size: 17px;
  color: #999999;
  text-align: center;
  line-height: 50px;

  .collect{
    flex:1;
    border-right: 1px solid #cecece;
  }
  .consult{
    flex:1;
    border-right: 1px solid #cecece;
  }
  .phone-subscribe{
    flex:1;
    background-color: @green;
    color:#fff;
  }
}
</style>
