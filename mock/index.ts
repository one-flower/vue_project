import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/dev-api/api/getUserInfo', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          account: 'admin',
          name: '用户',
          sex: 1,
          headImg:
            'https://idss-tp.oss-cn-beijing.aliyuncs.com/4ecfb753ef194afd914516d5068eba39_202303141429452945.jpg',
          token: 'q1w2e3r4a5s6d7f8z9x0c_v',
          menuIds:[100,101,103,104,201],
        }
      }
    },
  },
] as MockMethod[]
