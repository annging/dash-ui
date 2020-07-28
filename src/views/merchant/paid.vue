<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="3" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="1" :route="{path:'/merchant/index'}">商家列表</el-menu-item>
            <el-menu-item index="2" :route="{path:'/merchant/dailingqu'}">待领取商家</el-menu-item>
            <el-menu-item index="3" :route="{path:'/merchant/paid'}">付费商家</el-menu-item>
            <el-menu-item index="4" :route="{path:'/merchant/recommend'}">推荐商家</el-menu-item>
	    	</el-menu>
		    <el-row type="flex" class="filter-container"  style="margin-bottom: 20px;">
          <el-input
            v-model="listQuery.searchStr"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="small"
            class="filter-item"
            @keyup.enter.native="handleFilter" />
          <el-select size="small" v-model="listFilter.vipLevel" style="width: 200px" class="filter-item" @change="handleFilter">
            <!--<el-option  label="全部付费商家" value="" />-->
            <el-option v-for="item in typeOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
          <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
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
            }"
            >
            <el-table-column
              prop="id"
              label="ID"
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
            <!--<el-table-column
              label="活动总数">
              <template slot-scope="{row}">
                <span>{{ row.activities.length }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="访问人数">
              <template slot-scope="{row}">
                <span>{{row.activity.fangwen}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="参与人数">
              <template slot-scope="{row}">
                <span>{{row.activity.canyu}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="累计收入">
              <template slot-scope="{row}">
                <span>{{row.account.incharge}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="门店数量">
              <template slot-scope="{row}">
                <span>{{ row.storeCount || row.stores.length }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="员工数量">
              <template slot-scope="{row}">
                <span>{{row.staffs}}</span>
              </template>
            </el-table-column>-->
            <el-table-column
              label="创建者"
              width="">
              <template slot-scope="{row}">
                <span>{{ row.user ? row.user.nickName : ''  }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="会员"
              width="">
              <template slot-scope="{row}">
                <span>{{ levels[row.vipLevel] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="会员到期时间">
              <template slot-scope="{row}">{{ row.vipEndTime | moment("YYYY-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleView(scope.$index, scope.row)">查看</el-button>
                <!--<el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
import { fetchList } from '@/api/merchant'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        searchStr: '',
        current: 1,
        size: 20
      },
      listFilter: {
        vipLevel: 2
      },
      levels: { 0: '标准会员', 1: '体验会员', 2: 'VIP会员' }, // '会员级别 0普通会员 1 体验会员 2会员'
      typeOptions: [{ key: 2, label: 'VIP会员' }] // '会员级别 0普通会员 1 体验会员 2会员'
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery, this.listFilter).then(response => {
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
    },
    // 添加商家
    goCreate() {
      this.$router.push({ path: '/merchant/edit/0' });
    },
    handleView(index, row) {
      this.$router.push({
        path: '/merchant/detail/' + row.id
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
