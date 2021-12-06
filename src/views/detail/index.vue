<template>
  <div class="detail" v-if="detail">
    <NavBar :title="detail.community"/>

    <div class="swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in detail.houseImg" :key="index">
          <img v-lazy="BASE_URL+image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="detail-info">
      <h4 class="house-title">{{ detail.title }}</h4>
      <div class="tags">
        <span v-for="(item,index) in detail.tags" :key="index"> {{ item }} </span>
      </div>
      <div class="house-type">
        <div class="type-item">
          <span>{{ detail.price }}/月</span>
          <span>租金</span>
        </div>
        <div class="type-item">
          <span>{{ detail.roomType }}</span>
          <span>房型</span>
        </div>
        <div class="type-item">
          <span>{{ detail.size }}平米</span>
          <span>面积</span>
        </div>
      </div>
      <div class="house-decoration">
        <div class="decoration">
          <span>装修: &nbsp;</span>
          <span>精装</span>
        </div>
        <div class="decoration">
          <span>朝向: &nbsp;</span>
          <span>{{  detail.oriented.join(',') }}</span>
        </div>
        <div class="decoration">
          <span>楼层: &nbsp;</span>
          <span>{{ detail.floor }}</span>
        </div>
        <div class="decoration">
          <span>类型: &nbsp;</span>
          <span>普通住宅</span>
        </div>
      </div>
    </div>

    <div class="map">
      <h4 class="map-title">小区: &nbsp;{{ detail.community}}</h4>
       <baidu-map
          class="bmap map-content"
          :zoom="16"
          :center="{lat:detail.coord.latitude,lng:detail.coord.longitude}"
        >
           <bm-overlay
            pane="labelPane"
            class="rect"
            @draw="draw($event,detail.coord)"

          >
            <div class="rect-content">
              <p class="text-wrap">{{ detail.community }}</p>
            </div>
          </bm-overlay>

        </baidu-map>
    </div>

    <van-cell class="house-match">
      <h4 class="hx">房屋配套</h4>
    </van-cell>
    <div>
      <i v-for="(item,index) in detail.supporting" :key="index"> {{ item }} </i>
    </div>
    <van-cell>
      <h4 class="hx">房屋概览</h4>
    </van-cell>
    <div class="house-overview">
      <div class="user-info">
        <div class="user-detail-info">
          <div class="avatar"></div>
            <div class="uname">
              <span class="authorization ">王女士</span>
              <p>已认证房主</p>
            </div>
        </div>
        <van-button type="primary" size="small">发送消息</van-button>
      </div>
      <div class="user-text">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。 2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。 3.人车分流，环境优美。 4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>

    <van-cell>
      <h4 class="hx">猜你喜欢</h4>
    </van-cell>
    <div class="like-list">
      <van-list>
        <HouseListItem v-for="(item,index) in favorites" :key="index" :detail="item" />
      </van-list>
    </div>
    <FooterBar :id="houseCode"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from './cpns/FooterBar.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import { getHouseDetail, getLikeHouse } from '@/api/house'
import { BASE_URL } from '@/utils/request/config'
import { Toast } from 'vant'
export default {
  name: 'Detail',
  props: {
    houseCode: { type: String, required: true }
  },
  components: { HouseListItem, NavBar, FooterBar },
  created() {
    this.getHouseDetail()
  },
  data() {
    return {
      detail: null,
      BASE_URL,
      center: {},
      favorites: []
    }
  },
  methods: {
    async getHouseDetail() {
      try {
        const toast = Toast.loading({
          message: '加载中',
          duration: 0,
          forbidClick: true
        })
        this.favorites = (await getLikeHouse()).body
        this.detail = (await getHouseDetail(this.houseCode)).body
        toast.clear()
      } catch (error) {
        console.dir(error)
        Toast.fail('网络错误!')
      }
    },
    draw ({ el, BMap, map }, { latitude, longitude }) {
      console.log(latitude, longitude)
      const pixel = map.pointToOverlayPixel(new BMap.Point(longitude, latitude))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }

}
</script>

<style lang="less" scoped>
.hx{
  font-weight: 700;
}

.detail{
  background-color: #f6f5f6;
  height: 100vh;

  .detail-info{
    display: flex;
    flex-direction: column;
    height: 230px;
    padding:10px;
    margin-top: 20px;
    background-color: #fff;

    .house-title{
      margin: 10px 0 ;
    }
    .house-type{
      display: flex;
      justify-content: space-around;
      height: 52px;
      padding:15px 0;
      margin:15px 0;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      text-align: center;

      .type-item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span:nth-child(1){
          font-weight: 700;
          color: #fa5741;
          font-size: 18px;
        }
        span:nth-child(2){
          color: #cecece;
          font-size: 14px;
        }
      }
    }
    .house-decoration{
      flex:1;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;

      .decoration{
        flex:50%;
        box-sizing: border-box;
        padding-left:15px ;
        span:nth-child(1){
          color:#999999;
        }
      }
    }
  }

  .map{
    display: flex;
    flex-direction: column;
    height: 189px;
    margin-top: 30px;
    background-color: #fff;

    .map-title{
      height: 44px;
      padding:0 10px;
      line-height: 44px;
    }

    .map-content{
      flex:1;

      .bmap{
        width: 100%;
        height: 100%;
      }
    }
  }

  .house-match{
    margin-bottom: 20px;
  }

  .house-overview{
    display: flex;
    flex-direction: column;
    height: 266px;
    background-color:#fff;
    padding:0 10px;

    .hx{
      box-sizing: border-box;
      padding:10px 6px;
      border-bottom: 1px solid #eee;
    }

    .user-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 62px;
      margin: 10px 0;

      .user-detail-info{
        display: flex;
        align-items: center;
         color:#fa5741;
        .avatar{
          .circle(52px,52px);
          .img-wrap(52px,52px);
          background-image: url(~@/assets/imgs/avatar.png);
          background-size: contain;
          margin-right: 15px;
        }

        .authorization{
          display: block;
          margin-bottom: 5px;
          color:#000;
        }
      }

    }

    .user-text{
      flex:1;
      margin:10px 0 ;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 1px;
      text-indent: 2em;
    }
  }

  .like-list{

  }
}
.swiper{
  margin-top:46px;
  .img-wrap(100%,273px);
}

.rect{
  position: relative;
    display: flex;
    width: 100px;
    height: 20px;
    padding:0;
    background: linear-gradient(to right, #fa5741,gold);
    opacity: .9;
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
</style>
