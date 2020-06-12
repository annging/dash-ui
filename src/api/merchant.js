import request from '@/utils/request'

export function fetchList(query, data) {
  return request({
    url: '/system/merchant/getMerchants?size=' + query.size + '&current=' + query.current,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function (data, headers) {
      for (let it in data) {
        //如果为空 删除
        if (data[it] === '') {
          delete data[it]
        }
      }
      data = JSON.stringify(data);
      return data;
    }]
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
    url: '/system/merchant/getMerchantInfo',
    method: 'get',
    params: { schemeId: id }
  })
}
