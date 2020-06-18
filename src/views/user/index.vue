<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/user/index'}">用户列表</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container" style="margin-bottom: 20px;">
	        <el-input
	          v-model="listQuery.searchStr"
	          placeholder="请输入内容"
	          prefix-icon="el-icon-search"
	          size="small"
	          @keyup.enter.native="handleFilter" />
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
	            label="头像"
	            width="60">
	            <template slot-scope="{row}">
	              <img :src="row.wxImg" style="width: 40px;height: 40px;">
	            </template>
	          </el-table-column>
	          <el-table-column
	            label="昵称">
	            <template slot-scope="{row}">
			          <span>{{ row.nickName }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column label="操作">
	            <template slot-scope="scope">
	              <el-button
	                size="mini"
	                @click="handleView(scope.$index, scope.row)">查看</el-button>
	              <el-button
	                size="mini"
	                type="danger"
	                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { fetchList } from '@/api/user'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
	components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
	      searchStr: '',
	      current: 1,
	      size: 20
	    },
	    levels: { 1: '普通会员' }
    };
  },
  created() {
	  this.getList()
	},
  methods: {
  	getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
      	if(response.data) {
	        this.list = response.data.records
	        this.total = response.data.total
	      }
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleView(index, row) {
    	console.log('查看')
    },
    handleDelete(index, row) {
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
</style>
