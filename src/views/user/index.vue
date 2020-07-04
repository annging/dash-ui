<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/user/index'}">用户列表</el-menu-item>
		      	<el-menu-item index="3" :route="{path:'/user/black'}">小黑屋(已删除的用户)</el-menu-item>
		      	<el-menu-item index="2" :route="{path:'/user/virtual'}">虚拟用户</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container" style="margin-bottom: 20px;">
		    	<el-select size="small" v-model="listFilter.source" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="用户来源">
            <el-option  label="商家版" :value="1" />
            <el-option  label="用户版" :value="2" />
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
	          <el-table-column
	            label="手机号">
	            <template slot-scope="{row}">
			          <span>{{ row.mobile }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="手机号">
	            <template slot-scope="{row}">
			          <span>{{ row.mobile }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="微信号">
	            <template slot-scope="{row}">
			          <span>{{ row.wxOpenId }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="地址">
	            <template slot-scope="{row}">
			          <span>{{ row.address }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="用户类型">
	            <template slot-scope="{row}">
			          <span>{{ userTypes[row.type] }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="用户来源">
	            <template slot-scope="{row}">
			          <span>{{ userSources[row.source] }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column label="操作" width="200px">
	            <template slot-scope="scope">
	              <el-button
	                size="mini"
	                @click="handleView(scope.$index, scope.row)">查看</el-button>
	              <el-button
	                size="mini"
	                type="danger"
	                @click="handleDelete(scope.$index, scope.row)">加入小黑屋</el-button>
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
import { fetchList, saveOrUpdateUser } from '@/api/user'
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
	    listFilter: {
	    	source: 1,
	    	deletedAt: false
      },
	    levels: { 1: '普通会员' },
	    userTypes: { 0: '客户', 1: '管理员', 2:'客服'},
	    userSources: { 1: '商家版', 2: '用户版' }
    };
  },
  created() {
	  this.getList()
	},
  methods: {
  	getList() {
      this.listLoading = true
      fetchList(this.listQuery, this.listFilter).then(response => {
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
      this.$confirm('确认将改用户加入小黑屋?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      	let d = new Date()
        saveOrUpdateUser({id: row.id, deletedAt: d}).then(res => {
          if (res.code * 1 === 200 ) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.list.splice(index, 1)
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })      
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
</style>
