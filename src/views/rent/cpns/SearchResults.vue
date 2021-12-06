<template>
 <div>
  <van-cell
    v-for="(item,index) in list"
    :key="index"
    :title="item.communityName"
    @click="$emit('onSearch',item)"
    icon="search"
    />
 </div>
</template>

<script>
import storage from '@/utils/storage'
import { searchCommunity } from '@/api/city'
export default {
  name: 'SearchResults',
  props: {
    searchText: { type: String, required: true }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      params: {
        name: this.searchText,
        id: storage.get('currentCityCode')
      }
    }
  },
  watch: {
    searchText() {
      this.loading = true
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.list = (await searchCommunity(this.params)).body
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
