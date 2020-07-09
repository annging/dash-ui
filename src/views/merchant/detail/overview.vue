<template>
	<div>
		<div class="module">
			<div class="key-value-block__key">品牌LOGO</div>
			<div class="key-value-block__value"><img :src="merchant.logo"></div>
		</div>
		<div class="module">
			<div class="key-value-block__key">名称</div>
			<div class="key-value-block__value">{{ merchant.name }}</div>
		</div>
		<div class="module">
			<div class="key-value-block__key">介绍</div>
			<div class="key-value-block__value">{{ merchant.intro }}</div>
		</div>
	</div>
</template>

<script>
import { fetchMerchant } from '@/api/merchant'

const defaultMerchant = {
	id: undefined
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
      	if(response.code === '200') {
	      	if(response.data) {
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
	&:not(:first-child) {
    border-top: 1px solid #e6e8eb;
	}
}
</style>