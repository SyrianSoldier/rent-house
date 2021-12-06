import request from '@/utils/request'
/**
 *
 * @param {Object} params cityId为必须的
 * @returns
 */
export function getHouseInfo(params) {
  return request({ url: '/houses', params })
}
/**
 * 根据具体code查询房屋信息
 * @param {Object} params houseCode为必须的
 * @returns
 */
export function getHouseDetail(houseCode) {
  return request({ url: '/houses/' + houseCode })
}

/**
 * 获取查询条件
 * @param {Object} params cityCode为必须的
 * @returns Promise
 */
export function getQueryCondision(id) {
  return request({ url: '/houses/condition', params: { id } })
}
export function getFilterConditions() {
  return request({ url: '/houses/params' })
}

export function addCollection(id) {
  return request({ url: '/user/favorites/' + id, method: 'POST' })
}
export function cancelCollection(id) {
  return request({ url: '/user/favorites/' + id, method: 'DELETE' })
}

export function getLikeHouse() {
  return request({ url: '/user/favorites' })
}

export function queryIsCollect(id) {
  return request({ url: '/user/favorites/' + id })
}

export function publishHouseInfo(data) {
  return request({ url: '/user/houses', data, method: 'POST' })
}

export function publishHouseImage(file) {
  return request({
    url: '/houses/image',
    data: file,
    method: 'POST'
  })
}
export function findPublishedHouse() {
  return request({ url: '/user/houses' })
}
