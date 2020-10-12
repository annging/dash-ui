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
      	<el-form-item label="限底价购买">
	        <el-switch
	          v-model="activity.activitySetting.buyOnlyBasePrice"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	        <div style="font-size: 12px; color: #999">开启后顾客必须砍刀底价才能购买；关闭后则不限制价格，都能购买。</div>
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
	      <el-form-item label="虚拟砍价人气">
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
	      <el-form-item label="参与砍价需输入口令">
	        <el-switch
	          v-model="activity.advancedSetting.registerOnlyAcceptWord"
	          active-color="#13ce66"
	          :active-value="true"
	          :inactive-value="false">
	        </el-switch>
	      </el-form-item>
	      <el-form-item label="口令内容" prop="" v-if="activity.advancedSetting.registerOnlyAcceptWord">
	      	<el-input v-model="activity.advancedSetting.registerWord" placeholder="1-20个字符" maxlength="10"></el-input>
	      </el-form-item>
	      <el-form-item label="获取口令的提示" prop="" v-if="activity.advancedSetting.registerOnlyAcceptWord">
	      	<el-input v-model="activity.advancedSetting.shibbolethHint" placeholder="提示参与者如何获取口令，比如通过关注某公众号获取(选填）"></el-input>
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
</style>
