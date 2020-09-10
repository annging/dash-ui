<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/platform/music/'}">音乐列表</el-menu-item>
      </el-menu>
      <el-row type="flex" class="filter-container" style="margin-bottom: 20px;">  
        <el-button type="primary" size="small" style="min-width: 120px;" icon="el-icon-circle-plus-outline" @click="goCreate">添加音乐</el-button>
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

        <el-dialog
          :title="textMap[dialogStatus]"
          :visible.sync="dialogFormVisible"
          :modal-append-to-body="false"
          :append-to-body="true">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
            <el-form-item label="名称" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
            <el-form-item label="分类" placeholder="请选择一级和二级分类" prop="firstClass">
              <el-cascader
                v-model="valueClass"
                :options="optionsClass"
                @change="handleClassChange"
                placeholder="请选择"></el-cascader>
            </el-form-item>
            <el-form-item label="url" prop="url">
              <el-input v-model="temp.url" />
              <el-upload
                :data="dataObj"
                :multiple="false"
                class="avatar-uploader"
                action="http://upload-z2.qiniup.com"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div slot="tip" class="el-upload__tip">只能上传MP3文件</div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
              确认
            </el-button>
          </div>
        </el-dialog>
      </el-row>
    </div>
    <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import { fetchMusicList, saveOrUpdate, deleteMusic } from '@/api/platform'
import { getToken } from '@/api/qiniu'
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
      clientHeight: '',
      maxHeight: 400,
      temp: {
        id: '',
        merchantId: 0,
        name: '',
        firstClass: '',
        secondClass: '',
        url: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        url: [{ required: true, message: 'type is required', trigger: 'change' }],
        firstClass: [{ required: true, message: 'firstClass is required', trigger: 'change' }],
        name: [{ required: true, message: '音乐名称不能为空', trigger: 'blur' }]
      },
      valueClass: [],
      optionsClass: [{
        value: '通用',
        label: '通用',
        children: [{
          value: '大气',
          label: '大气'
        }, {
          value: '轻快',
          label: '轻快'
        }]
      }, {
        value: '儿童',
        label: '儿童',
        children: [{
          value: '儿童',
          label: '儿童'
        }]
      }, {
        value: '节日',
        label: '节日',
        children: [{
          value: '节日',
          label: '节日'
        }]
      }, {
        value: '商务',
        label: '商务',
        children: [{
          value: '商务',
          label: '商务'
        }]
      }],
      dataObj: { token: '' }
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
    this.fetchToken()
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
      fetchMusicList(this.listQuery).then(response => {
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
    resetTemp() {
      this.temp = {
        id: '',
        merchantId: 0,
        name: '',
        firstClass: '',
        secondClass: '',
        url: ''
      }
    },
    goCreate() {
      this.resetTemp()
      this.valueClass = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      let that = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          saveOrUpdate(tempData).then(() => {
            this.dialogFormVisible = false
            this.$message({
              message: '成功',
              type: 'success',
              duration: 2000,
              onClose: function() {
                that.listQuery.current = 1
                that.getList()
              }
            })
          })
        }
      })
    },
    handleEdit(index, row) {
      this.temp = Object.assign({}, row) // copy obj
      this.valueClass = []
      this.valueClass.push(this.temp.firstClass)
      this.valueClass.push(this.temp.secondClass)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          saveOrUpdate(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDetele(index, row) {
      this.$confirm('确认删除音乐?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMusic({ musicId: row.id}).then(res => {
          if (res.code * 1 === 200 ) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.list.splice(index, 1);
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
        });          
      });
    },
    handleClassChange(value) {
      this.temp.firstClass = value[0]
      this.temp.secondClass = value[1]
    },
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
    },
    handleSuccess(res, file) {
      this.temp.url = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key;
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
