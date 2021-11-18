export const homeChildrens = [
  {
    path: 'house',
    component: () => import('@/views/layout/cpns/House')
  },
  {
    path: 'message',
    component: () => import('@/views/layout/cpns/Message')
  },
  {
    path: 'my',
    component: () => import('@/views/layout/cpns/My')
  }
]
