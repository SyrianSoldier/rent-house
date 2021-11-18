import Vue from 'vue'
import VueRouter from 'vue-router'
import { homeChildrens } from './childrens'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/layout/cpns/Home'),
    children: homeChildrens
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login')
  }

]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
