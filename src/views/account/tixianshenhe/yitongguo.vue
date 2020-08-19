<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/account/tixianshenhe/daishenhe'}">待审核</el-menu-item>
            <el-menu-item index="2" :route="{path:'/account/tixianshenhe/yitongguo'}">审核记录</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
          <el-select size="small" v-model="listFilter.status" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="审核结果">
            <el-option  label="已经到账" :value="2" />
            <el-option  label="审核不通过" :value="3" />
          </el-select>
          <el-button size="small" class="filter-item" type="primary" plain icon="el-icon-search" @click="handleFilter">
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
              label="申请用户">
              <template slot-scope="{row}">
                <span>{{ row.user ? row.user.nickName : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="提现金额(元)">
              <template slot-scope="{row}">
                <span>{{ row.withdrawFee.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="预计到账金额(元)">
              <template slot-scope="{row}">
                <span>{{ row.receivableFee.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="申请时间">
              <template slot-scope="{row}">
                <span>{{ row.createdAt | moment("YYYY-MM-DD HH:mm:ss")}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="审核时间">
              <template slot-scope="{row}">
                <span>{{ row.updatedAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
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
import { getCheckPendingInfo } from '@/api/account'
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
        status: 2
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCheckPendingInfo(this.listQuery, this.listFilter).then(response => {
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
