(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2857d272"],{"14ec":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-content"},[n("div",{staticClass:"left-container"},[n("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"1",mode:"horizontal",router:""}},[n("el-menu-item",{attrs:{index:"1",route:{path:"/activity/list"}}},[t._v("活动列表")]),t._v(" "),n("el-menu-item",{attrs:{index:"2",route:{path:"/activity/recommendActivity"}}},[t._v("首页推荐")]),t._v(" "),n("el-menu-item",{attrs:{index:"3",route:{path:"/activity/recommendAnli"}}},[t._v("优秀案例")])],1),t._v(" "),n("el-row",{staticClass:"filter-container",staticStyle:{"margin-bottom":"20px"},attrs:{type:"flex"}},[n("el-input",{attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.searchStr,callback:function(e){t.$set(t.listQuery,"searchStr",e)},expression:"listQuery.searchStr"}})],1),t._v(" "),n("el-row",{staticClass:"list"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","max-height":t.maxHeight,size:"small","header-cell-style":{"background-color":"#f7f9fa",color:"#637282;"}}},[n("el-table-column",{attrs:{fixed:"",prop:"id",label:"ID",sortable:"",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"封面",width:"120"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.row;return[n("img",{staticStyle:{width:"100px",height:"60px"},attrs:{src:e.cover[0]}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动标题",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.title))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(t.activityTypes[i.type]))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"价格"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(0===i.basePrice?"免费":i.basePrice.toFixed(2)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动时间",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(t._f("moment")(i.startTime,"YYYY-MM-DD HH:mm:ss"))+" "),n("br"),t._v("- "),n("br"),t._v(t._s(t._f("moment")(i.endTime,"YYYY-MM-DD HH:mm:ss"))+" ")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"商家"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.merchantId))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.status))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"是否推荐到首页"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.isRecommend))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"是否优秀案例"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.isAnli))])]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.setActivityWithGoodOrRecommend(e.$index,e.row,"isRecommend")}}},[t._v("推荐到首页")]),t._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.setActivityWithGoodOrRecommend(e.$index,e.row,"isGood")}}},[t._v("设为优秀案例")])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.current,limit:t.listQuery.size},on:{"update:page":function(e){return t.$set(t.listQuery,"current",e)},"update:limit":function(e){return t.$set(t.listQuery,"size",e)},pagination:t.getList}})],1)],1)])},a=[],r=(n("ac6a"),n("ca41")),o=n("333d"),c={components:{Pagination:o["a"]},data:function(){return{list:[],total:0,listLoading:!1,listQuery:{searchStr:"",current:1,size:20},listFilter:{type:""},clientHeight:"",maxHeight:400,activityTypes:{1:"报名",2:"抽奖",3:"海报",4:"砍价",5:"秒杀",6:"拼团",7:"投票",8:"预约",9:"助力",10:"代金券",11:"折扣券",12:"兑换券",13:"体验券"}}},watch:{clientHeight:function(){this.changeFixed(this.clientHeight)}},created:function(){this.listLoading=!1,this.getList()},mounted:function(){this.clientHeight="".concat(document.documentElement.clientHeight);var t=this;window.onresize=function(){t.clientHeight="".concat(document.documentElement.clientHeight)}},methods:{changeFixed:function(t){this.maxHeight=t-85-110-100},getList:function(){var t=this;this.listLoading=!0,Object(r["e"])(this.listQuery,this.listFilter).then((function(e){e.data.records.length>0&&e.data.records.forEach((function(t){t.cover&&"string"!=t.cover&&(t.cover=JSON.parse(t.cover)),t.activitySetting&&(t.activitySetting=JSON.parse(t.activitySetting))})),t.list=e.data.records,t.total=e.data.total,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},setActivityWithGoodOrRecommend:function(t,e,n){var i=this,a={};"isRecommend"===n?a={id:e.id,isRecommend:1}:"isGood"===n&&(a={id:e.id,isGood:1}),Object(r["g"])(a).then((function(t){"200"===t.code?i.$message({type:"success",message:"操作成功!"}):i.$message({type:"error",message:t.msg})}))}}},s=c,u=(n("ed3e"),n("2877")),l=Object(u["a"])(s,i,a,!1,null,"2ec53e08",null);e["default"]=l.exports},"16f6":function(t,e,n){},"1c64":function(t,e,n){},"1cc6":function(t,e,n){"use strict";var i=n("1c64"),a=n.n(i);a.a},"333d":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},a=[];n("c5f6");Math.easeInOutQuad=function(t,e,n,i){return t/=i/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function c(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,n){var i=c(),a=t-i,s=20,u=0;e="undefined"===typeof e?500:e;var l=function t(){u+=s;var c=Math.easeInOutQuad(u,i,a,e);o(c),u<e?r(t):n&&"function"===typeof n&&n()};l()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&s(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&s(0,800)}}},l=u,d=(n("1cc6"),n("2877")),f=Object(d["a"])(l,i,a,!1,null,"f3b72548",null);e["a"]=f.exports},aa77:function(t,e,n){var i=n("5ca1"),a=n("be13"),r=n("79e5"),o=n("fdef"),c="["+o+"]",s="​",u=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),d=function(t,e,n){var a={},c=r((function(){return!!o[t]()||s[t]()!=s})),u=a[t]=c?e(f):o[t];n&&(a[n]=u),i(i.P+i.F*c,"String",a)},f=d.trim=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(l,"")),t};t.exports=d},c5f6:function(t,e,n){"use strict";var i=n("7726"),a=n("69a8"),r=n("2d95"),o=n("5dbc"),c=n("6a99"),s=n("79e5"),u=n("9093").f,l=n("11e9").f,d=n("86cc").f,f=n("aa77").trim,m="Number",p=i[m],h=p,g=p.prototype,v=r(n("2aeb")(g))==m,y="trim"in String.prototype,b=function(t){var e=c(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():f(e,3);var n,i,a,r=e.charCodeAt(0);if(43===r||45===r){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+e}for(var o,s=e.slice(2),u=0,l=s.length;u<l;u++)if(o=s.charCodeAt(u),o<48||o>a)return NaN;return parseInt(s,i)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof p&&(v?s((function(){g.valueOf.call(n)})):r(n)!=m)?o(new h(b(e)),n,p):b(e)};for(var _,S=n("9e1e")?u(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;S.length>w;w++)a(h,_=S[w])&&!a(p,_)&&d(p,_,l(h,_));p.prototype=g,g.constructor=p,n("2aba")(i,m,p)}},ca41:function(t,e,n){"use strict";n.d(e,"f",(function(){return a})),n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return s})),n.d(e,"h",(function(){return u})),n.d(e,"e",(function(){return l})),n.d(e,"g",(function(){return d}));n("ac6a"),n("456d");var i=n("b775");function a(t,e){return Object(i["a"])({url:"/system/management/activity/getSpecialActivity?size="+t.size+"&current="+t.current,method:"post",data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function r(t,e){return Object(i["a"])({url:"/system/activity/getActivityScheme?size="+t.size+"&current="+t.current,method:"post",data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function o(t){return Object(i["a"])({url:"/system/activity/addActivityScheme",method:"post",data:t,transformRequest:[function(t){console.log(t);var e=Object.keys(t).length,n=0,i="";for(var a in t)i+=encodeURIComponent(a)+"="+encodeURIComponent(t[a]),n<e-1&&(i+="&",n++);return i}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function c(t){return Object(i["a"])({url:"/system/activity/getActivitySchemeInfo",method:"get",params:{schemeId:t}})}function s(t){return Object(i["a"])({url:"/system/activity/deleteScheme",method:"delete",params:{schemeId:t}})}function u(t){return Object(i["a"])({url:"/system/activity/updateActivityScheme",method:"post",data:t,transformRequest:[function(t){console.log(t);var e=Object.keys(t).length,n=0,i="";for(var a in t)i+=encodeURIComponent(a)+"="+encodeURIComponent(t[a]),n<e-1&&(i+="&",n++);return i}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function l(t,e){return Object(i["a"])({url:"/system/activity/getActivitys",method:"post",params:t,data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function d(t){return Object(i["a"])({url:"/system/management/activity/setActivityWithGoodOrRecommend",method:"post",params:t})}},ed3e:function(t,e,n){"use strict";var i=n("16f6"),a=n.n(i);a.a},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);