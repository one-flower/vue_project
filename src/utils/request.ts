import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios"
import { LayoutStore } from "@/stores"
import load from "@/components/Loading/index"
import { toast } from "./tip"

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  withCredentials: true,
  timeout: 20 * 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
})

const pendingRequest = new Map()
// 拼接接口信息
function getRequestKey(config: InternalAxiosRequestConfig<any>) {
  const { url, method, responseType, data } = config
  return [url, method, responseType, JSON.stringify(data)].join("&")
}
// 添加
function addPendingRequest(config: InternalAxiosRequestConfig) {
  const requestKey = getRequestKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}
// 移除
function removePendingRequest(config: InternalAxiosRequestConfig) {
  const requestKey = getRequestKey(config)
  if (pendingRequest.has(requestKey)) {
    // 如果是重复的请求，则执行对应的cancel函数
    const cancel = pendingRequest.get(requestKey)
    cancel(requestKey)
    // 将前一次重复的请求移除
    console.log("取消重复请求：" + requestKey)
    pendingRequest.delete(requestKey)
  }
}

// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加请求信息 token
    // if (UserStore().token) {
    //   config.headers.token = UserStore().getToken
    // }
    // 判断FormData 类型
    if (Object.prototype.toString.call(config.data) === "[object FormData]") {
      config.headers["Content-Type"] = "multipart/form-data"
    }

    // 默认空对象
    if (!config.data) config.data = {}

    if (typeof config.data !== "string") {
      // 清除 undefined, null, ''
      Object.keys(config.data).forEach(key => {
        if ([undefined, null, ""].includes(config.data[key])) {
          delete config.data[key]
        } else {
          const v = config.data[key]
          if (typeof v === "string") {
            config.data[key] = v.trim()
          }
        }
      })
    }
    // get请求处理
    if (config.method?.toLocaleLowerCase() === "get") config.params = config.data

    // 取消重复接口
    removePendingRequest(config)
    // 添加非重复接口信息
    addPendingRequest(config)

    return config
  },
  error => {
    console.log("request err" + error) // for debug
    return Promise.reject(error)
  },
)
// request;

// 响应拦截
/**
 * arraybuffer  base64
 * 200          data
 * -1,400,405   message
 * 401          logout
 * else         message
 */
request.interceptors.response.use(
  (response: AxiosResponse): Promise<any> => {
    const { data } = response
    load.close()
    if (response.config.responseType === "arraybuffer") {
      // 处理arraybuffer 为png图片
      const buffer: ArrayBuffer = data
      const dataArray: Uint8Array = new Uint8Array(buffer)
      return Promise.resolve(
        "data:image/png;base64," + btoa(dataArray.reduce((data, byte) => data + String.fromCharCode(byte), "")),
      )
    } else if (data.code === 200) {
      // 成功
      return Promise.resolve(data.data)
    } else if ([-1, 400, 405].includes(data.code)) {
      // -1提示性错误；400类型错误；405请求体错误
      toast.error(data.message)
      return Promise.reject(data.message)
    } else if (data.code === 401) {
      toast.error(data.message)
      // UserStore()
      //   .logout()
      //   .then(() => {
      //     // 重置pinia
      //     LayoutStore().$reset()
      //   })
      //   .catch(() => {})
      return Promise.reject(data.message)
    } else {
      toast.error(data.message)
      return Promise.reject(data.message)
    }
  },
  (error: string) => {
    load.close()
    toast.error("response err" + error)
    if (error) {
      return Promise.reject(error)
    }
  },
)
export default request
