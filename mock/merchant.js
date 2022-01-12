const Mock = require('mockjs')

const List = []
const count = 50
const image_uri = ["https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3"]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@cword(2, 15)',
    logo: image_uri[0],
    intro: '@cword(20-50)',
    introImgs: JSON.stringify(image_uri),
    phone: JSON.stringify([
      '15219999999'
    ]),
    wechat: '@sentence(3-15)',
    address: JSON.stringify({ province: '山西省', city: '西安市', distinct: '高新区', detail: '潮汕大街1111', tips: '' }),
    introVideo: '',
    teamIntros: JSON.stringify([{ img: '', name: '', intro: '' }]),
    productIntros: JSON.stringify([{ img: '', intro: '' }]),
    advantage: JSON.stringify([{ title: '', content: '' }]),
    showApplyTry: 0,
    applyTry: JSON.stringify([{ content: '' }]),
    authStatus: 5,
    merchantAggregate: {
      activityCount: '@integer(1, 50)',
      visitCount: '@integer(1, 5000)',
      participationCount: '@integer(1, 500)',
      totalIncome: '@float(0, 10000, 2, 2)',
      employeeCount: '@integer(1, 50)'
    },
    stores: [{ name: '@cword(5, 30)' }],
    createUserId: '@integer(1, 5000)',
    user: {
      id: this.createUserId,
      nickName: '@cword(5-15)'
    },
    'vipLevel|1': [0, 1, 2, 3],
    vipEndTime: '@datetime',
    'recommend|1': [0, 1]
  }))
}

module.exports = [
  {
    url: '/system/merchant/getMerchants',
    type: 'post',
    response: config => {
      const { current = 1, size = 20 } = config.query
      const { name, vipLevel, authStatus } = config.body

      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (authStatus && item.authStatus !== parseInt(authStatus)) return false
        if (vipLevel && item.vipLevel !== parseInt(vipLevel)) return false
        return true
      })

      const merchantList = mockList.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          records: merchantList
        }
      }
    }
  },
  {
    url: '/system/merchant/getMerchantInfo',
    type: 'post',
    response: config => {
      const { merchantId } = config.query
      for (const merchant of List) {
        if (merchant.id === +merchantId) {
          return {
            code: '200',
            data: merchant
          }
        }
      }
    }
  },
  {
    url: '/api/v1/store/query/merchant',
    type: 'get',
    response: config => {
      const { merchantId } = config.query
      for (const merchant of List) {
        if (merchant.id === +merchantId) {
          return {
            code: '200',
            data: merchant
          }
        }
      }
    }
  },
  {
    url: '/api/v1/merchant/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/system/merchant/getRecommendedMerchants',
    type: 'post',
    response: config => {
      const { current = 1, size = 20 } = config.query
      const { vipLevel, authStatus } = config.body

      let mockList = List.filter(item => {
        if (authStatus && item.authStatus !== parseInt(authStatus)) return false
        if (vipLevel && item.vipLevel !== parseInt(vipLevel)) return false
        return true
      })

      const merchantList = mockList.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          records: merchantList
        }
      }
    }
  },
]
