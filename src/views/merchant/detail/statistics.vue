<template>
	<div>
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
    <panel-activityp :activityTurnoverRate=activityTurnoverRate />
  </div>
</template>

<script>
import { dataAnalysis } from '@/api/merchant'
import PanelActivitys from './components/PanelActivitys'
import PanelActivityp from './components/PanelActivityp'

const defaultDataAnalysis = {
	id: undefined
}

export default {
  name: 'Statistics',
  components: {
    PanelActivitys, // 活动数据统计
    PanelActivityp // 活动成交率漏斗
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
        "activityStatistics": '-',
        "pageView": '-',
        "forwardingNumber": '-'
      },
      activityTurnoverRate: {},
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
        _Temp = response.data
        this.activityDataStatistics = _Temp.activityDataStatistics
        this.activityTurnoverRate = _Temp.activityTurnoverRate.map(item => {
          return {
            value: item.data ? item.data : 0,
            name: item.name
          }
        })
        this.pageLoading = false
      }).catch((err) => {
        this.pageLoading = false
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