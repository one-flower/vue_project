import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const menuRouter: RouteRecordRaw[] = [
  {
    path: '/index',
    menuId: 100,
    meta: {
      title: '首页',
      icon: 'win',
    },
    component: Layout,
    children: [
      {
        path: '/basicInfo',
        menuId: 101,
        meta: {
          title: '首页1',
        },
        component: () => import('@/views/basic/basicInfo.vue'),
      },
      {
        path: '/computed',
        menuId: 101,
        meta: {
          title: '首页2',
        },
        component: () => import('@/views/basic/computed.vue'),
      },
    ],
  },
]
export default menuRouter
