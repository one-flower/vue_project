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
]
