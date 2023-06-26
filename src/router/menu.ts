import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const menuRouter: RouteRecordRaw[] = [
  {
    path: "/sys",
    menuId: 100,
    meta: {
      title: "系统设置",
      icon: "win",
    },
    component: Layout,
    children: [
      {
        path: "api",
        menuId: 110,
        meta: {
          title: "接口配置",
        },
        component: () => import("@/views/sys/api.vue"),
      },
      {
        path: "menu",
        menuId: 120,
        meta: {
          title: "菜单配置",
        },
        component: () => import("@/views/sys/menu.vue"),
      },
    ],
  },
  {
    path: "/page",
    menuId: 200,
    meta: {
      title: "page",
      icon: "win",
    },
    component: Layout,
    children: [
      {
        path: "page1",
        menuId: 210,
        meta: {
          title: "page1",
        },
        component: () => import("@/views/page1.vue"),
      },
      {
        path: "page2",
        menuId: 220,
        meta: {
          title: "page2",
        },
        component: () => import("@/views/page2.vue"),
      },
    ],
  },
  
];
export default menuRouter;
