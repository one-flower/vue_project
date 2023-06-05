import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

import { UserStore } from "@/stores";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    menuId: 1,
    meta: {
      title: "登录",
      sys: true, // 自带菜单
      hidden: true,
      icon: "vue",
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    menuId: 2,
    meta: {
      title: "404",
      sys: true,
      hidden: true,
    },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/",
    menuId: 100,
    meta: {
      title: "首页",
    },
    component: Layout,
    children: [
      {
        path: "basicInfo",
        menuId: 101,
        meta: {
          title: "首页1",
        },
        component: () => import("@/views/basic/basicInfo.vue"),
        children: [
          {
            path: "basicInfo",
            menuId: 102,
            meta: {
              title: "首页1",
            },
            component: () => import("@/views/basic/basicInfo.vue"),
          },
        ],
      },
      {
        path: "computed",
        menuId: 102,
        meta: {
          title: "首页2",
        },
        component: () => import("@/views/basic/computed.vue"),
      },
      {
        path: "computed",
        menuId: 103,
        meta: {
          title: "首页2",
        },
        component: () => import("@/views/basic/computed.vue"),
      },
    ],
  },
  {
    path: "/a",
    menuId: 200,
    meta: {
      title: "首页",
    },
    component: Layout,
    children: [
      {
        path: "basicInfo",
        menuId: 205,
        meta: {
          title: "首页1",
        },
        component: () => import("@/views/basic/basicInfo.vue"),
      },
      {
        path: "computed",
        menuId: 206,
        meta: {
          title: "首页2",
        },
        component: () => import("@/views/basic/computed.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(import.meta.env.VITE_ROUTER_NAME),
});

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  const { token, menuList } = UserStore();
  // 白名单
  const wihteList = ["/login"];
  // 无token且不属于白名单。 返回login页面
  if (token) {
    //登录
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      // 菜单权限
      const getRoute = (menu: RouteRecordRaw[]) => {
        menu.forEach((item, index) => {
          if (item.meta?.sys) {
            //判断系统菜单
            if (item.children) {
              getRoute(item.children);
            } else {
              return;
            }
          } else {
            // 普通菜单
            // 除去没有的
            if (!menuList.includes(item.menuId)) {
              menu.splice(index, 1);
            } else {
              if (item.children) {
                getRoute(item.children);
              }
            }
          }
        });
      };

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
