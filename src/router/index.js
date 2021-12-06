import Vue from 'vue'
import VueRouter from 'vue-router'
import { homeChildrens, rentChildrens } from './childrens'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/layout'),
    children: homeChildrens
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  },
  {
    path: '/map',
    component: () => import('@/views/map')
  },
  {
    path: '/detail',
    props: ({ query: { houseCode } }) => ({ houseCode }),
    component: () => import('@/views/detail')
  },
  {
    path: '/favorate',
    component: () => import('@/views/favorate')
  },
  {
    path: '/rent',
    component: () => import('@/views/rent'),
    children: rentChildrens
  }

]

const router = new VueRouter({
  routes
})

export default router
