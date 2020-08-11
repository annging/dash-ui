<template>
	<el-row class="avtivity-editor-container" v-bind:class="{ fullScreen: isFullScreen}">
		<el-row class="action-bar" type="flex" align="middle" justify="end">
			<el-button size="small" type="text">保存</el-button>
			<el-button size="small">预览</el-button>
			<el-button size="small" type="primary" style="min-width: 120px;">发布</el-button>
			<el-button class="btn-fullScreen" size="small" @click="isFullScreen = !isFullScreen">全屏</el-button>
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
		<div id="propertywin">
			<el-tabs v-model="activeTabName" type="card" class="top-tab">
    	<el-tab-pane label="基本设置" name="first">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<base-apply-setting :activity=activity v-if="activity.type==1"/><!-- 报名 -->
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
    	<el-tab-pane :label="activityTypes[activity.type] + '管理'" name="second">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<type-apply-setting :activity=activity v-if="activity.type==1"/><!-- 报名 -->
    				<vote-setting v-model="activity"  v-if="activity.type == 'vote'"/>
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
    	<el-tab-pane label="高级设置" name="third">
    		<el-scrollbar class="tab-content-inner">
    			<div style="padding: 16px;">
    				<advanced-apply-setting :activity=activity v-if="activity.type==1"/><!-- 报名 -->
    				<vote-more-setting  v-if="activity.type == 'vote'"/>
    			</div>
    		</el-scrollbar>
    	</el-tab-pane>
  	</el-tabs>
		</div>
	</el-row>
</template>

<script>
import { getActivityInfo } from '@/api/activity'
import { parseTime } from '@/utils'
import BaseApplySetting from './baseSetting/Apply'
import TypeApplySetting from './typeSetting/Apply'
import AdvancedApplySetting from './advancedSetting/Apply'
import VoteSetting from './VoteSetting'
import VoteMoreSetting from './VoteMoreSetting'

export default {
	name: 'ActivityEditor',
	components: { BaseApplySetting, TypeApplySetting, AdvancedApplySetting, VoteSetting, VoteMoreSetting },
	props: {
		isEdit: {
		  type: Boolean,
		  default: false
		}
	},
	created() {
		if (this.isEdit) {
			const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
	data() {
		return {
			activity: {
				id: 0,
				cover: [],
				title: '',
				startTime: '',
				endTime: '',
				enableActivityTime: 0,
				activityStartTime: '',
				activityEndTime: '',
				address: { province: '', city: '', distinct: '', detail: '', tips: '' },
				content:[{type:'text',value:''}]
			},
			pageLoading: false,
			isFullScreen: false,
			activeTabName: 'first',
			activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' },
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
		  		this.activity = response.data
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		    this.pageLoading = false
		  })
		}
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
			top: 40px;
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