<template>
	<div class="main-content">
	  <div class="left-container">
	    <el-menu default-active="3" class="" mode="horizontal" router style="margin-bottom: 20px;">
		    <el-menu-item index="1" :route="{path:'/school/article/index'}">文章列表</el-menu-item>
        <el-menu-item index="3" :route="{path:'/school/article/rec'}">推荐文章</el-menu-item>
	    </el-menu>
		  <!--<el-row type="flex" class="filter-container" style="margin-bottom: 20px;" justify="space-between">
        <el-button type="primary" size="small" style="min-width: 120px;" icon="el-icon-circle-plus-outline" @click="goCreate">添加文章</el-button>
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
              width="80">
              <template slot-scope="{row}">
                <img :src="row.cover" style="width: 60px;height: 60px;">
              </template>
            </el-table-column>
          <el-table-column
            label="标题">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="简介">
            <template slot-scope="{row}">
              <span>{{ row.brief }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="导师">
            <template slot-scope="{row}">
              <span v-if="row.tutor">{{ row.tutor.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="150">
            <template slot-scope="{row}">
              <span>{{ row.createdAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
            width="150">
            <template slot-scope="{row}">
              <span>{{ row.updatedAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="125">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                style="color: #F56C6C"
                @click="handleDelete(scope.$index, scope.row)">取消推荐</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.offset" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
    </div>
    <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { fetchArticleList, deleteArticle, addOrUpdateArticle } from '@/api/school'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        offset: 0,
        limit: 20,
        recommend: true
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchArticleList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.offset = 0
      this.getList()
    },
    goCreate() {
      this.$router.push({ path: '/school/article/create' })
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/school/article/edit/' + row.id });
    },
    handleDelete(index, row) {
      this.$confirm('确认取消设置该文章为推荐文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addOrUpdateArticle({id:row.id, isRecommend: false}).then(res => {
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
    handleRec(index, row, isRec) {
      alert('还没')
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
