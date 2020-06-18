import request from '@/utils/request'

export function marketingData() {
  return request({
    url: '/system/index/marketingData',
    method: 'get'
  })
}

export function userData(query) {
  return request({
    url: '/system/index/userData',
    method: 'get',
    params: query
  })
}