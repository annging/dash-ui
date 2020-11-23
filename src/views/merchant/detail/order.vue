<template>
	<div>
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
            <!--<el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleView(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>-->
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
        </el-row>
	</div>
</template>

<script>
import { getOrders } from '@/api/statistics'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
        id: '',
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      listFilter: {
      },
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' },
      orderStatus: { 1: '已下单待付款', 2: '已付款待核销', 3: '已发货', 4: '已核销', 5: '已完成', 6: '已取消', 7: '退款审核中', 8: '退款完成', 9: '审核中', 10: '已超时', 11: '审核未通过', 12: '拼团未成团' }
    }
  },
  created() {
      this.id = this.$route.params && this.$route.params.id
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getOrders(this.listQuery, { merchantId: 60} ).then(response => {
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