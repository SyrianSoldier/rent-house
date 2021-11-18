import axios from 'axios'
import { BASE_URL } from './config'

axios.interceptors.response.use(res => res.data)
axios.defaults.baseURL = BASE_URL

export function registerAxios(Vue) {
  Vue.prototype.$axios = axios
}
