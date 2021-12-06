<template>
 <div class="history">
   <!-- 历史标题 -->
    <van-cell title="搜索历史">
    <template>
      <van-icon name="delete-o" @click="toggle" v-if="!isDelete"></van-icon>

      <div class="box" v-else>
        <span @click="deleteAll">全部删除</span>
        <span @click="complete">完成</span>
      </div>
    </template>
  </van-cell>
  <!-- 历史列表 -->
  <van-cell v-for="item in history" :key="item.communityName" :title="item.communityName" @click="onSearch(item)">
    <van-icon name="delete-o" @click.stop="deleteItem(item)" v-if="isDelete"></van-icon>
  </van-cell>

 </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  name: 'SearchHistory',
  props: {
    history: { type: Array, required: true }
  },
  data() {
    return {
      isDelete: false
    }
  },
  methods: {
    toggle() {
      this.isDelete = true
    },
    deleteAll() {
      // 删除本地存储, 同步数据
      this.history.splice(0) // 直接删完
      storage.remove('HISTORY')
      this.isDelete = false
    },
    complete() {
      this.isDelete = false
    },
    deleteItem(item) {
      console.log(11)
      const index = this.history.indexOf(item)
      if (index !== -1) {
        this.history.splice(index, 1)
        storage.set('HISTORY', this.history)
      }
    },
    onSearch(historyItem) {
      // 点击后开始搜索, 并且将该搜索历史在数组的位置提到最前
      this.$emit('onSearch', historyItem)
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  font-style: 14px;
  color:#666;
  span:nth-child(1){
    margin-right:10px;
  }
  span:nth-child(2){
  }
}
</style>
