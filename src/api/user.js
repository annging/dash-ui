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

export function deleteVirtualUser(query) {
  return request({
    url: '/system/user/deleteVirtualUser',
    method: 'post',
    params: query
  })
}

// /system/user/setAdmin /设置用户为管理员
export function setAdmin(query) {
  return request({
    url: '/system/user/setAdmin',
    method: 'get',
    params: query
  })
}

// /system/user/getAdminUsers getAdminUsers
export function getAdminUsers(query) {
  return request({
    url: '/system/user/getAdminUsers',
    method: 'get',
    params: query
  })
}

// /system/user/cancelAdmin /取消管理员
export function cancelAdmin(query) {
  return request({
    url: '/system/user/cancelAdmin',
    method: 'get',
    params: query
  })
}

export function batchAddVirtualUser(data) {
  return request({
    url: '/system/user/batchAddVirtualUser',
    method: 'post',
    data,
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      console.log(data)
      return data
    }],
    processData: false,
    contentType: false
  })
}

export function toLeadExcel(data) {
  return request({
    url: '/system/user/toLeadExcel',
    method: 'post',
    data,
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      console.log(data)
      return data
    }],
    processData: false,
    contentType: false
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

// /api/v1/user/{userId} 根据用户id查询用户信息
export function getUserInfo(userId) {
  return request({
    url: 'http://test.tuantuanzhan.cn/api/v1/user/' + userId,
    method: 'get',
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
