<template>
  <div class="main-content">
    <div class="left-container">
      <el-row type="flex" justify="space-between" :gutter="10" class="info-container activity-info" style="margin-bottom: 20px;">
        <el-col class="left"><div class="a-logo"><img :src="activity.cover[0]"></div></el-col>
        <el-col class="mid">
          <div class="a-info">
            <div class="a-title">{{ activity.title }}</div>
            <div class="a-intro">{{ activity.desc }}</div>
            <div class="a-meta"><span class="label">类型:</span>{{ activityTypes[activity.type] }}</div>
            <div><span class="label">时间:</span>{{ activity.startTime | moment("YYYY-MM-DD HH:mm:ss") }} 至 {{ activity.endTime | moment("YYYY-MM-DD HH:mm:ss") }}</div>
            <!--<div v-if="activity.createUserId">
              <span class="label">创建者:</span><router-link  target="_blank" style="color: #409EFF" :to="'/user/detail/' + activity.createUserId">{{ activity.createUserId }}</router-link>
            </div>
            <div><span class="label">商家: </span>
              <router-link target="_blank" style="color: #409EFF" :to="'/merchant/detail/' + activity.merchantId + '/overview'">{{ activity.merchantId }}</router-link></div>-->
            </div>
        </el-col>
      </el-row>
      <el-menu :default-active="activeTabMenu" mode="horizontal" router style="margin-bottom: 20px;">
        <el-menu-item :index="'/activity/detail/' + id + '/overview'">概览</el-menu-item>
        <el-menu-item :index="'/activity/detail/' + id + '/order'">订单</el-menu-item>
        <el-menu-item :index="'/activity/detail/' + id + '/statistics'">统计数据</el-menu-item>
        <el-menu-item v-if="activity.type == 7 && groupNamesReady == true" :index="'/activity/detail/' + id + '/voteList'" @click="goVoteList(id)" >投票选手</el-menu-item>
      </el-menu>
      <router-view />
    </div>
    <div class="secondary-sidebar">
      <div class="vertically-fixed">
        <div class="qrcodeImg"><img :src="qrcodeImgUrl"></div>

        <div class="merchant-info">
          商家: <router-link target="_blank" style="color: #409EFF" :to="'/merchant/detail/' + activity.merchantId + '/overview'">{{ activity.merchant.name }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivityInfo } from '@/api/activity'
import { getImgUrl } from '@/api/wx'
import { getUserInfo } from '@/utils/auth'

const defaultActivity = {
  id: undefined,
  cover: []
}

export default {
  data() {
    return {
      id: '',
      type: '',
      activity: Object.assign({}, defaultActivity),
      qrcodeImgUrl: '',
      typePage: { 1: 'pages/activeDetail/activeDetail', 2: '', 3: '', 4: 'pages/bargain/bargainDetail', 5: 'pages/seckill/seckillDetail', 6: 'pages/group/groupDetail', 7: 'pages/vote/voteDetail', 8: '', 9: '', '-1': 'pages/grpPurchase/grpPurchaseDetail' }, // 活动类型 1 报名,2 抽奖,3 海报,4 砍价,5 秒杀,6 拼团,7 投票,8 预约,9 助力,10 优惠券(代金券),11 优惠券(折扣券),12 优惠券(兑换券),13 优惠券(体验券)
      activityTypes: { 1: '报名', 2: '抽奖', 3: '海报', 4: '砍价', 5: '秒杀', 6: '拼团', 7: '投票', 8: '预约', 9: '助力', 10: '代金券', 11: '折扣券', 12: '兑换券', 13: '体验券', '-1': '团购' },
      groupNames: '',
      groupNamesReady: false
    }
  },
  computed: {
    activeTabMenu() {
      const route = this.$route
      const { meta, path } = route
      return path
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    // this.type = this.$route.params && this.$route.params.type
    this.fetchData(this.id)
    // this.getParams()
    // this.getActivityImgUrl(this.id, this.type)
  },
  methods: {
    goVoteList(id) {
      this.$router.push({path:'/activity/detail/' + id + '/voteList',query:{groupNames: encodeURIComponent(JSON.stringify(this.groupNames))}});
    },
    fetchData(id) {
      getActivityInfo(id).then(response => {
        if (response.code === '200') {
          response.data.cover = JSON.parse(response.data.cover)
          response.data.activitySetting = JSON.parse(response.data.activitySetting)
          this.activity = response.data
          this.groupNames = response.data.activitySetting.groupNames || []
          this.groupNamesReady = true
          this.getActivityImgUrl(this.id, this.activity.type)
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
    },
    getActivityImgUrl(id, type) {
      const page = this.typePage[type]
      if (!page) {
        return
      }
      const shareUser = JSON.parse(getUserInfo())
      // console.log(shareUser.id)
      getImgUrl({
        page: page,
        scene: 'id=' + id + '&shareUserId=' + shareUser.id
      }).then(response => {
        if (response.code === '200') {
          this.qrcodeImgUrl = response.data
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
    padding-left: 40px;
  }
  .vertically-fixed {
    position: fixed;
    z-index: 2;
    height: 100%;
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
  .activity-info {
    background-color: #f7f9fa;
    padding: 16px;
    /* margin-top: 24px;*/
    margin-bottom: 8px;
    border-radius: 4px;
    border-color: #dddfe1;
    .a-logo {
      width: 200px;
      height: 168px;
      border-radius: 4px;
      overflow: hidden;
      text-align: center;
      img {
        width: 100%;
        margin: 0 -100%;
      }
    }
    .a-info {
      font-size: 14px;
      padding: 10px 16px 10px 10px;
      color: #7b8994;
      line-height: 1.25;
      .a-title {
        color: #47525d;
        font-size: 24px;
      }
      .a-intro {
        padding-top: 8px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > div {
        padding: 5px 0;
      }
      .label {
        display: inline-block;
        width: 50px;
      }
    }
    .left {
      flex:0 0 220px;
    }
  }
  .merchant-info {
    margin-top: 30px;
  }
  .qrcodeImg {
    margin-top: 0px;
    border: 1px solid #eee;
    width: 198px;
    height: 198px;
    img {
      width: 100%;
    }
  }
</style>
