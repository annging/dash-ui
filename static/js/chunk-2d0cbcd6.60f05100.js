(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cbcd6"],{"4ae8":function(t,e,c){"use strict";c.r(e);var s=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div")},n=[],o=(c("bc3a"),{components:{},data:function(){return{code:"",state:""}},created:function(){this.code=this.$route.query&&this.$route.query.code,this.state=this.$route.query&&this.$route.query.state,this.wxCallback()},methods:{wxCallback:function(){var t=this;this.$store.dispatch("user/wxlogin",{code:this.code,state:this.state}).then((function(){t.$router.push({path:t.redirect||"/"})})).catch((function(t){console.log(t)}))}}}),u=o,i=c("2877"),r=Object(i["a"])(u,s,n,!1,null,null,null);e["default"]=r.exports}}]);