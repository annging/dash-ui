<template>
	<div>
		<wxlogin v-if="getready" id="login_container" :appid="appid" :scope="scope" :redirect_uri="redirect_uri" :self_redirect="self_redirect" :state="state"></wxlogin>
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
      state: ''
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

<style lang="scss">
	#login_container {
		text-align: center;
		margin-top: 65px;
	}
</style>