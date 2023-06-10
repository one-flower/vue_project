import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import appStore from '@/stores'

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

let pendingRequest = new Map()
// 拼接接口信息
function getRequestKey(config: InternalAxiosRequestConfig<any>) {
  let { url, method, responseType, data } = config
  return [url, method, responseType, JSON.stringify(data)].join('&')
}
// 添加
function addPendingRequest(config: InternalAxiosRequestConfig) {
  let requestKey = getRequestKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}
// 移除
function removePendingRequest(config: InternalAxiosRequestConfig) {
  let requestKey = getRequestKey(config)
  if (pendingRequest.has(requestKey)) {
    // 如果是重复的请求，则执行对应的cancel函数
    let cancel = pendingRequest.get(requestKey)
    cancel(requestKey)
    // 将前一次重复的请求移除
    pendingRequest.delete(requestKey)
    console.log('取消重复请求：' + requestKey)
  }
}

// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加请求信息
    const store = appStore()
    if (store.UserStore.token) {
      config.headers.token = store.UserStore.getToken
    }
    // get请求处理
    if (config.method?.toLocaleLowerCase() === 'get') {
      config.params = config.data
    }
    // 取消重复接口
    removePendingRequest(config)
    // 添加非重复接口信息
    addPendingRequest(config)

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
    const { data } = response
    console.log(response,'response');
    
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
    } else if (data.code === 200) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data || { data: '' })
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    if (error) {
      return Promise.reject({ data: '' })
    }
  }
)
export default request
