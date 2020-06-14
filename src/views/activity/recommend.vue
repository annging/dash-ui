<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/platform/recommendActivity/'}">首页推荐</el-menu-item>
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
          }"
          @sort-change="sortChange"
          >
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
              label="音乐">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="url"
              width="300">
              <template slot-scope="{row}">
                <span>{{ row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="分类"
              width="100">
              <template slot-scope="{row}">
                <span>{{ row.firstClass + '-' + row.secondClass }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间">
              <template slot-scope="{row}">
                <span>{{ row.createdAt }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  @click="handleDetele(scope.$index, scope.row)">删除</el-button>
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
import { getSpecialActivity } from '@/api/activity'
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
        isRecommend: 1
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
    this.getList()
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
      getSpecialActivity(this.listQuery, this.listFilter).then(response => {
        this.list = response.data.records
        this.total = response.data.total
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
