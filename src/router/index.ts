import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import basicRoute from './basicRoute'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta:{
      title: '登录'
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'basicInfo',
        component: () => import('@/views/basic/basicInfo.vue'),
      },
      {
        path: 'computed',
        component: () => import('@/views/basic/computed.vue'),
      },
    ],
  },
]

const router = createRouter({
  routes: routes.concat(basicRoute),
  history: createWebHistory(import.meta.env.VITE_ROUTER_NAME),
})

export default router
