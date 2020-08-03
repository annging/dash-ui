<template>
	<div>
		<el-form ref="first" :rules="rules" :model="activity" label-width="100px" size="small">
			<el-form-item label="活动封面" prop="introImgs">
        <div>{{ activity.cover.length }}/5</div>
        <el-upload
          ref="upload"
          :data="dataObj"
          multiple
          :limit="5"
          list-type="picture-card"
          :file-list="fileList"
          action="http://upload-z2.qiniup.com"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :on-exceed="handleExceed">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">（用于活动封面，尺寸为750*400最佳,最多5张）</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动标题" prop="title">
        <el-input v-model="activity.title" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="报名开始" prop="startTime">
      	<el-date-picker
		      v-model="activity.startTime"
		      type="datetime"
		      placeholder="请选择报名开始时间">
		    </el-date-picker>
      </el-form-item>
      <el-form-item label="报名结束" prop="endTime">
      	<el-date-picker
		      v-model="activity.endTime"
		      type="datetime"
		      placeholder="请选择报名结束时间">
		    </el-date-picker>
      </el-form-item>
      <el-form-item label="活动开始/截止时间">
        <el-switch
          v-model="activity.enableActivityTime"
          active-color="#13ce66"
          :active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="活动开始" prop="activityStartTime" v-if="activity.enableActivityTime > 0">
      	<el-date-picker
		      v-model="activity.activityStartTime"
		      type="datetime"
		      placeholder="请选择活动开始时间">
		    </el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束" prop="activityEndTime" v-if="activity.enableActivityTime  > 0">
      	<el-date-picker
		      v-model="activity.activityEndTime"
		      type="datetime"
		      placeholder="请选择活动结束时间">
		    </el-date-picker>
      </el-form-item>
      <el-form-item label="活动地址">
        <el-input :value="(activity.address.province === activity.address.city ? '' : activity.address.province) + activity.address.city + activity.address.distinct + activity.address.detail">
          <el-button slot="append" icon="el-icon-location-outline" @click.prevent="getLocation()"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="详细地址描述">
        <el-input v-model="activity.address.tips"></el-input>
      </el-form-item>
      <el-form-item label="活动详情">
      	<div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in activity.content" :key="index">
          <div style="margin: 0 10px 0 0; width: 610px;">
          	<el-divider content-position="left">{{ contentTypes[item.type] }}</el-divider>
          	<Tinymce v-if="item.type=='text'" ref="editor1" v-model="item.value" :height="150"  :toolbar="toolbar" :menubar="menubar" />
          </div>
          <el-button size="mini" @click.prevent="removeConItem(item, index)">删除</el-button>
        </div>
        <el-button size="mini" @click.prevent="addCon('text')">+添加文字</el-button>
      </el-form-item>
		</el-form>
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
        <el-button type="primary" @click="mapDialogTableVisible = false; activity.address = Object.assign({}, markersResult)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/api/qiniu'
import maps from 'qqmap'
import Tinymce from '@/components/Tinymce'

const key = 'UUSBZ-O7S3K-US5JP-AY4LI-KQA7K-O2B6S'

export default {
	name: 'Apply',
	components: { Tinymce },
	props: {
		activity: {
		  type: Object,
		  default: function() {
        return {}
      }
		}
	},
	data() {
    return {
      toolbar: [''],
      menubar: '',
      // carouselHeight: 400,
      contentTypes: {'bigImg': '大图', 'smallImg': '小图', 'text': '文字', 'video': '视频', 'label': '标签'},
      rules: {
      },
      dataObj: { token: '' },
      fileList: [],
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
    this.fetchToken()
    this.init()
  },
	mounted() {
  },
  methods: {
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
    init() {
    	this.activity.cover.forEach((item, index) => {
        let m = {name: '', uid: index, url: item, status: 'success'}
        this.fileList.push(m)
      })
    },
    handleSuccess(res, file) {
      this.activity.cover.push('https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key)
    },
    handleRemove(file, fileList) {
      let url = ''
      if(file.response) {
        url = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + file.response.key
      } else {
        url = file.url
      }
      let index = this.activity.cover.indexOf(url)
      if (index > -1) {
        this.activity.cover.splice(index, 1)
      }
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多传5张，加上此次选取的 ${files.length} 张图片, 总共 ${files.length + fileList.length}`)
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
    },
    removeConItem(item, index) {
    	this.activity.content.splice(index,1)
    },
    addCon(type) {
			this.activity.content.push({
				type: type,
				value: ''
			})
		},
  }
}
</script>

<style type="scss" scoped>
	.editor-custom-btn-container {
		display: none
	}
</style>