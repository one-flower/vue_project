import request from "@/utils/request"

// 登录方法
export function login(data: any) {
  return request({
    url: "/api/user/login",
    method: "post",
    data: data,
  })
}

// 修改密码
export function psdUpdate(data: any) {
  return request({
    url: "/api/user/psdUpdate",
    method: "post",
    data: data,
  })
}
