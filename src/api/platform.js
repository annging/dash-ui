import request from '@/utils/request'

export function fetchMusicList(query, data) {
  return request({
    url: '/system/management/music/getMusic',
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

// /api/v1/activity/config/bgmusic 获取全部背景音乐
export function bgmusic(query) {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/activity/config/bgmusic',
    method: 'get',
    params: query
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/system/management/music/saveOrUpdate',
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

export function deleteMusic(query) {
  return request({
    url: '/system/management/music/deleteMusic',
    method: 'get',
    params: query
  })
}

export function getSystemLogs(query, data) {
  return request({
    url: '/system/management/getSystemLogs',
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
