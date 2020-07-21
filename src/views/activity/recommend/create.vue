<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="5" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/activity/list'}">活动列表</el-menu-item>
        <el-menu-item index="4" :route="{path:'/activity/discount'}">优惠券活动列表</el-menu-item>
        <el-menu-item index="2" :route="{path:'/activity/recommendActivity'}">首页推荐</el-menu-item>
        <el-menu-item index="3" :route="{path:'/activity/recommendAnli'}">优秀案例</el-menu-item>
      <el-menu-item index="5" :route="{path:'/activity/recommendActivityAdd'}">添加首页推荐</el-menu-item>
    </el-menu>
    <el-row>
      <div style="padding: 20px 100px; background-color: #f5f5f5; margin-bottom: 20px">开发中...</div>
      <el-form ref="form" :rules="rules" :model="recommendForm" label-width="100px" size="small">
        <el-form-item label="活动">
          <el-select v-model="recommendForm.activityId" placeholder="请选择活动" style="width: 100%" popper-class="paginationSelect">
            <el-option v-loading="listLoading" v-for="item in activityList" :key="item.id" :label="item.id + '-' + activityTypes[item.type].label + '-' + item.title" :value="item.id">
              <span class="label-id">{{ item.id }}</span>
              <span class="label-type">{{ activityTypes[item.type].label }}</span>
              <span class="label-title">{{ item.title }}</span>
              <el-tag type="success" size="mini" v-if="item.specialActivity && item.specialActivity.isRecommend > 0" style="float: right; margin-top: 6px;">已推荐</el-tag>
            </el-option>
            <pagination v-show="activityTotal>0" :total="activityTotal" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
          </el-select>
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model="recommendForm.weight"></el-input>
          <div class="tips" style="font-size: 13px; color: #999">数值越大，排序越靠前</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>
import { getActivitys, setActivityWithGoodOrRecommend, setWeight } from '@/api/activity'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultForm = {
    activityId: '',
    weight: 0
}

export default {
  name: 'CreateRecommend',
  components: { Pagination },
  data() {
    return {
      recommendForm: Object.assign({}, defaultForm),
      activityList: [],
      activityTotal: 0,
      listLoading: false,
      listQuery: {
        searchStr: '',
        current: 1,
        size: 10
      },
      activityTypes: [{ key: 1, label: '报名' }, { key: 2, label: '抽奖' }, { key: 3, label: '海报' }, { key: 4, label: '砍价' }, { key: 5, label: '秒杀' }, { key: 6, label: '拼团' }, { key: 7, label: '投票' }, { key: 8, label: '预约' }, { key: 9, label: '助力' }, { key: 10, label: '代金券' }, { key: 11, label: '折扣券' }, { key: 12, label: '兑换券' }, { key: 13, label: '体验券' }],
      rules: {
        activityId: [
          { activityId: true, message: '请选择一个活动', trigger: 'blur' }
        ]
      },
      dataObj: { token: '' }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getActivitys(this.listQuery).then(response => {
        if (response.data.records.length > 0) {
          response.data.records.forEach(item => {
            if (item.cover && item.cover !== 'string') {
              item.cover = JSON.parse(item.cover)
            }
            if (item.activitySetting) {
              item.activitySetting = JSON.parse(item.activitySetting)
            }
          })
        }
        this.activityList = response.data.records
        this.activityTotal = response.data.total
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('submit!')
      let that = this
      let data = {}
      data ={
        id: this.recommendForm.activityId,
        isRecommend: 1
      }
      setActivityWithGoodOrRecommend(data).then(response => {
        if (response.code === '200') {
          setWeight({activityId: this.recommendForm.activityId, type: 0, weight: this.recommendForm.weight}).then(response => {
            if (response.code === '200') {
              let that = this
              this.$message({
                type: 'success',
                message: '操作成功,返回列表页...',
                onClose: function() {
                  that.$router.push({ path: '/activity/recommendActivity' })
                }
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
    display: -webkit-box;
    display: flex;

    >div:last-child {
      margin-right: 40px;
    }
  }
  .secondary-sidebar {
    outline: none;
    -webkit-box-flex: 0;
    flex: 0 0 240px;
  }
  .left-container {
    position: relative;
    z-index: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-width: 420px;
    margin-left: 30px;
    outline: none;
  }
  .el-menu-item {
    height: 37px;
    line-height: 39px;
    padding: 0;
    margin-right: 20px;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 1px solid #000;
    color: #303133;
  }
  .label-id,
  .label-type,
  .label-title {
    display: inline-block;
  }
  .label-id,
  .label-type {
    width: 60px;
  }
</style>
<style lang="scss">
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
</style>
