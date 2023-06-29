import request from '@/utils/request'

export function apiPage() {
  return request({
    url: 'menu/query',
    method: 'post',
  })
}
