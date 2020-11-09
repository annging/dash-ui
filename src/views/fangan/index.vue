<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/fangan/index/'}">方案列表</el-menu-item>
        <el-menu-item index="2" :route="{path:'/fangan/recommend/'}">推荐方案列表</el-menu-item>
      </el-menu>
      <el-row type="flex" class="filter-container" style="margin-bottom: 20px;" justify="space-between">
        <div>
          <el-input
            class="filter-item"
            v-model="listFilter.title"
            placeholder="请输入方案标题"
            prefix-icon="el-icon-search"
            size="small"
            clearable
            style="width: 300px; margin-right: 20px;"
            @keyup.enter.native="handleFilter"
            @clear="handleFilter" />
          <el-select size="small" v-model="listFilter.type" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="全部类型">
            <el-option  label="全部类型" value="" />
            <el-option v-for="(value, key, index) in activityTypes" :key="key" :label="value" :value="key" />
          </el-select>
          <el-select size="small" v-model="listFilter.industry" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="全部行业">
            <el-option  label="全部行业" value="" />
            <el-option v-for="(value, key, index) in industrys" :key="key" :label="value" :value="value" />
          </el-select>
          <el-button size="small" class="filter-item" type="primary" plain icon="el-icon-search" @click="handleFilter">
              搜索
          </el-button>
        </div>
        <el-button type="primary" size="small" style="min-width: 120px;" icon="el-icon-circle-plus-outline" @click="goCreate">新增方案</el-button>
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
              label="封面"
              width="120">
              <template slot-scope="{row}">
                <img :src="row.imgUrl" style="width: 100px;height: 60px;">
              </template>
            </el-table-column>
            <el-table-column
              label="方案标题">
              <template slot-scope="{row}">
                <span>{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="100">
              <template slot-scope="{row}">
                <span>{{ activityTypes[row.type] || row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="行业"
              width="100">
              <template slot-scope="{row}">
                <span>{{ industrys[row.industry] || row.industry }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="浏览"
              width="100">
              <template slot-scope="{row}">
                <span>{{ row.browse }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="领取"
              width="100">
              <template slot-scope="{row}">
                <span>{{ row.receive }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="权重"
              width="100">
              <template slot-scope="{row}">
                <span>{{ row.weight ? row.weight : 0 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否推荐"
              width="100">
              <template slot-scope="{row}">
                <el-tag type="success" size="mini" v-if="row.isRecommend">推荐</el-tag>
                <el-tag type="info" size="mini" v-else>否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.isRecommend"
                  size="mini"
                  type="text"
                  @click="handleRecommend(scope.$index, scope.row, 1)">推荐</el-button>
                <el-button
                  v-else
                  size="mini"
                  type="text"
                  style="color: #F56C6C"
                  @click="handleRecommend(scope.$index, scope.row, 0)">取消推荐</el-button>
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
import qs from 'qs'
import axios from 'axios'
import { fetchSchemeList, deleteScheme, updateActivityScheme } from '@/api/activity'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination、

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 20
      },
      listFilter: {
        title: '',
        type: '',
        industry: ''
      },
      clientHeight: '',
      maxHeight: 400,
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券',  '-1': '团购' },
      industrys: { 1: '教育/培训' ,  2: '丽人/美发' ,  3: '亲子/乐园', 4: '运动健身', 5: '休闲/玩乐', 6: '美容/SPA', 7: '嬌纱/摄影', 8: '家居/装修', 9: '生活服务', 10: '餐饮美食', 11: '母婴', 12: '洗车', 13: '服装' }
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
      fetchSchemeList(this.listQuery, this.listFilter).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
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
    goCreate() {
      this.$router.push({ path: '/fangan/create' });
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/fangan/edit/' + row.id });
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该方案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteScheme(row.id).then(res => {
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
    handleRecommend(index, row, status) {
      this.$confirm((status ? '' : '取消') + '推荐方案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          updateActivityScheme({id: row.id, isRecommend: status}).then(res => {
            if (res.code * 1 === 200 ) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.list[index].isRecommend = status
            } else {
              this.$message({
                type: 'error',
                message: res.msg || '网络错误'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
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
