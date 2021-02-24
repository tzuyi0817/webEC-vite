import { createRouter, createWebHistory } from 'vue-router'

const routes: any[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('/@/views/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
