import request from '@/utils/request'

export function getToken() {
  return request({
    url: 'https://www.tuantuanzhan.cn/api/v1/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
