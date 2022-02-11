import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { showToast } from '../utils/common';

const routes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/Account.vue')
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/Product.vue')
  },
  {
    path: '/rating/:id',
    name: 'Rating',
    component: () => import('@/views/Rating.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const withoutAuth = ['Index', 'Category', 'Product', 'Search'];

  if (withoutAuth.includes(to.name as string)) {
    next();
    return;
  }

  if (token && to.name === 'Account') {
    next('/index');
    return;
  }

  if (!token && to.name !== 'Account') {
    showToast('請先登入帳號');
    next('/account');
    return;
  }

  next();
})

export default router;
