import request from '@/utils/request'

// 获取商家认证列表
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

// 商家认证审核
export function isOrNoAuthentication(query) {
  return request({
    url: '/system/merchant/isOrNoAuthentication',
    method: 'post',
    params: query
  })
}

// /system/merchant/getApplyGetMerchant 获得领取商家的认证信息
export function getApplyGetMerchant(query, data) {
  return request({
    url: '/system/merchant/getApplyGetMerchant?size=' + query.size + '&current=' + query.current,
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

// 领取商家的认证信息审核
export function isOrNoGetAuthentication(query) {
  return request({
    url: '/system/merchant/isOrNoGetAuthentication',
    method: 'post',
    params: query
  })
}

// /system/merchant/groundingOrUndercarriage 商家上下架
export function groundingOrUndercarriage(query) {
  return request({
    url: '/system/merchant/groundingOrUndercarriage',
    method: 'get',
    params: query
  })
}

// 获取商家认证
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

// https://www.tuantuanzhan.cn/api/v1/merchant/dataAnalysis 数据分析
export function dataAnalysis(query) {
  return request({
    url: 'https://www.tuantuanzhan.cn/api/v1/merchant/dataAnalysis',
    method: 'get',
    params: query,
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}

// /api/v1/activity/common/getByMerchantId/{merchantId} 查询商家主页活动
export function getActivityByMerchantId(id) {
  return request({
    url: 'https://tuantuanzhan.cn/api/v1/activity/common/getByMerchantId/' + id,
    method: 'get',
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}

// /api/v1/merchant/update 创建/更新商户,id大于0就是更新,等于0是新增
export function updateMerchant(data) {
  return request({
    url: 'https://tuantuanzhan.cn/api/v1/merchant/update',
    method: 'post',
    data: data,
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}

// /system/merchant/updateMerchantViPEndTime  修改商家会员时间
export function updateMerchantViPEndTime(query) {
  return request({
    url: '/system/merchant/updateMerchantViPEndTime',
    method: 'get',
    params: query
  })
}

// /system/merchant/updateMerchantViPLevel 修改商家会员级别
export function updateMerchantViPLevel(query) {
  return request({
    url: '/system/merchant/updateMerchantViPLevel',
    method: 'get',
    params: query
  })
}

// /api/v1/store/query/merchant 根据商户id查询商户的所有门店
export function getStores(query) {
  return request({
    url: 'https://tuantuanzhan.cn/api/v1/store/query/merchant',
    method: 'get',
    params: query,
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}
