import { Random } from "mockjs"
export default [
  {
    url: "/dev-api/api/user/login", // 注意，这里只能是string格式
    method: "post",
    response: () => {
      return {
        code: 200,
        data: {
          account: "admin",
          name: Random.cname(),
          avatarUrl: Random.image("300x300"),
          token: "q1w2e3r4a5s6d7f8z9x0c_v",
        },
      }
    },
  },
  {
    url: "/dev-api/api/page",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: {
          pageNo: 1,
          pageSize: 10,
          total: 4,
          result: [
            {
              id: 1,
              name: "接口1",
              url: "learn/login",
              model: "learn",
              status: 0,
            },
            {
              id: 2,
              name: "接口2",
              url: "learn/loginOut",
              model: "learn",
              status: 1,
            },
            {
              id: 3,
              name: "接口3",
              url: "learn/api/page",
              model: "learn",
              status: 0,
            },
            {
              id: 4,
              name: "接口4",
              url: "practice/menu/page",
              model: "practice",
              status: 0,
            },
          ],
        },
      }
    },
  },
  {
    url: "/dev-api/api/menu/query",
    method: "post",
    response: () => {
      // menuId 100 / 200 这种为父页面
      // component 为匹配的页面地址，父菜单为 Layout ,子菜单为正常的路径
      return {
        code: 200,
        data: [
          {
            menuId: 100,
            pid: -1,
            title: "主页",
            icon: "poke",
            path: "/",
            component: "Layout",
            redirect: "/home",
          },
          {
            menuId: 110,
            pid: 100,
            title: "主页",
            icon: "",
            path: "home",
            component: "/home",
          },
          {
            menuId: 200,
            pid: -1,
            title: "商品",
            icon: "vue",
            path: "/prodect",
            component: "Layout",
          },
          {
            menuId: 210,
            pid: 200,
            title: "商品概览",
            icon: "",
            path: "home",
            component: "/product/index",
          },
          {
            menuId: 220,
            pid: 200,
            title: "商品中心",
            icon: "",
            path: "manage",
          },
          {
            menuId: 221,
            pid: 220,
            title: "商品详情",
            icon: "",
            path: "information",
            component: "/product/manage/information",
          },
        ],
      }
    },
  },
]
