<template>
  <div class="addRent" v-if="houseCondition">
    <NavBar title="发布房源"/>

    <van-form @submit="onSubmit" class="form">
      <van-cell title="房源信息" class="label"></van-cell>
      <!-- 小区名称 -->
      <van-field label="小区名称" readonly clickable @click="$router.push('/rent/search')" >
        <template #extra>
          <i v-if="community">{{ community.communityName }}</i>
          <i v-else>请输入小区名称&nbsp;</i>
          <van-icon name="arrow"></van-icon>
        </template>
      </van-field>
      <!-- 租金 -->
      <van-field
        label="租金"
        placeholder="请输入租金/月"
        v-model.number="params.price"
      >
        <template #extra>
          <i>&yen;/月 &nbsp;</i>
          <van-icon name="arrow"></van-icon>
        </template>
      </van-field>

      <!-- 建筑大小 -->
      <van-field
        label="建筑面积"
        v-model.number="params.size"
      >
        <template #extra>
          <i>m² &nbsp;</i>
          <van-icon name="arrow"></van-icon>
        </template>
      </van-field>
      <!-- 户型 -->
      <van-field
        label="户型"
        :clickable="true"
        readonly
        @click="onClick('户型')"
      >
        <template #extra>
          <i v-html="roomType"></i>
          <van-icon name="arrow"></van-icon>
        </template>
      </van-field>

      <van-field
        label="所在楼层"
        :clickable="true"
        :readonly="true"
        @click="onClick('楼层')"
      >
        <template #extra>
          <i v-html="floor">请选择</i>
          <van-icon name="arrow"></van-icon>
        </template>
      </van-field>

      <van-field
        label="朝向"
        :clickable="true"
        :readonly="true"
        @click="onClick('朝向')"
      >
        <template #extra>
          <i v-html="oriented">请选择</i>
          <van-icon name="arrow"></van-icon>
        </template>
      </van-field>

      <van-cell title="房屋标题" class="label"></van-cell>
      <van-field placeholder="请输入标题 (例如: 整租 小区名 2室 500元)" v-model="params.title"/>

      <van-cell title="房屋图像" class="label"></van-cell>
       <van-field name="uploader" >
          <template #input>
            <van-uploader v-model="uploader" :after-read="afterRead" >
              <div class="uploader-wrap">
                <van-icon name="plus" />
              </div>
            </van-uploader>
          </template>
        </van-field>

      <van-cell title="房屋配置" class="label"></van-cell>
      <HouseEdit
        :supporting="houseCondition.supporting"
        v-model="params.supporting"
      />

      <div style="margin:20px 0">
        <van-cell title="房屋描述" class="label"></van-cell>
        <van-field
          rows="1"
          autosize
          placeholder="请输入房屋描述"
          type="textarea"
          size="large"
          v-model="params.description"
        />
      </div>
    </van-form>
    <!-- 弹出层 -->
    <van-popup v-model="isShowPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="isShowPicker = false"
        @confirm="onConfirm"
        value-key="label"
        ref="picker"
      />
    </van-popup>

      <!-- 底部栏 -->
    <div class="footer-bar">
      <div class="cancel">取消</div>
      <div class="confirm" @click="onSubmit">确定</div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import HouseEdit from './HouseEdit.vue'
import { getFilterConditions, publishHouseInfo, publishHouseImage } from '@/api/house'
import { Toast } from 'vant'
export default {
  name: 'AddRent',
  components: { NavBar, HouseEdit },
  props: {
    community: { type: Object, default: null }
  },
  data() {
    return {
      value: '',
      columns: [],
      isShowPicker: false,
      imgArr: [],
      uploader: [],
      data: [],
      params: {
        title: '',
        description: '',
        houseImg: '',
        oriented: '',
        supporting: '',
        price: '',
        roomType: '',
        size: 0,
        floor: '',
        community: this.community?.community
      },
      houseCondition: null,
      roomType: '请选择',
      floor: '请选择',
      oriented: '请选择'

    }
  },
  created() {
    // 获得初始数据
    this.getFilterConditions()
  },
  methods: {
    async onSubmit() {
      try {
        Toast.loading({ message: '发布中', forbidClick: true, duration: 0 })
        await publishHouseInfo(this.params)
        Toast.success('发布成功')
      } catch (err) {
        if (err?.response?.statuse === 400) {
          Toast.fail('请先登录!')
        } else {
          Toast.fail('发布失败, 请重试!')
        }
      }
    },
    async getFilterConditions() {
      this.houseCondition = (await getFilterConditions()).body
    },
    onClick(label) {
      // 动态渲染picker选项
      this.isShowPicker = true
      console.log(label)
      switch (label) {
        case '户型':
          this.columns = this.houseCondition.roomType
          break
        case '朝向':
          this.columns = this.houseCondition.oriented
          break
        case '楼层':
          this.columns = this.houseCondition.floor

          break
      }
    },
    onConfirm() {
      // picker 根据选择项合成参数和界面所需文字
      const ret = this.$refs.picker.getValues()
      const value = ret[0].value
      const label = ret[0].label
      const index = value.indexOf('|')
      const logo = value.substring(0, index)
      console.log(logo)
      if (logo === 'ORIEN') {
        this.params.oriented = value
        this.oriented = label
      } else if (logo === 'FLOOR') {
        this.params.floor = value
        this.floor = label
      } else {
        this.params.roomType = value
        this.roomType = label
      }
      this.isShowPicker = false
    },
    async afterRead(file) {
      // 获取文件地址
      const formData = new FormData()
      formData.append('file', file.file)
      const imgArr = (await publishHouseImage(formData)).body
      this.imgArr.push(...imgArr)
      this.params.houseImg = this.imgArr.join('|')
    }
  },
  watch: {
    $route(newVal) {
      console.log(newVal)
    }
  }

}

</script>

<style lang="less" scoped>
.addRent{
  padding:50px 0;
  background-color: #eee;

  .label{
    color:@green;
  }
  .footer-bar{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 50px;
    border-top: 1px solid #eee;
    font-style: 17px;
    text-align: center;
    line-height: 50px;

    .cancel{
      flex:1;
      background-color: #fff;
      color:@green;
    }
    .confirm{
      flex:1;
      background-color: @green;
      color:#fff;
    }
  }
}
/deep/.van-field{
  i{
    color:#888888;
    font-style: normal;
  }
  .van-icon-arrow{
    margin:5px 3px 0 5px;
  }
}

/deep/.van-field__body textarea{
  height: 100px !important;
}

.uploader-wrap{
  width: 80px;
  height: 80px;
  border:1px solid #ccc;
  color:#ccc;
  font-size: 25px;
  .flex-center();
}

.form{
  position: absolute;
  top:50px;
  bottom:50px;
  overflow-y:scroll ;
}
</style>
