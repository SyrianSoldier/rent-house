<template>
  <div id="city">
    <!-- navbar star -->
    <NavBar title="城市列表"/>
    <!-- navbar end -->

   <div class="nav-content">
       <!-- indexbar star -->
    <van-index-bar :index-list="indexList"  >
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell title="上海" />

      <van-index-anchor index="热" >热门城市</van-index-anchor>
      <van-cell
        v-for="hot in hotCitys"
        :key="hot.label"
        :title="hot.label"
      />

      <div v-for="letter in letters" :key="letter">
        <van-index-anchor :index="letter">{{ letter }}</van-index-anchor>
        <van-cell
          v-for="(city,index) in filterCitys(letter)"
          :title="city.label"
          :key="index"
        />

      </div>
    </van-index-bar>
    <div style="width:100%;height:180px"></div>
    <!-- indexbar end -->
  </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { getCitys, getHotCitys } from '@/api/city'
export default {
  name: 'City',
  components: { NavBar },
  data() {
    return {
      citys: [],
      hotCitys: [],
      indexList: [
        '#', '热', 'A', 'B', 'C', 'D',
        'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q',
        'S', 'T', 'W', 'X', 'Y', 'Z'
      ],
      letters: [
        'A', 'B', 'C', 'D',
        'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q',
        'S', 'T', 'W', 'X', 'Y', 'Z'
      ]
    }
  },
  created() {
    this.getCitys()
    this.getHotCitys()
  },
  methods: {
    async getCitys() {
      this.citys = (await getCitys()).body
    },
    async getHotCitys() {
      this.hotCitys = (await getHotCitys()).body
    }
  },
  computed: {
    filterCitys() {
      return (letter) => {
        return this.citys.filter(item => item.short.substr(0, 1).toUpperCase() === letter)
      }
    }
  }
}

</script>

<style lang="less" scoped>
#city{
  padding-top:50px;
}

.nav-content{
  width: 100%;
  height: 95vh;
  overflow-y:scroll ;

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

.van-index-bar{

  /deep/.van-index-bar__sidebar{
    height: calc(100% - 110px);
    justify-content: space-between;
    .van-index-bar__index{
      font-size: 14px;
    }
  }

  /deep/.van-index-anchor{
    color:#a2a2a2;
  }
}
/deep/.van-index-bar__index{
  display: inline-block;
  height: 20px;
  width: 20px;
  padding:0;
  margin-right:10px;
  text-align: center;
  line-height: 20px;
}
/deep/.van-index-bar__index--active{
  color:#fff;
  font-weight: 700;
  background-color: #21b97a;
  border-radius: 10px;
}
/deep/.van-index-anchor--sticky {
    position: static ;
}
}
</style>
