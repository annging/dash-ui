import request from '@/utils/request'

export function fetchList(query, data) {
  return request({
    url: '/system/user/getUsers?size=' + query.size + '&current=' + query.current,
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

export function getVirtualUsers(query) {
  return request({
    url: '/system/user/getVirtualUsers',
    method: 'get',
    params: query
  })
}

export function saveOrUpdateUser(data) {
  return request({
    url: '/system/user/saveOrUpdate',
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

export function batchAddVirtualUser(data) {
  return request({
    url: '/system/user/batchAddVirtualUser',
    method: 'post',
    data,
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      console.log(data);
    }]
  })
}

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
