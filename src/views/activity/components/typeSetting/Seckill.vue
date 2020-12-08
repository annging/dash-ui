<template>
	<div>
		<el-form ref="second" :rules="rules" :model="activity" label-width="150px" size="small">
			<el-form-item label="信息收集" prop="">
        <el-row type="flex" class="row-bg">
				  <el-col :span="12"><div class="grid-content selectField-content">
				  	<div class="tit">已选字段( {{ activity.requireColumns.length }} )</div>
				  	<ul>
				  		<li class="selectItem" v-for="(item, index) in activity.requireColumns" :key="index">
				  			<div class="itemName">{{ item.name }}</div>
				  			<el-checkbox class="checked" v-model="item.required">必填</el-checkbox>
				  			<i class="edit el-icon-edit" @click="handelEdit(item, index)"></i>
				  			<i class="delete el-icon-delete" @click="del(item, index)"></i>
				  		</li>
				  	</ul>
				  </div></el-col>
				  <el-col :span="12"><div class="grid-content commonField-content">
				  	<div class="tit">常用字段</div>
				  	<ul class="list">
				  		<li v-for="(item, index) in commonField" :key="index" :class="item.selected ? 'item selected' : 'item'" @click="toggleSelect(item, index)">{{item.name}}</li>
				  	</ul>
				  	<div class="tit">自定义字段</div>
				  	<ul class="customList">
				  		<li @click="editCustom('OneLineText')"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAS1BMVEUAAABgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYma+wu9hAAAAGHRSTlMA3u3opE1GRMtvh3MpC9+ZY2BXPgS2eBIY7bL6AAAAdklEQVQY05XPVw7DIBBFUTIlFPeS5O1/pbEsbA/my/cLjpCYcc/riLoKIxArJGa+m2KeoTcMWFeE0lpsENAWKFicWyDWfoAMgwB2qi9yjUFGmsZxSqDLmuNC5mkUzdOK3apOvffvve2geVYUffLf/eus5+Qe9AejKwZrfJIFOQAAAABJRU5ErkJggg=="><span>单行文本</span></li>
				  		<li @click="editCustom('TextArea')"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAWlBMVEUAAABgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmaAjSSDAAAAHXRSTlMAzUE8ck8b0GXn36milmtTRSb21MK8nVmJiDAGBXjzAUgAAAB/SURBVBjTtc5XDsIwEATQSRz3EjuVtve/JphVZMIv4v2MNNIW/I/uAMhkjEnm6EYiCRA7SmetA/ahSmA9ZUkCZ/METBonN4r3x0YFgw/Bb1x6eguY2yFF7hLj1ZIqWYied68k+a0VzS455YhGKdG/CFVqZB6nL6gW3X3QC371BHgzCJp01x7WAAAAAElFTkSuQmCC"><span>多行文本</span></li>
				  		<li @click="editCustom('Select')"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAP1BMVEUAAABgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZqi4AuAAAAFHRSTlMA8uKxqaMolbmc9umDNC4gHwkGv+8M7BwAAAB1SURBVBjTlZBJDsAgDAMddrov/v9bS6lQWyEO+OBIo0RJjF7NcSTHOH+ZJ5UxivQvO6mXuy6aZ2GRU/J9TzaVXseQzIpYBwS6DC03rMIkWbHRZigK0MzSgJIMaXAMDxwOGDZgY7xa1D4J/n98/WZoBFJH16kL6TEIZEWyJmIAAAAASUVORK5CYII="><span>单选</span></li>
				  		<li @click="editCustom('MultiSelect')"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAALVBMVEUAAABgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYmZgYma5vQ1VAAAADnRSTlMA8vegZoyGfXhJtZdbU55+pB4AAABISURBVAjXYyAM2ATBoAHI5HsHBg+ATCYIUwHIZIQwBWDMI3DmE1YoM/udgx2UOWE5M0ztWwY7uLapSCaAmQgrUC1mhzmHIAAA67ZA7MJDFZ8AAAAASUVORK5CYII="><span>多选</span></li>
				  	</ul>
				  </div></el-col>
				</el-row>
      </el-form-item>
      <el-form-item label="商品数量" prop="">
      	<el-input type="number" v-model="activity.activitySetting.repertory" maxlength="6" placeholder="请输入商品数量"></el-input>
      </el-form-item>
      <el-form-item label="商品原价" prop="">
      	<el-input type="digit" v-model="activity.activitySetting.originPrice" maxlength="6" placeholder="请输入商品原价"></el-input>
      </el-form-item>
      <el-form-item label="秒杀价格" prop="">
      	<el-input type="digit" v-model="activity.activitySetting.basePrice" maxlength="6" placeholder="请输入秒杀活动价"></el-input>
      </el-form-item>
      <el-form-item label="单人限制" prop="">
      	<el-input type="number" v-model="activity.activitySetting.individualLimit" maxlength="5" placeholder="单人可报人数,留空表示不限制"></el-input>
      </el-form-item>
      <el-form-item label="全额支付">
        <el-switch
          v-model="activity.activitySetting.fullPay"
          active-color="#13ce66"
          :active-value="true"
          :inactive-value="false">
        </el-switch>
      </el-form-item>
      <el-form-item label="预付款" prop="" v-if="!activity.activitySetting.fullPay">
      	<el-input type="digit" v-model="activity.activitySetting.advancePay" maxlength="6" placeholder="输入订金金额"></el-input>
      </el-form-item>
      <el-form-item label="秒杀列表显示">
        <el-switch
          v-model="activity.activitySetting.listShowType"
          active-color="#13ce66"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="留言">
        <el-switch
          v-model="activity.activitySetting.leaveMsg"
          active-color="#13ce66"
          :active-value="true"
          :inactive-value="false">
        </el-switch>
      </el-form-item>
      <el-form-item label="秒杀按钮文案（可自定义）" prop="">
      	<el-input v-model="activity.activitySetting.buttonText" maxlength="20" placeholder="默认: 立即秒杀"></el-input>
      </el-form-item>
      <el-form-item label="参与门店" prop="">
      	<el-select v-model="activity.storeIds" multiple placeholder="请选择" style="width: 600px;">
			    <el-option
			      v-for="item in stores"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
      </el-form-item>
		</el-form>
		<el-dialog
	    :title="typeName[editItem.type]"
	    :visible.sync="customDialogVisible"
	    :modal-append-to-body="false"
	    :append-to-body="true"
	    width="600px"
	    :before-close="handleClose">
	    <div class="custom-container">
	    	<el-form ref="custom" :rules="customRules" :model="editItem" label-width="100px" size="small">
	    		<div v-if="editItem.type=='OneLineText' || editItem.type =='Mobile' || editItem.type=='IdNumber' || editItem.type=='Address' || editItem.type=='Mail'">
		    		<el-form-item label="字段名称" prop="name">
		    			<el-input v-model="editItem.name" maxlength="10" placeholder="请输入字段名称(10个字符以内)"></el-input>
		    		</el-form-item>
		    		<el-form-item label="字段描述" prop="desc">
		    			<el-input v-model="editItem.desc" maxlength="" type="textarea" :rows="2" placeholder="请说明字段怎么填写"></el-input>
		    		</el-form-item>
	    		</div>
	    		<div v-if="editItem.type=='TextArea'">
		    		<el-form-item label="字段名称" prop="name">
		    			<el-input v-model="editItem.name" maxlength="10" placeholder="请输入字段名称(10个字符以内)"></el-input>
		    		</el-form-item>
		    		<el-form-item label="字段描述" prop="desc">
		    			<el-input v-model="editItem.desc" maxlength="" type="textarea" :rows="2" placeholder="请说明字段怎么填写"></el-input>
		    		</el-form-item>
	    		</div>
	    		<div v-if="editItem.type=='Select'">
		    		<el-form-item label="字段名称" prop="name">
		    			<el-input v-model="editItem.name" maxlength="200" placeholder="请输入字段名称(200个字以内)"></el-input>
		    		</el-form-item>
		    		<el-form-item label="选项" prop="ext">
		    			<div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in editItem.ext.values" :key="index">
		    				<el-input v-model="editItem.ext.values[index]" maxlength="30" placeholder="请输入选项"></el-input>
		    				<el-button size="mini" @click.prevent="removeXuanxiang(item, index)">删除</el-button>
		    			</div>
		    			<el-button size="mini" @click.prevent="addXuanxiang()">+添加选项</el-button>
		    		</el-form-item>
	    		</div>
	    		<div v-if="editItem.type=='MultiSelect'">
		    		<el-form-item label="字段名称" prop="name">
		    			<el-input v-model="editItem.name" maxlength="200" placeholder="请输入字段名称(200个字以内)"></el-input>
		    		</el-form-item>
		    		<el-form-item label="选项" prop="ext">
		    			<div style="display: flex; align-items: flex-start; margin-top: 10px;" v-for="(item, index) in editItem.ext.values" :key="index">
		    				<el-input v-model="editItem.ext.values[index]" maxlength="30" placeholder="请输入选项"></el-input>
		    				<el-button size="mini" @click.prevent="removeXuanxiang(item, index)">删除</el-button>
		    			</div>
		    			<el-button size="mini" @click.prevent="addXuanxiang()">+添加选项</el-button>
		    		</el-form-item>
		    		<el-form-item label="最少选几项" prop="">
		    			<el-input v-model="editItem.ext.min" placeholder="最少选几项"></el-input>
		    		</el-form-item>
		    		<el-form-item label="最多选几项" prop="">
		    			<el-input v-model="editItem.ext.max" placeholder="最多选几项"></el-input>
		    		</el-form-item>
	    		</div>
	    		<el-form-item>
	          <el-button type="primary" @click="onSubmit">保存</el-button>
	          <el-button  @click="resetForm('custom')">取消</el-button>
	        </el-form-item>
	    	</el-form>
	    </div>
	  </el-dialog>
  </div>
