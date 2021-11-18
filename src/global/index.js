import { registerVant } from './component/vant'
import { registerAxios } from './request/axios'

export default {
  install(Vue) {
    registerAxios(Vue)
    registerVant(Vue)
  }
}
