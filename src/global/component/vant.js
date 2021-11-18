import {
  Button,
  Tabbar,
  TabbarItem,
  Form,
  Field,
  NavBar
} from 'vant'

const els = [
  Button,
  Tabbar,
  TabbarItem,
  Form,
  Field,
  NavBar
]

export function registerVant(Vue) {
  els.forEach(el => (Vue.component(el.name, el)))
}
