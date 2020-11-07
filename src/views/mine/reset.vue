<template>
	<div class="main-content">
	  	<div class="left-container">
	    	<el-menu default-active="2" class="" mode="horizontal" router style="margin-bottom: 20px;">
		      	<el-menu-item index="2" :route="{path:'/mine/reset'}">重置密码</el-menu-item>
	    	</el-menu>
	    	<el-row>
        <el-form ref="resetForm" :rules="rules" :model="resetForm" label-width="100px" size="small" style="width: 500px;">
          <el-form-item label="新密码" prop="password">
            <el-input v-model="resetForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmpassword">
            <el-input v-model="resetForm.confirmpassword"></el-input>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleReset">重置密码</el-button>
        </el-form>
      </el-row>
	    </div>
	  	<!--<div class="secondary-sidebar"></div>-->
	</div>
</template>

<script>

export default {
	components: { },
  data() {
    return {
    	loading: false,
    	resetForm: {
    		password: '',
    		confirmpassword: ''
    	},
    	rules: {
    		password: [{ required: true, trigger: 'blur' }],
    		confirmpassword: [{ required: true, trigger: 'blur' }]
    	}
    }
  },
  created() {
	},
  methods: {
  	handleReset() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
        	if(this.resetForm.password !== this.resetForm.confirmpassword) {
        		this.$message({
        			type: 'error',
        			message: '两次输入的密码不一样'
             })
        		return false
        	}
          this.loading = true
          this.$store.dispatch('user/reset', this.resetForm).then(() => {
            this.$router.push({ path: '/login' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
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
</style>
