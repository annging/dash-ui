<template>
	<div class="main-content">
		<div class="left-container">
			<el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      <el-menu-item index="1" :route="{path:'/user/detail/' + id}">用户信息</el-menu-item>
	    	</el-menu>
			<div class="user-info table-info">
				<div class="module">
					<div class="key-value-block__key">id</div>
					<div class="key-value-block__value">{{ user.id }}</div>
				</div>
				<div class="module">
					<div class="key-value-block__key">微信头像</div>
					<div class="key-value-block__value"><img :src="user.wxImg"></div>
				</div>
				<div class="module">
					<div class="key-value-block__key">用户类型</div>
					<div class="key-value-block__value">{{ userTypes[user.type] }}</div>
				</div>
				<div class="module">
					<div class="key-value-block__key">用户来源</div>
					<div class="key-value-block__value">{{ userSources[user.source] }}</div>
				</div>
			</div>
		</div>
		<div class="secondary-sidebar"></div>
	</div>
</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  data() {
    return {
    	id: '',
    	user: {
    		id: ''
    	},
    	userTypes: { 0: '客户', 1: '管理员', 2:'客服', 3: '员工'},
	    userSources: { 1: '商家版', 2: '用户版', 3: '管理员', 4: '员工' }
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
  },
  methods: {
  	fetchData(id) {
      getUserInfo(id).then(response => {
      	if (response.code === '200') {
	      	if (response.data) {
	      		this.user = response.data
		      }
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
	.module {
		font-size: 14px;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
		color: #1b2733;
		line-height: 1.5em;
		min-height: 72px;
		padding: 8px;
		font-size: 14px;
		color: #1b2733;
		line-height: 1.5;
		.key-value-block__key {
			flex:0 0 140px;
		}
		.key-value-block__value {
			-webkit-box-flex: 1;
			flex-grow: 1;
			padding-left: 10px;
			img {
				max-width: 100px;
			}
		}
		.block__heading {
			font-size: 14px;
		}
		.block__subtext {
			font-size: 12px;
			color: #637282;
			margin: 4px 0 16px 0;
			margin-top: 10px;
		}
		.block__subblock {
			margin-top: 10px;
		}
		&:not(:first-child) {
	    border-top: 1px solid #e6e8eb;
		}
		&.module-block {
			display: block;
			padding: 24px 8px;
	    line-height: 1.5em;
		}
		.img-wrapper {
			width: 800px;
	    display: flex;
	    flex-flow: row wrap;
	    align-content: flex-start;
	    .img-item,
	    .team-item，
	    .product-item {
	    	box-sizing: border-box;
	     	background-color: white;
	     	flex: 0 0 160px;
	     	padding: 0px 10px 10px 0;
	    }
	    .img-item {
	    	img {
	     		width: 150px;
	     		height: 150px;
	     		border: 1px solid #e6e8eb;
	     	}
	    }
	    .team-item {
	    	flex: 0 0 100px;
	    	img {
	    		width: 80px;
	    		height: 80px;
	    		border-radius: 50%;
	    	}
	    	.name {
	    		width: 80px;
	    		text-align: center;
	    	}
	    }
	    .product-item {
	    	width: 350px;
	    	margin-bottom: 16px;
	    	img {
	    		width: 334px;
	    		height: 186px;
	    		border: 1px solid #e6e8eb;
	    	}
	    }
		}
	}
	.user-info {
		margin-top: 30px;
	}
	.table-info .module .key-value-block__key {
		font-weight: bold
	}
</style>