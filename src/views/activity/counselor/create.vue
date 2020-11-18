<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/fangan/counselor/index'}">列表</el-menu-item>
      <el-menu-item index="2" :route="{path:'/fangan/counselor/create'}">添加顾问</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="counselorForm" label-width="100px" size="small">
        <el-form-item label="头像" prop="icon">
          <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-preview="handlePicturePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload">
            <img v-if="counselorForm.icon" :src="counselorForm.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="counselorForm.name"></el-input>
        </el-form-item>
        <el-form-item label="二维码" prop="qrCode">
          <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="handleSuccess1"
            :on-preview="handlePicturePreview1"
            :on-remove="handleRemove1"
            :before-upload="beforeUpload">
            <img v-if="counselorForm.qrCode" :src="counselorForm.qrCode" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="问候语" prop="greeting">
          <el-input v-model="counselorForm.greeting" maxlength="" type="textarea" :rows="2" placeholder="问候语"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import { addOrUpdateAdvisers } from '@/api/activity'
import { getToken } from '@/api/qiniu'

export default {
  name: 'CreateAdviser',
  components: {  },
  data() {
    return {
      counselorForm: {
        greeting: '',
        name: '',
        icon: '',
        qrCode: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ],
        qrCode: [
          { required: true, message: '请上传二维码', trigger: 'change' }
        ]
      },
      dataObj: { token: '' },
      loading: false
    }
  },
  created() {
    this.fetchToken()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          addOrUpdateAdvisers(this.counselorForm).then(res => {
            if (res.code * 1 == 200) {
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push({ path: '/fangan/counselor/index' });
              }, 1.5 * 1000)
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log('submit!')
      //let _counselorForm = JSON.parse(JSON.stringify(this.counselorForm))
      
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess(res, file) {
      this.counselorForm.icon = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview() {
      console.log();
    },
    handleSuccess1(res, file) {
      this.counselorForm.qrCode = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview1() {
      console.log();
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList)
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
