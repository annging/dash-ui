const Mock = require('mockjs')

const data = Mock.mock({
  marketingData: {
    accumulationPeople: '@integer(1, 1000)',
    activityTotal: '@integer(1, 1000)',
    incomeTotal: '@integer(1, 10000)',
    merchantsTotal: '@integer(1, 100)'
  }
})

module.exports = [
  {
    url: '/system/index/marketingData',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: data.marketingData
      }
    }
  }
]
