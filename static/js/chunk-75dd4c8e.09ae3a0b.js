(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75dd4c8e"],{3706:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main-content"},[n("div",{staticClass:"left-container"},[n("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"4",mode:"horizontal",router:""}},[n("el-menu-item",{attrs:{index:"1",route:{path:"/user/index"}}},[e._v("用户列表")]),n("el-menu-item",{attrs:{index:"2",route:{path:"/user/virtual"}}},[e._v("虚拟用户")]),n("el-menu-item",{attrs:{index:"4",route:{path:"/user/admin"}}},[e._v("后台管理员")]),n("el-menu-item",{attrs:{index:"3",route:{path:"/user/black"}}},[e._v("小黑屋(已删除的用户)")])],1),n("el-row",{staticClass:"list"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"",size:"small","header-cell-style":{"background-color":"#f7f9fa",color:"#637282;"}}},[n("el-table-column",{attrs:{prop:"id",label:"ID",sortable:"",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.id))])]}}])}),n("el-table-column",{attrs:{label:"头像",width:"60"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[n("img",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t.wxImg}})]}}])}),n("el-table-column",{attrs:{label:"微信昵称"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.nickName))])]}}])}),n("el-table-column",{attrs:{label:"手机号"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.mobile))])]}}])}),n("el-table-column",{attrs:{label:"用户类型"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(e.userTypes[a.type]))])]}}])}),n("el-table-column",{attrs:{label:"用户来源"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(e.userSources[a.source]))])]}}])}),n("el-table-column",{attrs:{label:"操作",width:"250px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){return e.handleView(t.$index,t.row)}}},[e._v("查看")]),n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){return e.handleDelete(t.$index,t.row)}}},[e._v("取消后台管理员")])]}}])})],1)],1)],1)])},s=[],i=(n("a434"),n("c24f")),l={components:{},data:function(){return{list:null,listLoading:!0,levels:{1:"普通会员"},userTypes:{0:"客户",1:"管理员",2:"客服",3:"员工"},userSources:{1:"商家版",2:"用户版",3:"管理员",4:"员工"}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(i["e"])().then((function(t){t.data&&(e.list=t.data),e.listLoading=!1}))},handleView:function(e,t){this.$router.push({path:"/user/detail/"+t.id})},handleDelete:function(e,t){var n=this;this.$confirm("确认取消设置为后台管理员?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["b"])({userId:t.id}).then((function(t){1*t.code===200?(n.$message({type:"success",message:"操作成功!"}),n.list.splice(e,1)):n.$message({type:"error",message:t.msg})}))})).catch((function(){n.$message({type:"info",message:"已取消操作"})}))}}},r=l,o=(n("7b2b"),n("2877")),u=Object(o["a"])(r,a,s,!1,null,"8d370de8",null);t["default"]=u.exports},"7b2b":function(e,t,n){"use strict";n("ac39")},a434:function(e,t,n){"use strict";var a=n("23e7"),s=n("23cb"),i=n("a691"),l=n("50c4"),r=n("7b0b"),o=n("65f0"),u=n("8418"),c=n("1dde"),d=n("ae40"),f=c("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,h=Math.min,b=9007199254740991,v="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!p},{splice:function(e,t){var n,a,c,d,f,p,g=r(this),w=l(g.length),_=s(e,w),y=arguments.length;if(0===y?n=a=0:1===y?(n=0,a=w-_):(n=y-2,a=h(m(i(t),0),w-_)),w+n-a>b)throw TypeError(v);for(c=o(g,a),d=0;d<a;d++)f=_+d,f in g&&u(c,d,g[f]);if(c.length=a,n<a){for(d=_;d<w-a;d++)f=d+a,p=d+n,f in g?g[p]=g[f]:delete g[p];for(d=w;d>w-a+n;d--)delete g[d-1]}else if(n>a)for(d=w-a;d>_;d--)f=d+a-1,p=d+n-1,f in g?g[p]=g[f]:delete g[p];for(d=0;d<n;d++)g[d+_]=arguments[d+2];return g.length=w-a+n,c}})},ac39:function(e,t,n){}}]);