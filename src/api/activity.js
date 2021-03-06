import request from '@/utils/request'

export function getSpecialActivity(query, data) {
  return request({
    url: '/system/management/activity/getSpecialActivity?size=' + query.size + '&current=' + query.current,
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

// 获取方案列表
export function fetchSchemeList(query, data) {
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

// 新增方案
export function addActivityScheme(data) {
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

export function fetchScheme(id) {
  return request({
    url: '/system/activity/getActivitySchemeInfo',
    method: 'get',
    params: { schemeId: id }
  })
}

export function deleteScheme(id) {
  return request({
    url: '/system/activity/deleteScheme',
    method: 'delete',
    params: { schemeId: id }
  })
}

export function updateActivityScheme(data) {
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

// 获取活动列表
export function getActivitys(query, data) {
  return request({
    url: '/system/activity/getActivitys',
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

// /system/activity/addOrUpdateOrDelete 指定活动 增删改 删除
export function addOrUpdateOrDelete(data) {
  return request({
    url: '/system/activity/addOrUpdateOrDelete',
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

// /system/activity/getActivityInfo 指定活动 详情
export function getActivityInfo(id) {
  return request({
    url: '/system/activity/getActivityInfo',
    method: 'post',
    params: { id: id }
  })
}

// /system/activity/getCouponActivityList 分页查询根据条件 查询优惠券活动
export function getCouponActivityList(query, data) {
  return request({
    url: '/system/activity/getCouponActivityList',
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

//首页推荐或设为优秀案例
export function setActivityWithGoodOrRecommend(query) {
  return request({
    url: '/system/management/activity/setActivityWithGoodOrRecommend',
    method: 'post',
    params: query
  })
}

// /system/management/setWeight 设置权重 如果 是优秀案例 type =1 否则 推荐0
export function setWeight(query) {
  return request({
    url: '/system/management/setWeight',
    method: 'get',
    params: query
  })
}

// /system/activity/getActivityOptions 查询 用户不感兴趣 和 举报的活动
export function getActivityOptions(query, data) {
  return request({
    url: '/system/activity/getActivityOptions',
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

// /api/v1/activity/config/require/column 获取全部常用字段
export function getRequirecolumns() {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/activity/config/require/column',
    method: 'get'
  })
}

// /api/v1/activity/common/create 创建活动, data里返回的是活动id
export function createActivity(data) {
  return request({
    url: '/api/v1/activity/common/create',
    method: 'post',
    data: data,
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}

// /api/v1/activity/common/update  更新活动
export function updateActivity(data) {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/activity/common/update',
    method: 'post',
    data: data,
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}

// /api/v1/activity/common/deleteActivityById/{activityId} 根据活动id删除活动信息
export function deleteActivityById(activityId) {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/activity/common/deleteActivityById/' + activityId,
    method: 'delete',
    headers: {
      loginToken: 'adminLoginToken'
    }
  })
}

// /system/activity/getJoinCount 活动参与厂家数
export function getJoinCount() {
  return request({
    url: '/system/activity/getJoinCount',
    method: 'get'
  })
}

// /scheme/adviser/pageAdvisers  分页获取顾问
export function fetchPageAdvisers(query) {
  return request({
    url: '/system/scheme/adviser/pageAdvisers',
    method: 'get',
    params: query
  })
}

// /scheme/adviser/addOrUpdate   添加或者更新顾问
export function addOrUpdateAdvisers(data) {
  return request({
    url: '/system/scheme/adviser/addOrUpdate',
    method: 'post',
    data
  })
}

// /scheme/adviser/delete/{schemeAdviserId}  删除顾问
export function deleteAdviser(adviserId) {
  return request({
    url: '/system/scheme/adviser/delete/' + adviserId,
    method: 'get'
  })
}

// /scheme/adviser/get/{adviserId}  获取顾问
export function getAdviser(adviserId) {
  return request({
    url: '/system/scheme/adviser/get/' + adviserId,
    method: 'get'
  })
}

// /api/v1/order/vote/queryOrderVoteByVoteGroupId 根据分组Id查询分组下的选手
export function queryOrderVoteByVoteGroupId(query) {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/order/vote/queryOrderVoteByVoteGroupId',
    method: 'get',
    params: query
  })
}

// /api/v1/order/vote/updateOrderVoteBy  修改一个选手的信息，商家端用
export function updateOrderVoteBy(data) {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/order/vote/updateOrderVoteBy',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// /api/v1/order/vote/hide/{orderVoteId}  隐藏投票订单
export function voteHideByOrderVoteId(orderVoteId) {
  return request({
    url: process.env.VUE_APP_XIAOCHENGXU_API + '/api/v1/order/vote/hide/' + orderVoteId,
    method: 'get'
  })
}
