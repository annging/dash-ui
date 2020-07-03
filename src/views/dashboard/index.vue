<template>
  <div class="main-content">
    <div class="dashboard-container">
      <!--<div class="dashboard-text">name: {{ name }}</div>-->
      <panel-group :marketingData=marketingData
     @handleSetLineChartData="handleSetLineChartData" />

      <el-row style="position: relative; background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <div class="filter" style="float: right; position: relative; z-index: 9">
          <el-button plain size="mini" @click="pickTime(7)">近7日</el-button>
          <el-button plain size="mini" @click="pickTime(15)">近15日</el-button>
          <el-date-picker
            v-model="data_time_end"
            type="daterange"
            size="mini"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <line-chart :chart-data="lineChartData" />
      </el-row>
      <panel-user
      :userData=userData style="display: none"/>
    </div>
    <div class="secondary-sidebar">
      <div class="" style="margin-top: 30px;">
        <el-button slot="reference" type="primary" size="medium" class="btn-create" @click="goFangan">创建方案 ▾</el-button>
        <el-popover
          width="200"
          v-model="createPopvisible"
          trigger="click" style="display: none">
          <div class="newActvity-section">
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">拼团</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">优惠券</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">预约</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">报名</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">抽奖</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">海报</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">砍价</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">秒杀</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">助力</div>
              </div>
            </span>
          </div>
          <el-button slot="reference" type="primary" size="medium" class="btn-create">创建方案 ▾</el-button>
        </el-popover>
        <ul class="action-menu">
          <!--<li class="menu-item"><el-link :underline="false"><svg-icon icon-class="user" /><span class="text">对账</span></el-link></li>-->
        </ul>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { marketingData, userData } from '@/api/statistics'
import PanelGroup from './components/PanelGroup'
import PanelUser from './components/PanelUser'
import LineChart from './components/LineChart'

const lineChartData = {
  newMerchant: {
    actualData: [["2020-5-6", 120 ], ["2020-5-7", 82 ], ["2020-5-8", 91 ], ["2020-5-9", 154 ], ["2020-5-10", 162 ], ["2020-5-11", 140 ], ["2020-5-12", 145]],
    title: '每日新增商家',
    toFixed: 0
  },
  newActivity: {
    actualData: [["2020-5-6", 2 ], ["2020-5-7", 5 ], ["2020-5-8", 7 ], ["2020-5-9", 154 ], ["2020-5-10", 9 ], ["2020-5-11", 0 ], ["2020-5-12", 10]],
    title: '每日新增活动',
    toFixed: 0
  },
  totalGetin: {
    actualData: [["2020-5-6", 20 ], ["2020-5-7", 50 ], ["2020-5-8", 70 ], ["2020-5-9", 1540 ], ["2020-5-10", 90 ], ["2020-5-11", 0 ], ["2020-5-12", 100]],
    title: '每日累计参与人数',
    toFixed: 0
  },
  newIncharge: {
    actualData: [["2020-5-6", 2.10 ], ["2020-5-7", 5.90 ], ["2020-5-8", 7.00 ], ["2020-5-9", 154.00 ], ["2020-5-10", 9.00 ], ["2020-5-11", 0 ], ["2020-5-12", 10.00]],
    title: '每日总收入(元)',
    toFixed: 2
  }
}

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    PanelUser,
    LineChart
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      lineChartData: lineChartData.newMerchant,
      createPopvisible: false, // 创建活动弹窗
      marketingData: {
        accumulationPeople: 0,
        activityTotal: 0,
        incomeTotal: 0,
        merchantsTotal: 0
      },
      userData: {
        newUser: 0,
        openCount: 0,
        visitPeople: 0
      },
      userDataQuery: {
        time: ''
      },
      data_time_end: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      marketingData().then(response => {
        if(response.data) {
          this.marketingData = response.data
        }
      })
      this.userDataQuery.time = new Date()
      userData(this.userDataQuery).then(response => {
        if(response.data) {
          this.userData = response.data
        }
      })
    },
    goFangan() {
      this.$router.push({ path: '/activity/fangan/create' })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    pickTime(days) {
      const end = new Date()
      const start = new Date()
      this.data_time_end = []
      start.setTime(start.getTime() - 3600 * 1000 * 24 * days)
      this.data_time_end.push(start)
      this.data_time_end.push(end)

      //to get 数据
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  display: -webkit-box;
  display: flex;
}
.dashboard {
  &-container {
    position: relative;
    z-index: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-width: 420px;
    margin-left: 30px;
    outline: none;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.btn-create {
  width: 100%;
}
.action-menu {
  list-style-type: none;
  padding: 0;
  .menu-item {
    height: 32px;
    line-height: 32px;
    padding: 0 5px;
    color: #0070e0;
    .text {
      padding-left: 5px;
    }
  }
}
.el-link.el-link--default {
    color: #0070e0;
}
.popover-content-item {
    width: 100%;
    box-sizing: border-box;
    padding: 4px 16px;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    text-decoration: none;
    display: block;
    position: relative;
    transition: background-color .15s ease-out;
    &:hover {
      background-color: #f7f9fa;
      z-index: 0;
    }
    .popover--item {
      height: 32px;
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      flex-direction: row;
      -webkit-box-align: center;
      align-items: center;
      margin-left: -3px;
      .svg-icon {
        width: 24px;
        height: 24px;
      }
      .text {
          padding-left: 13px;
      }
    }
}
.secondary-sidebar {
  outline: none;
  -webkit-box-flex: 0;
  flex: 0 0 240px;
  margin-right: 40px;
  padding-left: 40px;
}
</style>
