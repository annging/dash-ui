<template>
	<div>
		<el-form ref="second" :rules="rules" :model="activity" label-width="150px" size="small">
			      <el-form-item label="投票设置">
        <div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in activity.activitySetting.defaultVote" :key="index">
        	<el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="(res,file)=>{return handleDataSuccess(res,file, index)}"
            :before-upload="beforeUpload"
            style="margin-right: 15px;">
            <img v-if="item.cover" :src="item.cover" class="avatar" style="width: 120px; max-height: 150px;">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 120px; height: 150px;"></i>
          </el-upload>
          <div style="margin: 0 10px 0 0; width: 350px;">
          	<el-input v-model="item.num" style="margin-bottom: 5px;" placeholder="编号" class="custon-prepend-120"><template slot="prepend">编号</template></el-input>
          	<el-input v-model="item.ticketNum" style="margin-bottom: 5px;" placeholder="初始投票数" class="custon-prepend-120"><template slot="prepend">初始投票数</template></el-input>
            <el-input v-model="item.name" style="margin-bottom: 5px;" placeholder="名称" class="custon-prepend-120"><template slot="prepend">名称</template></el-input>
            <el-select v-model="item.group" placeholder="请选择" class="custon-prepend-120">
					    <el-option
					      v-for="(it, idx) in activity.activitySetting.groupNames"
					      :key="it.id"
					      :label="it.group"
					      :value="it.group">
					    </el-option>
					    <template slot="prefix">分组</template>
					  </el-select>
          </div>
          <div style="margin: 0 10px 0 0; width: 300px; position: relative;">
					  <span class="con-prepend">投票图文详情,点击开始编辑</span>
					  <div class="con-pre" @click="goVoteItemConEdit(index)">
					  		<el-scrollbar class="content-inner">
					  			<span v-show="false">
						        {{itemContent = Object.assign([],item.content.length>0?item.content:[{type:'text',value:''}]) }}
						    	</span>
					  			<div  v-if="itemContent" v-for="(itt, inn) in itemContent" :key="inn">
					  				<div v-if="itt.type=='text'" v-html="itt.value"></div>
					  				<div v-if="itt.type=='smallImg'" class="smallImg">
					  					<div class="img-preview">
				                <div class="img-preview-item" v-for="(ittt,iddx) in itt.value" :key="iddx">
				                  <img :src="ittt"  style="max-width: 100%;">
				                </div>
				              </div>
					  				</div>
					  				<div v-if="itt.type=='smallImg'" class="bigImg">
					  					<div class="img-preview">
				                <div class="img-preview-item" v-for="(ittt,iddx) in itt.value" :key="iddx">
				                  <img :src="ittt"  style="max-width: 100%;">
				                </div>
				              </div>
					  				</div>
					  				<div v-if="itt.type=='video'" class="video">
					  					<video controls width="500">
												<source :src="itt.value">
							          Sorry, your browser doesn't support embedded videos.
							        </video>
					  				</div>
					  			</div>
					  		</el-scrollbar>
					  </div>
					  <!--<el-input v-model="item.content" style="margin-bottom: 5px;" placeholder="投票图文详情"></el-input>-->
          </div>
          <el-button size="mini" v-if="index > 0" @click.prevent="removeVoteItem(item, index)">删除</el-button>
        </div>
        <el-button size="mini" @click.prevent="addVoteItem()">+添加</el-button>
      </el-form-item>
			<el-form-item label="用户投票总次数" prop="">
      	<el-input type="number" v-model="activity.activitySetting.totalVoteNumLimit" maxlength="5" placeholder="不限制"></el-input>
      </el-form-item>
      <el-form-item label="用户每天投票次数" prop="">
      	<el-input type="number" v-model="activity.activitySetting.voteNumForDayLimit" maxlength="5" placeholder="不限制"></el-input>
      </el-form-item>
      <el-form-item label="当日同一项重复被投票">
        <el-switch
          v-model="activity.activitySetting.supportRepeatVote"
          active-color="#13ce66"
          :active-value="true"
          :inactive-value="false">
        </el-switch>
      </el-form-item>
      <el-form-item label="投票者手机号">
        <el-switch
          v-model="activity.activitySetting.voterPhoneNum"
          active-color="#13ce66"
          :active-value="true"
          :inactive-value="false">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启在线报名">
        <el-switch
          v-model="activity.activitySetting.supportOnlineApply"
          active-color="#13ce66"
          :active-value="true"
          :inactive-value="false">
        </el-switch>
      </el-form-item>
      <el-form-item label="参赛需审核">
        <el-switch
          v-model="activity.activitySetting.needCheck"
          active-color="#13ce66"
          :active-value="true"
          :inactive-value="false">
        </el-switch>
      </el-form-item>
      <el-form-item label="按钮文案（可自定义）" prop="">
      	<el-input v-model="activity.activitySetting.buttonText" maxlength="10" placeholder="立即参加"></el-input>
      </el-form-item>
      <el-form-item label="参与门店" prop="">
      	<el-select v-model="activity.storeIds" multiple placeholder="请选择" style="width: 600px;">
			    <el-option
			      v-for="item in stores"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
      </el-form-item>
		</el-form>
		<el-dialog 
      title="详情"
      width="800px"
      :visible.sync="voteItemContentVisible"
      :modal-append-to-body="false"
      :append-to-body="true">

      	<div  v-if="voteItemContent.length > 0" style="display: flex; align-items: flex-start; margin-bottom: 15px;" v-for="(item, index) in voteItemContent" :key="index">
          <div style="margin: 0 10px 0 0; width: 610px;" v-if="item">
          	<el-divider content-position="left">{{ contentTypes[item.type] }}</el-divider>
          	<Tinymce v-if="item.type=='text'" ref="editor2" v-model="item.value" :height="150"  :toolbar="['']" menubar="false" :hasUpload="false" />
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
              <div class="editor-container" v-if="item.value.length < 9">
                <dropzone v-if="dataObj.token" class="myVueDropzone" :id="'myVueDropzone-'+index" url="http://upload-z2.qiniup.com" :token="dataObj.token" :showRemoveLink="false" @dropzone-removedFile="dropzoneRVoteItem" @dropzone-success="(file, res) => dropzoneSVoteItem(file, res, index, 9)" @dropzone-error="dropzoneEVoteItem"/>
              </div>
            </div>
            <div v-if="item.type=='video'">
              <el-upload
                :data="dataObj"
                :multiple="false"
                class="uploader"
                action="http://upload-z2.qiniup.com"
                :on-success="(res,file)=>{return handleContentUploadSuccessVoteItem(res,file,'video',index, 'value')}"
                :on-remove="(file)=>{return handleContentRemoveVoteItem(file,'video',index)}">
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
            <el-button type="danger" plain circle size="mini" icon="el-icon-delete" @click.prevent="removeConItemVoteItem(
            index)"></el-button>
            <el-button type="primary" plain circle size="mini" icon="el-icon-arrow-up" :disabled="(index == 1 && voteItemContent[0].type == 'label') || (index == 0)" @click.prevent="upConItemVoteItem(item, index)"></el-button>
            <el-button type="primary" plain circle size="mini" icon="el-icon-arrow-down" :disabled="(item.type == 'label') || (index == voteItemContent.length -1)" @click.prevent="downConItemVoteItem(item, index)"></el-button>
          </div>
        </div>
        <div class="action" style="height: 0;overflow: hidden;">
          <dropzone v-if="dataObj.token" class="myVueDropzone" url="http://upload-z2.qiniup.com" :token="dataObj.token" :showRemoveLink="false" @dropzone-removedFile="dropzoneRVoteItem" @dropzone-success="(file, res) => dropzoneSBigVoteItem(file, res)" id="VoteItemuploadBigImg" />
        </div>
        <div style="margin-bottom: 20px;">
          <el-button type="primary" plain size="mini" @click.prevent="addConVoteItem('text', '')">+添加文字</el-button>
          <el-button type="primary" plain size="mini" @click.prevent="addConVoteItem('bigImg', [])">+添加大图</el-button>
          <el-button type="primary" plain size="mini" @click.prevent="addConVoteItem('smallImg', [])">+添加小图</el-button>
          <el-button type="primary" plain size="mini" @click.prevent="addConVoteItem('video', '')">+添加视频</el-button>
        </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="voteItemContentVisible = false">取 消</el-button>
        <el-button type="primary" @click="voteItemContentSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStores } from '@/api/merchant'
