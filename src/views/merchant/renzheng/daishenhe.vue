<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/merchant/renzheng/daishenhe'}">待审核</el-menu-item>
		      	<el-menu-item index="2" :route="{path:'/merchant/renzheng/yishenhe'}">已审核</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container"  style="margin-bottom: 20px; display: none">
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
              label="商家名称">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="认证类型">
              <template slot-scope="{row}">
                <span>{{ row.authType == 1 ? '个人认证': '企业认证' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="认证资料">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleView(scope.$index, scope.row)">点击查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleShenhe(scope.$index, scope.row, 2)">通过</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleShenhe(scope.$index, scope.row, 4)">不通过</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
        </el-row>
        <el-dialog
          :title="textMap[renzheng.authType]"
          :visible.sync="dialogVisible"
          :modal-append-to-body="false"
          :append-to-body="true"
          width="600px"
          :before-close="handleClose">
          <div class="rz-container">
            <div class="businessLicense" v-if="renzheng.authType == 2">
              <div class="block">
                <span class="demonstration">营业执照</span>
                <el-image :src="renzheng.authInfo.businessLicense"></el-image>
              </div>
            </div>
            <div class="info" v-if="renzheng.authType == 2">
              <div class="item"><span class="label">企业全称:</span>{{ renzheng.authInfo.enterpriseNname }}</div>
              <div class="item"><span class="label">营业执照:</span>{{ renzheng.authInfo.creditCode }}</div>
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
import { fetchList, fetchMerchant, isOrNoAuthentication } from '@/api/merchant'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        searchStr: '',
        current: 1,
        size: 20
      },
      listFilter: {
        authStatus: 1 // 待审核  2认证通过  4认证失败
      },
      dialogVisible: false,
      renzheng: {
        authInfo: '',
        authType: 1, // 认证类型 1 个人认证, 2 企业认证
        authStatus: 1
      },
      textMap: {
        1: '个人认证',
        2: '企业认证'
      }
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
          this.list = response.data.records
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 查看商家认证资料
    handleView(index, row) {
      this.renzheng.authType = row.authType
      this.renzheng.authInfo = JSON.parse(row.authInfo)
      this.renzheng.authStatus = row.authStatus
      this.dialogVisible = true
    },
    handleClose(done) {
      console.log('关闭弹窗')
      done()
    },
    handleShenhe(index, row, status) {
      //处理审核
      this.$confirm('确认商家认证资料' + (status === 2 ? '通过' : '未通过') +'审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        isOrNoAuthentication({id: row.id, authStatus: status}).then(response => {
          if (response.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.list.splice(index, 1)
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
