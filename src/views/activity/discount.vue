<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="4" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/activity/list'}">活动列表</el-menu-item>
        <el-menu-item index="4" :route="{path:'/activity/discount'}">优惠券活动列表</el-menu-item>
        <el-menu-item index="2" :route="{path:'/activity/recommendActivity'}">首页推荐</el-menu-item>
        <el-menu-item index="3" :route="{path:'/activity/recommendAnli'}">优秀案例</el-menu-item>
      </el-menu>
      <!--<el-row type="flex" class="filter-container" style="margin-bottom: 20px;">
        <el-input
          v-model="listFilter.title"
          placeholder="请输入活动标题"
          prefix-icon="el-icon-search"
          size="small"
          clearable
          style="width: 300px; margin-right: 20px;"
          @keyup.enter.native="handleFilter"
          @clear="handleFilter" />
      </el-row>-->
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
            label="优惠券活动标题">
            <template slot-scope="{row}">
              <span>{{ row.title || row.activitySetting.title }}</span>
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
            label="价格"
            width="70">
            <template slot-scope="{row}">
              <span>{{ row.basePrice === 0 ? '免费' : row.basePrice.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商家">
            <template slot-scope="{row}">
              <span v-if="row.merchant">{{ row.merchant.name }}</span>
              <span v-else>{{ row.merchantId}}</span>
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
            label="推荐?"
            width="90">
            <template slot-scope="{row}">
              <span>{{ row.specialActivity ? (row.specialActivity.isRecommend > 0 ? '是' : '否') : '否' }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column
            label="优秀案例?"
            width="80">
            <template slot-scope="{row}">
              <span>{{ row.specialActivity ? (row.specialActivity.isGood > 0 ? '是' : '否') : '否' }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <!--<el-button
                size="mini"
                type="text"
                @click="handleView(scope.$index, scope.row)">查看</el-button>-->
              <el-button
                size="mini"
                type="text"
                style="color: #F56C6C"
                v-if="scope.row.specialActivity && scope.row.specialActivity.isRecommend > 0"
                @click="setActivityWithGoodOrRecommend(scope.$index, scope.row, 'isRecommend', 0)">取消推荐</el-button>
              <el-button
                size="mini"
                type="text"
                v-else
                @click="setActivityWithGoodOrRecommend(scope.$index, scope.row, 'isRecommend', 1)">推荐</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                style="color: #F56C6C"
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
import { getCouponActivityList, setActivityWithGoodOrRecommend, deleteActivityById } from '@/api/activity'
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
        title: ''
      },
      clientHeight: '',
      maxHeight: 400,
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' },
      status: { 1: '正常', 2: '已隐藏' }
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
    changeFixed(clientHeight){
      this.maxHeight = clientHeight - 85 - 110 - 100
    },
    getList() {
      this.listLoading = true
      getCouponActivityList(this.listQuery, this.listFilter).then(response => {
        if (response.data.records.length > 0) {
          response.data.records.forEach(item => {
            if (item.cover && item.cover != 'string') {
              item.cover = JSON.parse(item.cover);
            }
            if (item.activitySetting) {
              item.activitySetting = JSON.parse(item.activitySetting);
            }
          })
        }
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleView(index, row) {
      /* this.$router.push({
        path: '/activity/detail/' + row.id + '/' + row.type
      }) */
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/activity/edit/' + row.id + '/' + row.type + '/' + row.merchantId
      })
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该优惠券?', '提示', {
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
    // 推荐到优惠券首页
    setActivityWithGoodOrRecommend(index, row, type, status) {
      this.$confirm('确认'+ (status ? '' : '取消') + (type === 'isRecommend' ? '推荐到首页' : '设为优秀案例') + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {}
        if (type === 'isRecommend') {
          data ={
            id: row.id,
            isRecommend: status
          }
        } else if (type === 'isGood') {
          data ={
            id: row.id,
            isGood: status
          }
        }
        setActivityWithGoodOrRecommend(data).then(response => {
          if (response.code === '200') {
            if (!this.list[index].specialActivity) {
              this.$set(this.list[index], 'specialActivity', {id: row.id, isRecommend: 0, isGood: 0})
            }
            if (type === 'isRecommend') { // 推荐
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })       
      })
    },
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
