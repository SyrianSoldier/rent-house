<template>
  <div class="house">
    <Search background="#4fc08d">
      <template #left>
        <van-icon
          name="arrow-left"
          class="arrow-left"
          @click="$router.back()"
        />
      </template>
    </Search>

    <van-dropdown-menu sticky>
      <QueryItem  :queryCondition="areaQueryCondition" title="区域" ref="queryItem" />
      <QueryItem  :queryCondition="rentType" title="方式"/>
      <QueryItem  :queryCondition="price" title="租金"/>
      <Filters  :filterCondition="filterCondition"/>
    </van-dropdown-menu>

    <RentList/>

  </div>
</template>

<script>
import Search from '@/components/Search'
import QueryItem from './cpns/QueryItem.vue'
import Filters from './cpns/Filters.vue'
import RentList from './cpns/RentList.vue'
import { getQueryCondision } from '@/api/house'
import { Toast } from 'vant'
export default {
  name: 'House',
  components: { Search, QueryItem, Filters, RentList },
  data() {
    return {
      value: 0,
      areaQueryCondition: [],
      filterCondition: {},
      rentType: [],
      price: []
    }
  },
  created() {
    // 获取查询条件
    this.getQueryCondision()
  },
  methods: {
    async getQueryCondision() {
      const currentCityCode = this.$store.state.city.currentCityCode
      try {
        const toast = Toast.loading({ message: '加载中...', duration: 0 })
        const res = (await getQueryCondision(currentCityCode)).body
        this.compositeUsabelDate(res)
        toast.clear()
      } catch (error) {
        Toast.fail('网络错误,请刷新重试!')
      }
    },
    compositeUsabelDate(data) {
      let {
        area, subway,
        characteristic, oriented,
        rentType, roomType,
        floor, price
      } = data

      // 合成区域查询条件
      area = this.addChildrenField(area)
      subway = this.addChildrenField(subway)
      this.areaQueryCondition = [area, subway]
      // 合成筛选查询查件
      this.$set(this.filterCondition, 'roomType', roomType)
      this.$set(this.filterCondition, 'oriented', oriented)
      this.$set(this.filterCondition, 'floor', floor)
      this.$set(this.filterCondition, 'characteristic', characteristic)
      // 合成出租条件
      this.rentType = rentType
      // 合成租金条件
      this.price = price
    },
    addChildrenField(obj) {
      // 递归修改children字段
      const isHaveChildren = Object.prototype.hasOwnProperty.call(obj, 'children')
      if (!isHaveChildren) {
        obj.children = [{ label: '不限', value: 'null' }]
      } else {
        for (const key in obj.children) {
          this.addChildrenField(obj.children[key])
        }
      }
      return obj
    }

  }

}

</script>

<style lang="less" scoped>
.arrow-left{
  font-size: 25px;
  color:@white;
  margin-right: 10px;
}

</style>
