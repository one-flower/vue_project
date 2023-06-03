import request from '@/request/index'

export function loginCode1() {
  return request({
    url: 'security/auth/image-captcha',
    method: 'get',
    responseType: 'arraybuffer',
  })
}

export function loginCode(data: any) {
  return request({
    url: '/api/getUserInfo',
    method: 'get',
    data: data,
  })
}
