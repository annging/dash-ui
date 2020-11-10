<template>
	<div class="main-content">
	  <div class="left-container">
	    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		    <el-menu-item index="1" :route="{path:'/platform/mer/index'}">活动设置(商家使用数量)</el-menu-item>
	    </el-menu>
      <!--<el-row type="flex" class="filter-container" style="margin-bottom: 20px;" justify="space-between">
      </el-row>-->
      <el-row class="list">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%; max-width: 1000px;"
          size="small"
          :header-cell-style="{
            'background-color': '#f7f9fa',
            'color': '#637282;'
          }">
          <el-table-column
            label="活动类型">
            <template slot-scope="{row}">
              <span>{{ activityTypes[row.type] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="真实使用量">
            <template slot-scope="{row}">
              <span><el-input size="mini" v-model="row.joinCount"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column
            label="虚拟使用量">
            <template slot-scope="{row}">
              <span><el-input size="mini" v-model="row.virtualJoinCount"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column
            label="显示使用量(真实+虚拟)">
            <template slot-scope="{row}">
              <span>{{ row.joinCount * 1 + row.virtualJoinCount * 1 }}</span>
            </template>
          </el-table-column>
        </el-table>

        <el-button :loading="loading" type="primary" style="width:300px;margin-top:30px; margin-bottom: 30px;" @click.native.prevent="handleChange">保存设置</el-button>
      </el-row>
    </div>
    <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { getJoinCount } from '@/api/activity'
import { configActivity } from '@/api/platform'

export default {
  components: { },
  data() {
    return {
      list: [
        { 'name': '优惠券', num: '1', viturNum: '0' },
        { 'name': '拼团活动', num: '1', viturNum: '0' },
        { 'name': '报名活动', num: '1', viturNum: '0' },
        { 'name': '投票活动', num: '555', viturNum: '0' },
        { 'name': '砍价活动', num: '1', viturNum: '0' },
        { 'name': '商品团购', num: '1', viturNum: '0' },
        { 'name': '秒杀活动', num: '1', viturNum: '0' },
        { 'name': '助力活动', num: '1', viturNum: '0' },
        { 'name': '抽奖活动', num: '1', viturNum: '0' },
      ],
      listLoading: false,
      loading: false,
      /*activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券', '-1': '团购' },*/
      activityTypes: { 1: '报名', 2: '抽奖', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 9: '助力', 10: '优惠券', '-1': '商品团购' }
    }
  },
  created() {
    // this.fetchData()
  },
  /*computed:{
    tableData: function () {
      let that = this
      return this.list.filter(function (item) {
        return that.activityTypes[item.type]
      })
    }
  },*/

  methods: {
    fetchData() {
      getJoinCount().then(response => {
        this.list = response
        response.forEach(item => {
          
        })
      }).catch((res) => {
        console.log(1)
      }).then(() => {
        console.log(2)
      })
    },
    handleChange() {
      console.log(this.list)
      data ={
        applyActivityCount: '', // 1报名
        couponActivityCount: '', // 10优惠券
        cutPriceActivityCount: '', // 4砍价
        groupBuyActivityCount: '', // 6拼团
        groupPurchasesActivityCount: '', // -1商品团购
        helpActivityCount: '', // 9助力
        lotteryActivityCount: '', // 2抽奖
        seckillActivityCount: '', // 5秒杀
        voteActivityCount: '' // 7投票
      }
      this.loading = true
      configActivity(data).then(response => {

        }).catch((res) => {
          console.log(1)
          this.loading = false
        }).then(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
    display: -webkit-box;
    display: flex;

    >div:last-child {
      margin-right: 40px;
    }
  }
  .secondary-sidebar {
    outline: none;
    -webkit-box-flex: 0;
    flex: 0 0 240px;
  }
  .left-container {
    position: relative;
    z-index: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-width: 420px;
    margin-left: 30px;
    outline: none;
  }
  .el-menu-item {
    height: 37px;
    line-height: 39px;
    padding: 0;
    margin-right: 20px;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 1px solid #000;
    color: #303133;
  }
  .filter-item {
    margin-right: 10px;
  }
</style>
