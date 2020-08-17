<template>
	<div>
		<el-form ref="first" :rules="rules" :model="activity" label-width="150px" size="small">
      <el-form-item :label="activityTypes[activity.type * 1] + '名称'" prop="">
        <el-input v-model="activity.activitySetting.title" maxlength="50" placeholder="控制在30字以内"></el-input>
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
      <el-form-item label="规则">
        <div style="color: #666; font-size: 12px; padding: 10px 15px; background-color: #fafafa">
          <p>1.订单中包含特价商品时不能使用优惠券，不能与其他优惠（如促销活动）同时使用;</p>
          <p>2.每个订单只能使用一张优惠券;</p>
          <p>3.商家对优惠券使用细则的最终解释权。</p>
        </div>
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
