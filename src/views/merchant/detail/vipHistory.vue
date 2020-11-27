<template>
	<div>
    <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
      <el-select size="mini" v-model="listFilter.status" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="活动类型">
        <el-option  label="变更纪录" :value="1" />
        <el-option  label="充值纪录" :value="2" />
      </el-select>
      <el-button size="mini" class="filter-item" type="primary" plain icon="el-icon-search" @click="handleFilter">
        查看
      </el-button>
    </el-row>
		<el-row class="list" v-if="listFilter.status === 1">
      <el-table
        v-loading="listLoading1"
        :data="list1"
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
          label="变更">
          <template slot-scope="{row}">
            <span>由 <span style="color: green;">{{ levels[row.beforeVipLevel] }}</span> 改为 <span style="color: red;">{{ levels[row.afterVipLevel] }}</span></span>
          </template>
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="{row}">
            <span>{{ row.changeType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          width="140px">
          <template slot-scope="{row}">
            <span>{{ row.createdAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total1>0" :total="total1" :page.sync="listQuery1.current" :limit.sync="listQuery1.size" @pagination="getMerchantVIPChange" />
    </el-row>
    <el-row class="list" v-if="listFilter.status === 2">
      <el-table
        v-loading="listLoading2"
        :data="list2"
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
          label="NO.">
          <template slot-scope="{row}">
            <span> {{ row.rechargeNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="充值商家">
          <template slot-scope="{row}">
            <span> {{ row.rechargeMerchantId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值类型">
          <el-table-column
            label="id">
            <template slot-scope="{row}">
              <span>{{ row.rechargeCategory.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="会员"
            width="60px">
            <template slot-scope="{row}">
              <span>{{ row.rechargeCategory.memberTypeId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="月">
            <template slot-scope="{row}">
              <span>{{ row.rechargeCategory.month }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="金额">
            <template slot-scope="{row}">
              <span style="color: red;">{{ row.rechargeCategory.money }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="商户订单号">
          <template slot-scope="{row}">
            <span> {{ row.outTradeNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="充值时间"
          width="140px">
          <template slot-scope="{row}">
            <span>{{ row.createAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total2>0" :total="total2" :page.sync="listQuery2.current" :limit.sync="listQuery2.size" @pagination="getMerchantVIPRecharge" />
    </el-row>
	</div>
</template>

<script>
import { getMerchantVIPChangePages, getMerchantVIPRechargePages } from '@/api/merchant'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      id: '',
      list1: [],
      total1: 0,
      listLoading1: false,
      listQuery1: {
        current: 1,
        size: 20
      },
      list2: [],
      total2: 0,
      listLoading2: false,
      listQuery2: {
        current: 1,
        size: 20
      },
      listFilter: {
        status: 1
      },
      levels: { 0: '免费会员', 1: '体验会员', 2: 'VIP会员' } // '会员级别 0普通会员 1 体验会员 2会员'
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.getMerchantVIPChange()
  },
  methods: {
    // 查询商家会员改变记录
    getMerchantVIPChange() {
      this.listLoading1 = true
      getMerchantVIPChangePages(this.listQuery1, { merchantId: this.id }).then(response => {
        this.list1 = response.data.records
        this.total1 = response.data.total
        this.listLoading1 = false
      })
    },
    // 查询商家会员充值
    getMerchantVIPRecharge() {
      this.listLoading2 = true
      getMerchantVIPRechargePages(this.listQuery2, { rechargeMerchantId: this.id }).then(response => {
        this.list2 = response.data.records
        this.total2 = response.data.total
        this.listLoading2 = false
      })
    },
    handleFilter() {
      if (this.listFilter.status === 1) {
        this.getMerchantVIPChange()
      } else if (this.listFilter.status === 2) {
        this.getMerchantVIPRecharge()
      }
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
.filter-item {
  margin-right: 10px;
}
</style>