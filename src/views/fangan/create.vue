<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/fangan/create/'}">添加方案</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="schemeForm" label-width="100px" size="small">
        <el-form-item label="封面">
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
            <img v-if="schemeForm.bannerImg" :src="schemeForm.bannerImg" class="avatar1">
            <i  v-else class="el-icon-plus avatar-uploader-icon1"></i>
          </el-upload>
          <el-dialog
            :visible.sync="dialogVisible1"
            :modal-append-to-body="false"
            :append-to-body="true">
            <img width="100%" :src="schemeForm.bannerImg" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="schemeForm.title" placeholder="方案标题"></el-input>
        </el-form-item>
        <el-form-item label="标签">
           <el-select
            v-model="schemeForm.label"
            popper-class="hiddenDown"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入方案标签"
            style="width: 600px">
            <el-option
              v-for="item in labelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="tips" style="font-size: 13px; color: #999">回车确认输入</div>
        </el-form-item>
        <el-form-item label="介绍">
          <Tinymce ref="editor1" v-model="schemeForm.explain" :height="240" :toolbar="['']" menubar="false" :hasUpload="true" />
        </el-form-item>
        <el-form-item label="活动海报">
          <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader2"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="handleSuccess2"
            :on-preview="handlePicturePreview2"
            :on-remove="handleRemove2"
            :before-upload="beforeUpload">
            <img v-if="schemeForm.poster" :src="schemeForm.poster" class="avatar2">
            <i  v-else class="el-icon-plus avatar-uploader-icon1"></i>
          </el-upload>
          <el-dialog
            :visible.sync="dialogVisible2"
            :modal-append-to-body="false"
            :append-to-body="true">
            <img width="100%" :src="schemeForm.poster" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="活动">
          <el-select v-model="schemeForm.activityId" placeholder="请选择活动" style="width: 100%"  popper-class="paginationSelect h-600" @change="activityChange">
            
            <div >
              <el-option
              v-if="activityList.length > 0"
              v-for="item in activityList" :key="item.id" :label="item.id + '-'  + activityTypesName[item.type] +  '-'  + item.title" :value="item.id">
                <span class="label-id">{{ item.id }}</span>-

                <span class="label-type">{{ activityTypesName[item.type] }}</span>-
                <span class="label-title">{{ item.title }}</span>
                <span v-if="item.merchant"> - ({{ item.merchant.name }})</span>
              </el-option>
              <pagination v-show="activityTotal>0" :total="activityTotal" :page.sync="activityListQuery.current" :limit.sync="activityListQuery.size" @pagination="getActivitys"
              :autoScroll="false" />
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="schemeForm.type" placeholder="请选择活动类型">
            <el-option v-for="item in activityTypes" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="顾问" prop="adviserId" >
          <el-select v-model="schemeForm.adviserId" placeholder="请选择顾问" style="width: 100%" popper-class="paginationSelect" >
            <div v-loading="adviserListLoading">
              <el-option v-if="adviserList.length > 0" v-for="item in adviserList" :key="item.id" :label="item.id + '-'  + item.name" :value="item.id">
                <span class="label-id">{{ item.id }}</span>-
                <span class="label-avatar"><img :src="item.icon" style="width: 24px;height: 24px; vertical-align: middle;"></span>-
                <span class="label-title">{{ item.name }}</span>
              </el-option>
              <pagination v-show="adviserTotal>0" :total="adviserTotal" :page.sync="adviserListQuery.offset" :limit.sync="adviserListQuery.limit" @pagination="getAdvisers" />
              </div>
          </el-select>
        </el-form-item>

        <el-form-item label="行业">
          <el-select v-model="schemeForm.industryType" placeholder="请选择行业" filterable allow-create>
            <el-option v-for="(value, key, index) in industryTypeName" :key="value" :label="value" :value="key * 1" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员门槛">
          <el-select v-model="schemeForm.vipLevel" placeholder="请选择会员等级">
            <el-option v-for="item in vipLevels" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="真实领取量">
          <el-input v-model="schemeForm.receive" :disabled="true" type="number"></el-input>
        </el-form-item>
        <el-form-item label="虚拟领取量">
          <el-input v-model="schemeForm.virtualReceive" type="number"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model="schemeForm.weight"></el-input>
          <div class="tips" style="font-size: 13px; color: #999">数值越大，排序越靠前</div>
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
import { addActivityScheme, getActivitys, fetchPageAdvisers } from '@/api/activity'
import { getToken } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination


