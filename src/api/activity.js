import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/activity/list',
    method: 'get',
    params: query
  })
}

// 获取方案列表
export function fetchSchemeList(query, data) {
  return request({
    url: 'http://47.107.137.16:8090/system/activity/getActivityScheme?size=' + query.size + '&current=' + query.current,
    method: 'post',
    data
  })
}

// 新增方案
export function addActivityScheme(data) {
  return request({
    url: 'http://47.107.137.16:8090/system/activity/addActivityScheme',
    method: 'post',
    data,
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      console.log(data);
      let l = Object.keys(data).length;
      let i = 0;
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
        if (i < l -1) {
          ret = ret + '&';
          i++
        }
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function fetchActivity(id) {
  return request({
    url: '/api/activity',
    method: 'get',
    params: { id }
  })
}


export function updateActivity(data) {
  return request({
    url: '/api/activity/update',
    method: 'post',
    data
  })
}

export function fetchActivtyFenxiao(id) {
  return request({
    url: '/api/activity/detail/fenxiao',
    method: 'get',
    params: { id }
  })
}

