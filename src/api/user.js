import request from '@/utils/request'

export function login(query) {
  return request({
    url: '/system/login',
    method: 'post',
    params: query
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
