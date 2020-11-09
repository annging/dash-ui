<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/activity/counselor/index'}">列表</el-menu-item>
      <el-menu-item index="2" :route="{path:'/activity/counselor/edit/' + id}">编辑顾问</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="tutorForm" label-width="100px" size="small">
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
            <img v-if="tutorForm.icon" :src="tutorForm.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="tutorForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签">
           <el-select
            v-model="tutorForm.tags"
            popper-class="hiddenDown"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="回车确认添加标签，可添加多个"
            style="width: 600px">
          </el-select>
          <div class="tips" style="font-size: 13px; color: #999">回车确认添加标签，可添加多个</div>
        </el-form-item>
        <el-form-item label="描述">
          <Tinymce ref="editor1" v-model="tutorForm.des" :height="100" :toolbar="['']" menubar="false" :hasUpload="false" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import { addOrUpdateTutor, getTutor } from '@/api/school'
import { getToken } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'EditTeacher',
  components: { Tinymce },
  data() {
    return {
    	id: '',
      tutorForm: {
      	id: '',
        name: '',
        icon: '',
        des: '',
        tags: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入导师名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传导师头像', trigger: 'change' }
        ]
      },
      dataObj: { token: '' }
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.fetchData()
    this.fetchToken()
  },
  methods: {
  	fetchData() {
      getTutor(this.id).then(response => {
      	response.data.tags = JSON.parse(response.data.tags)
      	Object.keys(this.tutorForm).forEach((key) => {
	        this.tutorForm[key] = response.data[key]
	      })
      })
    },
    onSubmit() {
      console.log('submit!')
      let _tutorForm = Object.assign({}, this.tutorForm)
      _tutorForm.tags = JSON.stringify(_tutorForm.tags)
      addOrUpdateTutor(_tutorForm).then(res => {
        if (res.code * 1 == 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: '/school/teacher/index' });
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
      this.tutorForm.icon = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview() {
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
