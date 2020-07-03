<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
	      	<el-menu-item index="1" :route="{path:'/account/index'}">账户总览</el-menu-item>
	      	<el-menu-item index="2" :route="{path:'/account/plan'}">明细</el-menu-item>
	      	</el-menu>
		    <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
          <el-select size="small" v-model="listFilter.actionType" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="类型">
            <el-option  label="订单" :value="0" />
            <el-option  label="提现" :value="1" />
          </el-select>
          <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
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
              label="操作用户">
              <template slot-scope="{row}">
                <span>{{ row.actionType === 1 ? row.user.nickName : row.formUser.nickName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作类型">
              <template slot-scope="{row}">
                <span>{{ row.actionType === 1 ? '提现' : '支付订单' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="支付订单">
              <template slot-scope="{row}">
                <span>{{ row.orderId > -1 ? row.order.orderNum : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="相关活动">
              <template slot-scope="{row}">
                <span>{{ row.activityId > -1 ? row.activity.title : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="平台收入">
              <template slot-scope="{row}">
                <span style="color: red" v-if="row.actionType == 1">{{ '-' + row.fee.toFixed(2) }}</span>
                <span style="color: green" v-else>{{ '+' + row.fee.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商户订单号">
              <template slot-scope="{row}">
                <span>{{ row.outTradeNo}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间">
              <template slot-scope="{row}">
                <span>{{ row.createdAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
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
import { getWalletLogs } from '@/api/account'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        searchStr: '',
        current: 1,
        size: 20
      },
      listFilter: {
        actionType: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getWalletLogs(this.listQuery, this.listFilter).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleClose(done) {
      console.log('关闭弹窗')
      done()
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
