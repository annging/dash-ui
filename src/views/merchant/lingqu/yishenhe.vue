<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/merchant/lingqu/daishenhe'}">待审核</el-menu-item>
		      	<el-menu-item index="2" :route="{path:'/merchant/lingqu/yishenhe'}">已审核</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
          <el-select size="small" v-model="listFilter.status" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="活动类型">
            <el-option  label="已通过" :value="2" />
            <el-option  label="不通过" :value="3" />
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
              label="LOGO"
              width="60">
              <template slot-scope="{row}">
                <img :src="row.logo" style="width: 40px;height: 40px;">
              </template>
            </el-table-column>
            <el-table-column
              label="商家名称">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="申请用户">
              <template slot-scope="{row}">
                <router-link target="_blank" style="color: #409EFF" :to="'/user/detail/' + row.userId ">{{ row.user ? row.user.nickName : row.userId  }}</router-link>
              </template>
            </el-table-column>
            <!--<el-table-column
              label="认证类型">
              <template slot-scope="{row}">
                <span>{{ row.authType == 1 ? '个人认证': '企业认证' }}</span>
              </template>
            </el-table-column>-->
            <el-table-column
              label="审核资料">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleView(scope.$index, scope.row)">点击查看</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="审核结果">
              <template slot-scope="{row}">
                <el-tag type="success" size="mini" v-if="row.status == 2">{{statusName[row.status *1] }}</el-tag>
                <el-tag type="info" size="mini" v-else>{{statusName[row.status *1] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="原因">
              <template slot-scope="{row}">
                <span>{{ row.desc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="审核时间">
              <template slot-scope="{row}">
                <span><span>{{ row.updatedAt | moment("YYYY-MM-DD HH:mm:ss") }}</span></span>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
        </el-row>
        <el-dialog
          title="申请领取提交的资料"
          :visible.sync="dialogVisible"
          :modal-append-to-body="false"
          :append-to-body="true"
          width="600px"
          :before-close="handleClose">
          <div class="rz-container">
            <div class="businessLicense">
              <div class="block">
                <span class="demonstration">营业执照</span>
                <el-image :src="renzheng.authInfo.businessLicense"></el-image>
              </div>
            </div>
            <div class="icard">
              <div class="block">
                <span class="demonstration">身份证正面</span>
                <el-image :src="renzheng.authInfo.positive"></el-image>
              </div>
              <div class="block">
                <span class="demonstration">身份证反面</span>
                <el-image :src="renzheng.authInfo.otherside"></el-image>
              </div>
            </div>
            <div class="info">
              <div class="item"><span class="label">真实姓名:</span>{{ renzheng.authInfo.username }}</div>
              <div class="item"><span class="label">身份证号:</span>{{ renzheng.authInfo.idcard }}</div>
              <div class="item"><span class="label">手机号:</span>{{ renzheng.authInfo.phone }}</div>
            </div>
          </div>
        </el-dialog>
      </div>
      <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { getApplyGetMerchant, fetchList, fetchMerchant } from '@/api/merchant'
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
        status: 2 // 1 已申请带审核 2 审核通过  3 审核不通过
      },
      dialogVisible: false,
      renzheng: {
        authInfo: '',
        authType: 1, // 认证类型 1 个人认证, 2 企业认证
        merchantId: 0
      },
      textMap: {
        1: '个人认证',
        2: '企业认证'
      },
      statusName: {1: '待审核', 2: '已通过', 3: '不通过'}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getApplyGetMerchant(this.listQuery, this.listFilter).then(response => {
        if (response.data) {
          this.list = response.data.records
          this.total = response.data.total
        }
        this.listLoading = false
      }).catch(() => {
      }).then(() => {
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 查看商家认证资料
    handleView(index, row) {
      this.renzheng.authType = row.authType
      this.renzheng.authInfo = JSON.parse(row.authInfo)
      this.renzheng.status = row.status
      this.dialogVisible = true
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
  .rz-container {
    .icard,
    .businessLicense,
    .info {
      border: 1px solid #eff2f6;
      margin-bottom: 20px;
    }
    .block {
      padding: 30px 0;
      text-align: center;
      border-right: 1px solid #eff2f6;
      display: inline-block;
      width: 49%;
      box-sizing: border-box;
      vertical-align: top;
    }
    .block:last-child {
      border-right: none;
    }
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
      text-align: center;
    }
    .el-image {
      width: 200px;
      height: 150px;
    }
    .businessLicense {
      .el-image {
        width: 480px;
        height: 300px;
      }
      .block {
        width: 98%;
      }
    }
    .info {
      background-color: #fafafa;
      padding: 30px;
      margin-bottom: 35px;
    }
    .label {
      display: inline-block;
      width: 80px;
    }
    .item {
      text-align: left;
      margin-bottom: 15px;
    }
  }
</style>
