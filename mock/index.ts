import { MockMethod } from "vite-plugin-mock"
// import { Random } from "mockjs"
import userMock from "./user"
//! 测试环境开启 需要使用 env的前缀 + /api

export default [...userMock] as MockMethod[]
