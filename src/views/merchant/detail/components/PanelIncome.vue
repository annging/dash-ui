<template>
  <div>
    <div class="title">
      <div class="left">实际收支</div>
      <div class="right" style="display: none;">
        <svg-icon icon-class="filter" />
        <span>筛选</span>
      </div>
    </div>
    <el-row :gutter="20" class="panel-group" style="clear: both">
      <el-col :xs="24" :sm="24" :lg="18" class="card-panel-col" style="background-color: #F2F6FC; padding: 30px 0; margin: 10px;">
      <pie-chart width="100%" :chartData=actualIncome />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'

export default {
  name: 'PanelIncome',
  components: {
    PieChart
  },
  props: {
    actualIncome: {
      type: Object,
        default: function() {
          return {}
        }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 13px;
  line-height: 18px;
  padding: 10px 0;
  color: #999;
  .svg-icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
    cursor: pointer;
  }
}
</style>