<template>
  <div class="map">
   <NavBar title="地图找房"/>

    <baidu-map
      class="bmap"
      @ready="initMap"
      :center="center"
      :zoom="zoom"
    >
      <!-- 缩放控件 -->
      <bm-navigation
        anchor="BMAP_ANCHOR_TOP_LEFT"
        type="BMAP_NAVIGATION_CONTROL_LARGE"
      >
      </bm-navigation>
      <!-- 比例尺控件 -->
      <bm-scale anchor="BMAP_ANCHOR_LEFT_RIGHT"></bm-scale>
      <!-- 自定义绘制物 -->
       <bm-overlay
        v-for="(item,index) in subCityInfo"
        :key="index"
        pane="labelPane"
        :class="{rect:isLast}"
        class="circle"
        @draw="draw($event,item.coord)"
        @click.native="onClick(item)"
        @touchend.native="onClick(item)"
      >
      <!-- 提示文本 -->
        <div :class="{'rect-content':isLast}">
          <p class="text-wrap">{{ item.label }}</p>
          <p style="margin-top:5px">{{ item.count }}套</p>
        </div>
      </bm-overlay>
    </baidu-map>
    <!-- 弹出层 -->
    <van-popup v-model="isShow" position="bottom" :style="{height:'60%'}">
      <house-list :subCityCode="subCityCode" :isShow="isShow"/>
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import HouseList from './cpns/HouseList.vue'
import { getCityInfo, getSubCityInfo } from '@/api/map'
import { Toast } from 'vant'
export default {
  name: 'Map',
  components: { NavBar, HouseList },
  data () {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 11,
      subCityInfo: [],
      index: 0,
      isLast: false,
      isShow: false,
      subCityCode: ''
    }
  },
  methods: {
    // 第一个参数 Bmap核心类 第二个参数为当前map实例
    async initMap ({ BMap, map }) {
      // 根据路由传过来的城市逆解析设置中心点
      this.initCity(BMap, map)
      // 发送请求获得当前城市信息, 并绘制覆盖物 提示加载信息
      this.toastLoading(this.getCityInfo)
    },
    initCity(BMap, map) {
      // 本来这里用的是动态获取的数据, 但杭州没数据,写死在上海了
      // const city = this.$route.query.city
      // 创建地址解析器实例
      const myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint('上海', function(point) {
        if (point) {
          map.centerAndZoom(point, 11)
        } else {
          Toast.fail('地址解析失败！')
        }
      }, '上海')
    },
    async getCityInfo(city) {
      if (!city) {
        city = this.$route.query.city
      }
      // 根据城市查父城市code
      const ret = (await getCityInfo(city)).body
      // 根据父城市code查子城市资料
      this.subCityInfo = (await getSubCityInfo(ret.value)).body
    },
    draw ({ el, BMap, map }, { latitude, longitude }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(longitude, latitude))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    async onClick(cityInfo) {
      // 获取点击的那个城市信息
      const { coord: { latitude: lat, longitude: lng }, value } = cityInfo
      // 城市级别后显示弹出层, 不再调整地图
      this.index++
      if (this.index >= 3) {
        // 点击后将当前城市code发送给子组件
        this.subCityCode = value
        this.isShow = true
        return
      }
      // 显示loading加载
      const toast = Toast.loading({
        message: '房源正在加载中...',
        forbidClick: true,
        duration: 0
      })

      // 重设地图中心点, 中心点为父城市
      this.center = { lng, lat }
      // 重设子城市列表, 将会导致自定义覆盖物重绘
      // 一定要放在zoom,center前面,也不知道为啥 要不然触发不了draw
      this.subCityInfo = (await getSubCityInfo(value)).body

      // 重设地图缩放比
      if (this.index === 1) {
        // 第一次点击缩放比为13
        this.zoom = 13
      } else if (this.index === 2) {
        // 第二次点击缩放比为16 更改覆盖物样式
        this.isLast = true
        this.zoom = 16
      }
      toast.clear()
    },
    async toastLoading(cb) {
      const toast = Toast.loading({
        message: '房源正在加载中...',
        forbidClick: true,
        duration: 0
      })
      await cb()
      toast.clear()
    }

  }
}
</script>

<style lang="less" scoped>
.map{
  .bmap{
    height: 93vh;
    margin-top:50px;
  }
}
.circle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(12,181,106,.9);
  text-align: center;
  overflow: hidden;
  color: #fff;
  font-size: 12px;
  border:2px solid #fff;
  padding: 10px;
  position: absolute;
}
.rect{
    display: flex;
    width: 100px;
    height: 20px;
    padding:0;
    background: rgba(12, 181, 106, 0.9);
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    margin: 5px;
}
.rect-content{
  position: relative;
  display: flex;
  justify-content: space-between;
  padding:0 2px;
  p:last-child{
    margin-top:0 !important;
    margin-left:2px;
  }
}
.text-wrap{
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
