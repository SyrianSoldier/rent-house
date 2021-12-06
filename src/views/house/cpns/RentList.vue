<template>
  <div class="ren-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了..."
      @load="onLoad"
      :error.sync="err"
      error-text="加载失败,点击重试.."
    >
    <HouseListItem
      v-for="(item,index) in list"
      :key="index"
      :detail="item"
      @click.native="$router.push({
        path:'/detail',
        query:{ houseCode:item.houseCode }
      })"
    />
  </van-list>
  </div>
</template>

<script>
import HouseListItem from '@/components/HouseListItem'
import { getHouseInfo } from '@/api/house'

export default {
  name: 'RentList',
  components: { HouseListItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      err: false
    }
  },
  beforeCreate() {
    // 用户更换筛选条件时候, 需要重新定义数据容器
    this.$bus.$on('reLoad', _ => {
      // 置空数组
      this.list = []
      // 初始化分页查询条件
      this.$store.commit('city/setPage', true)
      // 重新加载
      this.onLoad()
    })
  },
  beforeDestroy() {
    this.$bus.$off('resetList')
  },
  methods: {
    async onLoad() {
      try {
        // 发送请求
        const queryParams = this.$store.state.city.queryParams
        // 获取数据
        const resList = (await getHouseInfo(queryParams)).body.list
        this.list.push(...resList)
        // 更新分页
        this.$store.commit('city/setPage')
        // 结束查询
        this.loading = false
        if (!resList.length) {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.err = true
      }
    }
  }

}
</script>

<style lang="less" scoped>

</style>
