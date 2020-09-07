<template>
	<el-row class="avtivity-editor-container" v-bind:class="{ fullScreen: isFullScreen}">
		<el-row class="action-bar" type="flex" align="middle" justify="space-between">
			<div class="left" style="padding-left: 15px;"><router-link target="_blank" style="color: #409EFF" :to="'/merchant/detail/' + activity.merchantId">商家:{{merchant.name}}</router-link></div>
			<div class="right" style="padding-right: 15px;">
				<!--<el-button size="small" type="text">保存</el-button>
				<el-button size="small">预览</el-button>-->
				<el-button size="small" type="text" @click="goList()">取消</el-button>
				<el-button size="small" type="primary" style="min-width: 120px;" @click="publish()" :disabled="disabledPublishButton">发布</el-button>
				<el-button class="btn-fullScreen" size="small" @click="isFullScreen = !isFullScreen">{{ isFullScreen ? '退出全屏': '全屏' }}</el-button>
			</div>
		</el-row>
		<el-scrollbar class="devicewin" style="display: none">
			<div class="device">
				<div class="device-header">
					<div class="icons">
						<svg-icon icon-class="wifi" style="float: left" />
						<svg-icon icon-class="battery" style="float: right" />
						<svg-icon icon-class="signal" style="float: right" />
					</div>
					<div style="position: relative;">
						<div class="text">{{activity.title}}</div>
						<svg-icon class="xiaochengxu" icon-class="xiaochengxu" style="display: none"/>
					</div>
				</div>
				<div class="device-frame" v-loading="pageLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">

				</div>
			</div>
		</el-scrollbar>
		<div id="propertywin" v-if="!pageLoading">
			<el-tabs v-model="activeTabName" type="card" class="top-tab">
    	<el-tab-pane label="基本设置" name="first">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<base-apply-setting :activity=activity :dataObj=dataObj  v-if="type==1"/><!-- 报名 -->
    				<base-group-setting :activity=activity :dataObj=dataObj v-if="type==6"/><!-- 拼团 -->
    				<base-discount-setting :activity=activity v-if="discountTypes.indexOf(type*1) != -1"/><!-- 10 11 12 13 4个优惠券 -->
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
    	<el-tab-pane :label="activityTypes[type] + '管理'" name="second">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<type-apply-setting :activity=activity :merchantId=merchantId v-if="type==1"/><!-- 报名 -->
    				<type-group-setting :activity=activity :merchantId=merchantId v-if="type==6"/><!-- 拼团 -->
    				<type-discount-setting :activity=activity :merchantId=merchantId v-if="discountTypes.indexOf(type*1) != -1"/><!-- 10 11 12 13 4个优惠券 -->
    				<vote-setting v-model="activity"  v-if="activity.type == 'vote'"/>
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
    	<el-tab-pane label="高级设置" name="third">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<advanced-apply-setting :activity=activity v-if="type==1"/><!-- 报名 -->
    				<advanced-group-setting :activity=activity v-if="type==6"/><!-- 拼团 -->
    				<advanced-discount-setting :activity=activity v-if="discountTypes.indexOf(type*1) != -1"/><!-- 优惠券 -->
    				<vote-more-setting  v-if="activity.type == 'vote'"/>
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
  	</el-tabs>
		</div>
	</el-row>
</template>

<script>
import { getActivityInfo, createActivity, updateActivity } from '@/api/activity'
import { fetchMerchant } from '@/api/merchant'
import { getToken } from '@/api/qiniu'
import { parseTime } from '@/utils'

import BaseApplySetting from './baseSetting/Apply'
import BaseGroupSetting from './baseSetting/Group'
import BaseDiscountSetting from './baseSetting/Discount'

import TypeApplySetting from './typeSetting/Apply'
import TypeGroupSetting from './typeSetting/Group'
import TypeDiscountSetting from './typeSetting/Discount'

import AdvancedApplySetting from './advancedSetting/Apply'
import AdvancedGroupSetting from './advancedSetting/Group'
import AdvancedDiscountSetting from './advancedSetting/Discount'
import VoteSetting from './VoteSetting'
import VoteMoreSetting from './VoteMoreSetting'

