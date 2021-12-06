<template>
  <van-cell
      title-class="list-cell"
      value-class="house-detail"
    >
      <template #title>
        <van-image
          width="106"
          height="80"
          :src="BASE_URL+detail.houseImg"
        >
        </van-image>
      </template>

      <template #default>
        <h3 class="house-detail-title">{{ detail.title }}</h3>
        <p class="desc">{{ detail.desc }}</p>
        <div class="tags">
          <van-tag
            color="#e1f5f8"
            text-color="#39becd"
            v-for="tag in detail.tags"
            :key="tag"
          >
            {{ tag }}
          </van-tag>
        </div>
        <p class="price"> <span class="price-num">{{ detail.price }}</span> 元/月</p>
      </template>
    </van-cell>
</template>

<script>
import { BASE_URL } from '@/utils/request/config'

export default {
  name: 'HouseListItem',
  props: {
    detail: { required: true, type: Object }
  },
  data() {
    return { BASE_URL }
  }
}
</script>

<style lang="less" scoped>

.house-detail{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  h3{
    color:#000;
    font-size: 15px;
    font-weight: 700;
  }
  .desc{
    font-size: 12px;
    color:#afb2ba;
  }
  .price{
    font-size: 12px;
    color: #fa5741;
    .price-num{
      font-size: 16px;
      font-weight: 700;
    }
  }
}
.list-cell{
  flex:unset;
  margin-right:20px ;
}
</style>
