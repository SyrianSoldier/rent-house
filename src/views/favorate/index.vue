<template>
  <div class="favorate">
    <NavBar title="收藏列表"/>

    <van-list>
        <HouseListItem v-for="(item,index) in favorites" :key="index" :detail="item" />
    </van-list>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import HouseListItem from '@/components/HouseListItem'
import { getLikeHouse } from '@/api/house'
import { Toast } from 'vant'

export default {
  name: 'Favorate',
  components: { NavBar, HouseListItem },
  data() {
    return {
      favorites: []
    }
  },
  created() {
    this.getLikeHouse()
  },
  methods: {
    async getLikeHouse() {
      Toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
      try {
        this.favorites = (await getLikeHouse()).body
        Toast.success('加载成功')
      } catch (error) {
        Toast.fail('加载失败')
      }
    }

  }

}
</script>

<style lang="less" scoped>
.favorate{
  padding-top:50px;
}
</style>
