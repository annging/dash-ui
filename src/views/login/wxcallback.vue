<template>
	<div></div>
</template>

<script>
import axios from 'axios'

export default {
	components: { },
  data() {
    return {
    	code: '',
    	state: ''
    }
  },
  created() {
		this.code = this.$route.query && this.$route.query.code
		this.state = this.$route.query && this.$route.query.state
    this.wxCallback()
  },
  methods: {
  	wxCallback() {
  		let that = this
  		this.$store.dispatch('user/wxlogin', { code: this.code, state: this.state }).then(() => {
        this.$router.push({ path: this.redirect || '/' })
      }).catch((error) => {
      	console.log(error)
      })
  		/* axios.get('http://9466ut.natappfree.cc/system/login/callBack?code=' + this.code + '&state=' + this.state)
			  .then(function (response) {
			    // handle success
			    console.log(response)
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error)
			  })
			  .then(function () {
			    // always executed
			  }) */
  	}
  }
}
</script>