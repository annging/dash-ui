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
    method: 'post',
    params: { merchantId: id }
  })
}

// /system/merchant/getRecommendedMerchants 推荐商家列表
export function getRecommendedMerchants(query, data) {
  return request({
    url: '/system/merchant/getRecommendedMerchants',
    method: 'post',
    params: query,
    data,
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


// /system/merchant/recommendMerchant 推荐商家
export function recommendMerchant(query) {
  return request({
    url: '/system/merchant/recommendMerchant',
    method: 'get',
    params: query
  })
}

// /system/merchant/CancelRecommended 取消推荐商家
export function CancelRecommended(query) {
  return request({
    url: '/system/merchant/CancelRecommended',
    method: 'get',
    params: query
  })
}

// https://www.tuantuanzhan.cn//api/v1/merchant/dataAnalysis 数据分析
export function dataAnalysis(query) {
  return request({
    url: 'https://www.tuantuanzhan.cn//api/v1/merchant/dataAnalysis',
    method: 'get',
    params: query
  })
}

// /api/v1/merchant/update 创建/更新商户,id大于0就是更新,等于0是新增
export function updateMerchant(data) {
  return request({
    url: 'http://test.tuantuanzhan.cn/api/v1/merchant/update',
    method: 'post',
    data: data,
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}
