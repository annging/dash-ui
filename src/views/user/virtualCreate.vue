<template>
  <div class="main-content">
    <div class="left-container">
      <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item index="1" :route="{path:'/user/virtualcreate'}">添加虚拟用户</el-menu-item>
      </el-menu>
      <el-row>
        <el-form ref="form" label-width="100px" size="small">
          <el-form-item label="昵称">
            <el-input v-model="nickName" disabled></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="http://47.107.137.16:8090/system/user/batchAddVirtualUser"
              multiple
              :auto-upload="false"
              :headers="dataObj"
              :file-list="fileList"
              list-type="picture-card"
              :before-upload="beforeUpload"
              :on-change="handleChange">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subPicForm">立即上传</el-button>
            <el-button @click="cancle">取消</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <!--<div class="secondary-sidebar"></div>-->
  </div>
</template>

<script>
import { batchAddVirtualUser } from '@/api/user'
import { getToken } from '@/utils/auth'

export default {
  name: 'VirtualUserCreate',
  data() {
    return {
      nickName: '随机生成',
      fileList: [],
      dataObj: { token: getToken() }
    }
  },
  methods: {
    /* onSubmit() {
      console.log('submit!')
      batchAddVirtualUser(this.file).then(res => {
        if (res.code * 1 == 200) {
          this.$message({
            message: '导入虚拟用户成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: '/user/virtual' });
          }, 1.5 * 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    }, */
    uploadFile(file) {
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    subPicForm() {
      // this.$refs.upload.submit()
      let formData = new FormData() // 用FormData存放上传文件
      this.fileList.forEach(file => {
        if (file.status === 'ready') {
          formData.append('file', file.raw)
        }
      })
      batchAddVirtualUser(formData).then(res => {
        console.log(res)
        if (res.code === '200') {
          this.$message({
            message: res.data,
            type: 'success'
          })
          this.fileList.forEach(file => {
            file.status = 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        console.log(res)
      })
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isLt20M
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
    cancle() {
      this.$router.push({ path: '/user/virtual' })
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

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader-icon1 {
    font-size: 28px;
    color: #8c939d;
    width: 350px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar1 {
    width: 350px;
    height: 200px;
    display: block;
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
