import request from '@/utils/request'

export function apiPage(data: any) {
  return request({
    url: 'api/page',
    method: 'post',
    data: data,
  })
}
