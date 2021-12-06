<template>
  <div>
    <van-list
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell class="title">
        <template #default>
          <router-link to="/home">更多房源</router-link>
        </template>
        <template #title>
          <h1 class="house-title">房屋列表</h1>
        </template>
      </van-cell>

      <div class="cell-container">
        <HouseListItem
          v-for="(item,index) in list"
          :key="index"
          :detail="item"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
import { getHouseInfo } from '@/api/house'
import HouseListItem from '@/components/HouseListItem'
// import { BASE_URL } from '@/utils/request/config'
import { Toast } from 'vant'
export default {
  name: 'HousetList',
  components: { HouseListItem },
  props: {
    subCityCode: { type: String, required: true },
    isShow: { type: Boolean, required: true }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
      // BASE_URL
    }
  },
  methods: {
    async onLoad() {
      this.loading = false
      this.finished = true
    },
    async getHouseInfo() {
      const ret = await getHouseInfo({ cityId: this.subCityCode })
      this.list = ret.body.list
      console.log(ret)
    }
  },
  watch: {
    isShow: {
      immediate: true,
      async handler(newValue, oldValue) {
        if (newValue) {
          const toast = Toast.loading({
            message: '房源信息正在加载中...',
            position: 'bottom',
            duration: 0
          })
          await this.getHouseInfo()
          toast.clear()
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.title{
    position:sticky;
    top:0;
    z-index: 99;
    background: #c0c0c2;
    border-top: 1px solid #c8c8c8;
    height: 65px;

    /deep/.van-cell__title{
      display: flex;
      align-items: center;
    }
}
.house-title{
  font-size: 20px;
  font-weight: 700;
}
.cell-container{
  padding:0 10px;

}
// .house-detail{
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   text-align: left;
//   h3{
//     color:#000;
//     font-size: 15px;
//     font-weight: 700;
//   }
//   .desc{
//     font-size: 12px;
//     color:#afb2ba;
//   }
//   .price{
//     font-size: 12px;
//     color: #fa5741;
//     .price-num{
//       font-size: 16px;
//       font-weight: 700;
//     }
//   }
// }
// .list-cell{
//   flex:unset;
//   margin-right:20px ;
// }
.tags{
  /deep/.van-tag{
    margin-right:5px;
  }
}
.house-detail-title{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 ;
}

</style>
