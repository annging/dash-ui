<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/activity/fangan/edit/' + id }">编辑方案</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="schemeForm" label-width="100px" size="small">
        <el-form-item label="方案标题">
          <el-input v-model="schemeForm.title"></el-input>
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
            <img v-if="schemeForm.imgUrl" :src="schemeForm.imgUrl" class="avatar">
            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true">
            <img width="100%" :src="schemeForm.imgUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="标签">
           <el-select
            v-model="schemeForm.label"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择方案标签">
            <el-option
              v-for="item in labelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方案介绍">
           <el-input type="textarea" autosize v-model="schemeForm.explain"></el-input>
        </el-form-item>
        <el-form-item label="功能亮点">
           <el-input type="textarea" autosize v-model="schemeForm.lightSpot"></el-input>
        </el-form-item>
        <el-form-item label="营销玩法">
           <el-input type="textarea" autosize v-model="schemeForm.gameplay"></el-input>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="schemeForm.type" placeholder="请选择活动类型">
            <el-option v-for="item in activityTypes" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动行业">
          <el-select v-model="schemeForm.industry" placeholder="请选择行业">
            <el-option v-for="(value, key, index) in industrys" :key="key" :label="value" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员门槛">
          <el-select v-model="schemeForm.vipLevel" placeholder="请选择会员等级">
            <el-option v-for="item in vipLevels" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="虚拟浏览量">
          <el-input v-model="schemeForm.browse"></el-input>
        </el-form-item>
        <el-form-item label="虚拟参与量">
          <el-input v-model="schemeForm.receive"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-switch
            v-model="schemeForm.isRecommend"
            active-color="#13ce66"
            :active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import { fetchScheme, updateActivityScheme } from '@/api/activity'
import { getToken } from '@/api/qiniu'

const defaultForm = {
    title: '', //方案标题
    imgUrl: '',
    type: '',
    industry: '',
    explain: '',
    lightSpot: '',
    gameplay: '',
    browse: 0,
    receive: 0,
    vipLevel: '',
    isRecommend: 0,
    label: '',
    id: ''
}

export default {
  name: 'UpdataScheme',
  data() {
    return {
      id: '',
      schemeForm: Object.assign({}, defaultForm),
      activityTypes: [{ key: 1, label: '报名' }, { key: 2, label: '抽奖' }, { key: 3, label: '海报' }, { key: 4, label: '砍价' }, { key: 5, label: '秒杀' }, { key: 6, label: '拼团' }, { key: 7, label: '投票' }, { key: 8, label: '预约' }, { key: 9, label: '助力' }, { key: 10, label: '代金券' }, { key: 11, label: '折扣券' }, { key: 12, label: '兑换券' }, { key: 13, label: '体验券' }],
      industrys: { 1: '教育' ,  2: '体育' ,  3: '珠宝', 4: '汽车', 5: '批发零售业', 6: '制造业', 7: '建筑装修', 8: '交通运输', 9: '住宿和餐饮业', 10: '金融', 11: '房产' },
      vipLevels: [{ key: 1, label: '普通会员' }],
      rules: {
        title: [
          { required: true, message: '请输入方案标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择一个活动类型', trigger: 'change' }
        ],
        industry: [
          { required: true, message: '请选择一个行业', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写方案介绍', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传封面图', trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      labelOptions: [{
        value: '老带新',
        label: '老带新'
      }, {
        value: '裂变',
        label: '裂变'
      }],
      listLoading: false,
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
      this.listLoading = true
      fetchScheme(this.id).then(response => {
        this.schemeForm = response.data
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('submit!');
      updateActivityScheme(this.schemeForm).then(res => {
        if (res.code * 1 == 200) {
          this.$message({
            message: '编辑方案成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: '/activity/fangan/index' });
          }, 1.5 * 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
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
      console.log(file, fileList);
    },
    handleSuccess(res, file) {
      this.schemeForm.imgUrl = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key;
    },
    handlePicturePreview() {
      this.dialogVisible = true;
    },
    cancel() {
      this.$router.push({ path: '/activity/fangan/index' });
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
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
</style>