</template>

<script>
import { getRequirecolumns } from '@/api/activity'
import { getStores } from '@/api/merchant'

export default {
	name: 'TypeApply',
	components: { },
	props: {
		activity: {
		  type: Object,
		  default: function() {
        return {}
      }
		},
		merchantId: {
		  type: String,
		  default: 0
		}
	},
	data() {
    return {
      rules: {
      },
      customRules: {},
      commonField: [],
      customDialogVisible: false,
      editItem: {},
      editItemIndex: -1,
      typeName: {'OneLineText': '单行文本', 'TextArea': '多行文本', 'Select': '单选', 'MultiSelect': '多选'},
      stores: []
    }
  },
  created() {
    this.init()
  },
	mounted() {
  },
  methods: {
    init() {
    	this.getRequirecolumns()
    	this.getStores()
    },
    getRequirecolumns() {
    	getRequirecolumns().then(response => {
		  	if (response.msg === 'ok') {
		  		this.commonField = response.data
		  		this.initCommonField()
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		  })
    },
    initCommonField() {
    	this.activity.requireColumns.forEach((item, index) => {
    		this.commonField.forEach((t, i) => {
    			if (t.name == item.name) {
    				t.selected = true
    			}
    		})
      })
    },
    getStores() {
			getStores({ merchantId: this.merchantId }).then(response => {
		  	if (response.msg === 'ok') {
		  		this.stores = response.data
		  	} else {
		  		this.$message({
            type: 'error',
            message: '出了点问题'
          })
		  	}
		  })
    },
    toggleSelect(item, index) {
    	if (item.selected) {
    		this.commonField[index].selected = false
    		let indx = -1
    		this.activity.requireColumns.forEach((it, idx) => {
    			if (it.name == item.name) {
    				indx = idx
    			}
    		})
    		this.activity.requireColumns.splice(indx, 1)
    	} else {
    		this.commonField[index].selected = true
    		this.activity.requireColumns.push(item)
    	}
    },
    del(item, index) {
    	this.activity.requireColumns.splice(index, 1)
    	this.commonField.forEach((t, i) => {
    		if (t.name == item.name) {
    			t.selected = false
    		}
    	})
    },
    handelEdit(item, index) {
    	this.editCustom(item.type, index)
    },
    editCustom(type, index) {
    	if (index > -1) {
    		this.editItem = this.activity.requireColumns[index]
    		if (this.editItem.ext) {
    			if (typeof(this.editItem.ext)=='string') {
		    		this.editItem.ext = JSON.parse(this.editItem.ext)
		    	}
		    	if (typeof(this.editItem.ext.values)=='string') {
		    		this.editItem.ext.values = JSON.parse(this.editItem.ext.values)
		    	}
	    	}
    		this.editItemIndex =  index
    	} else {
    		if (type == 'OneLineText') {
    			this.editItem = {name: "", required: false, type: "OneLineText", desc: ''}
    		} else if (type == 'TextArea') {
    			this.editItem = {name: "", required: false, type: "TextArea", desc: ''}
    		} else if (type == 'Select') {
    			this.editItem = {ext: {"min":1,"max":1,"values":[]}, name: "", required: false, type: "Select"}
    		} else if (type == 'MultiSelect') {
    			this.editItem = {ext: {"min":1,"max":"","values":[]}, name: "", required: false, type: "MultiSelect"}
    		}
    		this.editItemIndex = -1
    	}
    	this.customDialogVisible = true
    },
    addXuanxiang() {
    	this.editItem.ext.values.push('')
    },
    removeXuanxiang(item, index){
    	this.editItem.ext.values.splice(index, 1)
    },
    handleClose(done) {
      console.log('关闭弹窗')
      this.customDialogVisible = false
      done()
    },
    onSubmit() {
    	if (this.editItem.ext) {
	    	this.editItem.ext = JSON.stringify(this.editItem.ext)
	    }
	    if (this.editItemIndex > -1) {
	    	this.activity.requireColumns.splice(this.editItemIndex, 1 , this.editItem)
	    } else {
    		this.activity.requireColumns.push(this.editItem)
    	}
    	this.customDialogVisible = false
    },
    resetForm(form) {
    	this.customDialogVisible = false
    	this.editItem = {}
    	this.editItemIndex = -1
    }
  }
}
</script>

<style type="scss" scoped>
	.commonField-content {
		border: 1px solid #ccc;
		padding: 20px;
	}
	.commonField-content .list {
		padding: 0;
		list-style: none;
	}
	.commonField-content .list .item {
		display: inline-block;
		margin: 8px 8px 8px 0;
		padding: 5px 15px;
		border: 1px solid #ddd;
		cursor: pointer
	}
	.commonField-content .item.selected {
		position: relative;
		border: 1px solid #409EFF;
	}
	.commonField-content .item.selected:after {
		position: absolute;
		right: 0;
		top: 0;
		content: '✓';
		line-height: 20px;
		color: #409EFF;
		font-weight: bold;
	}
	.selectField-content ul {
		padding: 0;
		margin-top: 0;
		list-style: none;
	}
	.selectField-content .item {
		margin: 8px 0;
	}
	.selectField-content .selectItem {
    margin-top: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
	}
	.selectField-content .selectItem .itemName {
    height: 40px;
    line-height: 40px;
    width: 260px;
    border: 1px solid #dddfe6;
    padding-left: 15px;
	}
	.selectField-content .selectItem .checked {
		margin-left: 20px;
	}
	.selectField-content .selectItem .edit,
	.selectField-content .selectItem .delete {
		margin-left: 15px;
		cursor: pointer
	}
	.customList {
		padding: 0;
		margin-top: 0;
		list-style: none;
	}
	.customList li {
		display: inline-block;
		margin: 8px 8px 8px 0;
		padding: 5px 15px;
		border: 1px solid #ddd;
		cursor: pointer
	}
	.customList li img {
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
	}
</style>
