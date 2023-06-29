import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import appStore from "@/stores";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    menuId: 1,
    meta: {
      title: "登录",
      icon: "vue",
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    menuId: 2,
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        menuId: 3,
        meta: {
          title: "主页",
        },
        component: () => import("@/views/home.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    menuId: 4,
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(import.meta.env.VITE_ROUTER_NAME),
});

// 全局前置导航守卫
router.beforeEach(async (to, from, next) => {
  const { UserStore, LayoutStore } = appStore();
  NProgress.start();
  // 白名单
  const wihteList = ["/login"];
  // 无token且不属于白名单。 返回login页面
  if (UserStore.token) {
    //登录
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (UserStore.menuList.length === 0) {
        // 重新请求路由
        let menuData = await UserStore.menuInfo();
        menuData.forEach((item) => {
          router.addRoute(item);
        });
        // 最后添加 404
        router.addRoute({
          path: "/:catchAll(.*)",
          name: "404",
          menuId: 4,
          component: () => import("@/views/404.vue"),
        });

        next({ ...to, replace: true });
      } else {
        next();
        if (to.name !== "404") LayoutStore.setNavList(to);
      }
    }
  } else {
    // 未登录
    if (wihteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});

// 全局后置导航
router.afterEach((to) => {
  document.title = `${to.meta.title || ""}-${import.meta.env.VITE_TITLE}`;
  NProgress.done();
});

export default router;
