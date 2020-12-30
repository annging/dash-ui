<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="4" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/merchant/index'}">已入驻商家</el-menu-item>
		      	<el-menu-item index="3" :route="{path:'/merchant/paid'}">付费商家</el-menu-item>
		      	<el-menu-item index="4" :route="{path:'/merchant/recommend'}">推荐商家</el-menu-item>
		      	<el-menu-item index="2" :route="{path:'/merchant/dailingqu'}">待领取商家</el-menu-item>
	    	</el-menu>
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
	          }" >
	          <el-table-column
	            prop="id"
	            label="ID"
	            width="50">
	            <template slot-scope="{row}">
			          <span>{{ row.id }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="LOGO"
	            width="60">
	            <template slot-scope="{row}">
	              <img :src="row.logo" style="width: 40px;height: 40px;">
	            </template>
	          </el-table-column>
	          <el-table-column
	            label="品牌名称">
	            <template slot-scope="{row}">
			          <span>{{ row.name }}</span>
			        </template>
	          </el-table-column>
	          <!--<el-table-column
	            label="活动总数">
	            <template slot-scope="{row}">
			          <span>{{ row.merchantAggregate ? row.merchantAggregate.activityCount : '-' }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="访问人数">
	            <template slot-scope="{row}">
			          <span>{{ row.merchantAggregate ? row.merchantAggregate.visitCount : '-' }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="参与人数">
	            <template slot-scope="{row}">
			          <span>{{ row.merchantAggregate ? row.merchantAggregate.participationCount : '-' }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="累计收入(元)">
	            <template slot-scope="{row}">
			          <span>{{ row.merchantAggregate ? row.merchantAggregate.totalIncome : '-' }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="门店数量">
	            <template slot-scope="{row}">
			          <span>{{row.storeCount || row.stores.length}}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="员工数量">
	            <template slot-scope="{row}">
			          <span>{{ row.merchantAggregate ? row.merchantAggregate.employeeCount : '-' }}</span>
			        </template>
	          </el-table-column>-->
	          <el-table-column
	            label="会员"
	            width="">
	            <template slot-scope="{row}">
	            	<span>{{ levels[row.vipLevel] }}</span>
		          </template>
		        </el-table-column>
		        <el-table-column
	            label="创建者"
	            width="">
	            <template slot-scope="{row}">
	            	<span>{{ row.user ? row.user.nickName : ''  }}</span>
		          </template>
		        </el-table-column>
		        <el-table-column
	            label="会员过期时间"
	            width="140px">
	            <template slot-scope="{row}">
	            	<span>{{ row.vipEndTime | moment("YYYY-MM-DD HH:mm:ss") }}</span>
		          </template>
		        </el-table-column>
	          <el-table-column label="操作" width="120px">
	            <template slot-scope="scope">
	              <el-button
	                size="mini"
	                type="text"
	                @click="handleView(scope.$index, scope.row)">查看</el-button>
	                <el-button
	                size="mini"
	                type="text"
	                @click="handleCancelRecommend(scope.$index, scope.row)">取消推荐</el-button>
	              <!--<el-button
	                size="mini"
	                type="danger"
	                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
import { getRecommendedMerchants, CancelRecommended } from '@/api/merchant'
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
	    levels: { 0: '免费会员', 1: '体验会员', 2: 'VIP会员', 3: '旗舰会员' } // '会员级别 0普通会员 1 体验会员 2会员'
    };
  },
  created() {
	  this.getList()
	},
  methods: {
  	getList() {
      this.listLoading = true
      getRecommendedMerchants(this.listQuery).then(response => {
      	if (response.data) {
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
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    // 添加商家
    goCreate() {
    	this.$router.push({ path: '/merchant/create' });
    },
    handleView(index, row) {
    	this.$router.push({ path: '/merchant/detail/' + row.id });
    },
    handleCancelRecommend(index, row) {
    	this.$confirm('确认取消推荐商家?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
	    	CancelRecommended({merchantId: row.id}).then(response => {
	        if (response.code === '200') {
	          this.$message({
	            type: 'success',
	            message: '操作成功!'
	          })
	          this.list.splice(index, 1);
	        } else {
	          this.$message({
	            type: 'error',
	            message: response.msg
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
