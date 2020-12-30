import request from '@/utils/request'

export function marketingData() {
  return request({
    url: '/system/index/marketingData',
    method: 'get'
  })
}

export function userData(query) {
  return request({
    url: '/system/index/userData',
    method: 'get',
    params: query
  })
}

// 这个暂时废弃
export function getOrders(query, data) {
  return request({
    url: '/system/order/getOrders',
    method: 'post',
    params: query,
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

// /system/order/pages 分页查询根据条件订单信息
export function getPageOrders(query, data) {
  return request({
    url: '/system/order/pages',
    method: 'post',
    params: query,
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