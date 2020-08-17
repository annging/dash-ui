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