export default {
	name: 'ActivityEditor',
	components: {
		BaseApplySetting,
		BaseGroupSetting,
		BaseDiscountSetting,
		TypeApplySetting,
		TypeGroupSetting,
		TypeDiscountSetting,
		AdvancedApplySetting,
		AdvancedGroupSetting,
		AdvancedDiscountSetting,
		VoteSetting,
		VoteMoreSetting
	},
	props: {
		isEdit: {
		  type: Boolean,
		  default: false
		}
	},
	created() {
		const type = this.$route.params && this.$route.params.type * 1
		const mid = this.$route.params && this.$route.params.mid

		this.type = type
		this.merchantId = mid
		this.activity.type = type
		this.activity.activitySetting = JSON.parse(JSON.stringify(this.activitySetting[type]))
		this.activity.advancedSetting = JSON.parse(JSON.stringify(this.advancedSetting[type]))
		this.activity.activityRule = JSON.parse(JSON.stringify(this.activityRule[type]))
  	this.activity.merchantId = mid
    this.getMerchant(mid)
    this.fetchToken()
		if (this.isEdit) {
			const id = this.$route.params && this.$route.params.id
			this.id = id
      this.fetchData(id)
    }
  },
	data() {
		return {
			id: '',
			type: 0,
			merchantId: '',
			activity: {
				id: 0,
				cover: [],
				title: '',
				startTime: '',
				endTime: '',
				enableActivityTime: 0,
				activityStartTime: '',
				activityEndTime: '',
				merchantId: 0,
				type: 0,
				address: { province: '', city: '', distinct: '', detail: '', tips: '' },
				content: [{type:'text',value:''}],
				activityRule: "<p>1.点击立即报名提交相关信息后即可参与;</p><br/><p>2.本次活动以先到先得原则，先成功完成报名获得电子券的才有资格获得商品;</p><br/><p>3.报名完成后凭电子券与客服核销;</p><br/><p>4.活动最终解释权归发布者所有，与团团站平台无关。</p>",
				storeIds: '',
				requireColumns: [],
				activitySetting: {
					advancePay:'',
					buttonText:'',
					fullPay:true,
					individualLimit:'',
					leaveMsg:true,
					listShowType:1,
					needCheck:false,
					registerCost:'0',
					registerNum:''
				},
				advancedSetting: {
					bgMusicName:'',
					bgMusicUrl:'',
					distributionCommission:'',
					recommendTtz:true,
					registerOnlyAcceptWord:false,
					registerWord:'',
					showCommission:false,
					supportedActivityDistribution:false,
					virtualPersonCount:''
				},
				enableUserSale: 0,
				userSaleSetting: {"isVerification":0,"levelOne":"","levelTwo":"","showFee":0},
				enableAdvancedSetting: 0
			},
			dataObj: { token: '' },
			activityRule: {
				0: '',
				1: "<p>1.点击立即报名提交相关信息后即可参与;</p><br/><p>2.本次活动以先到先得原则，先成功完成报名获得电子券的才有资格获得商品;</p><br/><p>3.报名完成后凭电子券与客服核销;</p><br/><p>4.活动最终解释权归发布者所有，与团团站平台无关。</p>",
				6: '<p>1. 开团成为团长，并邀请好友参团，在拼团有效时间内凑齐成团人数，即可拼团成功；也可直接参与其它团长的团;</p><br/><p>2. 拼团有效时间内未凑齐成团人数，即拼团失败。系统自动取消订单并全额退款，支付金额将会原路退回付款账户；</p><br/><p>3. 拼团有效时间为24小时，即拼团允许邀请好友参团的时间，可在拼团详情页查看倒计时；</p><br/><p>4.拼团成功后，可在【电子券】中，查看自己的拼团订单;</p><br/><p>5.活动最终解释权归发布者所有，与团团站平台无关。</p>',
				10: '',
				11: '',
				12: '',
				13: '',
				'-1': ''
			},
			activitySetting: {
				0: {},
				1: {
					advancePay:'',
					buttonText:'',
					fullPay:true,
					individualLimit:'',
					leaveMsg:true,
					listShowType:1,
					needCheck:false,
					registerCost:'0',
					registerNum:''
				},
				6: {
					advancePay:'',
					agglomerationTime:'',
					buttonText:'',
					fullPay:true,
					groups:[{personNum:'',price:'',commodityAmount:''}],
					leaderDiscount:false,
					leaderFree: false,
					discountFee:'0',
					leaveMsg:false,
					listShowType:0,
					originPrice:''
				},
				10: {
					consumeThreshold: '', //优惠券使用消费门槛,0元表示无门槛
					couponFrom: '',
					couponNum: '',
					couponPrice: '',
					couponType: '',
					discount: '',
					exclusive: false,
					experiencePrice: '',
					necessary: false,
					originalPrice: '',
					reduceAmount: '',
					title: '',
					needShare: false,
					shareNum: ''
				},
				11: {
					consumeThreshold: '', //优惠券使用消费门槛,0元表示无门槛
					couponFrom: '',
					couponNum: '',
					couponPrice: '',
					couponType: '',
					discount: '',
					exclusive: false,
					experiencePrice: '',
					necessary: false,
					originalPrice: '',
					reduceAmount: '',
					title: '',
					needShare: false,
					shareNum: ''
				},
				12: {
					consumeThreshold: '', //优惠券使用消费门槛,0元表示无门槛
					couponFrom: '',
					couponNum: '',
					couponPrice: '',
					couponType: '',
					discount: '',
					exclusive: false,
					experiencePrice: '',
					necessary: false,
					originalPrice: '',
					reduceAmount: '',
					title: '',
					needShare: false,
					shareNum: ''
				},
				13: {
					consumeThreshold: '', //优惠券使用消费门槛,0元表示无门槛
					couponFrom: '',
					couponNum: '',
					couponPrice: '',
					couponType: '',
					discount: '',
					exclusive: false,
					experiencePrice: '',
					necessary: false,
					originalPrice: '',
					reduceAmount: '',
					title: '',
					needShare: false,
					shareNum: ''
				},
				'-1': null
			},
			advancedSetting: {
				0: {},
				1: {
					bgMusicName:'',
					bgMusicUrl:'',
					distributionCommission:'',
					recommendTtz:true,
					registerOnlyAcceptWord:false,
					registerWord:'',
					showCommission:false,
					supportedActivityDistribution:false,
					virtual: false,
					virtualViewCount: '',
					virtualPersonCount:''
				},
				6: {
					bgMusicName:'', // string 背景音乐名称
					bgMusicUrl:'', // string 背景音乐地址
					distributionCommission:'', // number($float) 佣金金额(按每单多少元计算,单位:元)
					distributionNum:'', // 	integer($int32) 活动分销份数
					recommendTtz:true, // boolean 推荐团团站
					showCommission:false,
					supportedActivityDistribution:false,
					supportedAutoGroup:false,
					supportedOriginalPrice:false,
					virtual: false,
					virtualViewCount: '',
					virtualPersonCount:''
				},
				10: null,
				11: null,
				12: null,
				13: null,
				'-1': null
			},
			merchant: {
				id: '',
				name: ''
			},
			pageLoading: false,
			isFullScreen: false,
			activeTabName: 'first',
			activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券', '-1': '团购' },
			discountTypes: [10, 11, 12, 13],
			disabledPublishButton: false
		}
	},
	methods: {
		fetchData(id) {
		  this.pageLoading = true
		  getActivityInfo(id).then(response => {
		  	if (response.data) {
		  		response.data.cover = JSON.parse(response.data.cover)
          response.data.activitySetting = JSON.parse(response.data.activitySetting)
          response.data.address = JSON.parse(response.data.address)
          response.data.content = JSON.parse(response.data.content)
          response.data.requireColumns = JSON.parse(response.data.requireColumns)
          response.data.storeIds = JSON.parse(response.data.storeIds)
          response.data.advancedSetting = JSON.parse(response.data.advancedSetting)
          response.data.userSaleSetting = JSON.parse(response.data.userSaleSetting)
			  	this.activity = response.data
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		    this.pageLoading = false
		  })
		},
		getMerchant(id) {
			fetchMerchant(id).then(response => {
		  	if (response.data) {
		  		this.merchant = response.data
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		  })
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
        console.log('init cover...')
        let m = {name: '', uid: index, url: item, status: 'success'}
        this.coverFileList.push(m)
      })
      this.smallImgFileList = []
      this.activity.content.forEach((item, index) => {
        if (item.type === 'smallImg') {
          let ns = []
          item.value.forEach((it, idx) => {
            let n = {name: '', uid: idx, url: it, status: 'success'}
            ns.push(n)
          })
          this.smallImgFileList.push(ns)
        } else {
          this.smallImgFileList.push([])
        }
      })
    },
		publish() {
			this.disabledPublishButton = true
			let _activityVO = {}
			_activityVO = JSON.parse(JSON.stringify(this.activity))
			_activityVO.cover = JSON.stringify(_activityVO.cover)
			if (_activityVO.activitySetting.groups) {
				_activityVO.activitySetting.groups = this.adJustObjectArray(_activityVO.activitySetting.groups)
			}
      _activityVO.activitySetting = JSON.stringify(_activityVO.activitySetting)
      _activityVO.address = JSON.stringify(_activityVO.address)
      _activityVO.content = JSON.stringify(_activityVO.content)
      _activityVO.requireColumns = JSON.stringify(_activityVO.requireColumns)
      _activityVO.storeIds = JSON.stringify(_activityVO.storeIds)
      _activityVO.advancedSetting = JSON.stringify(_activityVO.advancedSetting)
      _activityVO.userSaleSetting = JSON.stringify(_activityVO.userSaleSetting)
      
      console.log(_activityVO)
      let that = this
      if (this.isEdit) {
      	console.log('edit...')
      	updateActivity(_activityVO).then(response => {
			  	if (response.data) {
			  		this.$message({
	            type: 'success',
	            message: '修改成功',
	            onClose: function() {
	            	if (that.activity.type < 10 ) {
	            		that.$router.push({ path: '/activity/list' })
	            	} else {
	            		that.$router.push({ path: '/activity/discount' })
	            	}
	            }
	          })
			  	} else {
			  		this.$message({
	            type: 'error',
	            message: res.msg
	          })
			  	}
			  }).catch(() => {
        }).then(() => {
        	that.disabledPublishButton = false
        })
      } else {
      	console.log('create...')
	      createActivity(_activityVO).then(response => {
			  	if (response.data) {
			  		this.$message({
	            type: 'success',
	            message: '创建成功！',
	            onClose: function() {
	            	if (that.activity.type < 10 ) {
	            		that.$router.push({ path: '/activity/list' })
	            	} else {
	            		that.$router.push({ path: '/activity/discount' })
	            	}
	            }
	          })
			  	} else {
			  		this.$message({
	            type: 'error',
	            message: res.msg
	          })
			  	}
			  }).catch(() => {
        }).then(() => {
        	that.disabledPublishButton = false
        })
			}
		},
		goList() {
			this.$router.push({ path: '/activity/list' })
		},
		adJustObjectArray(array) {
      let arrayBoo = []
      array.forEach((item, index) => {
        arrayBoo[index] = 0
        for( let key in item ){
          if(item[key].trim()) {
            arrayBoo[index] = arrayBoo[index] + 1
          } else {
            arrayBoo[index] = arrayBoo[index] + 0
          }
        }
      })
      arrayBoo.forEach((item, index) => {
        if(item < 1) {
          array.splice(index, 1)
        }
      })
      return array
    },
	}
}
</script>

