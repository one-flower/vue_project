import request from '@/utils/request'

export function loginCode() {
  return request({
    url: 'security/auth/image-captcha',
    method: 'get',
    responseType: 'arraybuffer',
  })
}

export function login(data: any) {
  return request({
    url: '/api/getUserInfo',
    method: 'get',
    data: data,
  })
}
