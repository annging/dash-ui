<template>
	<div>
		<panel-wallet :wallet=wallet />
		<div>
			<div class="title">
	      <div class="left">明细(开发...)</div>
	      <div class="right">
	      </div>
	    </div>
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
	          label="收入">
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
	</div>
</template>

<script>
import { accountOverview } from '@/api/account'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import PanelWallet from './components/PanelWallet'

export default {
  components: { Pagination, PanelWallet },
  data() {
    return {
    	id: '',
    	wallet: {},
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        current: 1,
        size: 20
      },
      listFilter: {

      }
    }
  },
  created() {
  	this.id = this.$route.params && this.$route.params.id
    this.getWallet()
  },
  methods: {
    getWallet() {
      this.listLoading = true
      accountOverview(this.listQuery, {userId: this.id}).then(response => {
        this.wallet = response.data.records[0]
        this.listLoading = false
      })
    },
    getList() {
      this.listLoading = true
      accountOverview(this.listQuery, {userId: this.id}).then(response => {
        this.wallet = response.data.records[0]
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