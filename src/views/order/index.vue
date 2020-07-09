<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/order/index'}">订单</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
        </el-row>
        <el-row class="list">
          <el-table
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="small"
            :header-cell-style="{
              'background-color': '#f7f9fa',
              'color': '#637282;'
            }">
            <el-table-column
              prop="id"
              label="ID"
              sortable
              width="60">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="订单号"
              width="135px">
              <template slot-scope="{row}">
                <span>{{ row.orderNum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="活动">
              <template slot-scope="{row}">
                <span>{{ row.activity.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="活动类型">
              <template slot-scope="{row}">
                <span>{{ activityTypes[row.activityType] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="数量">
              <template slot-scope="{row}">
                <span>{{ row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="金额">
              <template slot-scope="{row}">
                <span>{{ row.finalPrice.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="{row}">
                <span>{{ orderStatus[row.status] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="140px">
              <template slot-scope="{row}">
                <span>{{ row.createdAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleView(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
        </el-row>
      </div>
      <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { getOrders } from '@/api/statistics'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        searchStr: '',
        current: 1,
        size: 20
      },
      listFilter: {
      },
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' },
      orderStatus: { 1: '已下单待付款', 2: '已付款待核销', 3: '已发货', 4: '已核销', 5: '已完成', 6: '已取消', 7: '退款审核中', 8: '退款完成' }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getOrders(this.listQuery, this.listFilter).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleView(index, row) {
    	console.log(111)
    },
    handleUpdate(index, row) {
    	console.log(111)
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
