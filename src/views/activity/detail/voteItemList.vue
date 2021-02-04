<template>
	<div>
  <el-row type="flex" class="filter-container" style="margin-bottom: 20px;" justify="space-between">
    <div>
      <el-input
        class="filter-item"
        v-model="listQuery.search"
        placeholder="请输入选手的名字"
        prefix-icon="el-icon-search"
        size="small"
        clearable
        style="width: 300px; margin-right: 20px;"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter" />
      <el-select size="small" v-model="listQuery.voteGroupId" style="width: 200px" class="filter-item" @change="handleFilter" placeholder="全部">
        <el-option  label="全部" value="" />
        <el-option v-for="(item, index) in groupNames" :key="item.id" :label="item.group" :value="item.id" />
      </el-select>
      <el-button size="small" class="filter-item" type="primary" plain icon="el-icon-search" @click="handleFilter">
          搜索
      </el-button>
    </div>
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
          label="封面"
          width="100">
          <template slot-scope="{row}">
            <img :src="row.cover + '?imageView2/0/w/80'" style="width: 80px;">
          </template>
        </el-table-column>
        <el-table-column
          label="选手名称">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分组">
          <template slot-scope="{row}">
          	<div v-show="false">
          		{{ groupTemp = getGroup(row.activityVoteGroupId)}}
          	</div>
            <span v-if="row.activityVoteGroupId">{{ groupTemp[0].group }}</span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column
          label="投票编号">
          <template slot-scope="{row}">
            <span>{{ row.voteCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="排名"
          width="50">
          <template slot-scope="{row}">
            <span>{{ row.rank }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="虚拟票数"
          width="50">
          <template slot-scope="{row}">
            <span>{{ row.virtualVote }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="票数"
          width="50">
          <template slot-scope="{row}">
            <span>{{ row.ticketsNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="{row}">
            <span>{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="{row}">
            <span>{{ parseTime(row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleHide(scope.$index, scope.row)">下架</el-button>
            <el-button
              size="mini"
              type="text"
              @click="goHandleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              style="color: #F56C6C"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.offset" :limit.sync="listQuery.limit" @pagination="getList" />
  </el-row>
  <el-dialog 
      title="编辑选手"
      width="680px"
      :visible.sync="handleEditVisible"
      :modal-append-to-body="false"
      :append-to-body="true">
      <el-form ref="voteItemForm" :rules="rules" :model="editItem" label-width="100px" size="small">
      	<div v-show="false">{{ isVideo = isAssetTypeAnVideo(editItem.cover) }}</div>
      	<el-form-item label="选手">
          <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="(res,file)=>{return handleDataSuccess(res,file, index)}"
            :before-upload="beforeUpload"
            style="margin-right: 15px;">
            <img v-if="editItem.cover && !isVideo" :src="editItem.cover + '?imageView2/0/w/120'" class="avatar" style="width: 120px; max-height: 150px;">
            <video v-else-if="editItem.cover && isVideo" controls width="120">
              <source :src="editItem.cover">
              Sorry, your browser doesn't support embedded videos.
            </video>
            <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 120px; height: 150px;"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editItem.name" placeholder="选手名称"></el-input>
        </el-form-item>
        <el-form-item label="投票编号">
          <el-input v-model="editItem.voteCode" placeholder="投票编号" disabled></el-input>
        </el-form-item>
        <el-form-item label="虚拟投票数">
          <el-input v-model="editItem.virtualVote" placeholder="虚拟投票数"></el-input>
        </el-form-item>
        <el-form-item label="分组">
          <el-select v-model="editItem.activityVoteGroupId" disabled  placeholder="全部">
		        <el-option v-for="(item, index) in groupNames" :key="item.id" :label="item.group" :value="item.id" />
		      </el-select>
        </el-form-item>
        <el-form-item label="详情">
          <span>待开发</span>
        </el-form-item>
        <el-form-item label="更新时间">
          <span>{{parseTime(editItem.updatedAt)}}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{parseTime(editItem.createdAt)}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="voteItemSave">确 定</el-button>
      </div>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import { queryOrderVoteByVoteGroupId, updateOrderVoteBy, voteHideByOrderVoteId } from '@/api/activity'
import Pagination from '@/components/Pagination/pagination2' // secondary package based on el-pagination、
import { parseTime, isAssetTypeAnVideo } from '@/utils'
import { getToken } from '@/api/qiniu'

export default {
  components: { Pagination },
  data() {
    return {
    	groupNames: [],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
      	activityId: '',
        offset: 0,
        limit: 10,
        search: '',
        orderBy: 1,  // 1 按创建时间排序 2 按得票最多排序
        voteGroupId: ''
      },
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券',  '-1': '团购' },
      handleEditVisible: false,
      editItem: {cover: ''},
      rules: {},
      dataObj: { token: '', key: '' },
    }
  },
  created() {
  	this.fetchToken()
  	this.listQuery.activityId = this.$route.params && this.$route.params.id
  	this.groupNames = JSON.parse(decodeURIComponent(this.$route.query && this.$route.query.groupNames))
  	console.log(this.groupNames)
    this.getList()
  },
  mounted(){
  },
  methods: {
  	fetchToken() {
      const _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const token = response.data
          _self._data.dataObj.token = token
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    beforeUpload(file) {
      let suffix = file.name
      let type = this.getAssetType(suffix)
      let filename = 'ttz_' + (new Date()).getTime() + '.' + type
      let key = encodeURI(`${filename}`)
      this.dataObj.key = key
      // const isJPG = file.type === 'image/jpeg'
      const isLt200M = file.size / 1024 / 1024 < 200
      if (!isLt200M) {
        this.$message.error('上传图片大小不能超过 200MB!')
      }
      return isLt200M
    },
    handleDataSuccess(res, file,index) {
      this.editItem.cover = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    getList() {
      this.listLoading = true
      queryOrderVoteByVoteGroupId(this.listQuery).then(response => {
      	response.data.offset = Math.ceil(response.data.total / this.listQuery.limit)
      	response.data.limit = this.listQuery.limit
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getGroup(val) {
    	return this.groupNames.filter(item => item.id == val)
    },
    handleFilter() {
      this.listQuery.offset = 0
      this.getList()
    },
    goHandleEdit(index, row) {
    	this.editItem = Object.assign({}, row)
    	this.handleEditVisible = true
    },
    voteItemSave() {
    	updateOrderVoteBy(this.editItem).then(res => {
        if (res.code * 1 === 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          setTimeout(() => {
            this.handleEditVisible = false
          }, 1.5 * 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    parseTime(time) {
      return parseTime(time)
    },
    isAssetTypeAnVideo(name) {
      return isAssetTypeAnVideo(name)
    },
    handleHide(index, row) {
    	voteHideByOrderVoteId(row.id).then(res => {
        if (res.code * 1 === 200) {
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    handleDelete(index, row) {
    	alert("待开发")
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
