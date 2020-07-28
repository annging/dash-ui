<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="5" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/merchant/index'}">商家列表</el-menu-item>
      <el-menu-item index="2" :route="{path:'/merchant/dailingqu'}">待领取商家</el-menu-item>
      <el-menu-item index="3" :route="{path:'/merchant/paid'}">付费商家</el-menu-item>
      <el-menu-item index="4" :route="{path:'/merchant/recommend'}">推荐商家</el-menu-item>
      <el-menu-item index="5" :route="{path:'/merchant/create'}">添加商家</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="merchantForm" :rules="rules" :model="merchantForm" label-width="100px" size="small">
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="merchantForm.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" prop="logo">
          <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="(res,file)=>{return handleDataSuccess(res,file,'logo')}"
            :on-remove="handleRemove"
            :before-upload="beforeUpload">
            <img v-if="merchantForm.logo" :src="merchantForm.logo" class="avatar">
            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">（尺寸为110*100最佳）</div>
          </el-upload>
          <!--<el-dialog
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true">
            <img width="100%" :src="merchantForm.wxImg" alt="">
          </el-dialog>-->
        </el-form-item>
        <el-form-item label="品牌简介" >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="品牌简介"
            v-model="merchantForm.intro">
          </el-input>
        </el-form-item>
        <el-form-item label="品牌相册" prop="introImgs">
          <div>{{ merchantForm.introImgs.length }}/9</div>
          <el-upload
            ref="upload"
            :data="dataObj"
            multiple
            :limit="9"
            list-type="picture-card"
            :file-list="fileList"
            action="http://upload-z2.qiniup.com"
            :on-success="handleSuccess_IntroImgs"
            :on-remove="handleRemove_IntroImgs"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :on-exceed="handleExceed">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">（尺寸为254*144最佳,最多9张）</div>
          </el-upload>
          <!--<el-button size="mini" type="primary" @click="subPics">立即上传</el-button>-->
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <div style="display: flex; margin-bottom: 8px;" v-for="(item, index) in merchantForm.phone" :key="index">
            <el-input v-model="item.content" ></el-input><el-button size="mini" @click.prevent="removePhone(item, index)">删除</el-button>
          </div>
          <el-button size="mini" @click.prevent="addPhone()">+添加</el-button>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="merchantForm.wechat"></el-input>
        </el-form-item>
        <el-form-item label="所在地址">
          <el-input :value="(merchantForm.address.province === merchantForm.address.city ? '' : merchantForm.address.province) + merchantForm.address.city + merchantForm.address.distinct + merchantForm.address.detail">
            <el-button slot="append" icon="el-icon-location-outline" @click.prevent="getLocation()"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="merchantForm.address.tips"></el-input>
        </el-form-item>
        <el-form-item label="宣传片">
          <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader"
            action="http://upload-z2.qiniup.com"
            :on-success="handleSuccess_introVideo"
            :on-remove="handleRemove_introVideo"
            :before-upload="beforeUpload_introVideo">
            <video v-if="merchantForm.introVideo" controls width="500" class="avatar2">
              <source :src="merchantForm.introVideo">
              Sorry, your browser doesn't support embedded videos.
            </video>
            <i  v-else class="el-icon-plus avatar-uploader-icon2"></i>
            <div slot="tip" class="el-upload__tip">（尺寸为720*416最佳）</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="团队展示">
          <div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in merchantForm.teamIntros" :key="index">
            <el-upload
              :data="dataObj"
              :multiple="false"
              class="avatar-uploader"
              action="http://upload-z2.qiniup.com"
              :show-file-list="false"
              :on-success="(res,file)=>{return handleDataSuccess(res,file,'teamIntros', index, 'img')}"
              :before-upload="beforeUpload">
              <img v-if="item.img" :src="item.img" class="avatar" style="width: 90px; height: 90px;">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 90px; height: 90px; line-height: 90px;"></i>
            </el-upload>
            <div style="margin: 0 10px; width: 500px;">
              <el-input v-model="item.name" style="margin-bottom: 5px;"></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="简介"
                v-model="item.intro">
              </el-input>
            </div>
            <el-button size="mini" @click.prevent="removeTeam(item, index)">删除</el-button>
          </div>
          <el-button size="mini" @click.prevent="addTeam()">+添加</el-button>
        </el-form-item>
        <el-form-item label="作品简介">
          <div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in merchantForm.productIntros" :key="index">
            <el-upload
              :data="dataObj"
              :multiple="false"
              class="avatar-uploader"
              action="http://upload-z2.qiniup.com"
              :show-file-list="false"
              :on-success="(res,file)=>{return handleDataSuccess(res,file,'productIntros', index, 'img')}"
              :before-upload="beforeUpload">
              <img v-if="item.img" :src="item.img" class="avatar" style="width: 90px; height: 90px;">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 90px; height: 90px; line-height: 90px;"></i>
            </el-upload>
            <div style="margin: 0 10px; width: 500px;">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="作品简介"
                v-model="item.intro">
              </el-input>
            </div>
            <el-button size="mini" @click.prevent="removeProduct(item, index)">删除</el-button>
          </div>
          <el-button size="mini" @click.prevent="addProduct()">+添加</el-button>
        </el-form-item>
        <el-form-item label="品牌优势">
          <div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in merchantForm.advantage" :key="index">
            <div style="margin: 0 10px 0 0; width: 610px;">
              <el-input v-model="item.title" style="margin-bottom: 5px;" placeholder="标题"></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="内容"
                v-model="item.content">
              </el-input>
            </div>
            <el-button size="mini" @click.prevent="removeAdvantage(item, index)">删除</el-button>
          </div>
          <el-button size="mini" @click.prevent="addAdvantage()">+添加</el-button>
        </el-form-item>
        <el-form-item label="申请体验">
          <el-switch
            v-model="merchantForm.showApplyTry"
            active-color="#13ce66"
            inactive-color="#808080">
          </el-switch>
          <div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in merchantForm.applyTry" :key="index">
            <div style="margin: 0 10px 0 0; width: 610px;">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="给用户免费体验的内容或赠送礼品（例：免费提供20分钟任意试听课程）"
                v-model="item.content">
              </el-input>
            </div>
            <el-button size="mini" @click.prevent="removeApplyTry(item, index)">删除</el-button>
          </div>
          <el-button size="mini" @click.prevent="addApplyTry()">+添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即提交</el-button>
          <el-button  @click="resetForm('merchantForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-dialog 
      title="地图"
      width="800px"
      :visible.sync="mapDialogTableVisible"
      :modal-append-to-body="false"
      :append-to-body="true">
      <input id="address" type="textbox" v-model="markerDetail.address">
      <button @click.prevent="codeAddress(markerDetail.address)">搜索</button>
      <div id="mapContainer" style="min-height: 400px">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mapDialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="mapDialogTableVisible = false; merchantForm.address = Object.assign({}, markersResult)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import { updateMerchant, fetchMerchant } from '@/api/merchant'
