<template>
  <div class="main-content">
    <div class="dashboard-container">
      <!--<div class="dashboard-text">name: {{ name }}</div>-->
      <panel-group
      :marketingData=marketingData />
      <panel-user
      :userData=userData />
    </div>
    <div class="secondary-sidebar">
      <div class="" style="margin-top: 30px;">
        <el-button slot="reference" type="primary" size="medium" class="btn-create" @click="goFangan">创建方案 ▾</el-button>
        <el-popover
          width="200"
          v-model="createPopvisible"
          trigger="click" style="display: none">
          <div class="newActvity-section">
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">拼团</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">优惠券</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">预约</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">报名</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">抽奖</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">海报</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">砍价</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">秒杀</div>
              </div>
            </span>
            <span class="popover-content-item">
              <div class="popover--item">
                <div class="text">助力</div>
              </div>
            </span>
          </div>
          <el-button slot="reference" type="primary" size="medium" class="btn-create">创建方案 ▾</el-button>
        </el-popover>
        <ul class="action-menu">
          <!--<li class="menu-item"><el-link :underline="false"><svg-icon icon-class="user" /><span class="text">对账</span></el-link></li>-->
        </ul>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { marketingData, userData } from '@/api/statistics'
import PanelGroup from './components/PanelGroup'
import PanelUser from './components/PanelUser'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    PanelUser
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      createPopvisible: false, // 创建活动弹窗
      marketingData: {
        accumulationPeople: 0,
        activityTotal: 0,
        incomeTotal: 0,
        merchantsTotal: 0
      },
      userData: {
        newUser: 0,
        openCount: 0,
        visitPeople: 0
      },
      userDataQuery: {
        time: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      marketingData().then(response => {
        if(response.data) {
          this.marketingData = response.data
        }
      })
      this.userDataQuery.time = new Date()
      userData(this.userDataQuery).then(response => {
        if(response.data) {
          this.userData = response.data
        }
      })
    },
    goFangan() {
      this.$router.push({ path: '/activity/fangan/create' });
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  display: -webkit-box;
  display: flex;
}
.dashboard {
  &-container {
    position: relative;
    z-index: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-width: 420px;
    margin-left: 30px;
    outline: none;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.btn-create {
  width: 100%;
}
.action-menu {
  list-style-type: none;
  padding: 0;
  .menu-item {
    height: 32px;
    line-height: 32px;
    padding: 0 5px;
    color: #0070e0;
    .text {
      padding-left: 5px;
    }
  }
}
.el-link.el-link--default {
    color: #0070e0;
}
.popover-content-item {
    width: 100%;
    box-sizing: border-box;
    padding: 4px 16px;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    text-decoration: none;
    display: block;
    position: relative;
    transition: background-color .15s ease-out;
    &:hover {
      background-color: #f7f9fa;
      z-index: 0;
    }
    .popover--item {
      height: 32px;
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      flex-direction: row;
      -webkit-box-align: center;
      align-items: center;
      margin-left: -3px;
      .svg-icon {
        width: 24px;
        height: 24px;
      }
      .text {
          padding-left: 13px;
      }
    }
}
.secondary-sidebar {
  outline: none;
  -webkit-box-flex: 0;
  flex: 0 0 240px;
  margin-right: 40px;
  padding-left: 40px;
}
</style>
