<template>
  <div>
    <div class="title">
      <div class="left">活动成家率漏斗</div>
      <div class="right">
        <svg-icon icon-class="filter" />
        <span>筛选</span>
      </div>
    </div>
    <el-row :gutter="20" class="panel-group" style="clear: both">
      <funnel-chart width="100%" :chartData=activityData />
    </el-row>
  </div>
</template>

<script>
import FunnelChart from '@/components/Charts/FunnelChart'

export default {
  name: 'PanelActivityp',
  components: {
    FunnelChart
  },
  props: {
    activityData: {
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