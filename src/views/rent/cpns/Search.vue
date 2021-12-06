<template>
  <form action="/">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @cancel="$router.go(-1)"
    />

    <SearchHistory v-if="!value" :history="history" @onSearch="onSearch"/>
    <SearchResults v-else :searchText="value" @onSearch="onSearch"/>
  </form>
</template>

<script>
import storage from '@/utils/storage'
import SearchHistory from './SearchHistory.vue'
import SearchResults from './SearchResults'
export default {
  data() {
    return {
      value: '',
      history: storage.get('HISTORY') || []
    }
  },
  components: { SearchHistory, SearchResults },
  methods: {
    onSearch(community) {
      // 将提交的历史记录放在最前面, 再去重, 去掉重复的大哥
      this.history.forEach((item, index) => {
        if (item.communityName === community.communityName) {
          this.history.splice(index, 1)
        }
      })
      this.history.unshift(community)
      storage.set('HISTORY', this.history)

      this.$router.push({
        path: '/rent/addRent',
        query: {
          community
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
