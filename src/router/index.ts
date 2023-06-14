import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import appStore from "@/stores";
import menuRouter from "./menu";

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
    name: "404",
    menuId: 2,
    meta: {
      title: "404",
    },
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  routes: routes.concat(menuRouter),
  history: createWebHistory(import.meta.env.VITE_ROUTER_NAME),
});

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
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
      // if(to.fullPath !== '/')
      LayoutStore.setNavList(to);

      // 菜单权限
      const getRoute = (menu: RouteRecordRaw[]) => {
        menu.forEach((item, index) => {
          // 除去没有的
          if (!UserStore.menuIds.includes(item.menuId)) {
            menu.splice(index, 1);
          } else {
            if (item.children) {
              getRoute(item.children);
            }
          }
        });
      };
      getRoute(menuRouter);
      // 放在pinia中
      UserStore.setMenuList(menuRouter);
      next();
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
