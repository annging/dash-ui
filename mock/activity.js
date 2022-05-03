const Mock = require('mockjs')

const List = []
const count = 50

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = ["https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3"]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@cword(10, 20)',
    desc: '@cword(20, 45)',
    cover: JSON.stringify(image_uri),
    'type|1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, '-1'],
    activitySetting: JSON.stringify({
      groupNames: ''
    }),
    basePrice: '@float(0, 100, 2, 2)',
    finalPrice: '@float(0, 100, 2, 2)',
    startTime: '@datetime',
    endTime: '@datetime',
    'status|1': [1, 2],
    merchantId: '@integer(1, 50)',
    merchant: {
      id: this.merchantId,
      name: '@cword(2, 15)'
    },
    specialActivity: {
      'isRecommend|1': [0, 1],
      'isGood|1': [0, 1]
    }
    /* activityEndTime: +Mock.Random.date('T'),
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
    platforms: ['a-platform'] */
  }))
}

const advisers = []
const count1 = 30

for (let i = 0; i < count1; i++) {
  advisers.push(Mock.mock({
    id: '@increment',
    name: '@cname',
    icon: image_uri[0]
  }))
}



module.exports = [
  {
    url: '/system/activity/getActivitys',
    type: 'post',
    response: config => {
      const { searchStr, current = 1, size = 20 } = config.query
      const { title, type } = config.body

      let mockList = List.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        if (type && item.type !== parseInt(type)) return false
        return true
      })

      const activitytList = mockList.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          records: activitytList
        }
      }
    }
  },
  {
    url: '/system/activity/getActivityInfo',
    type: 'post',
    response: config => {
      const { id } = config.query
      for (const activity of List) {
        if (activity.id === +id) {
          return {
            code: '200',
            data: activity
          }
        }
      }
    }
  },
  {
    url: '/system/scheme/adviser/pageAdvisers',
    type: 'get',
    response: config => {
      const { offset = 1, limit = 20 } = config.query

      const mockAdviserList = advisers;

      const adviserList = mockAdviserList.filter((item, index) => index < limit * offset && index >= limit * (offset - 1))

      return {
        code: 20000,
        data: {
          total: mockAdviserList.length,
          records: adviserList
        }
      }
    }
  }
]
