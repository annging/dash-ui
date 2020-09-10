<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/merchant/index'}">已入驻商家</el-menu-item>
		      	<el-menu-item index="3" :route="{path:'/merchant/paid'}">付费商家</el-menu-item>
		      	<el-menu-item index="4" :route="{path:'/merchant/recommend'}">推荐商家</el-menu-item>
		      	<el-menu-item index="2" :route="{path:'/merchant/dailingqu'}">待领取商家</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container" style="margin-bottom: 20px;" justify="space-between">
          <div>
	          <el-input
	            v-model="listFilter.name"
	            placeholder="请输入商家名称"
	            prefix-icon="el-icon-search"
	            size="small"
	            clearable
	            style="width: 300px; margin-right: 20px;"
	            @keyup.enter.native="handleFilter"
	            @clear="handleFilter" />
	          <el-button size="small" class="filter-item" type="primary" plain icon="el-icon-search" @click="handleFilter">
	              搜索
	          </el-button>
	        </div>
          <el-button type="primary" size="small" style="min-width: 120px;" icon="el-icon-circle-plus-outline" @click="goCreate">添加商家</el-button>
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
	          }" >
	          <el-table-column
	            prop="id"
	            label="ID"
	            width="60">
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
	            label="商家名称">
	            <template slot-scope="{row}">
	            	<router-link target="_blank" style="color: #409EFF" :to="'/merchant/detail/' + row.id + '/overview'">{{ row.name }}</router-link>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="活动数"
	            width="60">
	            <template slot-scope="{row}">
			          <span>{{ row.merchantAggregate.activityCount }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="访问数"
              width="60">
	            <template slot-scope="{row}">
			          <span>{{row.merchantAggregate.visitCount}}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="参与数"
              width="60">
	            <template slot-scope="{row}">
			          <span>{{row.merchantAggregate.participationCount}}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="收入(元)"
              width="80">
	            <template slot-scope="{row}">
			          <span>{{row.merchantAggregate.totalIncome}}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="门店数"
	            width="60">
	            <template slot-scope="{row}">
			          <span>{{ row.storeCount || row.stores.length }}</span>
			        </template>
	          </el-table-column>
	          <el-table-column
	            label="员工数"
	            width="60">
	            <template slot-scope="{row}">
			          <span>{{ row.merchantAggregate.employeeCount }}</span>
			        </template>
	          </el-table-column>
		        <el-table-column
	            label="创建者"
	            width="80">
	            <template slot-scope="{row}">
	            	<router-link target="_blank" style="color: #409EFF" :to="'/user/detail/' + row.createUserId">{{ row.user ? row.user.nickName : ''  }}</router-link>
		          </template>
		        </el-table-column>
		        <el-table-column
	            label="邀请者"
	            width="80">
	            <template slot-scope="{row}">
	            	<span>{{ row.formUser ? row.formUser.nickName : '-'  }}</span>
		          </template>
		        </el-table-column>
	          <el-table-column
	            label="会员"
	            width="86"
              class-name="miniCol">
	            <template slot-scope="{row}">
	            	<!--<span>{{ levels[row.vipLevel] }}</span>-->
	            	<el-select size="mini" v-model="row.vipLevel" style="width: 80px;padding: 0 3px;" @change="handleUpdateMerchantViPLevel(row)" placeholder="会员等级" name="minimini" class="customSelect">
			            <el-option v-for="(value, key) in levels" :key="key" :label="value" :value="key * 1" />
			          </el-select>
		          </template>
		        </el-table-column>
		        <el-table-column
	            label="会员到期时间"
              width="130px"
              class-name="miniCol">
	            <template slot-scope="{row}">
	            	<!--<span v-if="row.vipEndTime">{{ row.vipEndTime | moment("YYYY-MM-DD HH:mm:ss") }}</span> <br />
                <i style="color: #409EFF; cursor: pointer" class="el-icon-edit"></i>-->
	            	<el-date-picker
	            		size="mini"
	            		style="width: 122px;"
						      v-model="row.vipEndTime"
						      type="datetime"
                  class="mini-dp"
						      placeholder="选择会员到期时间"
                  clear-icon=""
						      @change="handleUpdateMerchantViPEndTime(row)">
						    </el-date-picker>
		          </template>
		        </el-table-column>
		        <el-table-column
	            label="推荐"
	            width="50">
	            <template slot-scope="{row}">
	            	<el-tag size="mini" v-if="row.recommend">是</el-tag>
	            	<el-tag type="info" size="mini" v-else>否</el-tag>
		          </template>
		        </el-table-column>
	          <el-table-column label="操作" width="120">
	            <template slot-scope="scope">
	              <el-button
	                size="mini"
	                type="text"
	                @click="handleView(scope.$index, scope.row)">详情</el-button>
	              <el-button
                  size="mini"
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	               <el-button
	                size="mini"
	                type="text"
	                v-if="scope.row.recommend"
	                @click="handleCancelRecommend(scope.$index, scope.row)">取消推荐</el-button>
	              <el-button
	                size="mini"
	                type="text"
	                v-else
	                @click="handleRecommend(scope.$index, scope.row)">推荐</el-button>
	              
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
import { fetchList, recommendMerchant, CancelRecommended, updateMerchantViPLevel, updateMerchantViPEndTime } from '@/api/merchant'
import { getImgUrl } from '@/api/wx'
import { getUserInfo } from '@/utils/auth'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
	components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
	      current: 1,
	      size: 20
	    },
	    listFilter: {
	    	name: ''
      },
	    qrcodeImgUrl: '',
	    levels: { 0: '标准会员', 1: '体验会员', 2: 'VIP会员' } // '会员级别 0普通会员 1 体验会员 2会员'
    }
  },
  created() {
	  this.getList()
	},
  methods: {
  	getList() {
      this.listLoading = true
      fetchList(this.listQuery, this.listFilter).then(response => {
      	if (response.data) {
      		response.data.records.forEach(item => {
            if (item.vipEndTime) {
              item.vipEndTime = new Date(item.vipEndTime)
            }
          })
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
      this.$router.push({ path: '/merchant/edit/0' })
    },
    handleView(index, row) {
      this.$router.push({
        path: '/merchant/detail/' + row.id
    	})
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/merchant/edit/' + row.id })
    },
    handleRecommend(index, row) {
      recommendMerchant({ merchantId: row.id }).then(response => {
        if (response.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
    },
    handleCancelRecommend(index, row) {
      CancelRecommended({ merchantId: row.id }).then(response => {
        if (response.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
    },
    handleQrcode(index, row) {
      const shareUser = JSON.parse(getUserInfo())
      getImgUrl({
        page: 'pages/merchant/home',
        scene: 'merchantId=' + row.id + '&shareUserId=' + shareUser.id
      }).then(response => {
        if (response.code === '200') {
          this.qrcodeImgUrl = response.data
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
    },
    handleUpdateMerchantViPLevel(row) {
    	let q = {
    		merchantId: row.id,
    		vipLevel: row.vipLevel
    	}
    	let that = this
    	updateMerchantViPLevel(q).then(response => {
    		if (response.code * 1 === 200 ) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            onClose: function() {
            	that.handleFilter()
            }
          })
        }
      }).catch((err) => {
      	console.log(err)
      })
    },
    handleUpdateMerchantViPEndTime(row) {
    	//console.log(typeof row.vipEndTime)
    	let q = {
    		merchantId: row.id,
    		date: row.vipEndTime.toString()
    	}
    	let that = this
    	updateMerchantViPEndTime(q).then(response => {
    		if (response.code * 1 === 200 ) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            onClose: function() {
            	that.handleFilter()
            }
          })
        }
      }).catch((err) => {
      	console.log(err)
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
<style>
  .el-input__inner[name='minimini'] {
    padding: 0 3px;
  }
  .customSelect .el-input__suffix {
    right: 1px;
  }
  .customSelect .el-input__suffix .el-input__icon {
    width: 16px;
  }
  .customSelect.el-select .el-input .el-select__caret {
    font-size: 10px;
  }
  .miniCol .cell {
    padding-left: 3px;
    padding-right: 3px;
  }
  .mini-dp .el-input__prefix {
    display: none;
  }
  .mini-dp.el-input--prefix .el-input__inner {
    padding-left: 3px;
  }
  .mini-dp.el-input--suffix .el-input__inner {
    padding-right: 3px;   
  }
</style>
