export default [
  {
    url: '/dev-api/api/page',
    method: 'post',
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
              name: '接口1',
              url: 'learn/login',
              model: 'learn',
              status: 0,
            },
            {
              id: 2,
              name: '接口2',
              url: 'learn/loginOut',
              model: 'learn',
              status: 1,
            },
            {
              id: 3,
              name: '接口3',
              url: 'learn/api/page',
              model: 'learn',
              status: 0,
            },
            {
              id: 4,
              name: '接口4',
              url: 'practice/menu/page',
              model: 'practice',
              status: 0,
            },
          ],
        },
      }
    },
  },
  {
    url: '/dev-api/api/menu/List',
    method: 'post',
    response: () => {
      // menuId 100 / 200 这种为父页面
      // component 为匹配的页面地址，父菜单为 Layout ,子菜单为正常的路径
      return {
        code: 200,
        data: [
          {
            menuId: 100,
            pid: -1,
            title: '系统设置',
            icon: 'win',
            path: '/sys',
            component: 'Layout',
            permission: 'api1,ap12',
          },
          {
            menuId: 110,
            pid: 100,
            title: '接口配置',
            icon: 'win',
            path: 'api',
            component: '/sys/api',
            permission: '',
          },
          {
            menuId: 120,
            pid: 100,
            title: '菜单配置',
            icon: 'win',
            path: 'menu',
            component: '/sys/menu',
            permission: '',
          },
          {
            menuId: 200,
            pid: -1,
            title: 'page',
            icon: 'win',
            path: '/page',
            component: 'Layout',
            permission: '',
          },
          {
            menuId: 210,
            pid: 200,
            title: 'page1',
            icon: 'win',
            path: 'page1',
            component: '/page1',
            permission: '',
          },
          {
            menuId: 300,
            pid: -1,
            title: 'page',
            icon: 'win',
            path: '/page3',
            permission: '',
          },
          {
            menuId: 310,
            pid: 300,
            title: 'page1',
            icon: 'win',
            path: 'page4',
            permission: '',
          },
        ],
      }
    },
  },
]
