import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const menuRouter: RouteRecordRaw[] = [
  {
    path: "/name",
    menuId: 100,
    meta: {
      title: "我是首页",
      icon: "win",
    },
    component: Layout,
    children: [
      {
        path: "basicInfo",
        menuId: 101,
        meta: {
          title: "我是首页1",
        },
        children: [
          {
            path: "computed",
            menuId: 101,
            meta: {
              title: "首页2",
            },
            component: () => import("@/views/basic/computed.vue"),
          },
          {
            path: ":id",
            menuId: 101,
            meta: {
              title: "page1",
            },
            component: () => import("@/views/page3.vue"),
          },
        ],
      },
      {
        path: "ccc",
        menuId: 101,
        meta: {
          title: "首页2",
        },
        component: () => import("@/views/basic/basicInfo.vue"),
      },
    ],
  },
  {
    path: "/page",
    menuId: 100,
    meta: {
      title: "page",
      icon: "win",
    },
    component: Layout,
    children: [
      {
        path: "page1",
        menuId: 101,
        meta: {
          title: "page1",
        },
        component: () => import("@/views/page1.vue"),
      },
      {
        path: "page2",
        menuId: 101,
        meta: {
          title: "page2",
        },
        component: () => import("@/views/page2.vue"),
      },
    ],
  },
  
];
export default menuRouter;
