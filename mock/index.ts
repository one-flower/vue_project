import { MockMethod } from 'vite-plugin-mock'
// const baseUrl = 
// console.log(baseUrl,'sss2');

export default [
  {
    url: '/dev-api/api/getUserInfo', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: { name: '31'}
      }
    }
  }
] as MockMethod[]
// console.log(import.meta.env,'11121')