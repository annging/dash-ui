<template>
	<div v-loading="pageLoading">
    <el-row type="flex" class="filter-container" style="display: none">
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
    </el-row>
    <panel-activitys :activityDataStatistics=activityDataStatistics />
    <panel-activityp v-if="activityTurnoverRate.series" :activityTurnoverRate=activityTurnoverRate />
    <panel-discounts :couponStatistics=couponStatistics />
    <panel-income v-if="actualIncome.series" :actualIncome=actualIncome />
    <panel-user v-if="userAnalysis" :userAnalysis=userAnalysis />

  </div>
</template>

<script>
import { dataAnalysis } from '@/api/merchant'
import PanelActivitys from './components/PanelActivitys'
import PanelActivityp from './components/PanelActivityp'
import PanelDiscounts from './components/PanelDiscounts'
import PanelIncome from './components/PanelIncome'
import PanelUser from './components/PanelUser'

const defaultDataAnalysis = {
	id: undefined
}

export default {
  name: 'Statistics',
  components: {
    PanelActivitys, // 活动数据统计
    PanelActivityp, // 活动成交率漏斗
    PanelDiscounts, // 优惠券数据统计
    PanelIncome, // 实际收入
    PanelUser // 用户分析
  },
  data() {
    return {
    	id: '',
      pageLoading: false,
    	analysisData: {
        "activityDataStatistics": {
          "activityStatistics": '-',
          "pageView": '-',
          "forwardingNumber": '-'
        },
        "activityTurnoverRate":{
        },
        "couponStatistics":{
          "drawNum": '-',
          "used": '-',
          "pageView": '-'
        },
        "actualIncome":{
        },
        "userAnalysis":{
          "newUser":'-',
          "oldUser":'-'
        },
        "accessNumbers":{
        },
        "userActivation":{
        },
        "spectrophotometer":{
        }
      },
      activityDataStatistics: {
        activityStatistics: '-',
        pageView: '-',
        forwardingNumber: '-'
      },
      activityTurnoverRate: {},
      couponStatistics: {
        pageView: '-',
        drawNum: '-',
        used: ''
      },
      actualIncome: {},
      userAnalysis: {
      },
      message: '',
      data_time_end: []
    }
  },
  computed: {
    activeTabMenu() {
      const route = this.$route
      const { meta, path } = route
      return path
    }
  },
  created() {
		this.id = this.$route.params && this.$route.params.id
    this.fetchData(this.id)
  },
  methods: {
  	fetchData(id) {
      this.pageLoading = true
      dataAnalysis({merchantId: id}).then(response => {
        let _temp = response.data
        this.$set(this.activityDataStatistics,'activityStatistics', _temp.activityDataStatistics.activityStatistics)
        this.$set(this.activityDataStatistics,'pageView', _temp.activityDataStatistics.pageView)
        this.$set(this.activityDataStatistics,'forwardingNumber', _temp.activityDataStatistics.forwardingNumber)
        this.$set(this.couponStatistics,'drawNum', _temp.couponStatistics.drawNum)
        this.$set(this.couponStatistics,'pageView', _temp.couponStatistics.pageView)
        this.$set(this.couponStatistics,'used', _temp.couponStatistics.used)
        let _activityTurnoverRate = _temp.activityTurnoverRate.series.map(item => {
          return {
            value: item.data ? item.data : 0,
            name: item.name
          }
        })
        this.$set(this.activityTurnoverRate,'series',_activityTurnoverRate)
        let _actualIncome = _temp.actualIncome.series.map(item => {
          return {
            value: item.data ? item.data : 0,
            name: item.name
          }
        })
        this.$set(this.actualIncome,'series',_actualIncome)

        this.$set(this.userAnalysis,'newUser', _temp.userAnalysis.newUser)
        this.$set(this.userAnalysis,'oldUser', _temp.userAnalysis.oldUser)

        this.pageLoading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    pickTime(days) {
      const end = new Date()
      const start = new Date()
      this.data_time_end = []
      start.setTime(start.getTime() - 3600 * 1000 * 24 * days)
      this.data_time_end.push(start)
      this.data_time_end.push(end)
      // to get 数据
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button+.el-button {
  margin-left: 1px;
}
.el-date-editor--daterange.el-input__inner {
  width: 280px;
}
</style>