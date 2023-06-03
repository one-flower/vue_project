import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'

const CancelToken = axios.CancelToken // 用于axios取消请求

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  withCredentials: true,
  timeout: 20 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'role_code': 'PLATFORM_ADMIN',
    // 'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzgxMTIyMzM0NCIsImlhdCI6MTY4NTQyNzU1NSwiZXhwIjoxNjg1NDQ1NTU1fQ.hUf01DB6yeNhNTMaa3vZj0eCXN9vOGM3d5GsQQ_diiIBbBEUznWY5zDTE1a2MJnOE83uaWXylNZkSxZs6bWB6g'
  },
})
// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(config, 'config')

    //config 配置对象
    // const store = useStore()
    // const source = CancelToken.source()
    // // const { cancel } = useStore()
    const url = config.url
    if (config.method?.toLocaleLowerCase() === 'get') {
      config.params = config.data
    }
    // config.cancelToken = source.token
    // if (store.user) {
    //   config.headers.Authorization = `${store.user.token}`
    // }
    // // 当有重复请求的时候 则利用这个方式来取消重复的请求
    // if (cancel[url]) {
    //   delete cancel[url]
    // }
    // cancel[url] = source.cancel
    // store.setCancel(cancel)
    return config
  },
  (error) => {
    console.log('err' + error) // for debug

    return Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response, 'ssssss')

    const { status, data } = response
    if (response.config.responseType === 'arraybuffer') {
      // 处理arraybuffer 为png图片
      const buffer: ArrayBuffer = data
      const dataArray: Uint8Array = new Uint8Array(buffer)
      return Promise.resolve({
        data:
          'data:image/png;base64,' +
          btoa(
            dataArray.reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          ),
      })
    } else {
      return Promise.resolve(data)
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default request
