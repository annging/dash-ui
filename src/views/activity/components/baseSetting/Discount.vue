<template>
	<div>
		<el-form ref="first" :rules="rules" :model="activity" label-width="150px" size="small">
      <el-form-item :label="activityTypes[activity.type] + '名称'" prop="控制在30字以内">
        <el-input v-model="activity.activitySetting.title" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="开始领取时间" prop="startTime">
      	<el-date-picker
		      v-model="activity.startTime"
		      type="datetime"
		      placeholder="请选择开始领取时间">
		    </el-date-picker>
      </el-form-item>
      <el-form-item label="结束领取时间" prop="endTime">
      	<el-date-picker
		      v-model="activity.endTime"
		      type="datetime"
		      placeholder="请选择报名结束时间">
		    </el-date-picker>
      </el-form-item>
		</el-form>
  </div>
</template>

<script>

export default {
	name: 'Discount',
	components: {  },
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
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券' },
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
