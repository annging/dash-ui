<template>
	<div class="login-or-register-page">
		<div class="mast-head">
			<div class="container">
				<nav class="mast-head-nav">
					<ul class="nav-list">
						<li class="nav-list__item"><a href="/" class="button-link">官网</a></li>
					</ul>
					<ul class="nav-list">
					</ul>
				</nav>
				<h1 id="ttz-logo" class="ttz-logo">
					<a href="/" class="ttz-logo__link">
						<img v-if="logo" :src="logo" class="ttz-logo__glyph">
					</a>
				</h1>
			</div>
		</div>
		<div id="outer-frame">
			<div id="page-content">
				<div id="login-or-register-page-content">
					<img data-js-component-id="component5058836606153428546" src="https://cfl.dropboxstatic.com/static/images/empty_states/sign-in-boulder-vfl2oGV4v.png" data-hi-res="https://cfl.dropboxstatic.com/static/images/empty_states/sign-in-boulder@2x-vfl87XcA-.png" alt="" class="login-or-register-img">
					<div class="login-register-container-wrapper">
						<div class="login-register-container">
							<wxlogin v-if="getready" id="login_container" :appid="appid" :scope="scope" :redirect_uri="redirect_uri" :self_redirect="self_redirect" :state="state"></wxlogin>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import wxlogin from 'vue-wxlogin'

export default {
  name: 'wxLogin',
  components: { wxlogin },
  data() {
    return {
    	getready: false,
    	self_redirect: '',
    	id: '',
      appid: '',
      scope: '',
      redirect_uri: '',
      state: '',
      logo: '/images/logo.png'
    }
  },
  created() {
  	this.initWxLogin()
  },
  methods: {
  	initWxLogin() {
  		let that = this
  		this.getready = false
  		axios.get('http://47.107.137.16:8090/system/login/wxLogin')
			  .then(function (response) {
			    // handle success
			    console.log(response)
			    response=response.data
			    if (response.code == 200) {
				    that.self_redirect = response.data.selfRedirect
	          that.id = response.data.id
	          that.appid = response.data.appid
	          that.scope = response.data.scope
	          that.redirect_uri = response.data.redirectUri
	          that.state = response.data.state
	          that.getready = true
					}
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error)
			  })
			  .then(function () {
			    // always executed
			  })

  	}
  }
}
</script>

<style lang="scss" scoped>
	#login_container {
		text-align: center;
	}
	.mast-head {
    top: 0;
    right: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    height: 76px;
    line-height: 26px;
    z-index: 99;
    font-size: 0;
    background-color: #fff;
    border-bottom: 1px solid #d0d4d9;
    box-shadow: 0px 1px 1px #d0d4d9;
	}
	.mast-head .container {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    max-width: 1200px;
    min-width: 600px;
    position: relative;
	}
	.mast-head .mast-head-nav {
    top: 22px;
    right: 105px;
    bottom: 22px;
    left: 105px;
    position: absolute;
    width: auto;
    height: 32px;
    z-index: 3;
	}
	.mast-head .mast-head-nav .nav-list {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 50%;
    font-size: 0;
	}
	.mast-head .mast-head-nav .nav-list:nth-of-type(1) {
    text-align: left;
    vertical-align: middle;
	}
	.mast-head .mast-head-nav .nav-list:nth-of-type(2) {
    text-align: right;
	}
	.mast-head .mast-head-nav .nav-list .nav-list__item {
    display: inline-block;
    vertical-align: middle;
    text-align: right;
	}
	.mast-head .mast-head-nav .nav-list:nth-of-type(2) .nav-list__item {
    margin: 0 0 0 12px;
	}
	.mast-head .mast-head-nav .nav-list:nth-of-type(1) .nav-list__item {
    margin: 0 12px 0 0;
	}
	.button-link {
    margin: 0;
    padding: 7px 16px;
    font-size: 12px;
    border-radius: 5px;
    -webkit-filter: none;
    filter: none;
	}
	.button-link {
    padding-left: 0;
    padding-right: 0;
    font-size: 14px;
    border: none;
    background: none;
    color: #007ee5;
    outline: none;
	}
	.button-link:hover {
    text-decoration: underline;
    border: none;
    background: none;
    -webkit-filter: none;
    filter: none;
	}
	.mast-head .button-link {
    color: #0061ff;
	}
	.mast-head .button-link:hover {
    color: #0052d9;
	}
	.ttz-logo {
    margin: 13px auto;
    width: 180px;
    position: relative;
    height: 46px;
    max-width: 220px;
    font-size: 0;
    text-align: left;
    display: block;
    z-index: 3;
	}
	a {
    color: #005ff8;
    text-decoration: none;
  }
	.ttz-logo__link {
    display: inline-block;
	}
	.ttz-logo__glyph {
    z-index: 4;
    vertical-align: middle;
    height: 46px;
    width: 165px;
    -o-object-fit: contain;
    object-fit: contain;
    display: inline-block;
    -webkit-transition: all 300ms ease-in-out 0s;
    transition: all 300ms ease-in-out 0s;
	}
	#outer-frame {
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
	}
	#page-content {
    padding-bottom: 28px;
    min-height: 425px;
	}
	#outer-frame #page-content {
    width: 100%;
	}
	#login-or-register-page-content {
    padding-top: 106px;
    text-align: center;
	}
	#login-or-register-page-content .login-or-register-img {
    display: none
	}
	@media (min-width: 991px) {
        #login-or-register-page-content .login-or-register-img {
          display:inline-block;
          vertical-align: middle;
          margin-right: 90px;
          margin-bottom: 31px;
            margin-top: -60px;
        }
	}
	.login-register-container-wrapper {
    display: inline-block;
    vertical-align: middle;
	}
	.login-register-container {
    width: 350px;
	}
	#login-or-register-page-content .login-register-container {
    display: inline-block;
    vertical-align: middle;
    margin-top: 64px;
    margin-bottom: 64px;
	}
</style>