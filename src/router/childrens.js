export const homeChildrens = [
  {
    path: 'house',
    component: () => import('@/views/house')
  },
  {
    path: 'message',
    component: () => import('@/views/layout/cpns/Message')
  },
  {
    path: 'profile',
    component: () => import('@/views/layout/cpns/Profile')
  },
  {
    path: '',
    component: () => import('@/views/home')
  }
]

export const rentChildrens = [
  {
    path: 'addRent',
    component: () => import('@/views/rent/cpns/AddRent'),
    props: ({ query: { community } }) => ({ community })
  },
  {
    path: 'search',
    component: () => import('@/views/rent/cpns/Search')
  },
  {
    path: '',
    component: () => import('@/views/rent/cpns/HouseManager')
  }

]
