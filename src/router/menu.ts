import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const menuRouter: RouteRecordRaw[] = [
  {
    path: '/index',
    menuId: 100,
    meta: {
      title: '我是首页',
      icon: 'win',
    },
    component: Layout,
    children: [
      {
        path: 'basicInfo',
        menuId: 101,
        meta: {
          title: '我是首页1',
        },
        component: () => import('@/views/basic/basicInfo.vue'),
        children: [
          {
            path: 'basicInfo',
            menuId: 101,
            meta: {
              title: '我是首页1-1-1',
            },
            component: () => import('@/views/basic/basicInfo.vue'),
          },
          {
            path: 'computed',
            menuId: 101,
            meta: {
              title: '我是首页2-2-2',
            },
            component: () => import('@/views/basic/computed.vue'),
          },
        ],
      },
      {
        path: 'computed',
        menuId: 101,
        meta: {
          title: '首页2',
        },
        component: () => import('@/views/basic/computed.vue'),
      },
    ],
  },
  {
    path: '/xxx',
    menuId: 100,
    meta: {
      title: '首页',
      icon: 'win',
    },
    component: Layout,
    children: [
      {
        path: '111',
        menuId: 101,
        meta: {
          title: '首页1',
        },
        component: () => import('@/views/basic/basicInfo.vue'),
      },
      {
        path: 'computed',
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
