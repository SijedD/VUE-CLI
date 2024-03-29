import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRegistration from '../components/UserRegistration.vue';
import UserLogin from '../components/UserLogin.vue'
import cart from '../components/cart.vue'
import orders from '../components/orders.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: UserRegistration
  },
  {
    path:'/login',
    name:'login',
    component: UserLogin
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/order',
    name: 'order',
    component: orders
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
