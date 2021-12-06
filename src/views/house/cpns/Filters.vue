<template>
  <van-dropdown-item  title="筛选" class="item" @open="filterItemOpen" >
    <template #default>
      <van-popup
        v-model="show"
        position="right"
        :style="{ width: '70%',height:'100%' }"
        :getContainer="getContainer"
      >
        <van-cell
          v-for="(value,key) in filterCondition"
          :key="key"
          :title="key | toChars"
        >
          <template #label>
            <van-button
              v-for="(item,index) in value"
              :key="index"
              :class="{active:more.indexOf(item.value) !== -1}"
              @click="onClick(item.value)"
              type="primary"
              size="small"
              plain
              hairline
            >
              {{ item.label }}
            </van-button>
          </template>
        </van-cell>

        <div class="cancle-confirm">
          <span @click="cancel">取消</span>
          <span @click="confirm">确定</span>
        </div>
      </van-popup>
    </template>
  </van-dropdown-item>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filterCondition: { type: Object, required: true }
  },
  data() {
    return {
      show: false,
      more: []
    }
  },
  methods: {
    getContainer() {
      // 别动! 不挂载这个, 会有bug, 不知道为啥...
      return document.querySelector('body')
    },
    filterItemOpen() {
      this.show = true
    },
    onClick(value) {
      // 合成: 点击后若数据结构中有则删除该字段, 没有则添加该字段
      const index = this.more.indexOf(value)
      if (index === -1) {
        console.log('添加', value)
        this.more.push(value)
      } else {
        console.log('删除成功', value)
        this.more.splice(index, 1)
      }
    },
    confirm() {
      // 点击确定后, 向vuex中储存查询参数(借用queryItem的方法)
      this.$bus.$emit('submitQueryParams', this.more)
      this.show = false
    },
    cancel() {
      this.show = false
    }
  },

  filters: {
    toChars(value) {
      if (value === 'roomType') {
        return '户型'
      } else if (value === 'oriented') {
        return '朝向'
      } else if (value === 'floor') {
        return '楼层'
      } else if (value === 'characteristic') {
        return '房屋亮点'
      } else {
        return '特点'
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.active {
  color: #21b97a !important;
  background-color: #defaef;
  font-size: 12px !important;
    /deep/.van-button--hairline::after {
  border-color: black;
}

}
/deep/.van-button--primary{
  color: #888888;
  width: 70px;
  height: 32px;
  margin:10px 5px 10px 30px;
  border:0;

  /deep/.van-button--hairline::after {
    border-color: black;
     border-radius: 10px;

  }
  .van-button__content{
    border:0;
  }
}
.cancle-confirm{
  position:sticky;
  bottom: 0;
  display: flex;
  height: 50px;
  width: 100%;
  font-size: 18px;
  text-align: center;
  line-height: 50px;

  span:nth-child(1){
    flex:35%;
    border:1px solid #e3e5e6;
    color:@green;
    background-color: #fff;
  }
  span:nth-child(2){
    flex:70%;
    background-color: @green;
    color:#fff;
  }
}

</style>
