<template>
  <div>
    <div class="title">
      <div class="left">用户分析</div>
      <div class="right" style="display: none;">
        <svg-icon icon-class="filter" />
        <span>筛选</span>
      </div>
    </div>
    <el-row :gutter="20" class="panel-group" style="clear: both">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              新客人数
            </div>
            <div class="card-panel-num">{{ userAnalysis.newUser }}</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              老客人数
            </div>
            <div class="card-panel-num">{{ userAnalysis.oldUser }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'PanelUser',
  components: {
  },
  props: {
    userAnalysis: {
      type: Object,
        default: function() {
          return {}
        }
    }
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
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
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
      // float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: center;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
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

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>