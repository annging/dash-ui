<template>
	<div>
		<el-form ref="third" :rules="rules" :model="activity" label-width="150px" size="small">
			<el-form-item label="高级功能">
				<div>（该功能为VIP会员专享）</div>
        <el-switch
          v-model="activity.enableAdvancedSetting"
          active-color="#13ce66"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <div v-if="activity.enableAdvancedSetting > 0">
      	<el-form-item label="团长优惠">
	        <el-switch
	          v-model="activity.activitySetting.leaderDiscount"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	        <div style="font-size: 12px; color: #999">开启后，团长免费和团长优惠选其中一种</div>
	      </el-form-item>
	      <el-form-item label="团长免费" v-if="activity.activitySetting.leaderDiscount">
	        <el-switch
	          v-model="activity.activitySetting.leaderFree"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	      </el-form-item>
	      <el-form-item label="团长可享受优惠" prop="" v-if="activity.activitySetting.leaderDiscount">
	      	<el-input type="digit" v-model="activity.userSaleSetting.discountFee" placeholder="请输入"></el-input>
	      	<div style="font-size: 12px; color: #999">团长优惠多少元(不填写则为0)</div>
	      </el-form-item>
      	<el-form-item label="活动分销">
	        <el-switch
	          v-model="activity.enableUserSale"
	          active-color="#13ce66"
	          :active-value="1"
	          :inactive-value="0">
	        </el-switch>
      		<div style="font-size: 12px; color: #999">合理设置分销佣金，人人都是推广员(总佣金不能超过付款金额)</div>
	      </el-form-item>
	      <el-form-item label="一级佣金" prop="" v-if="activity.enableUserSale">
	      	<el-input type="digit" v-model="activity.userSaleSetting.levelOne" placeholder="请输入"></el-input>
	      	<div style="font-size: 12px; color: #999">按每单多少元计算</div>
	      </el-form-item>
	      <el-form-item label="二级佣金" prop="" v-if="activity.enableUserSale">
	      	<el-input type="digit" v-model="activity.userSaleSetting.levelTwo" placeholder="不填写则默认开启一级分销"></el-input>
	      	<div style="font-size: 12px; color: #999">按每单多少元计算</div>
	      </el-form-item>
	      <el-form-item label="用户付款后即返佣金" v-if="activity.enableUserSale">
	        <el-switch
	          v-model="activity.userSaleSetting.isVerification"
	          active-color="#13ce66"
	          :active-value="1"
	          :inactive-value="0">
	        </el-switch>
	      </el-form-item>
	      <!--<el-form-item label="推荐分销活动至团团站" v-if="activity.enableUserSale">
	        <el-switch
	          v-model="activity.userSaleSetting.showFee"
	          active-color="#13ce66"
	          :active-value="1"
	          :inactive-value="0">
	        </el-switch>
	      </el-form-item>-->
	      <el-form-item label="虚拟拼团人气">
	        <el-switch
	          v-model="activity.advancedSetting.virtual"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	      </el-form-item>
	      <el-form-item label="虚拟浏览量" prop="" v-if="activity.advancedSetting.virtual">
	      	<el-input v-model="activity.advancedSetting.virtualViewCount" placeholder="请输入"></el-input>
	      </el-form-item>
	      <el-form-item label="虚拟参与量" prop="" v-if="activity.advancedSetting.virtual">
	      	<el-input v-model="activity.advancedSetting.virtualPersonCount" placeholder="（最大数500）"></el-input>
	      </el-form-item>
	      <el-form-item label="自动成团">
	        <el-switch
	          v-model="activity.advancedSetting.supportedAutoGroup"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	        <div style="font-size: 12px; color: #999">开启后，系统将在拼团失败前15分钟，帮助未满团成员成团</div>
	      </el-form-item>
	      <el-form-item label="原价购买">
	        <el-switch
	          v-model="activity.advancedSetting.supportedOriginalPrice"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	        <div style="font-size: 12px; color: #999">开启后买家能以原价购买活动商品，无需组团也可以成交</div>
	      </el-form-item>

	      <el-form-item label="自定义海报">
	        <el-switch
	          v-model="activity.advancedSetting.customPoster"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	      </el-form-item>
	      <el-form-item label="海报" prop="" v-if="activity.advancedSetting.customPoster">
	        <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="handleSuccess1"
            :on-remove="handleRemove1"
            :before-upload="beforeUpload"
            style="display: inline-block; vertical-align: top">
            <img v-if="activity.advancedSetting.posterUrl" :src="activity.advancedSetting.posterUrl" class="avatar">
            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">尺寸650*1034</div>
          </el-upload>
          <el-button v-if="activity.advancedSetting.posterUrl" type="danger" plain size="mini" icon="el-icon-delete" @click.prevent="handleRemovePost" style="vertical-align: top: margin-left: 30px;">删除</el-button>
	      </el-form-item>
	      <el-form-item label="添加二维码">
	        <el-switch
	          v-model="activity.advancedSetting.customQrCode"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	      </el-form-item>
	      <el-form-item label="描述" prop="" v-if="activity.advancedSetting.customQrCode">
	      	<el-input v-model="activity.advancedSetting.qrCodeDesc" placeholder="如:扫码进群领取资料(不超于30字)"></el-input>
	      </el-form-item>
	      <el-form-item label="二维码" prop="" v-if="activity.advancedSetting.customQrCode">
	        <el-upload
            :data="dataObj"
            :multiple="false"
            class="avatar-uploader"
            action="http://upload-z2.qiniup.com"
            :show-file-list="false"
            :on-success="handleSuccess2"
            :on-remove="handleRemove2"
            :before-upload="beforeUpload"
            style="display: inline-block; vertical-align: top;">
            <img v-if="activity.advancedSetting.qrCodeUrl" :src="activity.advancedSetting.qrCodeUrl" class="avatar1">
            <i  v-else class="el-icon-plus avatar-uploader-icon1"></i>
            <div slot="tip" class="el-upload__tip">尺寸134*134</div>
          </el-upload>
          <el-button v-if="activity.advancedSetting.qrCodeUrl" type="danger" plain size="mini" icon="el-icon-delete" @click.prevent="handleRemoveQrCode" style="vertical-align: top: margin-left: 30px;">删除</el-button>
	      </el-form-item>
	      <el-form-item label="背景音乐" prop="">
	      	<el-select v-model="activity.advancedSetting.bgMusicUrl" placeholder="请选择" style="width: 100%" popper-class="paginationSelect" @change="chooseMusic">
            <el-option v-for="item in bgMusicList" :key="item.id" :label="item.id + '-' + item.firstClass + '-' + item.secondClass + '-' + item.name" :value="item.url">
              <span class="label-item">{{ item.id }}</span>-
              <span class="label-item">{{ item.firstClass }}</span>-
              <span class="label-item">{{ item.secondClass }}</span>-
              <span class="label-item">{{ item.name }}</span>
              <span class="label-item" style="padding-left: 20px;"><audio style="display: inline-block; height: 24px; width: 220px; vertical-align: middle;" preload="none" controls :src="item.url">Your browser does not support the <code>audio</code> element.</audio></span>
            </el-option>
            <pagination v-show="-1>0" :total="bgMusicTotal" :page.sync="bgMusicListQuery.current" :limit.sync="bgMusicListQuery.size" @pagination="fetchMusicList" />
          </el-select>
	      </el-form-item>
	      <el-form-item label="推荐到团团站">
	        <el-switch
	          v-model="activity.advancedSetting.recommendTtz"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	      </el-form-item>
	    </div>
		</el-form>
  </div>
