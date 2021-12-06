<template>
  <van-search
    show-action
    :label="cureentCity"
    placeholder="  请输入小区或地址"
    left-icon="arrow-down"
    disabled
    @click="$router.push('/city')"
    :background="background"
  >
    <template #left>
     <slot name="left"></slot>
    </template>

    <template #action>
      <div>
        <van-icon
          class="loc-icon"
          name="location-o"
          size="50"
          color="#fff"
          @click="$router.push({
            path:'/map',
            query:{city:cureentCity}  //路由跳转到地图时, 携带当前城市信息
          })"
        />
      </div>
    </template>
  </van-search>
</template>

<script>
import { mapState } from '@/store/helper/city'
export default {
  name: 'Search',
  props: {
    background: { type: String, default: undefined }
  },
  computed: {
    ...mapState(['cureentCity'])
  }
}
</script>

<style lang="less" scoped>
.loc-icon{
  font-size: 25px !important;
  line-height: 40px;
}

</style>
