import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

import { useUserStore } from '@/stores'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
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
  routes: routes,
  history: createWebHistory(import.meta.env.VITE_ROUTER_NAME),
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { token } = useUserStore()
  // 白名单
  const wihteList = ['/login']
  // 无token且不属于白名单。 返回login页面
  if (token) {
    //登录
    if (to.path === '/login') {
      console.log('lo');
      
      next({ path: '/' })
    } else {
      console.log('lo1');
      
      next()
    }
  } else {
    console.log('222');
    
    // 未登录
    if (wihteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }

  // if (!store.$state.token && !wihteList.includes(to.path)) {
  //   return '/login'
  // } else {
  //   console.log('--')

  //   return '/home'
  // }
})

// 全局后置导航
router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-${import.meta.env.VITE_TITLE}`
  NProgress.done()
})

export default router
