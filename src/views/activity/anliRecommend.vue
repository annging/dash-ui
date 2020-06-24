<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="3" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/activity/list'}">活动列表</el-menu-item>
        <el-menu-item index="2" :route="{path:'/activity/recommendActivity'}">首页推荐</el-menu-item>
        <el-menu-item index="3" :route="{path:'/activity/recommendAnli'}">优秀案例</el-menu-item>
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
              label="封面图">
              <template slot-scope="{row}">
                <img :src="row.cover[0]" style="width: 100px;height: 60px;">
              </template>
            </el-table-column>
            <el-table-column
              label="title">
              <template slot-scope="{row}">
                <span>{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型">
              <template slot-scope="{row}">
                <span>{{ activityTypes[row.type] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="活动时间"
              width="150">
              <template slot-scope="{row}">
                <span>{{ row.startTime | moment("YYYY-MM-DD HH:mm:ss") }} <br/>- <br/>{{ row.endTime | moment("YYYY-MM-DD HH:mm:ss") }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="价格">
              <template slot-scope="{row}">
                <span>{{ row.basePrice === 0 ? '免费' : row.basePrice.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商家ID">
              <template slot-scope="{row}">
                <span>{{row.merchantId}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="{row}">
                <span>{{row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="setActivityWithGoodOrRecommend(scope.$index, scope.row, 'isGood', 0)">取消优秀案例</el-button>
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
import qs from 'qs'
import axios from 'axios'
import { getSpecialActivity, setActivityWithGoodOrRecommend } from '@/api/activity'
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
        isGood: 1
      },
      clientHeight: '',
      maxHeight: 400,
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' }
    };
  },
  watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      // clientHeight: function () {
      // this.changeFixed(this.clientHeight)
      // }
    },
  created() {
    this.getList()
  },
  mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =  `${document.documentElement.clientHeight}`
      let that = this
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
      getSpecialActivity(this.listQuery, this.listFilter).then(response => {
        if (response.data.records.length > 0) {
          response.data.records.forEach(item => {
          if (item.cover && item.cover != 'string') {
              item.cover = JSON.parse(item.cover);
            }
            if (item.activitySetting) {
              item.activitySetting = JSON.parse(item.activitySetting);
            }
          });
        }
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 推荐到首页
    setActivityWithGoodOrRecommend(index, row, type, status) {
      let data = {}
      if(type === 'isRecommend') {
        data ={
          id: row.id,
          isRecommend: status
        }
      } else if(type === 'isGood') {
        data ={
          id: row.id,
          isGood: status
        }
      }
      setActivityWithGoodOrRecommend(data).then(response => {
        if(response.code === '200') {
          if(status == 0) {
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
