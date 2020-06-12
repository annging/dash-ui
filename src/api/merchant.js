import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://47.107.137.16:8090/system/merchant/getMerchants',
    method: 'get',
    params: query
  })
}

export function fetchMerchantRzList(query) {
  return request({
    url: '/api/merchantrz/list',
    method: 'get',
    params: query
  })
}

export function fetchMerchantRz(id) {
  return request({
    url: '/api/merchantrz/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchMerchant(id) {
  return request({
    url: '/api/merchant/detail',
    method: 'get',
    params: { id }
  })
}
