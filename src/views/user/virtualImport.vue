<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/user/virtualimport'}">导入虚拟用户</el-menu-item>
    </el-menu>
    <el-row type="flex" class="filter-container" style="margin-bottom: 20px;">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <div class="tips">
        <p><img src="@/assets/virtualexample.png"></p>
        <p>支持的文件格式 .xlsx, .xls, .csv</p>
        <p><a href="https://ttz-user-file.qiniu.tuantuanzhan.cn/dash/virtualexample20200706.xlsx" target="_blank">下载示例文件</a></p>
      </div>
    </el-row>
    <el-row>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import UploadExcelComponent from './components/UploadExcel'

export default {
  name: 'virtualUserImport',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  created() {
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({results, header }) {
      this.tableData = results
      this.tableHeader = header
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
  .tips {
    margin-left: 20px;
    font-size: 11px;
    img {
      width: 400px;
    }
    a {
      text-decoration: underline;
    }
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .hiddenDown {
    display: none
  }
</style>