export default {
  name: 'CreateScheme',
  components: { Tinymce, Pagination },
  data() {
    return {
      schemeForm: {
        activityId: '', // 活动
        poster: '', // 活动海报
        adviserId: '', // 活动顾问
        title: '', // 方案标题
        bannerImg: '', // 封面图
        industryType: '', // 行业
        type: '',
        explain: '', // 介绍
        receive: 0, // 领取量
        virtualReceive: 0, // 虚拟领取
        vipLevel: 0, // 会员门槛
        isRecommend: 0,
        label: '',
        weight: 0
      },
      activityTypes: [{ key: 1, label: '报名' }, { key: 2, label: '抽奖' }, { key: 3, label: '海报' }, { key: 4, label: '砍价' }, { key: 5, label: '秒杀' }, { key: 6, label: '拼团' }, { key: 7, label: '投票' }, { key: 8, label: '预约' }, { key: 9, label: '助力' }, { key: 10, label: '代金券' }, { key: 11, label: '折扣券' }, { key: 12, label: '兑换券' }, { key: 13, label: '体验券' }, { key: -1, label: '团购' }],
      activityTypesName: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券',  '-1': '团购' },
      industrys: { 1: '教育/培训' ,  2: '丽人/美发' ,  3: '亲子/乐园', 4: '运动健身', 5: '休闲/玩乐', 6: '美容/SPA', 7: '嬌纱/摄影', 8: '家居/装修', 9: '生活服务', 10: '餐饮美食', 11: '母婴', 12: '洗车', 13: '服装' },
      industryTypeName: {
        1: '教育培训', 2: '餐饮美食', 3: '美容SPA', 4: '生活娱乐', 5: '运动健身', 6: '知识付费', 7: '电商团购'
      },
      vipLevels: [{ key: 0, label: '免费会员' }, { key: 2, label: 'VIP会员' }],
      rules: {
        title: [
          { required: true, message: '请输入方案标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择一个活动类型', trigger: 'change' }
        ],
        industryType: [
          { required: true, message: '请选择一个行业', trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      labelOptions: [],
      dataObj: { token: '' },
      activityListQuery: {
        current: 1,
        size: 10
      },
      activityListFilter: {
        title: '',
        type: ''
      },
      activityList: [],
      activityTotal: 0,
      adviserList: [],
      adviserTotal: 0,
      adviserListQuery: {
        offset: 0,
        limit: 10
      },
      adviserListLoading: true
    }
  },
  created() {
    this.fetchToken()
    this.getActivitys()
    this.getAdvisers()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      addActivityScheme(this.schemeForm).then(res => {
        if (res.code * 1 == 200) {
          this.$message({
            message: '创建方案成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: '/fangan/index' });
          }, 1.5 * 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    getActivitys() {
      getActivitys(this.activityListQuery, this.activityListFilter).then(response => {
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
        this.activityTotal = response.data.total
      })
    },
    getAdvisers() {
      this.tutorListLoading = true
      fetchPageAdvisers(this.adviserListQuery).then(response => {
        this.adviserList = response.data.records
        this.adviserTotal = response.data.total
        this.adviserListLoading = false
      })
    },
    handleActivityFilter() {
      this.activityListQuery.current = 1
      this.getActivitys()
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
      this.schemeForm.imgUrl = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview() {
      this.dialogVisible = true;
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess1(res, file) {
      this.schemeForm.bannerImg = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview1() {
      this.dialogVisible1 = true
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess2(res, file) {
      this.schemeForm.poster = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handlePicturePreview2() {
      this.dialogVisible2 = true
    },
    activityChange(val) {
      let activity = this.activityList.filter(item => item.id == val)[0]
      this.$set(this.schemeForm, 'type', activity.type)
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
  .avatar2 {
    max-width: 500px;
    max-height: 600px;
    display: block;
  }
</style>

<style type="scss" scoped>
  .paginationSelect {
    .el-select-dropdown__wrap {
      max-height: 500px;
      height: 500px;
    }
    .el-select-dropdown__list {
      padding-top: 30px;
    }
    .el-select-dropdown__item {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .label-item {
    display: inline-block;
    line-height: 32px;
  }

</style>
<style type="scss">
  .paginationSelect {
    .el-select-dropdown__wrap {
      max-height: 500px;
      height: 500px;
    }
    .el-select-dropdown__list {
      padding-top: 30px;
    }
    .el-select-dropdown__item {
      border-bottom: 1px solid #f5f5f5;
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
  .avatar-uploader2 .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .hiddenDown {
    display: none
  }
  .paginationSelect .el-select-dropdown__wrap {
      max-height: 500px;
      height: 500px;
    }
</style>
