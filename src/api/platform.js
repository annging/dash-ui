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

export function saveOrUpdate(data) {
  return request({
    url: '/system/management/music/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteMusic(id) {
  return request({
    url: '/system/management/music/deleteMusic',
    method: 'delect',
    params: { musicId: id }
  })
}
