import request from '@/utils/request'

/**
 * 获取首页轮播图信息
 * @returns Promise
 */
export function getSwiper() {
  return request({ url: '/home/swiper' })
}

/**
 * 获取首页轮播图信息
 * @returns Promise
 */
export function getRentGroups() {
  return request({ url: '/home/groups' })
}
