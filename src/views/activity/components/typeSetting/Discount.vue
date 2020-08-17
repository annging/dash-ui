<template>
	<div>
		<el-form ref="second" :rules="rules" :model="activity" label-width="150px" size="small">
			<el-form-item label="减免金额(元)" prop="" v-if="activity.type==10">
      	<el-input type="digit" v-model="activity.activitySetting.reduceAmount" maxlength="6" placeholder="请输入减免金额"></el-input>
      </el-form-item>
      <el-form-item label="折扣" prop="" v-if="activity.type == 11">
	      <el-input type="digit" v-model="activity.activitySetting.discount" maxlength="" placeholder="请输入折扣"></el-input>
	    </el-form-item>
			<el-form-item label="使用门槛(元)" prop="" v-if="activity.type==10 || activity.type == 11 || activity.type == 12">
	      <el-input type="digit" v-model="activity.activitySetting.consumeThreshold" maxlength="" placeholder="满多少可用,0则无门槛"></el-input>
	    </el-form-item>
	    <el-form-item label="原价" prop="" v-if="activity.type == 13">
	      <el-input type="digit" v-model="activity.activitySetting.originalPrice" maxlength="4" placeholder="请输入原价"></el-input>
	    </el-form-item>
	    <el-form-item label="体验价" prop="" v-if="activity.type == 13">
	      <el-input type="digit" v-model="activity.activitySetting.experiencePrice" maxlength="4" placeholder="请输入体验价"></el-input>
	    </el-form-item>
	    <el-form-item :label="activityTypes[activity.type] + '数量'" prop="">
	      <el-input type="number" v-model="activity.activitySetting.couponNum" maxlength="" placeholder="请合理设置"></el-input>
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
  </div>
</template>

<script>
import { getStores } from '@/api/merchant'

export default {
	name: 'TypeDiscount',
	components: {  },
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
		}
	},
	data() {
    return {
      rules: {
      },
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' },
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
    	this.getStores()
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
    }
  }
}
</script>
