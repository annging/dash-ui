<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/activity/list'}">活动列表</el-menu-item>
        <el-menu-item index="4" :route="{path:'/activity/discount'}">优惠券活动列表</el-menu-item>
        <el-menu-item index="2" :route="{path:'/activity/recommendActivity'}">首页推荐</el-menu-item>
        <el-menu-item index="3" :route="{path:'/activity/recommendAnli'}">优秀案例</el-menu-item>
        <el-menu-item index="5" :route="{path:'/activity/enableUserSaleActivity'}">分销活动</el-menu-item>
      </el-menu>
      <el-row type="flex" class="filter-container" style="margin-bottom: 20px;" justify="space-between">
        <div>
          <el-input
            v-model="listFilter.title"
            placeholder="请输入活动标题"
            prefix-icon="el-icon-search"
            size="small"
            clearable
            style="width: 300px; margin-right: 20px;"
            @keyup.enter.native="handleFilter"
            @clear="handleFilter" />
          <el-select size="small" v-model="listFilter.type" style="width: 200px; margin-right: 20px;" class="filter-item" @change="handleFilter" placeholder="全部类型">
            <el-option  label="全部类型" value="" />
            <el-option v-for="(value, key, index) in activityTypes" :key="key" :label="value" :value="key" v-if="key < 10" />
          </el-select>
          <el-button size="small" class="filter-item" type="primary" plain icon="el-icon-search" @click="handleFilter">
              搜索
          </el-button>
        </div>
        <el-button type="primary" size="small" style="min-width: 120px;" icon="el-icon-circle-plus-outline" @click="handelCreate">创建活动</el-button>
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
            fixed
            prop="id"
            label="ID"
            width="60">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="封面"
            width="100">
            <template slot-scope="{row}">
              <img :src="row.cover[0]" style="width: 80px;height: 50px;">
            </template>
          </el-table-column>
          <el-table-column
            label="活动标题">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            width="60">
            <template slot-scope="{row}">
              <span>{{ activityTypes[row.type] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="价格">
            <template slot-scope="{row}">
              <span>{{ row.basePrice === 0 ? '免费' : row.basePrice.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商家">
            <template slot-scope="{row}">
              <span v-if="row.merchant">{{ row.merchant.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="活动时间"
            width="150">
            <template slot-scope="{row}">
              <span style="text-align: center;">{{ row.startTime | moment("YYYY-MM-DD HH:mm:ss") }} <br/>至 <br/>{{ row.endTime | moment("YYYY-MM-DD HH:mm:ss") }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="60">
            <template slot-scope="{row}">
              <span>{{status[row.status]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="推荐到首页?"
            width="90">
            <template slot-scope="{row}">
              <el-tag type="success" size="mini" v-if="row.specialActivity && row.specialActivity.isRecommend > 0">推荐</el-tag>
              <el-tag type="info" size="mini" v-else>否</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="优秀案例?"
            width="80">
            <template slot-scope="{row}">
              <el-tag type="success" size="mini" v-if="row.specialActivity && row.specialActivity.isGood > 0">优秀</el-tag>
              <el-tag type="info" size="mini" v-else>否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleView(scope.$index, scope.row)">查看</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                style="color: #F56C6C"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <br />
              <el-button
                size="mini"
                type="text"
                style="color: #F56C6C"
                v-if="scope.row.specialActivity && scope.row.specialActivity.isRecommend > 0"
                @click="setActivityWithGoodOrRecommend(scope.$index, scope.row, 'isRecommend', 0)">取消推荐到首页</el-button>
              <el-button
                size="mini"
                type="text"
                v-else
                @click="setActivityWithGoodOrRecommend(scope.$index, scope.row, 'isRecommend', 1)">推荐到首页</el-button>
                <br />
                <el-button
                size="mini"
                type="text"
                style="color: #F56C6C"
                v-if="scope.row.specialActivity && scope.row.specialActivity.isGood > 0"
                @click="setActivityWithGoodOrRecommend(scope.$index, scope.row, 'isGood', 0)">取消设为优秀案例</el-button>
                <el-button
                size="mini"
                type="text"
                v-else
                @click="setActivityWithGoodOrRecommend(scope.$index, scope.row, 'isGood', 1)">设为优秀案例</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
      </el-row>
      <el-dialog
        title="创建活动"
        :visible.sync="creDialogVisible"
        :modal-append-to-body="false"
        :append-to-body="true"
        width="600px"
        :before-close="handleClose">
        <div class="cre-container">
          <el-form ref="creForm" :rules="creRules" :model="cre" label-width="100px" size="small">
            <el-form-item label="商家" prop="merchantId">
              <el-select v-model="cre.merchantId" placeholder="请选择商家" style="width: 100%" popper-class="paginationSelect" >
                <div class="filterBar" style="padding: 20px;">
                  <span :class="merchantListFilter.authStatus == 5 ? 'active' : ''"  @click="filterMerchant(5)">待领取商家</span>
                  <span :class="merchantListFilter.authStatus == 5 ? '' : 'active'"  @click.prevent="filterMerchant('')">已入驻商家</span>
                </div>
                <div v-loading="merchantListLoading">
                <el-option v-if="merchantList.length > 0" v-for="item in merchantList" :key="item.id" :label="item.id + '-'  + item.name" :value="item.id">
                  <span class="label-id">{{ item.id }}</span>-
                  <span class="label-title">{{ item.name }}</span>
                </el-option>
                <pagination v-show="merchantTotal>0" :total="merchantTotal" :page.sync="merchantListQuery.current" :limit.sync="merchantListQuery.size" @pagination="getMerchantList" />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="活动类型" prop="type">
              <el-select v-model="cre.type" placeholder="请选择活动类型">
                <el-option v-for="item in merchantActivityTypes" :key="item.key" :label="item.label" :value="item.key" :disabled="item.disabled" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="creDialogVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="goCreate()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { getActivitys, setActivityWithGoodOrRecommend, setWeight, deleteActivityById } from '@/api/activity'
import { fetchList} from '@/api/merchant'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        searchStr: '',
        current: 1,
        size: 20
      },
      listFilter: {
        title: '',
        type: ''
      },
      clientHeight: '',
      maxHeight: 400,
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券', '-1': '团购' },
      status: { 1: '正常', 2: '已隐藏' },
      creDialogVisible: false,
      cre: {
        type: '',
        merchantId: ''
      },
      creRules: {
        merchantId: [
          { required: true, message: '请选择一个商家', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择一个活动类型', trigger: 'blur' }
        ]
      },
      merchantActivityTypes: [{ key: 1, label: '报名' }, { key: 2, label: '抽奖', disabled: true }, { key: 3, label: '海报', disabled: true }, { key: 4, label: '砍价' }, { key: 5, label: '秒杀', disabled: true }, { key: 6, label: '拼团' }, { key: 7, label: '投票', disabled: true }, { key: 8, label: '预约', disabled: true }, { key: 9, label: '助力', disabled: true }, { key: 10, label: '代金券' }, { key: 11, label: '折扣券' }, { key: 12, label: '兑换券' }, { key: 13, label: '体验券' }, { key: -1, label: '团购', disabled: true }],
      merchantList: [],
      merchantTotal: 0,
      merchantListQuery: {
        searchStr: '',
        current: 1,
        size: 20
      },
      merchantListFilter: {
        authStatus: 5
      },
      merchantListLoading: true
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    // clientHeight: function () {
    // this.changeFixed(this.clientHeight)
    // }
  },
  created() {
    this.listLoading = false
    this.getList()
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight =  `${document.documentElement.clientHeight}`
    const that = this
    window.onresize = function temp() {
      that.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  methods: {
    changeFixed(clientHeight) {
      this.maxHeight = clientHeight - 85 - 110 - 100
    },
    getList() {
      this.listLoading = true
      getActivitys(this.listQuery, this.listFilter).then(response => {
        if (response.data.records.length > 0) {
          response.data.records.forEach(item => {
            if (item.cover && item.cover !== 'string') {
              item.cover = JSON.parse(item.cover)
            }
            if (item.activitySetting) {
              item.activitySetting = JSON.parse(item.activitySetting)
            }
          })
        }
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getMerchantList() {
      this.merchantListLoading = true
      fetchList(this.merchantListQuery, this.merchantListFilter).then(response => {
        this.merchantList = response.data.records
        this.merchantTotal = response.data.total
        this.merchantListLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleView(index, row) {
      this.$router.push({
        path: '/activity/detail/' + row.id + '/' + row.type
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/activity/edit/' + row.id + '/' + row.type + '/' + row.merchantId
      })
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteActivityById(row.id).then(res => {
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
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })       
      })
    },
    // 推荐到首页/设为优秀案例
    setActivityWithGoodOrRecommend(index, row, type, status) {
      let data = {}
      if (type === 'isRecommend') {
        data = {
          id: row.id,
          isRecommend: status
        }
      } else if (type === 'isGood') {
        data = {
          id: row.id,
          isGood: status
        }
      }
      setActivityWithGoodOrRecommend(data).then(response => {
        if (response.code === '200') {
          if (!this.list[index].specialActivity) {
            this.$set(this.list[index], 'specialActivity', {id: row.id, isRecommend: 0, isGood: 0})
          }
          if (type === 'isRecommend') { // 推荐到首页
            this.list[index].specialActivity.isRecommend = status
          } else { // 优秀案例
            this.list[index].specialActivity.isGood = status
          }
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
    handelCreate() {
      this.merchantListQuery.current = 1
      if (this.merchantList.length < 1) {
        this.getMerchantList()
      }
      this.cre = { type: '', merchantId: '' }
      if (this.$refs.creForm) {
        this.$refs.creForm.clearValidate()
      }
      this.creDialogVisible = true
    },
    filterMerchant(val) {
      this.merchantListFilter.authStatus = val
      this.merchantListQuery.current = 1
      this.getMerchantList()
    },
    handleClose(done) {
      console.log('关闭弹窗')
      done()
    },
    goCreate() {
      this.$refs.creForm.validate(valid => {
        if (valid) {
          this.creDialogVisible = false
          this.$router.push({
            path: '/activity/create/' + this.cre.type + '/' + this.cre.merchantId
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // 推荐/优秀
    /* setActivity(index, row, type) {
      this.$prompt('请输入权重', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        setWeight({activityId: row.id, type: type, weight: value}).then(response => {
          if (response.code === '200') {
          if (!this.list[index].specialActivity) {
              this.$set(this.list[index], 'specialActivity', {id: row.id, isRecommend: 0, isGood: 0})
            }
            if (type === 0) { // 推荐到首页
              this.list[index].specialActivity.isRecommend = 1
            } else { // 优秀案例
              this.list[index].specialActivity.isGood = 1
            }
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })         
      })
    } */
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
  .filterBar span {
    display: inline-block;
    padding: 5px 15px;
    margin-right: 10px;
    font-size: 15px;
    cursor: pointer;
  }
  .filterBar span.active {
    border: 1px solid #409EFF;
    border-radius: 5px;
  }
</style>

<style lang="scss">
  .paginationSelect {
    .el-select-dropdown__wrap {
      max-height: 500px;
      height: 500px;
    }
    .el-select-dropdown__list {
      padding-top: 30px;
    }
    .el-select-dropdown__item {
      border-bottom: 1px solid #f5f5f5;
    }
    .el-loading-spinner {
      top: 200px;
    }
  }
</style>
