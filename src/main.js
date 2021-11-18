import Vue from 'vue'
import App from './App.vue'
import router from './router'
import global from '@/global'

Vue.config.productionTip = false

Vue.use(global)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
