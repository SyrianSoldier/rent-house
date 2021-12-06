<template>
  <van-grid :border="false" :column-num="5">
    <van-grid-item
      v-for="(item,index) in supporting"
      :key="index"
      @click.native="onClick(item.label)"
    >
      <div
        class="icon-content"
        :class="{active:selectedArr.indexOf(item.label) !== -1}"
      >
        <span :class="item.label | toIconfont"></span>
        <p>{{ item.label }}</p>
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  name: 'HouseEdit',
  props: {
    supporting: { type: Array, required: true },
    selected: { type: String, default: '' }
  },
  model: {
    prop: 'selected',
    event: 'updateSelected'
  },
  data() {
    return {
      selectedArr: []
    }
  },
  methods: {
    onClick(label) {
      // 如果没有就添加 有就删除
      const index = this.selectedArr.indexOf(label)
      if (index === -1) {
        this.selectedArr.push(label)
      } else {
        this.selectedArr.splice(index, 1)
      }
      // 更新父组件参数
      this.$emit('updateSelected', this.selectedArr.join('|'))
    }
  },
  filters: {
    toIconfont(value) {
      switch (value) {
        case '衣柜':
          value = 'iconfont icon-wardrobe'
          break
        case '洗衣机':
          value = 'iconfont icon-wash'
          break
        case '空调':
          value = 'iconfont icon-air'
          break
        case '天然气':
          value = 'iconfont icon-gas'
          break
        case '冰箱':
          value = 'iconfont icon-ref'
          break
        case '暖气':
          value = 'iconfont icon-Heat'
          break
        case '电视':
          value = 'iconfont icon-vid'
          break
        case '热水器':
          value = 'iconfont icon-heater'
          break
        case '沙发':
          value = 'iconfont icon-sofa'
          break
        default:
          value = 'iconfont icon-wardrobe'
          break
      }
      return value
    }
  }
}
</script>

<style lang="less" scoped>
.active{
  color:@green;
}
.icon-content{
  text-align: center;
}
</style>
