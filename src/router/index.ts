import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

import { UserStore } from '@/stores'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      sys: true, // 自带菜单
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: {
      title: '404',
      sys: true,
    },
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/',
    meta: {
      title: '首页',
      menuId: 100,
    },
    component: Layout,
    children: [
      {
        path: 'basicInfo',
        meta: {
          title: '首页1',
          menuId: 101,
        },
        component: () => import('@/views/basic/basicInfo.vue'),
      },
      {
        path: 'computed',
        meta: {
          title: '首页2',
          menuId: 102,
        },
        component: () => import('@/views/basic/computed.vue'),
      },
      {
        path: 'computed',
        meta: {
          title: '首页2',
          menuId: 103,
        },
        component: () => import('@/views/basic/computed.vue'),
      },
    ],
  },
  {
    path: '/',
    meta: {
      title: '首页',
      menuId: 200,
    },
    component: Layout,
    children: [
      {
        path: 'basicInfo',
        meta: {
          title: '首页1',
          menuId: 205,
        },
        component: () => import('@/views/basic/basicInfo.vue'),
      },
      {
        path: 'computed',
        meta: {
          title: '首页2',
          menuId: 206,
        },
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
  const { token,menuList } = UserStore()
  // 白名单
  const wihteList = ['/login']
  // 无token且不属于白名单。 返回login页面
  if (token) {
    //登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 菜单权限
      const getRoute = (menu: RouteRecordRaw[]) => {
        menu.forEach((item,index) => {
          if (item.meta?.sys) {
             //判断系统菜单
            if (item.children) {
              getRoute(item.children)
            }else{
              return
            }
          }else {
            // 普通菜单
            //@ts-ignore
            let menuId:number = item.meta?.menuId || 0
            // 除去没有的
            if(!menuList.includes(menuId)){
              menu.splice(index,1)
            }else {
              if(item.children){
                getRoute(item.children)
              }
            }
          }
        })
      }

      next()
    }
  } else {
    // 未登录
    if (wihteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

// 全局后置导航
router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-${import.meta.env.VITE_TITLE}`
  NProgress.done()
})

export default router
