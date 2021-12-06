<template>
  <div class="profile">
    <div class="header" :style="background">
      <div class="pannel">
        <div class="avatar">
          <van-image
            round
            :src="token? BASE_URL + userInfo.avatar:avatarSrc"
          />
        </div>
        <div class="detail">
          <p class="uname">{{ token?  userInfo.nickname : '游客'  }}</p>
          <van-button
            type="primary"
            size="small"
            class="login-btn"
            @click="loginOrExit"
          >
            {{ token? '退出':'去登录' }}
          </van-button>

          <router-link
            v-if="token"
            class="edit"
            to="/edit"
          >
            编辑个人资料 ▶
          </router-link>
        </div>
      </div>
    </div>

    <van-grid
      :column-num="3"
      :border="false"
      icon-size="20"
      :clickable="true"
    >
      <van-grid-item icon="star-o"  text="我的收藏" to="/favorate" />
      <van-grid-item icon="wap-home-o"  text="我的出租" to="/rent"/>
      <van-grid-item icon="clock-o"  text="看房记录" />
      <van-grid-item icon="send-gift-o"  text="成为房主" />
      <van-grid-item icon="contact"  text="个人资料" />
      <van-grid-item icon="service-o"  text="联系我们" />
    </van-grid>

    <div class="fotter-img">
      <van-image src="http://liufusong.top:8080/img/profile/join.png"></van-image>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/utils/request/config'
import { getUserInfo } from '@/api/login'
import { Toast, Dialog } from 'vant'
import { mapState } from '@/store/helper/user'

export default {
  name: 'Profile',
  data() {
    return {
      userInfo: {},
      avatarSrc: 'http://liufusong.top:8080/img/profile/avatar.png',
      BASE_URL
    }
  },
  created() {
    if (this.token) {
      this.getUserInfo()
    }
  },
  computed: {
    ...mapState(['token']),
    background() {
      if (!this.token) return undefined
      return { 'background-image': `url(${this.BASE_URL + this.userInfo.avatar})` }
    }
  },
  methods: {
    async loginOrExit() {
      if (!this.token) {
        return this.$router.push('/login')
      }

      try {
        await Dialog.confirm({ title: '提示', message: '是否确定退出' })
        this.$store.commit('user/removeToken')
      } catch (error) {

      }
    },
    async getUserInfo() {
      try {
        this.userInfo = (await getUserInfo()).body
      } catch (error) {
        Toast.fail('获取用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile{
  background-color: #fff;
  height: 100vh;
  .header{
    position: relative;
    width: 100vw;
    height: 300px;
    background-image: url(~@/assets/imgs/bg.png);
    background-repeat: no-repeat;
    background-size: 100%;
  .pannel{
    .abs-hor-center();
    .box-shadow();
    .flex-center();
      bottom:0;
      width: 320px;
      height: 165px;
      background-color: #fff;
      z-index: 99;
      .login-btn{
        padding:0 20px;
        border-radius: 5px;
        height: 30px;
      }

      .avatar{
        .circle(70px,70px);
        .abs-hor-center();
        background-color: #f5f5f5;
        box-sizing: border-box;
        overflow: hidden;
        top:-35px;
        padding:5px;
        box-shadow: 0 2px 2px #bdbdbd;
      }
    }
  }
  .fotter-img{
    .img-wrap(90vw,85px);
    border-radius: 8px;
    overflow: hidden;
    margin:0 auto;
  }
  .detail{
    text-align: center;

    p{
      font-size: 13px;
      margin-bottom: 15px;
    }
  }
  .edit{
    display: block;
    font-size: 12px;
    color:#999;
    margin-top: 13px;
  }

}

</style>