</template>

<script>
import { fetchMusicList } from '@/api/platform'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
	name: 'AdvancedGroup',
	components: { Pagination },
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
      rules: {
      },
      bgMusicList: [],
      bgMusicTotal: 0,
      bgMusicListQuery: {
        searchStr: '',
        current: 1,
        size: 1000
      },
    }
  },
  created() {
    this.init()
  },
	mounted() {
  },
  methods: {
    init() {
    	this.fetchMusicList()
    },
    fetchMusicList() {
    	fetchMusicList(this.bgMusicListQuery).then(response => {
		  	if (response.code === '200') {
		  		this.bgMusicList = response.data.records
		  		this.bgMusicTotal = response.data.total
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		  })
    },
    chooseMusic(value) {
    	this.bgMusicList.forEach((t, i) => {
    		if (t.url == value) {
    			this.activity.advancedSetting.bgMusicName = t.name
    			// this.activity.advancedSetting.bgMusicUrl = t.url
    		}
    	})
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isLt20M
    },
    handleSuccess1(res, file) {
      this.activity.advancedSetting.posterUrl = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handleRemove1(file) {
      this.activity.advancedSetting.posterUrl = ''
    },
    handleRemovePost() {
    	this.activity.advancedSetting.posterUrl = ''
    },
    handleSuccess2(res, file) {
      this.activity.advancedSetting.qrCodeUrl = 'https://ttz-user-file.qiniu.tuantuanzhan.cn/' + res.key
    },
    handleRemove2(file) {
      this.activity.advancedSetting.qrCodeUrl = ''
    },
    handleRemoveQrCode() {
    	this.activity.advancedSetting.qrCodeUrl = ''
    }
  }
}
</script>

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
    border: 1px solid #ddd;
  }
  .avatar {
    max-width: 300px;
    max-height: 600px;
    display: block;
  }
  .avatar-uploader-icon1 {
    font-size: 28px;
    color: #8c939d;
    width: 134px;
    height: 134px;
    line-height: 134px;
    text-align: center;
    border: 1px solid #ddd;
  }
  .avatar1 {
    max-width: 134px;
    display: block;
  }
</style>
