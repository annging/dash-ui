(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0dc57fbc"],{"3aa4":function(t,e,s){},6588:function(t,e,s){"use strict";s("3aa4")},d124:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main-content"},[s("div",{staticClass:"left-container"},[s("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"1",mode:"horizontal",router:""}},[s("el-menu-item",{attrs:{index:"1",route:{path:"/user/detail/"+t.id}}},[t._v("用户信息")])],1),s("div",{staticClass:"user-info table-info"},[s("div",{staticClass:"module"},[s("div",{staticClass:"key-value-block__key"},[t._v("id")]),s("div",{staticClass:"key-value-block__value"},[t._v(t._s(t.user.id))])]),s("div",{staticClass:"module"},[s("div",{staticClass:"key-value-block__key"},[t._v("微信头像")]),s("div",{staticClass:"key-value-block__value"},[s("img",{attrs:{src:t.user.wxImg}})])]),s("div",{staticClass:"module"},[s("div",{staticClass:"key-value-block__key"},[t._v("用户类型")]),s("div",{staticClass:"key-value-block__value"},[t._v(t._s(t.userTypes[t.user.type]))])]),s("div",{staticClass:"module"},[s("div",{staticClass:"key-value-block__key"},[t._v("用户来源")]),s("div",{staticClass:"key-value-block__value"},[t._v(t._s(t.userSources[t.user.source]))])])])],1),s("div",{staticClass:"secondary-sidebar"})])},i=[],c=s("c24f"),u={data:function(){return{id:"",user:{id:""},userTypes:{0:"客户",1:"管理员",2:"客服",3:"员工"},userSources:{1:"商家版",2:"用户版",3:"管理员",4:"员工"}}},computed:{activeTabMenu:function(){var t=this.$route,e=(t.meta,t.path);return e}},created:function(){this.id=this.$route.params&&this.$route.params.id,this.fetchData(this.id)},methods:{fetchData:function(t){var e=this;Object(c["g"])(t).then((function(t){"200"===t.code?t.data&&(e.user=t.data):e.$message({type:"error",message:t.msg})}))}}},l=u,r=(s("6588"),s("2877")),o=Object(r["a"])(l,a,i,!1,null,"79c8e164",null);e["default"]=o.exports}}]);