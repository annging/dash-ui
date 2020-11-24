<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="3" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/platform/mer/index'}">活动设置(商家使用数量)</el-menu-item>
      <el-menu-item index="2" :route="{path:'/platform/mer/banner/index'}">首页banner</el-menu-item>
      <el-menu-item index="3" :route="{path:'/platform/mer/banner/create'}">添加banner</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="bannerForm" label-width="100px" size="small">
        <el-form-item label="banner" prop="imgUrl">
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
            <img v-if="bannerForm.imgUrl" :src="bannerForm.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="bannerForm.url"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="bannerForm.desc" maxlength="" type="textarea" :rows="2" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="weight">
          <el-input v-model="bannerForm.weight"></el-input>
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
      bannerForm: {
        desc: '',
        url: '',
        imgUrl: '',
        weight: 0
      },
      rules: {
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
          /*addOrUpdateAdvisers(this.bannerForm).then(res => {
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
          })*/
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log('submit!')
      //let _bannerForm = JSON.parse(JSON.stringify(this.bannerForm))
      
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
      this.bannerForm.imgUrl = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview() {
      console.log();
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
    width: 200px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    max-width: 500px;
    max-height: 600px;
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
