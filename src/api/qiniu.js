import request from '@/utils/request'

export function getToken() {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/upload/token',
    method: 'get'
  })
}
