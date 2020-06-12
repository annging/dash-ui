import Mock from 'mockjs'

const List = []
const count = 50

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@first',
    avatar: image_uri,
    activity: {
      total: '@integer(1, 10000)',
      fangwen: '@integer(1, 10000)',
      canyu: '@integer(1, 10000)',
    },
    account: {
      incharge: '@float(0, 100, 2, 2)'
    },
    stores: '@integer(1, 10)',
    staffs: '@integer(1, 100)',
    level: {
      'name|1': ['免费会员', 'vip会员', '旗舰版会员'],
      endTime: Mock.Random.date('T'),
      'status|1': ['已过期', '未过期']
    }
    /*activityEndTime: +Mock.Random.date('T'),
    activityRule: baseContent,
    activitySetting: baseContent,
    activityStartTime: +Mock.Random.date('T'),
    address: '',
    advancedSetting: '',
    content: '',
    cover: image_uri,
    createUserId: '@integer',
    createdAt: '@datetime',
    desc: '',
    enableActivityTime: '@integer(0, 1)',
    enableAdvancedSetting: '@integer(0, 1)',
    enableUserSale: '@integer(0, 1)',
    endTime: +Mock.Random.date('T'),
    ext: '',
    merchantId: '@integer(1, 10)',
    requireColumns: '',
    startTime: +Mock.Random.date('T'),
    title: '@title(5, 10)',
    type: '@integer(0, 1)',
    updatedAt: +Mock.Random.date('T'),
    userSaleSetting: ''
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']*/
  }))
}

const data1 = Mock.mock({
  'items|30': [{
    id: '@increment',
    name: '@first',
    'status|1': ['已通过', '未通过'],
    'type|1': ['个人认证', '企业认证'],
    creater: 'name',
    create_time: '@datetime',
  }]
})


export default [
]

