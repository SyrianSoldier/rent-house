<template>
  <div>
    <!-- search star -->
    <Search />
    <!-- swiper star -->
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#888888">
      <van-swipe-item
        v-for="img in swipers"
        :key="img.id"
      >
        <img
          :src="BASE_URL + img.imgSrc"
          :alt="img.alt"
          style="width: 100%; height: 212px; vertical-align: top;"
        >
      </van-swipe-item>
    </van-swipe>
    <!-- swiper end -->

    <!-- nav star -->
    <van-grid :border="false" :column-num="4" class="nav">
      <van-grid-item
        v-for="img in nav_imgs"
        :key="img.id"
        @click="navOnClick(img.id)"
      >
        <van-image :src="img.src" width="60" height="60"/>
        <p class="title"> {{ img.title }} </p>
      </van-grid-item>
    </van-grid>
    <!-- nav end -->

   <!-- rent star -->
    <van-grid
      gutter="10"
      class="rent-house"
      :column-num="2"
      :center="false"
      :border="false"
    >
      <van-cell title="租房小组" value="更多" />
      <van-grid-item
        v-for="item in rentGroups"
        :key="item.id"
      >

        <van-image :src="BASE_URL + item.imgSrc" height="50" width="50"/>
        <div>
          <p> {{ item.title }} </p>
          <p> {{ item.desc }} </p>
        </div>
      </van-grid-item>
    </van-grid>
   <!-- rent end -->
    <router-view ></router-view>
  </div>
</template>

<script>
import { BASE_URL } from '@/utils/request/config'
import { getSwiper, getRentGroups } from '@/api/home'
import Search from '@/components/Search'
import { getCurrentLocation, getCityInfo } from '@/api/map'
import { Toast } from 'vant'
export default {
  name: 'Home',
  components: { Search },
  data() {
    return {
      swipers: [],
      rentGroups: [],
      BASE_URL,
      nav_imgs: [
        { id: '001', src: require('@/assets/imgs/1.png'), title: '整租' },
        { id: '002', src: require('@/assets/imgs/2.png'), title: '合租' },
        { id: '003', src: require('@/assets/imgs/3.png'), title: '地图找房' },
        { id: '004', src: require('@/assets/imgs/4.png'), title: '去出租' }
      ],
      city: ''
    }
  },
  created() {
    // 初始化网络请求
    try {
      this.getSwiper()
      this.getRentGroups()
    } catch (error) {
      console.log('首页网络服务失败', error)
      Toast.fail('网络繁忙,请刷新重试!')
    }
    this.getCurrentLocation()
  },
  methods: {
    // 获取轮播图图片
    async getSwiper() {
      this.swipers = (await getSwiper()).body
    },
    async getRentGroups() {
      // 获取出租信息
      this.rentGroups = (await getRentGroups()).body
    },
    async getCurrentLocation() {
      try {
        // ip定位获取城市定位, 并将"市"去掉
        const ipInfo = await getCurrentLocation()
        const city = ipInfo.content.address_detail.city.replace('市', '')
        const { label: cityName, value: cityCode } = (await getCityInfo(city)).body
        // 将城市信息存储在vuex中
        this.$store.commit('city/setCity', { cityName, cityCode })
        console.log('ip定位获取当前城市信息', ipInfo)
      } catch (error) {
        console.log('城市信息获取失败错误信息', error)
        Toast.fail('获取城市信息失败,请刷新重试')
      }
    },
    navOnClick(id) {
      let path
      if (id === '001') {
        path = '/home/house'
      } else if (id === '002') {
        path = '/home/house'
      } else if (id === '003') {
        path = '/map'
      } else {
        path = '/rent/addRent'
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>

.van-field__control{
  padding-left: 20px !important;
}
.van-search {
  position: fixed;
  width: 100%;
  height: 34px;
  z-index: 9999;
  background-color: transparent;
  padding-top: 40px;

  .van-icon-arrow-down{
    /deep/&::after{
      content:' | \e710';
      color:#9da0a2;
    }
  }
}
/deep/.van-swipe__indicator{
  width: 8px;
  height: 8px;
}
.title{
  margin:12px 0;
}
.rent-house{
  padding: 0 10px;
  .van-cell{
    background: transparent;
 }
  /deep/.van-grid-item__content{
    border-radius: 10px ;
    padding:0;
    border:0;
    height: 60px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}
.van-cell__title{
  font-weight: 700;
}

</style>
