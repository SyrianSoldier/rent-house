import request, { mapAxios } from '@/utils/request'

/**
 * 定位当前城市位置
 * @returns Promise
 */
export function getCurrentLocation() {
  return mapAxios({
    url: '/map',
    params: {
      ak: 'fczzIsWjojHed3j6zt0378VBMHGxH0cq',
      coor: 'bd09ll'
    }
  })
}
/**
 * 获取当前城市详细信息
 * @param {String} name 城市名称
 * @returns Promise
 */
export function getCityInfo(name) {
  return request({ url: '/area/info', params: { name } })
}
/**
 * 获取当前子城市城市详细信息
 * @param {String} id id是查询一级城市返回的字符串
 * @returns Promise
 */
export function getSubCityInfo(code) {
  return request({ url: '/area/map', params: { id: code } })
}
