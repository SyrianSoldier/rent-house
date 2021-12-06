import request from '@/utils/request'

/**
 * 获取首页城市信息
 * @params level 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
 * @returns Promise
 */
export function getCitys(level = 1) {
  return request({ url: '/area/city', params: { level } })
}
/**
 * 获取首页城市信息
 * @params level 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
 * @returns Promise
 */
export function getHotCitys(level = 1) {
  return request({ url: '/area/hot' })
}

/**
 *
 * @param {*} params{ name,code }
 * @returns
 */
export function searchCommunity(params) {
  return request({ url: '/area/community', params })
}
