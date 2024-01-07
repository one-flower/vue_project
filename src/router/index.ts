import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

import { UserStore } from "@/stores"

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    menuId: 1,
    meta: {
      title: "登录",
      icon: "vue",
    },
    component: () => import("@/layout/login/index.vue"),
  },

  // {
  //   path: '/:catchAll(.*)',
  //   name: '404',
  //   menuId: 4,
  //   component: () => import('@/404.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_NAME),
  routes: routes,
})

// 全局前置导航守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start()
  // 白名单
  const wihteList = ["/login"]
  // 无token且不属于白名单。 返回login页面
  if (UserStore().token) {
    //登录
    if (to.path === "/login") {
      next({ path: "/" })
    } else {
      if (UserStore().menuList.length === 0) {
        // 重新请求路由
        try {
          // 动态路由注册
          const menuData = await UserStore().menuInfo()
          menuData.forEach(item => {
            router.addRoute(item)
          })
          // 最后添加 404
          router.addRoute({
            path: "/:catchAll(.*)",
            name: "404",
            menuId: 4,
            component: () => import("@/404.vue"),
          })
        } catch (error) {
          console.log("router", error)
          next("/login")
        }
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    // 未登录
    if (wihteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next("/login")
      NProgress.done()
    }
  }
})

// 全局后置导航
router.afterEach((to: any) => {
  document.title = `${to.meta.title || ""}-${import.meta.env.VITE_TITLE}`
  NProgress.done()
})

export default router
