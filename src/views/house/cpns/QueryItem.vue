<template>
  <van-dropdown-item  :title="title" ref="dropdownItem" >
    <van-picker
      ref="picker"
      show-toolbar
      toolbar-position="bottom"
      :columns="queryCondition"
      value-key="label"
      confirm-button-text="确定"
      :visible-item-count="5"
      @confirm="confirm"
    >
      <template #confirm >
        <van-button type="primary" class="confirm-btn">确定</van-button>
      </template>
       <template #cancel >
        <span @click="cancle">取消</span>
      </template>
    </van-picker>
  </van-dropdown-item>
</template>

<script>
export default {
  name: 'Area',
  props: {
    queryCondition: { type: Array, required: true },
    title: { type: String, required: true }
  },
  data() {
    return {
      queryParmas: {
        area: '',
        price: '',
        rentType: '',
        more: ''
      }
    }
  },
  created() {
    // 注册事件, 让其他组件可以调用该组件的提交参数(向vuex)方法
    this.$bus.$on('submitQueryParams', this.submitQueryParams)
  },

  methods: {
    cancle() {
      // 取消下拉
      this.$refs.dropdownItem.toggle(false)
    },
    confirm() {
      // 获取选中数据数组
      const res = this.$refs.picker.getValues()
      // 添加请求所需查询信息, 做兼容性处理
      switch (this.title) {
        // 如果第三项code不存在, 判断第二项是否存在
        case '区域':
          if (res[2].value !== 'null') {
            this.queryParmas.area = res[2].value
          } else if (res[1] !== 'null') {
            this.queryParmas.area = res[1].value
          }
          break
          // 只有一项的选择器就用的第一项
        case '方式':
          this.queryParmas.rentType = res[0].value
          break
        case '租金':
          console.log(this)
          this.queryParmas.price = res[0].value
          break
      }

      // 将数据存放到vuex中
      this.submitQueryParams()
      // 关闭下拉框
      this.$refs.dropdownItem.toggle(false)
    },
    submitQueryParams(more) {
      if (more) {
        // 合成查询more字段
        this.queryParmas.more = more.join(',')
      }
      // 将查询出租列表参数数据提交到vuex
      this.$store.commit('city/updateQueryParams', this.queryParmas)
      // 每次提交后重新加载List的列表
      this.$bus.$emit('reLoad')
    }

  }
}
</script>

<style lang="less" scoped>
/deep/.van-picker__toolbar{
  .van-picker__confirm{
  width: 65%;
  padding: 0;
  border-radius:0;

  background-color: @green;

  .confirm-btn {
    width: 100%;
    background-color: inherit;
    font-size: 18px;
  }
}
  .concel-btn{
    background-color: #fff;
    color:@green;
  }
  .van-picker__cancel{
    flex:1;
    border:1px solid #e3e5e6;
    padding:0;
    font-size: 18px;
    color:@green;
  }
}

</style>
