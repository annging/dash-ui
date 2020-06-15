<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/account/store/list/'}">活动列表</el-menu-item>
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
            :max-height="maxHeight"
            size="small"
            :header-cell-style="{
              'background-color': '#f7f9fa',
              'color': '#637282;'
            }"
            @sort-change="sortChange"
            >
            <el-table-column
              fixed
              prop="id"
              label="ID"
              sortable
              width="60">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="封面"
              width="120">
              <template slot-scope="row">
                <img :src="row.cover" style="width: 100px;height: 60px;">
              </template>
            </el-table-column>
            <el-table-column
              label="活动标题"
              width="300">
              <template slot-scope="{row}">
                <span>{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型">
              <template slot-scope="{row}">
                <span>{{ row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="价格">
              <template slot-scope="{row}">
                <span>{{row.finalPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="活动时间"
              width="150">
              <template slot-scope="{row}">
                <span>{{row.startTime}} <br/>- <br/>{{row.endTime}} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="商家">
              <template slot-scope="{row}">
                <span>{{row.merchant.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="{row}">
                <span>{{row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否推荐到首页">
              <template slot-scope="{row}">
                <span>{{row.isRecommend}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否优秀案例">
              <template slot-scope="{row}">
                <span>{{row.isAnli}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="240">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="setRecommend(scope.$index, scope.row)">推荐到首页</el-button>
                  <el-button
                  size="mini"
                  @click="setAnli(scope.$index, scope.row)">设为优秀案例</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
      </div>
      <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { fetchList } from '@/api/activity'
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
        page: 1,
        limit: 20,
        sort: '+id'
      },
      clientHeight: '',
      maxHeight: 400
    };
  },
  watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
  created() {
    this.listLoading = false
    // this.getList()
  },
  mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =  `${document.documentElement.clientHeight}`;
      let that = this;
      window.onresize = function temp() {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
  methods: {
    changeFixed(clientHeight){
      this.maxHeight = clientHeight - 85 - 110 - 100;
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
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
    // 推荐到首页
    setRecommend(index, row) {
      console.log('推荐到首页');
      this.$message({
        type: 'success',
        message: '成功推荐到首页!'
      });
    },
    setAnli(index, row) {
      console.log('优秀案例');
      this.$message({
        type: 'success',
        message: '已经设为优秀案例!'
      });
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
