import { MyAxios } from './axios'
import { DEFAULT_CONFIG } from './config'
import store from '@/store'
// 默认axios
const defaltAxios = new MyAxios(DEFAULT_CONFIG)
defaltAxios.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user?.token
  return config
})
// map类axios
export const mapAxios = new MyAxios()

export default defaltAxios