<style lang="scss" scoped>
	.avtivity-editor-container {
		position: absolute;
		left: 30px;
		right: 30px;
		top: 15px;
		bottom: 10px;
		border: 1px solid #cbd5e0;
		background-color: #fff;
		border-radius: 4px;
		font-size: 13px;
	}
	.avtivity-editor-container.fullScreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
	}
	.action-bar {
		position: absolute;
		top: 0;
		width: 100%;
		left: 0;
		height: 45px;
		background-color: #f7f9fa;
	}
	.devicewin {
		position: absolute;
		left: 0;
		top: 45px;
		bottom: 0;
		overflow: hidden;
		width: 415px;
	}
	.device {
		width: 375px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 2px;
    background-color: #fff;
    .device-header {
	    width: 100%;
	    position: relative;
	    background-color: #fff;
	    color: #000;
	    border: 1px solid #e4e4e4;
	    border-bottom: none;
	    .text {
		    padding: 3px 0px;
		    width: 100%;
		    text-align: center;
		    line-height: 40px;
			}
			.icons {
				width: 100%;
				padding-top:3px;
				.svg-icon {
					margin: 0 4px;
					color: #333;
				}
			}
			.xiaochengxu {
				position: absolute;
				top: -1em;
		    right: 5px;
		    width: 5em;
		    height: 5em;
			}
		}
    .device-frame {
	    width: 100%;
	    border: 1px solid #e4e4e4;
	    border-top: 0;
	    min-height: 180px;
		}
	}
	#propertywin{
		position: absolute;
		right: 0;
		left: 0; // 415px
		bottom: 0;
		top: 45px;
    border-radius: 5px;
    min-height: 100px;
    // border-left: 1px solid #e4e4e4;
	}
	.tab-content-inner {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.editor-custom-btn-container {
		display: none
	}
</style>
<style lang="scss">
	#propertywin .el-tabs.top-tab {
		margin-left: -1px;
		.el-tabs__header {
		}
		.el-tabs__content {
			position: absolute;
			top: 41px;
			left: 0;
			right: 0;
			bottom: 0;
		}
		.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		}
		.el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			margin-left: 1px;
		}
	}
</style>