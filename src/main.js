import Vue from 'vue'
import App from './App.vue'
import router from './router'
import global from '@/global'
import '@/style/index.less'
import store from '@/store'
Vue.config.productionTip = false

Vue.use(global)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
