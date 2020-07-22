<template>
	<div>
		<div class="module">
			<div class="key-value-block__key">品牌名称</div>
			<div class="key-value-block__value">{{ merchant.name }}</div>
		</div>
		<div class="module">
			<div class="key-value-block__key">品牌LOGO</div>
			<div class="key-value-block__value"><img :src="merchant.logo"></div>
		</div>
		<div class="module module-block">
			<div class="block__heading">品牌简介</div>
			<div class="block__subtext">{{ merchant.intro }}</div>
		</div>
		<div class="module module-block">
			<div class="block__heading">品牌相册({{ merchant.introImgs.length }})</div>
			<div class="block__subblock img-wrapper">
				<div class="img-item" v-for="(item, index) in merchant.introImgs" :key="index">
					<img :src="item">
				</div>
			</div>
		</div>
		<div class="module">
			<div class="key-value-block__key">授权手机号</div>
			<div class="key-value-block__value">{{ merchant.mobile }}</div>
		</div>
		<div class="module">
			<div class="key-value-block__key">联系电话</div>
			<div class="key-value-block__value">
				<span v-for="(item, index) in merchant.phone" :key="index"> {{item }} <br /></span>
			</div>
		</div>
		<div class="module module-block" v-if="merchant.introVideo">
			<div class="block__heading">官方宣传片</div>
			<div class="block__subblock">
				<video controls width="500">
					<source :src="merchant.introVideo">
          Sorry, your browser doesn't support embedded videos.
        </video>
			</div>
		</div>
		<div class="module module-block">
			<div class="block__heading">团队({{ merchant.teamIntros.length }})</div>
			<div class="block__subblock img-wrapper">
				<div class="team-item" v-for="(item, index) in merchant.teamIntros" :key="index">
					<div class="img" >
						<img :src="item.img">
					</div>
					<div class="name">{{ item.name }}</div>
				</div>
			</div>
		</div>
		<div class="module module-block">
			<div class="block__heading">作品({{ merchant.productIntros.length }})</div>
			<div class="block__subblock img-wrapper">
				<div class="product-item" v-for="(item, index) in merchant.productIntros" :key="index">
					<div class="img" >
						<img :src="item.img">
					</div>
					<div class="name">{{ item.intro }}</div>
				</div>
			</div>
		</div>
		<div class="module">
			<div class="key-value-block__key">品牌优势</div>
			<div class="key-value-block__value">
				<div v-for="(item, index) in merchant.advantage" :key="index">
					<div style="">{{ index + 1 }}.{{ item.title }}</div>
					<div style="color: #808080">{{ item.content }}</div>
				</div>
			</div>
		</div>
		<div class="module">
			<div class="key-value-block__key">申请体验</div>
			<div class="key-value-block__value">
				<div>商家主页<span v-if="merchant.showApplyTry">显示</span><span v-else>不显示</span>申请体验</div>
				<div v-for="(item, index) in merchant.applyTry" :key="index">
					<div style="">{{ item }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchMerchant } from '@/api/merchant'

const defaultMerchant = {
	id: undefined,
  name: '...',
  authStatus: 0,
  intro: '...',
  mobile: '-',
  phone: [],
  wechat: '-',
  introImgs: [],
  address: {province: '', city: '', distinct: '', detail: '', tips: ''},
  teamIntros: [],
  productIntros: []
}

export default {
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
  },
  methods: {
  	fetchData(id) {
      fetchMerchant(id).then(response => {
      	if (response.code === '200') {
	      	if (response.data) {
	      		response.data.introImgs = JSON.parse(response.data.introImgs)
	      		response.data.phone = JSON.parse(response.data.phone)
	      		response.data.teamIntros = JSON.parse(response.data.teamIntros)
	      		response.data.productIntros = JSON.parse(response.data.productIntros)
	      		response.data.advantage = JSON.parse(response.data.advantage)
	      		response.data.applyTry = JSON.parse(response.data.applyTry)
	      		this.merchant = response.data
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
</style>