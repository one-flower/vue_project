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
          menuIds: [100, 101, 102, 103, 104, 201],
        },
      }
    },
  },
  {
    url: '/dev-api/api/image-captcha',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAIAAADmAupWAAAA+UlEQVR42u3Y6w3DMAgEYPafqqN1gPpxHAeplONvYuJPcsB2fF4WYbDBbwPHT4CvnSOVhIFt8kR2zHISkQ9ieFF7AmdnMAMGzefhUVmcqvVc/xdA7QKMfCC7xnAwXUFIsKRacFo8A/jmbmBwqVVaIgmovYPXj2szHgMjleUCrreHpnZa0ZJguj2Mae/gYiP9B60ATAMe1zJgVXvoK3XcbIOrhGB7kOyB69pRcFMPCyr0YOF2X67NgSe1lfMQCk6VeBW44wDIg+uXFfJ5S3aj6YO4sFY1gS/9mb7Wmf8PW8Bj+6pH1rOvaQ022GCDDTbYYIMNNthggzfxBY/6zK0fvzrRAAAAAElFTkSuQmCC',
      }
    },
  },
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
            { id: 1, name: '接口1', model: 'x', status: 0 },
            { id: 2, name: '接口2', model: 'x', status: 1 },
            { id: 3, name: '接口3', model: 'x', status: 0 },
            { id: 4, name: '接口4', model: 'y', status: 0 },
          ],
        },
      }
    },
  },
] as MockMethod[]
