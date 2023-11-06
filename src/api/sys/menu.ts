import request from "@/utils/request"

// 登录方法
export function menuQuery(data: any) {
  return request({
    url: "/api/menu/query",
    method: "post",
    data: data,
  })
}
