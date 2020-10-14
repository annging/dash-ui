import request from '@/utils/request'

// 获学院管理文章列表
export function fetchList(query, data) {
  return request({
    url: '/system/activity/getActivityScheme?size=' + query.size + '&current=' + query.current,
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

// 新增文章
export function add(data) {
  return request({
    url: '/system/activity/addActivityScheme',
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

export function fetch(id) {
  return request({
    url: '/system/activity/getActivitySchemeInfo',
    method: 'get',
    params: { schemeId: id }
  })
}

export function deleteTeacher(id) {
  return request({
    url: '/system/activity/deleteScheme',
    method: 'delete',
    params: { schemeId: id }
  })
}

export function update(data) {
  return request({
    url: '/system/activity/updateActivityScheme',
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