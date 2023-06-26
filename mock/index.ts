import { MockMethod } from 'vite-plugin-mock'
import userMock from './user'
//! 测试环境开启 需要使用 env的前缀 + /api

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
  ...userMock
] as MockMethod[]
