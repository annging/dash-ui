<template>
	<div class="main-content">
	  <div class="left-container">
	    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		    <el-menu-item index="1" :route="{path:'/logs/index'}">会员等级</el-menu-item>
	    </el-menu>
		  <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
        <span>注：在2020年09年01号前所有的商家都是体验会员，享受全部功能。</span>
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
            label="名称">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="店铺数量">
            <template slot-scope="{row}">
              <span>{{ row.storeNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="员工数量">
            <template slot-scope="{row}">
              <span>{{ row.staffNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="月付">
            <template slot-scope="{row}">
              <span>{{ row.monthFee }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="半年付">
            <template slot-scope="{row}">
              <span>{{ row.semiAnnual }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="年付">
            <template slot-scope="{row}">
              <span>{{ row.annual }}</span>
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
import { getSystemLogs } from '@/api/platform'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [{ id: 1, name: '标准会员', storeNo: '1', staffNo: '5', monthFee: '0', semiAnnual: '0', annual: '0' }, { id: 2, name: ' VIP会员', storeNo: '5', staffNo: '25', monthFee: '299.00', semiAnnual: '999.00', annual: '1499.00' }],
      total: 0,
      listLoading: false,
      listQuery: {
        searchStr: '',
        current: 1,
        size: 20
      },
      listFilter: {
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSystemLogs(this.listQuery, this.listFilter).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
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
