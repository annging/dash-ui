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
      	<el-form-item label="超级优惠券">
          <el-switch
            v-model="activity.activitySetting.needShare"
            active-color="#13ce66"
            :active-value="true"
            :inactive-value="false">
          </el-switch>
        </el-form-item>
        <el-form-item label="邀请好友数" prop="" v-if="activity.activitySetting.needShare">
          <el-input type="number" v-model="activity.activitySetting.shareNum" placeholder="领取超级优惠券需邀请好友数(最多9人)"></el-input>
        </el-form-item>
        <el-form-item label="新客专享">
          <el-switch
            v-model="activity.activitySetting.exclusive"
            active-color="#13ce66"
            :active-value="true"
            :inactive-value="false">
          </el-switch>
          <div style="color: #999; font-size: 12px;">打开后，该优惠券只允许从未下过单的顾客领取</div>
        </el-form-item>
        <el-form-item label="领券必填">
          <el-switch
            v-model="activity.activitySetting.necessary"
            active-color="#13ce66"
            :active-value="true"
            :inactive-value="false">
          </el-switch>
          <div style="color: #999; font-size: 12px;">打开后，领取需获取顾客手机号码</div>
        </el-form-item>
	    </div>
		</el-form>
  </div>
</template>

<script>

export default {
	name: 'AdvancedDiscount',
	components: { },
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
      }
    }
  },
  created() {
    this.init()
  },
	mounted() {
  },
  methods: {
    init() {
    }
  }
}
</script>

