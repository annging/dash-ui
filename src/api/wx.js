import request from '@/utils/request'

const merchantSource = 'tuantuanmerchant'
const userSource = 'tuantuanclient'
// /api/v1/wx/qrcode/{source}/getImgUrl 获取小程序码图片地址
export function getImgUrl(data) {
  return request({
    url: 'https://www.tuantuanzhan.cn/api/v1/wx/qrcode/' + userSource +'/getImgUrl',
    method: 'post',
    data
  })
}

export function wxlogin(query) {
  return request({
    url: '/system/login/callBack',
    method: 'get',
    params: query
  })
}