import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'

export default {
	name: 'TypeVote',
	components: { Dropzone, Tinymce },
	props: {
		activity: {
		  type: Object,
		  default: function() {
        return {}
      }
		},
		merchantId: {
		  type: String,
		  default: 0
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
      rules: {
      },
      contentTypes: {'bigImg': '大图', 'smallImg': '小图', 'text': '文字', 'video': '视频', 'label': '标签'},
      voteItemContentVisible: false,
      voteItemContent: [],
      voteItemIndex: null,
      stores: []
    }
  },
  created() {
    this.init()
  },
	mounted() {
  },
  methods: {
    init() {
    	// this.getRequirecolumns()
    	this.getStores()
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleDataSuccess(res, file,index) {
      this.activity.activitySetting.defaultVote[index].cover = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    addVoteItem() {
    	let _num = this.activity.activitySetting.defaultVote.length + 1
    	_num = _num * 1 < 10 ? `00${_num}` : _num * 1 < 100 ?`0${_num}`: val;
    	this.activity.activitySetting.defaultVote.push(({num:_num,name:'',cover:'',title:'',ticketNum:'',content:'',isimg:true}))
    },
    removeVoteItem(item, index) {
    	this.activity.activitySetting.defaultVote.splice(index, 1)
    },
    goVoteItemConEdit(index) {
    	this.voteItemIndex = index
    	this.voteItemContent = JSON.parse(this.activity.activitySetting.defaultVote[index].content)
    	this.voteItemContentVisible = true
    },
    voteItemContentSave() {
			this.voteItemContentVisible = false
			this.activity.activitySetting.defaultVote[this.voteItemIndex].content = JSON.stringify(this.voteItemContent)
    },
    dropzoneSVoteItem(file, res, index, number) {
      if (number) {
        console.log(this.voteItemContent[index].value.length)
        if (this.voteItemContent[index].value.length === number) {
          this.$message.warning('最多上传' + number + '张图片')
          return
        }
      }
      // console.log(file)
      let url = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key

      this.voteItemContent[index].value.push(url)
      this.$message({ message: '上传成功', type: 'success' })
    },
    dropzoneSBigVoteItem(file, res) {
      let url = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
      let v = []
      v.push(url)
      this.voteItemContent.push({
        type: 'bigImg',
        value: v
      })
    },
    dropzoneRVoteItem(file) {
      // console.log(file)
    },
    dropzoneEVoteItem(file, error, xhr) {
      // console.log(file)
      this.$message.error(error)
      console.log(xhr)
    },
    dropzoneAVoteItem(file, index, number) {
    },
    deleteImgVoteItem(index, idx) {
      if(idx) {
        this.voteItemContent[index].value.splice(idx, 1)
      } else {
        this.voteItemContent[index].value = []
      }
    },
    handleExceedSmallImgVoteItem(files, fileList) {
      this.$message.warning(`最多传9张，加上此次选取的 ${files.length} 张图片, 总共 ${files.length + fileList.length}`)
    },
    removeConItemVoteItem(index) {
      if(this.voteItemContent.length === 1) {
        this.$message.warning('活动详情不能为空，请添加其他类型再删除当前的内容')
      } else {
        this.voteItemContent.splice(index,1)
      }
    },
    upConItemVoteItem(item, index) {
      let oldIndex = index
      let newIndex = index - 1
      this.voteItemContent.splice(oldIndex, 1)
      this.voteItemContent.splice(newIndex, 0, item)
    },
    downConItemVoteItem(item, index) {
      let oldIndex = index
      let newIndex = index + 1
      this.voteItemContent.splice(oldIndex, 1)
      this.voteItemContent.splice(newIndex, 0, item)
    },
    addConVoteItem(type, v) {
      if (type === 'label') {
        if (this.voteItemContent[0].type !== 'label') {
          this.voteItemContent.unshift({
            type: type,
            value: v
          })
        }
      } else if (type === 'bigImg') {
        document.getElementById("VoteItemuploadBigImg").click();
      } else {
        this.voteItemContent.push({
          type: type,
          value: v
        })
      }
		},
		handleContentUploadSuccessVoteItem(res, file, fileList, type, index, field) {
      this.voteItemContent[index][field] = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handleContentRemoveVoteItem(file, type, index) {
      this.voteItemContent.splice(index,1)
    },
    getRequirecolumns() {
    	getRequirecolumns().then(response => {
		  	if (response.msg === 'ok') {
		  		this.commonField = response.data
		  		this.initCommonField()
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		  })
    },
    initCommonField() {
    	this.activity.requireColumns.forEach((item, index) => {
    		this.commonField.forEach((t, i) => {
    			if (t.name == item.name) {
    				t.selected = true
    			}
    		})
      })
    },
    getStores() {
			getStores({ merchantId: this.merchantId }).then(response => {
		  	if (response.msg === 'ok') {
		  		this.stores = response.data
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		  })
    },
    toggleSelect(item, index) {
    	if (item.selected) {
    		this.commonField[index].selected = false
    		let indx = -1
    		this.activity.requireColumns.forEach((it, idx) => {
    			if (it.name == item.name) {
    				indx = idx
    			}
    		})
    		this.activity.requireColumns.splice(indx, 1)
    	} else {
    		this.commonField[index].selected = true
    		this.activity.requireColumns.push(item)
    	}
    },
    del(item, index) {
    	this.activity.requireColumns.splice(index, 1)
    	this.commonField.forEach((t, i) => {
    		if (t.name == item.name) {
    			t.selected = false
    		}
    	})
    },
    handelEdit(item, index) {
    	this.editCustom(item.type, index)
    },
    editCustom(type, index) {
    	if (index > -1) {
    		this.editItem = this.activity.requireColumns[index]
    		if (this.editItem.ext) {
    			if (typeof(this.editItem.ext)=='string') {
		    		this.editItem.ext = JSON.parse(this.editItem.ext)
		    	}
		    	if (typeof(this.editItem.ext.values)=='string') {
		    		this.editItem.ext.values = JSON.parse(this.editItem.ext.values)
		    	}
	    	}
    		this.editItemIndex =  index
    	} else {
    		if (type == 'OneLineText') {
    			this.editItem = {name: "", required: false, type: "OneLineText", desc: ''}
    		} else if (type == 'TextArea') {
    			this.editItem = {name: "", required: false, type: "TextArea", desc: ''}
    		} else if (type == 'Select') {
    			this.editItem = {ext: {"min":1,"max":1,"values":[]}, name: "", required: false, type: "Select"}
    		} else if (type == 'MultiSelect') {
    			this.editItem = {ext: {"min":1,"max":"","values":[]}, name: "", required: false, type: "MultiSelect"}
    		}
    		this.editItemIndex = -1
    	}
    	this.customDialogVisible = true
    },
    addXuanxiang() {
    	this.editItem.ext.values.push('')
    },
    removeXuanxiang(item, index){
    	this.editItem.ext.values.splice(index, 1)
    },
    handleClose(done) {
      console.log('关闭弹窗')
      this.customDialogVisible = false
      done()
    },
    onSubmit() {
    	if (this.editItem.ext) {
	    	this.editItem.ext = JSON.stringify(this.editItem.ext)
	    }
	    if (this.editItemIndex > -1) {
	    	this.activity.requireColumns.splice(this.editItemIndex, 1 , this.editItem)
	    } else {
    		this.activity.requireColumns.push(this.editItem)
    	}
    	this.customDialogVisible = false
    },
    resetForm(form) {
    	this.customDialogVisible = false
    	this.editItem = {}
    	this.editItemIndex = -1
    },
    addGroup() {
    	this.activity.activitySetting.groups.push({personNum:'',price:'',commodityAmount:''})
    },
    removeGroup(item, index) {
    	this.activity.activitySetting.groups.splice(index, 1)
    }
  }
}
</script>

<style type="scss" scoped>
	.uploader .el-upload {
		line-height: 1;
	}
	.avatar-uploader .el-upload:hover {
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
  .content-inner {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
<style>
.custon-prepend-120 .el-input-group__prepend{
	width: 120px;
}
.custon-prepend-120.el-select {
	display: block;
	height: 32px;
	margin-bottom: 5px;
}
.custon-prepend-120 .el-input__prefix {
	background-color: #F5F7FA;
  color: #909399;
  vertical-align: middle;
  border: 1px solid #DCDFE6;
  border-right-width: 0;
  border-radius: 4px 0 0 4px;
  left: 0;
  text-align: left;
  padding: 0 20px;
  white-space: nowrap;
	width: 120px;
	height: 32px;
}
.custon-prepend-120 .el-input--prefix .el-input__inner {
	position: absolute;
  margin-left: 120px;
  border-radius: 0 4px 4px 0;
  padding-left: 15px;
  width: 230px;
}
.custon-prepend-120 .el-input__suffix {
	height: 32px;
}
.custon-prepend-120 {
	position: relative;
	margin-bottom: 5px;
}
.con-prepend {
	display: block;
	background-color: #F5F7FA;
  color: #909399;
  vertical-align: middle;
  border: 1px solid #DCDFE6;
  text-align: left;
  padding: 0 20px;
  white-space: nowrap;
  height: 32px;
  line-height: 32px;
}
.con-pre {
	position: absolute;
	right: 0;
	top: 32px;
	width: 300px;
	height: 120px;
	border: 1px solid #DCDFE6;
	border-top-width: 0;
	border-radius: 0 0 4px 4px;
	cursor: pointer;
}
	
</style>
