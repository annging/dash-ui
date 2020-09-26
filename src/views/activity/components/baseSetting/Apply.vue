<template>
	<div>
		<el-form ref="first" :rules="rules" :model="activity" label-width="150px" size="small">
			<el-form-item label="活动封面" prop="introImgs">
        <div>{{ activity.cover.length }}/5</div>
        <el-upload
          ref="upload1"
          :data="dataObj"
          multiple
          :limit="5"
          list-type="picture-card"
          :file-list="coverFileList"
          action="http://upload-z2.qiniup.com"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-change="handleChangeCover"
          :on-exceed="handleExceedCover">
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
        <div v-if="Object.keys(activity.address).length > 0">
          <el-input :value="(activity.address.province === activity.address.city ? '' : activity.address.province) + activity.address.city + activity.address.distinct + activity.address.detail" >
            <el-button slot="append" icon="el-icon-location-outline" @click.prevent="getLocation()"></el-button>
          </el-input>
        </div>
        <div v-else>
          <el-input value="">
            <el-button slot="append" icon="el-icon-location-outline" @click.prevent="getLocation()"></el-button>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label="详细地址描述">
        <el-input v-model="activity.address.tips"></el-input>
      </el-form-item>
      <el-form-item label="活动详情">
      	<div  v-if="activity.content.length > 0" style="display: flex; align-items: flex-start; margin-bottom: 15px;" v-for="(item, index) in activity.content" :key="index">
          <div style="margin: 0 10px 0 0; width: 610px;" v-if="item">
          	<el-divider content-position="left">{{ contentTypes[item.type] }}</el-divider>
            <div v-if="item.type=='label'">
              <el-select
                v-model="item.value"
                popper-class="hiddenDown"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请输入标签"
                style="width: 600px">
              </el-select>
            </div>
          	<Tinymce v-if="item.type=='text'" ref="editor1" v-model="item.value" :height="150"  :toolbar="toolbar" :menubar="menubar" :hasUpload="false" />
            <div class="bigImg" v-if="item.type=='bigImg'">
              <div class="img-preview">
                <div v-if="typeof(item.value)==='string'" class="img-preview-item">
                  <span class="action">
                    <span class="delete" @click="deleteImg(index)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                  <img :src="item.value"  style="max-width: 100%;">
                </div>
                <div v-else class="img-preview-item" v-for="(it,idx) in item.value" :key="idx">
                  <span class="action">
                    <span class="delete" @click="deleteImg(index, idx)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                  <img :src="it"  style="max-width: 100%;">
                </div>
              </div>
              <div class="editor-container">
                <dropzone class="myVueDropzone" :id="'myVueDropzone-'+index" url="http://upload-z2.qiniup.com" :showRemoveLink="false" @dropzone-removedFile="dropzoneR" @dropzone-success="(file, res) => dropzoneS(file, res, index)" />
              </div>
            </div>
            
            <div class="smallImg" v-if="item.type=='smallImg'">
              <div>{{ item.value.length }}/9</div>
              <div class="img-preview">
                <div class="img-preview-item" v-for="(it,idx) in item.value" :key="idx">
                  <span class="action">
                    <span class="delete" @click="deleteImg(index, idx)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                  <img :src="it"  style="max-width: 100%;">
                </div>
              </div>
              <div class="editor-container"">
                <dropzone class="myVueDropzone" :id="'myVueDropzone-'+index" url="http://upload-z2.qiniup.com" :maxFiles="9 - activity.content[index].value.length" :showRemoveLink="false" @dropzone-removedFile="dropzoneR" @dropzone-success="(file, res) => dropzoneS(file, res, index)" @dropzone-error="dropzoneE" @dropzone-fileAdded="dropzoneA"/>
              </div>
            </div>
            <div v-if="item.type=='video'">
              <el-upload
                :data="dataObj"
                :multiple="false"
                class="uploader"
                action="http://upload-z2.qiniup.com"
                :on-success="(res,file)=>{return handleContentUploadSuccess(res,file,'video',index, 'value')}"
                :on-remove="(file)=>{return handleContentRemove(file,'video',index)}">
                <video v-if="item.value.length > 0" controls width="500" class="avatar2">
                <source :src="item.value">
                  Sorry, your browser doesn't support embedded videos.
                </video>
                <i  v-else class="el-icon-plus uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">（尺寸为720*416最佳）</div>
                </el-upload>
            </div>
          </div>
          <div style="margin-top: 20px;">
            <el-button type="danger" plain circle size="mini" icon="el-icon-delete" @click.prevent="removeConItem(
            index)"></el-button>
            <el-button type="primary" plain circle size="mini" icon="el-icon-arrow-up" :disabled="(index == 1 && activity.content[0].type == 'label') || (index == 0)" @click.prevent="upConItem(item, index)"></el-button>
            <el-button type="primary" plain circle size="mini" icon="el-icon-arrow-down" :disabled="(item.type == 'label') || (index == activity.content.length -1)" @click.prevent="downConItem(item, index)"></el-button>
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <el-button type="primary" plain size="mini" @click.prevent="addCon('text', '')">+添加文字</el-button>
          <el-button type="primary" plain size="mini" @click.prevent="addCon('bigImg', [])">+添加大图</el-button>
          <el-button type="primary" plain size="mini" @click.prevent="addCon('smallImg', [])">+添加小图</el-button>
          <el-button type="primary" plain size="mini" @click.prevent="addCon('video', '')">+添加视频</el-button>
          <el-button type="primary" plain v-if="activity.content[0].type !== 'label'" size="mini" @click.prevent="addCon('label', [])">+添加标签</el-button>
        </div>
      </el-form-item>
      <el-form-item label="活动规则">
        <Tinymce  ref="editor2" v-model="activity.activityRule" :height="200"  :toolbar="toolbar" :menubar="menubar" :hasUpload="false" />
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
import Dropzone from '@/components/Dropzone'
import maps from 'qqmap'
import Tinymce from '@/components/Tinymce'

