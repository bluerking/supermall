import Vuerouter from 'vue-router'
import Vue from 'vue'

Vue.use(Vuerouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home/Home')
  },
  {
    path: '/category',
    component: () => import('../views/category/Category')
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart')
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile')
  },
  {
    //简写： path: '/detail/:iid', 参数必须写
    path: '/detail/:iid', //参数写不写都可以,写了就会拼接到url上，不写就不会拼接
    name: 'Detail',
    component: () => import('@/views/detail/Detail')
  },
]
const router = new Vuerouter({
  routes,
  mode: 'history'
})

export default router