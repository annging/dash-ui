<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/school/article/index'}">文章列表</el-menu-item>
      <el-menu-item index="2" :route="{path:'/school/article/create'}">添加文章</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="articleForm" label-width="100px" size="small">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="封面图">
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
            <img v-if="articleForm.cover" :src="articleForm.cover" class="avatar">
            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="导师" prop="">
          <el-select v-model="articleForm.teacherId" placeholder="请选择导师" style="width: 100%" popper-class="paginationSelect" >
            <el-option :key="1" label="导师1" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <Tinymce ref="editor1" v-model="articleForm.content" :height="300" menubar="false" />
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model="articleForm.weight"></el-input>
          <div class="tips" style="font-size: 13px; color: #999">数值越大，排序越靠前</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import { addArticle } from '@/api/mSchool'
import { getToken } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'CreateArticle',
  components: { Tinymce },
  data() {
    return {
      articleForm: {
        title: '',
        cover: '',
        teacherId: '',
        content: '',
        weight: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传封面图', trigger: 'change' }
        ]
      },
      dataObj: { token: '' }
    }
  },
  created() {
    this.fetchToken()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      addArticle(this.articleForm).then(res => {
        if (res.code * 1 == 200) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: '/content/mSchool/index' });
          }, 1.5 * 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
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
      this.articleForm.cover = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview() {
      this.dialogVisible = true;
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList)
    },
    handlePicturePreview1() {
      this.dialogVisible1 = true
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
