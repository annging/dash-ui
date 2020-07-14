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
    <panel-activitys :activityData=activitysData />
    <panel-activityp :activityData=activitypData />
  </div>
</template>

<script>
import PanelActivitys from './components/PanelActivitys'
import PanelActivityp from './components/PanelActivityp'
const defaultDataAnalysis = {
	id: undefined
}

export default {
  name: 'Statistics',
  components: {
    PanelActivitys, // 活动数据统计
    PanelActivityp // 活动成家率漏斗
  },
  data() {
    return {
    	id: '',
    	analysisData: Object.assign({}, defaultDataAnalysis),
      data_time_end: [],
      activitysData: {
        activityTotal: 20,
        viewTotal: 50,
        shareTotal: 90
      },
      activitypData: {
        viewTotal: 50000,
        orderTotal: 5,
        participationTotal: 1000
      }
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
    // this.fetchData(this.id)
  },
  methods: {
  	fetchData(id) {
      dataAnalysis({merchantId: id}).then(response => {
      	if (response.code === '200') {
      		this.analysisData = response.data
	      } else {
	      	this.$message({
            type: 'error',
            message: response.msg
          })
	      }
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