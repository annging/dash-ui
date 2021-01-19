<template>
	<div>
		<el-row class="list">
      <el-table
        v-loading="listLoading"
        :data="activityList"
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
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="fetchData" />
    </el-row>
	</div>
</template>

<script>
import { getActivitys } from '@/api/activity'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
    	id: '',
    	listLoading: false,
      total: 0,
      listQuery: {
        current: 1,
        size: 20
      },
      listFilter: {
        merchantId: 0
      },
    	activityList: [],
    	activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券', '-1': '团购' },
    	status: { 1: '正常', 2: '已隐藏' },
    }
  },
  computed: {
  },
  created() {
		this.id = this.$route.params && this.$route.params.id
    this.fetchData()
  },
  methods: {
  	fetchData() {
  		this.listLoading = true
      getActivitys(this.listQuery, {merchantId: this.id}).then(response => {
	      	if (response.data.records) {
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
	      		this.activityList = response.data.records
            this.total = response.data.total
		      }
		      this.listLoading = false
      }).catch((err) => {
        this.listLoading = false
      })
    },
    handleView(index, row) {
      this.$router.push({
        path: '/activity/detail/' + row.id
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>