<template>
  <van-icon
   :name="value?'star':'star-o'"
   :color="value?'#fa5741':'#cfced2'"
   @click="onCollect"
   :size="size"
   class="collect-icon"
  />
</template>

<script>
import { addCollection, cancelCollection } from '@/api/house'
import { Toast } from 'vant'
export default {
  name: 'Collect',
  props: {
    value: { type: Boolean, required: true },
    id: { type: [Object, String, Boolean], required: true },
    size: { type: String, default: '17px' }
  },
  methods: {
    async onCollect(isCollect) {
      if (isCollect !== true) return

      Toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })

      try {
        if (this.value) {
          await cancelCollection(this.id)
          Toast.success('取消收藏成功')
        } else {
          await addCollection(this.id)
          Toast.success('添加收藏成功')
        }

        this.$emit('input', !this.value)
      } catch (error) {
        Toast.fail('收藏失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.collect-icon{
  user-select: none !important;
}
</style>
