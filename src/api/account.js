import request from '@/utils/request'

export function getCheckPendingInfo(query, data) {
  return request({
    url: '/getCheckPendingInfo?size=' + query.size + '&current=' + query.current,
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

export function CheckPending(query) {
  return request({
    url: '/CheckPending',
    method: 'post',
    params: query
  })
}
