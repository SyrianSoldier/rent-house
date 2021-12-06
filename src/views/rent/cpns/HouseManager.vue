<template>
  <div class="house-manager">
    <NavBar title="房屋管理"/>

    <div class="placeholder" v-if="!list.length">
      <van-icon name="todo-list-o" class="placeholder-icon"/>
      <p>您还没有房源 , <span class="link" @click="$router.push('/rent/addRent')">去发布房源</span> 吧~</p>
    </div>

   <div class="house-list" v-else>
     <HouseListItem
      v-for="(item,index) in list"
      :key="index"
      :detail="item"
      @click.native="$router.push({ path:'/detail',query:{ houseCode:item.houseCode } })"/>
   </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { findPublishedHouse } from '@/api/house'
import { BASE_URL } from '@/utils/request/config'
import HouseListItem from '@/components/HouseListItem'
import { Toast } from 'vant'
export default {
  name: 'HouseManager',
  components: { NavBar, HouseListItem },
  data() {
    return { BASE_URL, list: [] }
  },
  created() {
    this.findPublishedHouse()
  },
  methods: {
    async findPublishedHouse() {
      try {
        Toast.loading({ message: '正在加载中', forbidClick: true, duration: 0 })
        this.list = (await findPublishedHouse()).body
        Toast.success('加载成功')
      } catch (error) {
        Toast.fail('网络错误, 请刷新再试~')
      }
    }
  }
}
</script>
<style lang="less" scoped>

.house-manager{
  padding-top:50px;

  .placeholder{
    margin:30px auto;
    text-align: center;

    .placeholder-icon{
      font-size: 200px;
      color:@green;
    }
    .link{
      line-height: 60px;
      margin-top:30px;
      color:@green;
    }
  }
  .house-list{
    width: 100%;
    height: 95vh;
    overflow-y:scroll;
  }

}

</style>
