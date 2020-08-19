<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/activity/activityOptions'}">活动反馈/举报</el-menu-item>
      </el-menu>
      <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
        <el-select size="small" v-model="listFilter.optionType" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="全部类型">
          <el-option label="全部类型" value="" />
          <el-option v-for="(value, key, index) in optionTypes" :key="key" :label="value" :value="key" />
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
            width="60">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户"
            width="100px">
            <template slot-scope="{row}">
              <span>{{ row.user.nickName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            width="80px">
            <template slot-scope="{row}">
              <span>{{ optionTypes[row.optionType] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="内容">
            <template slot-scope="{row}">
              <span>{{ row.context }}</span>
            </template>
          </el-table-column>
          <el-table-column label="相关活动">
            <el-table-column
              label="标题">
              <template slot-scope="{row}">
                <router-link target="_blank" style="color: #409EFF" :to="'/activity/detail/' + row.activity.id + '/' + row.activity.type + '/overview'">{{ row.activity.title }}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="60px">
              <template slot-scope="{row}">
                <span>{{ activityTypes[row.activity.type] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商家">
              <template slot-scope="{row}">
                <router-link target="_blank" style="color: #409EFF" :to="'/merchant/detail/' + row.activity.merchantId + '/overview'">{{ row.activity.merchant.name }}</router-link>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="操作时间"
            width="150px">
            <template slot-scope="{row}">
              <span>{{ row.createdAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
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
import { getActivityOptions } from '@/api/activity'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination、

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
      },
      clientHeight: '',
      maxHeight: 400,
      optionTypes: { 1: '不感兴趣', 2: '举报' },
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' },
      status: { 1: '正常', 2: '已隐藏' }
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight)
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight =  `${document.documentElement.clientHeight}`
    let that = this
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
      getActivityOptions(this.listQuery, this.listFilter).then(response => {
        if (response.code === '200') {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
          this.listLoading = false
        }
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 推荐到首页
    setActivityWithGoodOrRecommend(index, row, type, status) {
      this.$confirm('确认取消推荐到首页?', '提示', {
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
            if (status == 0) {
              this.list.splice(index, 1)
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
    // 设置权重
    setWeight(index, row, type) {
      this.$prompt('请输入权重', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        setWeight({activityId: row.id, type: type, weight: value}).then(response => {
          if (response.code === '200') {
            let that = this
            this.$message({
              type: 'success',
              message: '操作成功!',
              onClose: function() {
                that.listQuery.current = 1
                that.getList()
              }
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
  .filter-item {
    margin-right: 10px;
  }
</style>
