<template>
  <div style="padding: 0 15px;">
    <el-popover
    placement="bottom"
    width="200"
    trigger="click"
    popper-class="notice-popover">
    <div class="notice-list">
      <div class="notice-title">通知</div>
      <ul v-if="badgeNumber">
        <li class="text item" v-for="(value, key, index) in list" :key="index" v-if="value">
          <router-link style="color: #409EFF" :to="type[key].path">您有{{value}}个{{ type[key].name }}待审核</router-link>
        </li>
      </ul>
      <ul v-else>
        <li class="text item" style="font-size: 12px; color: #808080">无</li>
      </ul>
    </div>
    
    <el-badge :value="badgeNumber" class="item" slot="reference" :hidden="badgeNumber < 1">
      <el-button type="text"><i class="el-icon-bell"></i></el-button>
    </el-badge>
  </el-popover>
  </div>
  
</template>

<script>
import variables from '@/styles/variables.scss'

export default {
  name: 'Notice',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object,
      default: {1: 0, 2: 0}
    }
  },
  data() {
    return {
      type: {1: {name: '商家认证', path: '/merchant/renzheng/daishenhe'}, 2: {name: '提现', path: '/account/tixianshenhe/daishenhe'}}
    }
  },
  computed: {
    badgeNumber() {
      let badgeNumber = 0
      for (let [key, value] of Object.entries(this.list)) {
        if (+value > 0) {
          badgeNumber++
        }
      }
      return badgeNumber
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.notice-list {
  margin: 0 -12px;
}
.notice-title {
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  max-width: 100%;
  box-sizing: inherit;
  margin: 0;
  padding: 8px 16px 7px;
  cursor: default;
}
.notice-list ul {
  margin: 0;
  padding: 8px 0px;
}
li.text {
  padding: 0 15px;
  list-style: none;
  line-height: 32px;
  height: 32px;
  text-decoration: none;
  cursor: pointer;
}
li.text:hover {
  background-color: rgba(0, 112, 224, 0.1);
}
.notice-title {
  border-bottom: 1px solid #e6e8eb
}
.el-badge {
  margin-top: 8px;
  height: 28px;
}
.el-button {
  font-size: 20px;
  color: #3d464d;
  margin-top: 5px;
  padding-top: 0;
  padding-bottom: 0;
  vertical-align: top;
}
.notice {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.notice.is-active {
  transform: rotate(180deg);
}
</style>
