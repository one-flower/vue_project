import type { RouteRecordRaw } from "vue-router"
import "nprogress/nprogress.css"

export const storeRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    meta: {
      title: "主页",
    },
    children: [
      {
        meta: {
          title: "主页",
        },
        path: "home",
        component: () => import("@views/home.vue"),
      },
    ],
  },
  {
    path: "/product",
    meta: {
      title: "商品",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "home",
        meta: {
          title: "商品概览",
        },
        component: () => import("@views/product/index.vue"),
      },
      {
        path: "manage",
        meta: {
          title: "商品中心",
        },
        children: [
          {
            path: "information",
            meta: {
              title: "商品详情",
            },
            component: () => import("@views/product/manage/information.vue"),
          },
        ],
      },
      {
        path: "product",
        redirect: "/product/home",
        meta: {
          title: "库存",
        },
        children: [
          {
            path: "home",
            meta: {
              title: "主页",
            },
            component: () => import("@/views/home.vue"),
          },
        ],
      },
      {
        path: "product",
        redirect: "/product/home",
        meta: {
          title: "货流",
        },
        children: [
          {
            path: "home",
            meta: {
              title: "主页",
            },
            component: () => import("@/views/home.vue"),
          },
        ],
      },
    ],
  },
]
