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

export function isOrNoAuthentication(query) {
  return request({
    url: '/system/merchant/isOrNoAuthentication',
    method: 'post',
    params: query
  })
}



export function fetchMerchant(id) {
  return request({
    url: '/system/merchant/getMerchantInfo',
    method: 'get',
    params: { schemeId: id }
  })
}