import { getToken, uploadQiniu } from '@/api/qiniu'
import maps from 'qqmap'

const defaultMerchantForm = {
    id: 0,
    name: '', 
    logo: '',
    intro: '',
    introImgs: [],
    phone: [{ content: '15200000000' }],
    wechat: '',
    address: { province: '', city: '', distinct: '', detail: '', tips: '' },
    introVideo: '',
    teamIntros: [{ img: '', name: '', intro: '' }],
    productIntros: [{ img: '', intro: '' }],
    advantage: [{ title: '', content: '' }],
    showApplyTry: false,
    applyTry: [{ content: '' }]
}

const key = 'UUSBZ-O7S3K-US5JP-AY4LI-KQA7K-O2B6S'

export default {
  name: 'MerchantCreate',
  components: { },
  data() {
    return {
      id: '',
      merchantForm: Object.assign({}, defaultMerchantForm),
      fileList: [],
      rules: {
        name: [
          { required: true, message: '品牌名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传品牌Logo', trigger: 'change' }
        ],
        phone: [
          { type: 'array', required: true, message: '请至少输入一个联系电话', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      dialogVisible1: false,
      dataObj: { token: '' },
      map: null,
      geocoder: null,
      mapDialogTableVisible: false,
      markersArray: [],
      markerDetail: {
        address: '北京,海淀区,海淀大街58号',
        latLng: {}
      },
      markersResult: { province: '', city: '', distinct: '', detail: '', tips: '' }
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    if (this.id > 0) {
      this.fetchData()
    }
    this.fetchToken()
  },
  methods: {
    onSubmit() {
      let that = this
      this.$refs.merchantForm.validate((valid) => {
        if (valid) {
          updateMerchant(this.merchantForm).then(res => {
            if (res.code * 1 == 200) {
              this.$message({
                message: this.id > 0 ? '修改成功' : '添加成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/merchant/dailingqu' })
                }
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      console.log('reset')
      this.$refs[formName].resetFields()
    },
    fetchData() {
      fetchMerchant(this.id).then(response => {
        if (response.code === '200') {
          if (response.data) {
            response.data.introImgs = JSON.parse(response.data.introImgs)
            response.data.phone = JSON.parse(response.data.phone)
            response.data.address = JSON.parse(response.data.address)
            response.data.teamIntros = JSON.parse(response.data.teamIntros)
            response.data.productIntros = JSON.parse(response.data.productIntros)
            response.data.advantage = JSON.parse(response.data.advantage)
            response.data.applyTry = JSON.parse(response.data.applyTry)
            for( var key in this.merchantForm ){
                this.merchantForm[key] = response.data[key]
            }
            this.merchantForm.introImgs.forEach((item, index) => {
              let m = {name: '', uid: index, url: item, status: 'success'}
              this.fileList.push(m)
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
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
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    beforeUpload_introVideo(file) {
      console.log('')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleRemove_IntroImgs(file, fileList) {
      let url = ''
      if(file.response) {
        url = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + file.response.key
      } else {
        url = file.url
      }
      let index = this.merchantForm.introImgs.indexOf(url)
      if (index > -1) {
        this.merchantForm.introImgs.splice(index, 1)
      }
    },
    handleRemove_introVideo(file, fileList) {
      this.merchantForm.introVideo = ''
    },
    handleSuccess_IntroImgs(res, file) {
      this.merchantForm.introImgs.push('http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key)
    },
    handleSuccess_introVideo(res, file) {
      this.merchantForm.introVideo = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handleDataSuccess(res, file, type, index, field) {
      if (index > -1) {
        this.merchantForm[type][index][field] = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
      } else {
        this.merchantForm[type] = 'http://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    subPics() {
      this.$refs.upload.submit()
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多传9张，加上此次选取的 ${files.length} 张图片, 总共 ${files.length + fileList.length}`)
    },
    removePhone(item, index) {
      this.merchantForm.phone.splice(index,1)
    },
    addPhone(){
      this.merchantForm.phone.push({content:''});
    },
    removeTeam(item, index) {
      this.merchantForm.teamIntros.splice(index,1)
    },
    addTeam(){
      this.merchantForm.teamIntros.push({ img: '', name: '', intro: '' });
    },
    removeProduct(item, index) {
      this.merchantForm.productIntros.splice(index,1)
    },
    addProduct(){
      this.merchantForm.productIntros.push({ img: '', intro: '' });
    },
    removeAdvantage(item, index) {
      this.merchantForm.advantage.splice(index,1)
    },
    addAdvantage(){
      this.merchantForm.advantage.push({ title: '', content: '' });
    },
    removeApplyTry(item, index) {
      this.merchantForm.applyTry.splice(index,1)
    },
    addApplyTry(){
      this.merchantForm.applyTry.push({ content: '' });
    },
    initMap() {
      let that = this
      maps.init(key, () => {
        var myLatlng = new qq.maps.LatLng(39.916527,116.397128)
        var  myOptions = {
          zoom: 8,
          center: myLatlng,
          mapTypeId: qq.maps.MapTypeId.ROADMAP
        }
        this.map = new qq.maps.Map(
          document.getElementById("mapContainer"),
          myOptions
        )
        qq.maps.event.addDomListener(this.map, 'click', function(event) {
          that.deleteOverlays()
          that.addMarker(event.latLng)
          that.codeLatLng(event.latLng)
        })
        var info = new qq.maps.InfoWindow({
          map: this.map
        })
        this.geocoder = new qq.maps.Geocoder()
        this.geocoder.setComplete(function(result) {
          console.log(result)
          that.deleteOverlays()
          that.map.setCenter(result.detail.location)
          var marker = that.addMarker(result.detail.location)
          that.markersResult.province = result.detail.addressComponents.province || ''
          that.markersResult.city = result.detail.addressComponents.city || ''
          that.markersResult.distinct = result.detail.addressComponents.distinct || ''
          that.markersResult.detail = (result.detail.addressComponents.town || '') + (result.detail.addressComponents.village || '') + (result.detail.addressComponents.street || '') + (result.detail.addressComponents.streetNumber || '')
          that.markerDetail.address = result.detail.address
          that.markerDetail.latLng = result.detail.location
          qq.maps.event.addListener(marker, 'click', function() {
            info.open()
            info.setContent('<div style="width:280px;height:100px;">' + result.detail.address + '<br />' + '(' + result.detail.location + ')' + '</div>')
            info.setPosition(result.detail.location)
          })
        })

        this.geocoder.setError(function() {
          alert("出错了，请输入正确的地址！！！");
        })
      })
    },
    clearOverlays() {
      if (this.markersArray) {
        for (i in this.markersArray) {
          this.markersArray[i].setMap(null)
        }
      }
    },
    deleteOverlays() {
      console.log('deleteOverlays')
      if (this.markersArray) {
        for (let i in this.markersArray) {
          this.markersArray[i].setMap(null)
        }
        this.markersArray = []
      }
    },
    addMarker(location) {
      var marker = new qq.maps.Marker({
        position: location,
        map: this.map
      })
      this.markersArray.push(marker)
      return marker
    },
    codeAddress(address) {
      this.geocoder.getLocation(address)
    },
    codeLatLng(latLng) {
      this.geocoder.getAddress(latLng)
    },
    getLocation() {
      this.mapDialogTableVisible = true
      this.initMap()
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
    max-width: 300px;
    // height: 178px;
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
  .avatar-uploader-icon2 {
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 208px;
    line-height: 200px;
    text-align: center;
  }
  .avatar2 {
    width: 360px;
    height: 208px;
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
