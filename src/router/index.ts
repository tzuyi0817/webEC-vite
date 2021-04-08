import { createRouter, createWebHistory } from 'vue-router'

const routes: any[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('/@/views/Index.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('/@/views/Account.vue')
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('/@/views/Category.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('/@/views/Product.vue')
  },
  {
    path: '/rating/:id',
    name: 'Rating',
    component: () => import('/@/views/Rating.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('/@/views/Search.vue')
  },
  {
    path: '/user',
    name: 'UserProfile',
    component: () => import('/@/views/UserProfile.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('/@/views/Cart.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
