<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="logo-title">管理中心</div>
    <!--<breadcrumb class="breadcrumb-container" />-->

    <div class="right-menu">
      <!--<el-button type="primary" size="medium" class="btn-create" icon="el-icon-plus">创建活动</el-button>-->
      <notice :list="notices" class="notice-container" />

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <span class="nickname">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!--<a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided @click.native="reset">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Notice from '@/components/Notice'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Notice
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  data() {
    return {
      notices: {},
      websock: null
    }
  },
  created() {
    this.initWebSocket()
  },
  methods: {
    initWebSocket(){ //初始化weosocket
      let url = 'ws://47.107.137.16:8090'
      if (process.env.NODE_ENV === 'production') {
        url = 'ws://47.107.137.16:8090'
      } else {
        // url = 'ws://47.114.59.178:9999/prod-api'
      }
      const wsuri = url + "/socket"
      if('WebSocket' in window){
        this.websock = new WebSocket(wsuri)
      }else{
        this.$message({
          type: 'error',
          message: '浏览器不支持websocket，请换个浏览器'
        })
      }
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen(){ //连接建立之后执行...
      // let actions = {"test":"12345"}
      // this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e){ //数据接收
      this.notices = JSON.parse(e.data)
      console.log(this.notices)
      console.log(typeof(this.notices))
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data)
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    reset() {
      this.$router.push('/mine/reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  padding: 20px 30px 0 15px;
  overflow: hidden;
  position: relative;
  background: #fff;
  /*box-shadow: 0 1px 4px rgba(0,21,41,.08);*/
  .logo-title {
    line-height: 46px;
    height: 100%;
    float: left;
    font-size: 20px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .015)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;

    &:focus {
      outline: none;
    }
    .btn-create {
      vertical-align: 13px;
      margin-right: 5px;
    }
    .notice-container {
      display: inline-block;
      height: 100%;
      vertical-align: -1px;
      margin-right: 15px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .nickname {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        vertical-align: top;
      }

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        height: 40px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
