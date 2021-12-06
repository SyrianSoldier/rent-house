import request from '@/utils/request'

/**
 * 发送登录请求
 * @param {username:String,password:String} data
 * @returns Promise
 */
export function onLogin(data) {
  return request({ url: '/user/login', method: 'POST', data })
}
/**
 *  发送请求获取用户个人资料, 需要携带token
 * @returns Promise
 */
export function getUserInfo() {
  return request({ url: '/user' })
}
