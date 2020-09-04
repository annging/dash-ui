<template>
	<div class="main-content">
	  	<div class="left-container">
		    <el-row type="flex" justify="space-between" :gutter="10" class="info-container merchant-info" style="margin-bottom: 20px;">
          <el-col class="left"><div class="m-logo"><img :src="merchant.logo"></div></el-col>
          <el-col class="mid">
            <div class="m-info">
              <div class="m-title">{{ merchant.name }}
                <el-tag type="info" size="mini" v-if="merchant.authStatus===0">未认证</el-tag>
                <el-tag type="info"  size="mini" v-if="merchant.authStatus===2 && merchant.authType===1">个人认证</el-tag>
                <el-tag type="info"  size="mini" v-if="merchant.authStatus===2 && merchant.authType===2">企业认证</el-tag>
              </div>
              <div class="m-intro">{{ merchant.intro }}</div>
              <div class="m-other">
                <span class="label">手机号:</span><span>{{ merchant.mobile }}</span> <br />
                <span class="label">微信号:</span><span>{{ merchant.wechat }}</span> <br />
                <span class="label">地  址:</span><span>{{ merchant.address.province + merchant.address.city + merchant.address.distinct + merchant.address.detail }} | {{ merchant.address.tips }}
                </span>
              </div>
            </div>
          </el-col>
	      </el-row>
        <el-menu :default-active="activeTabMenu"  mode="horizontal" router style="margin-bottom: 20px;">
          <el-menu-item :index="'/merchant/detail/' + id + '/overview'" >概览</el-menu-item>
          <el-menu-item :index="'/merchant/detail/' + id + '/activitys'" >活动</el-menu-item>
          <el-menu-item :index="'/merchant/detail/' + id + '/statistics'">数据分析</el-menu-item>
        </el-menu>
        <router-view />
	    </div>
	  	<div class="secondary-sidebar">
        <div class="qrcodeImg"><img :src="qrcodeImgUrl"></div>
      </div>
	</div>
</template>

<script>
import { fetchMerchant } from '@/api/merchant'
import { getImgUrl } from '@/api/wx'
import { getUserInfo } from '@/utils/auth'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultMerchant = {
	id: undefined,
  name: '...',
  authStatus: 0,
  intro: '...',
  mobile: '-',
  phone: [],
  wechat: '-',
  address: {province: '', city: '', distinct: '', detail: '', tips: ''}
}

export default {
	components: { Pagination },
  data() {
    return {
    	id: '',
    	merchant: Object.assign({}, defaultMerchant),
      qrcodeImgUrl: ''
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
    this.fetchData(this.id)
    // this.getParams()
    this.getMerchantHomeImgUrl(this.id)
  },
  methods: {
    getParams () {
      let routerParams = this.$route.params
    },
  	fetchData(id) {
      fetchMerchant(id).then(response => {
      	if (response.code === '200') {
	      	if (response.data) {
            response.data.phone = JSON.parse(response.data.phone)
            response.data.address = JSON.parse(response.data.address);
	      		this.merchant = response.data
		      }
	      } else {
	      	this.$message({
            type: 'error',
            message: response.msg
          })
	      }
      })
    },
    getMerchantHomeImgUrl(id) {
      let shareUser = JSON.parse(getUserInfo())
      getImgUrl({
        page: 'pages/merchant/home',
        scene: 'merchantId=' + id + '&shareUserId=' + shareUser.id
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
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    // 添加商家
    goCreate() {
    	this.$router.push({ path: '/merchant/create' });
    },
    handleView(index, row) {
    	this.$router.push({ path: '/merchant/detail/' + row.id });
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
  .merchant-info {
    background-color: #f7f9fa;
    padding: 16px;
    margin-top: 24px;
    margin-bottom: 8px;
    border-radius: 4px;
    border-color: #dddfe1;
    .m-logo {
      width: 120px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .m-info {
      font-size: 14px;
      padding: 10px 16px 10px 10px;
      color: #7b8994;
      line-height: 1.25;
      .m-title {
        color: #47525d;
        font-size: 28px;
      }
      .m-intro {
        padding-top: 8px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .m-other {
        margin-top: 10px;
        span {
          display: inline-block;
          vertical-align: top;
          &.label {
            width: 50px;
          }
        }
      }
    }
    .left {
      flex:0 0 140px;
    }
  }
  .qrcodeImg {
    margin-top: 30px;
    width: 200px;
    img {
      width: 100%;
    }
  }
</style>
