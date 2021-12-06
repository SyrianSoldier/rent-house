import { registerBaiDuMap } from './baidu-map'
import { registerVant } from './component/vant'

export default {
  install(Vue) {
    registerVant(Vue)
    registerBaiDuMap(Vue)
  }
}
