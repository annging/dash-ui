<template>
<div class="main-content">
  <div class="left-container">
    <el-menu default-active="1" class="" mode="horizontal" router style="margin-bottom: 20px;">
      <el-menu-item index="1" :route="{path:'/platform/level/create/'}">添加会员等级</el-menu-item>
    </el-menu>
    <el-row>
      <el-form ref="form" :rules="rules" :model="memberLevelForm" label-width="100px" size="small">
        <el-form-item label="等级名称" prop="name">
          <el-input v-model="memberLevelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺数量">
          <el-input v-model="memberLevelForm.storeNumber"></el-input>
        </el-form-item>
        <el-form-item label="员工数量">
          <el-input v-model="memberLevelForm.staffNumber"></el-input>
        </el-form-item>
        <el-form-item label="月付价格(元)">
          <el-input v-model="memberLevelForm.monthlyPay"></el-input>
        </el-form-item>
        <el-form-item label="季付价格(元)">
          <el-input v-model="memberLevelForm.quarterlyPay"></el-input>
        </el-form-item>
        <el-form-item label="年付价格(元)">
          <el-input v-model="memberLevelForm.yearPay"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
  <!--<div class="secondary-sidebar"></div>-->
</div>
</template>

<script>

export default {
  name: 'CreateMemberLevel',
  components: { },
  data() {
    return {
      memberLevelForm: {},
      rules: {
        name: [
          { required: true, message: '请输入会员等级名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      /*addActivityScheme(this.schemeForm).then(res => {
        if (res.code * 1 == 200) {
          this.$message({
            message: '创建方案成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: '/activity/fangan/index' });
          }, 1.5 * 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })*/
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

