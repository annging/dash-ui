(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d9e7e32"],{1568:function(e,t,a){"use strict";var r=a("3f08"),n=a.n(r);n.a},3123:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a("b775");function n(){return Object(r["a"])({url:"https://www.tuantuanzhan.cn/api/v1/upload/token",method:"get"})}},"3f08":function(e,t,a){},"4e44":function(e,t,a){"use strict";var r=a("64b8"),n=a.n(r);n.a},"64b8":function(e,t,a){},"91e2":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-content"},[a("div",{staticClass:"left-container"},[a("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"1",mode:"horizontal",router:""}},[a("el-menu-item",{attrs:{index:"1",route:{path:"/activity/fangan/edit/"+e.id}}},[e._v("编辑方案")])],1),e._v(" "),a("el-row",[a("el-form",{ref:"form",attrs:{rules:e.rules,model:e.schemeForm,"label-width":"100px",size:"small"}},[a("el-form-item",{attrs:{label:"方案标题"}},[a("el-input",{model:{value:e.schemeForm.title,callback:function(t){e.$set(e.schemeForm,"title",t)},expression:"schemeForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"封面图"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{data:e.dataObj,multiple:!1,action:"http://upload-z2.qiniup.com","show-file-list":!1,"on-success":e.handleSuccess,"on-preview":e.handlePicturePreview,"on-remove":e.handleRemove,"before-upload":e.beforeUpload}},[e.schemeForm.imgUrl?a("img",{staticClass:"avatar",attrs:{src:e.schemeForm.imgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible,"modal-append-to-body":!1,"append-to-body":!0},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"100%",src:e.schemeForm.imgUrl,alt:""}})])],1),e._v(" "),a("el-form-item",{attrs:{label:"banner图片"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{data:e.dataObj,multiple:!1,action:"http://upload-z2.qiniup.com","show-file-list":!1,"on-success":e.handleSuccess1,"on-preview":e.handlePicturePreview1,"on-remove":e.handleRemove1,"before-upload":e.beforeUpload}},[e.schemeForm.bannerImg?a("img",{staticClass:"avatar1",attrs:{src:e.schemeForm.bannerImg}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon1"})]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible1,"modal-append-to-body":!1,"append-to-body":!0},on:{"update:visible":function(t){e.dialogVisible1=t}}},[a("img",{attrs:{width:"100%",src:e.schemeForm.bannerImg,alt:""}})])],1),e._v(" "),a("el-form-item",{attrs:{label:"标签"}},[a("el-select",{staticStyle:{width:"600px"},attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择方案标签"},model:{value:e.schemeForm.label,callback:function(t){e.$set(e.schemeForm,"label",t)},expression:"schemeForm.label"}},e._l(e.labelOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"方案介绍"}},[a("Tinymce",{ref:"editor1",attrs:{height:300},model:{value:e.schemeForm.explain,callback:function(t){e.$set(e.schemeForm,"explain",t)},expression:"schemeForm.explain"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"功能亮点"}},[a("Tinymce",{ref:"editor2",attrs:{height:300},model:{value:e.schemeForm.lightSpot,callback:function(t){e.$set(e.schemeForm,"lightSpot",t)},expression:"schemeForm.lightSpot"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"营销玩法"}},[a("Tinymce",{ref:"editor3",attrs:{height:300},model:{value:e.schemeForm.gameplay,callback:function(t){e.$set(e.schemeForm,"gameplay",t)},expression:"schemeForm.gameplay"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动类型"}},[a("el-select",{attrs:{placeholder:"请选择活动类型"},model:{value:e.schemeForm.type,callback:function(t){e.$set(e.schemeForm,"type",t)},expression:"schemeForm.type"}},e._l(e.activityTypes,(function(e){return a("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"活动行业"}},[a("el-select",{attrs:{placeholder:"请选择行业",filterable:"","allow-create":""},model:{value:e.schemeForm.industry,callback:function(t){e.$set(e.schemeForm,"industry",t)},expression:"schemeForm.industry"}},e._l(e.industrys,(function(e,t,r){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"会员门槛"}},[a("el-select",{attrs:{placeholder:"请选择会员等级"},model:{value:e.schemeForm.vipLevel,callback:function(t){e.$set(e.schemeForm,"vipLevel",t)},expression:"schemeForm.vipLevel"}},e._l(e.vipLevels,(function(e){return a("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"虚拟浏览量"}},[a("el-input",{model:{value:e.schemeForm.browse,callback:function(t){e.$set(e.schemeForm,"browse",t)},expression:"schemeForm.browse"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"虚拟参与量"}},[a("el-input",{model:{value:e.schemeForm.receive,callback:function(t){e.$set(e.schemeForm,"receive",t)},expression:"schemeForm.receive"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否推荐"}},[a("el-switch",{attrs:{"active-color":"#13ce66","active-value":1,"inactive-value":"0"},model:{value:e.schemeForm.isRecommend,callback:function(t){e.$set(e.schemeForm,"isRecommend",t)},expression:"schemeForm.isRecommend"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("修改")]),e._v(" "),a("el-button",{on:{click:e.cancel}},[e._v("取消")])],1)],1)],1)],1)])},n=[],i=(a("28a5"),a("ca41")),o=a("3123"),l=a("8256"),s={title:"",imgUrl:"",bannerImg:"",type:"",industry:"",explain:"",lightSpot:"",gameplay:"",browse:0,receive:0,vipLevel:"",isRecommend:0,label:"",id:""},c={name:"UpdataScheme",components:{Tinymce:l["a"]},data:function(){return{id:"",schemeForm:Object.assign({},s),activityTypes:[{key:1,label:"报名"},{key:2,label:"抽奖"},{key:3,label:"海报"},{key:4,label:"砍价"},{key:5,label:"秒杀"},{key:6,label:"拼团"},{key:7,label:"投票"},{key:8,label:"预约"},{key:9,label:"助力"},{key:10,label:"代金券"},{key:11,label:"折扣券"},{key:12,label:"兑换券"},{key:13,label:"体验券"}],industrys:{1:"教育/培训",2:"丽人/美发",3:"亲子/乐园",4:"运动健身",5:"休闲/玩乐",6:"美容/SPA",7:"嬌纱/摄影",8:"家居/装修",9:"生活服务",10:"餐饮美食",11:"母婴",12:"洗车",13:"服装"},vipLevels:[{key:1,label:"普通会员"}],rules:{title:[{required:!0,message:"请输入方案标题",trigger:"blur"},{min:3,max:50,message:"长度在 3 到 50 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],type:[{required:!0,message:"请选择一个活动类型",trigger:"change"}],industry:[{required:!0,message:"请选择一个行业",trigger:"change"}],desc:[{required:!0,message:"请填写方案介绍",trigger:"blur"}],cover:[{required:!0,message:"请上传封面图",trigger:"change"}]},dialogImageUrl:"",dialogVisible:!1,dialogVisible1:!1,labelOptions:[{value:"老带新",label:"老带新"},{value:"裂变",label:"裂变"}],listLoading:!1,dataObj:{token:""}}},created:function(){this.id=this.$route.params&&this.$route.params.id,this.fetchData(),this.fetchToken()},methods:{fetchData:function(){var e=this;this.listLoading=!0,Object(i["c"])(this.id).then((function(t){e.schemeForm=t.data,""!==e.schemeForm.label&&(e.schemeForm.label=e.schemeForm.label.split(",")),e.listLoading=!1}))},onSubmit:function(){var e=this;console.log("submit!"),Object(i["h"])(this.schemeForm).then((function(t){1*t.code==200?(e.$message({message:"编辑方案成功",type:"success"}),setTimeout((function(){e.$router.push({path:"/activity/fangan/index"})}),1500)):e.$message({message:t.msg,type:"error"})}))},beforeUpload:function(e){e.type;var t=e.size/1024/1024<2;return t||this.$message.error("上传头像图片大小不能超过 2MB!"),t},fetchToken:function(){var e=this;return new Promise((function(t,a){Object(o["a"])().then((function(a){var r=a.data;e._data.dataObj.token=r,t(!0)})).catch((function(e){console.log(e),a(!1)}))}))},handleRemove:function(e,t){console.log(e,t)},handleRemove1:function(e,t){console.log(e,t)},handleSuccess:function(e,t){this.schemeForm.imgUrl="http://ttz-user-file.qiniu.tuantuanzhan.cn/"+e.key},handleSuccess1:function(e,t){this.schemeForm.bannerImg="http://ttz-user-file.qiniu.tuantuanzhan.cn/"+e.key},handlePicturePreview:function(){this.dialogVisible=!0},handlePicturePreview1:function(){this.dialogVisible1=!0},cancel:function(){this.$router.push({path:"/activity/fangan/index"})}}},m=c,u=(a("4e44"),a("1568"),a("2877")),d=Object(u["a"])(m,r,n,!1,null,"6ab1764a",null);t["default"]=d.exports},aa77:function(e,t,a){var r=a("5ca1"),n=a("be13"),i=a("79e5"),o=a("fdef"),l="["+o+"]",s="​",c=RegExp("^"+l+l+"*"),m=RegExp(l+l+"*$"),u=function(e,t,a){var n={},l=i((function(){return!!o[e]()||s[e]()!=s})),c=n[e]=l?t(d):o[e];a&&(n[a]=c),r(r.P+r.F*l,"String",n)},d=u.trim=function(e,t){return e=String(n(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(m,"")),e};e.exports=u},c5f6:function(e,t,a){"use strict";var r=a("7726"),n=a("69a8"),i=a("2d95"),o=a("5dbc"),l=a("6a99"),s=a("79e5"),c=a("9093").f,m=a("11e9").f,u=a("86cc").f,d=a("aa77").trim,h="Number",f=r[h],p=f,b=f.prototype,v=i(a("2aeb")(b))==h,g="trim"in String.prototype,y=function(e){var t=l(e,!1);if("string"==typeof t&&t.length>2){t=g?t.trim():d(t,3);var a,r,n,i=t.charCodeAt(0);if(43===i||45===i){if(a=t.charCodeAt(2),88===a||120===a)return NaN}else if(48===i){switch(t.charCodeAt(1)){case 66:case 98:r=2,n=49;break;case 79:case 111:r=8,n=55;break;default:return+t}for(var o,s=t.slice(2),c=0,m=s.length;c<m;c++)if(o=s.charCodeAt(c),o<48||o>n)return NaN;return parseInt(s,r)}}return+t};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof f&&(v?s((function(){b.valueOf.call(a)})):i(a)!=h)?o(new p(y(t)),a,f):y(t)};for(var F,k=a("9e1e")?c(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;k.length>w;w++)n(p,F=k[w])&&!n(f,F)&&u(f,F,m(p,F));f.prototype=b,b.constructor=f,a("2aba")(r,h,f)}},ca41:function(e,t,a){"use strict";a.d(t,"f",(function(){return n})),a.d(t,"d",(function(){return i})),a.d(t,"a",(function(){return o})),a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return s})),a.d(t,"h",(function(){return c})),a.d(t,"e",(function(){return m})),a.d(t,"g",(function(){return u}));a("ac6a"),a("456d");var r=a("b775");function n(e,t){return Object(r["a"])({url:"/system/management/activity/getSpecialActivity?size="+e.size+"&current="+e.current,method:"post",data:t,headers:{"Content-Type":"application/json"},transformRequest:[function(e,t){for(var a in e)""===e[a]&&delete e[a];return e=JSON.stringify(e),e}]})}function i(e,t){return Object(r["a"])({url:"/system/activity/getActivityScheme?size="+e.size+"&current="+e.current,method:"post",data:t,headers:{"Content-Type":"application/json"},transformRequest:[function(e,t){for(var a in e)""===e[a]&&delete e[a];return e=JSON.stringify(e),e}]})}function o(e){return Object(r["a"])({url:"/system/activity/addActivityScheme",method:"post",data:e,transformRequest:[function(e){console.log(e);var t=Object.keys(e).length,a=0,r="";for(var n in e)r+=encodeURIComponent(n)+"="+encodeURIComponent(e[n]),a<t-1&&(r+="&",a++);return r}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function l(e){return Object(r["a"])({url:"/system/activity/getActivitySchemeInfo",method:"get",params:{schemeId:e}})}function s(e){return Object(r["a"])({url:"/system/activity/deleteScheme",method:"delete",params:{schemeId:e}})}function c(e){return Object(r["a"])({url:"/system/activity/updateActivityScheme",method:"post",data:e,transformRequest:[function(e){console.log(e);var t=Object.keys(e).length,a=0,r="";for(var n in e)r+=encodeURIComponent(n)+"="+encodeURIComponent(e[n]),a<t-1&&(r+="&",a++);return r}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function m(e,t){return Object(r["a"])({url:"/system/activity/getActivitys",method:"post",params:e,data:t,headers:{"Content-Type":"application/json"},transformRequest:[function(e,t){for(var a in e)""===e[a]&&delete e[a];return e=JSON.stringify(e),e}]})}function u(e){return Object(r["a"])({url:"/system/management/activity/setActivityWithGoodOrRecommend",method:"post",params:e})}},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);