const key = 'UUSBZ-O7S3K-US5JP-AY4LI-KQA7K-O2B6S'

export default {
	name: 'BaseApply',
	components: { Tinymce, Dropzone },
	props: {
		activity: {
		  type: Object,
		  default: function() {
        return {}
      }
		},
    dataObj: {
      type: Object,
      default: function() {
        return { token: '' }
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
      /* dataObj: { token: '' }, */
      coverFileList: [],
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
    this.init()
  },
	mounted() {
    console.log('mounted..')
  },
  methods: {
    dropzoneS(file, res, index) {
      // console.log(file)
      let url = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
      // this.bigImgFileList[index].push(url)
      this.activity.content[index].value.push(url)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      // console.log(file)
    },
    dropzoneE(file, error, xhr) {
      // console.log(file)
      this.$message.error(error)
      console.log(xhr)
    },
    dropzoneA(file) {
      // console.log(file)
    },
    deleteImg(index, idx) {
      if(idx) {
        this.activity.content[index].value.splice(idx, 1)
      } else {
        this.activity.content[index].value = []
      }
    },
  	fetchToken() {
      const _self = this
      getToken().then(response => {
        const token = response.data
        _self._data.dataObj.token = token
      })
    },
    init() {
      this.coverFileList = []
    	this.activity.cover.forEach((item, index) => {
        let m = {name: '', uid: index, url: item, status: 'success'}
        this.coverFileList.push(m)
      })
    },
    handleSuccess(res, file) {
      this.activity.cover.push('https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key)
      this.coverFileList.push({name: file.name, uid: file.uid, url: 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key, status: 'success'})
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
    handleChangeCover(file, fileList) {
      this.coverFileList = fileList
    },
    handleExceedCover(files, fileList) {
      this.$message.warning(`最多传5张，加上此次选取的 ${files.length} 张图片, 总共 ${files.length + fileList.length}`)
    },
    handleExceedSmallImg(files, fileList) {
      this.$message.warning(`最多传9张，加上此次选取的 ${files.length} 张图片, 总共 ${files.length + fileList.length}`)
    },
    removeConItem(index) {
      if(this.activity.content.length === 1) {
        this.$message.warning('活动详情不能为空，请添加其他类型再删除当前的内容')
      } else {
        this.activity.content.splice(index,1)
      }
    },
    upConItem(item, index) {
      let oldIndex = index
      let newIndex = index - 1
      this.activity.content.splice(oldIndex, 1)
      this.activity.content.splice(newIndex, 0, item)
    },
    downConItem(item, index) {
      let oldIndex = index
      let newIndex = index + 1
      this.activity.content.splice(oldIndex, 1)
      this.activity.content.splice(newIndex, 0, item)
    },
    addCon(type, v) {
      if (type === 'label') {
        if (this.activity.content[0].type !== 'label') {
          this.activity.content.unshift({
            type: type,
            value: v
          })
        }
      } else {
        this.activity.content.push({
          type: type,
          value: v
        })
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
    handleContentUploadSuccess(res, file, fileList, type, index, field) {
      this.activity.content[index][field] = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handleContentRemove(file, type, index) {
      this.activity.content.splice(index,1)
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

<style type="scss" scoped>
	.editor-custom-btn-container {
		display: none
	}
  .uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .uploader-img {
    max-width: 300px;
    display: block;
  }
  .img-preview-item {
    position: relative;
    margin-bottom: 10px;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
  }
  .img-preview-item:hover {
    border: 1px solid #ddd;
  }
  .img-preview-item .action {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
    color: white;
    font-size: 20px;
  }
  .img-preview-item:hover .action {
    display: block;
    text-align: center;
  }
  .img-preview-item:hover .action::after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }
  .img-preview-item .action .delete {
    display: inline-block;
    position: static;
    font-size: inherit;
    color: inherit;
    cursor: pointer;
  }
  .smallImg .img-preview-item {
    display: inline-block;
    width: 150px;
    height: 150px;
    overflow: hidden;
    margin-right: 10px;
  }
</style>

<style>
  .uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .hiddenDown {
    display: none
  }
  .myVueDropzone.dropzone {
    height: 180px;
    overflow: hidden;
  }
  .myVueDropzone.dropzone.dz-started .dz-message {
    display: block !important;
  }
  .myVueDropzone.dropzone .dz-preview.dz-image-preview {
      display: none !important;
  }
  .myVueDropzone.dropzone .dz-preview {
    min-height: 0;
    height: 0;
    margin: 0;
  }
</style>