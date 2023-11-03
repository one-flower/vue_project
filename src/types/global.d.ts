// Generated by 'unplugin-auto-import'
// We suggest you to commit this file into source control
// declare global {
//   interface IStringObject {
//     [index: string]: any
//   }
// }
// export {}
// axios 请求格式自定义
import { AxiosRequestConfig } from "axios"
declare module "axios" {
  interface AxiosInstance {
    //返回格式为Promise<any>
    (config: AxiosRequestConfig): Promise<any>
  }
}


declare global {
  // 定义默认 table 接口
  interface TablePage {
   
    result: any[]
    total?: number,
    pageNo: number,
    pageNum:number
}
}

