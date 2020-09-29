import request from '@/utils/request'

export function getToken() {
  return request({
    url: 'http://47.114.59.178:5511/api/v1/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
