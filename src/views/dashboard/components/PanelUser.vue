<template>
  <div>
    <div class="title">
      <div class="left">用户数据</div>
      <div class="right">
        <svg-icon icon-class="filter" />
        <span>今日</span>
      </div>
    </div>
    <el-row :gutter="20" class="panel-group" style="clear: both">
      <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
        <div class="card-panel" @click="">
          <div class="card-panel-description">
            <div class="card-panel-text">
              新用户数<el-tooltip content="首次访问小程序页面的用户数，同
一用户多次访问不重复计" placement="top" effect="light"><el-button type="text" icon="el-icon-question"></el-button></el-tooltip>
            </div>
            <div class="card-panel-num">50</div>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              访问人数<el-tooltip content="访问小程序内所有页面的总用户数，
同一用户多次访问不重复计" placement="top" effect="light"><el-button type="text" icon="el-icon-question"></el-button></el-tooltip>
            </div>
            <div class="card-panel-num">500</div>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              打开次数<el-tooltip content="打开小程序总次数，用户从打开小
程序到主动关闭小程序或超时退出
计为一次" placement="top" effect="light"><el-button type="text" icon="el-icon-question"></el-button></el-tooltip>
            </div>
            <div class="card-panel-num">500</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 13px;
  line-height: 18px;
  padding: 10px 0;
  color: #999;
  .svg-icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
    cursor: pointer;
  }
}
.panel-group {
  margin-top: 18px;
  font-size: 13px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    display: -webkit-box;
    display: flex;
    //box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border: 1px solid #e6e8eb;
    border-radius: 5px;
    .card-panel-icon-wrapper {
      color: #fff;
    }

    .icon-people {
      background: #40c9c6;
    }

    .icon-view {
      background: #36a3f7;
    }

    .icon-money {
      background: #f4516c;
    }

    .icon-targetpeople {
      background: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 20px 0 0 14px;
      padding: 8px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 42px;
    }

    .card-panel-description {
      margin: 26px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 1);
        font-size: 14px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
      .count-money:before {
          content: '￥';
          font-size: 12px;
      }
    }
  }
}

.el-button--text {
  color: #999;
}
</style>