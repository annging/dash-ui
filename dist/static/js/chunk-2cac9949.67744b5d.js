(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cac9949"],{"06fc":function(t,e,n){"use strict";var i=n("fb22"),r=n.n(i);r.a},"09f4":function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),Math.easeInOutQuad=function(t,e,n,i){return t/=i/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function r(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function a(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(t,e,n){var o=a(),s=t-o,c=20,u=0;e="undefined"===typeof e?500:e;var l=function t(){u+=c;var a=Math.easeInOutQuad(u,o,s,e);r(a),u<e?i(t):n&&"function"===typeof n&&n()};l()}},"14ec":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-content"},[n("div",{staticClass:"left-container"},[n("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"1",mode:"horizontal",router:""}},[n("el-menu-item",{attrs:{index:"1",route:{path:"/activity/list"}}},[t._v("活动列表")]),t._v(" "),n("el-menu-item",{attrs:{index:"2",route:{path:"/activity/recommendActivity"}}},[t._v("首页推荐")]),t._v(" "),n("el-menu-item",{attrs:{index:"3",route:{path:"/activity/recommendAnli"}}},[t._v("优秀案例")])],1),t._v(" "),n("el-row",{staticClass:"filter-container",staticStyle:{"margin-bottom":"20px"},attrs:{type:"flex"}},[n("el-input",{attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.searchStr,callback:function(e){t.$set(t.listQuery,"searchStr",e)},expression:"listQuery.searchStr"}})],1),t._v(" "),n("el-row",{staticClass:"list"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"",size:"small","header-cell-style":{"background-color":"#f7f9fa",color:"#637282;"}}},[n("el-table-column",{attrs:{fixed:"",prop:"id",label:"ID",width:"40"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"封面",width:"100"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.row;return[n("img",{staticStyle:{width:"80px",height:"50px"},attrs:{src:e.cover[0]}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动标题"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.title))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"类型",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(t.activityTypes[i.type]))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"价格"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(0===i.basePrice?"免费":i.basePrice.toFixed(2)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"商家"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.merchantId))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动时间",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",{staticStyle:{"text-align":"center"}},[t._v(t._s(t._f("moment")(i.startTime,"YYYY-MM-DD HH:mm:ss"))+" "),n("br"),t._v("至 "),n("br"),t._v(t._s(t._f("moment")(i.endTime,"YYYY-MM-DD HH:mm:ss"))+" ")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(t.status[i.status]))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"推荐到首页?",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.specialActivity&&i.specialActivity.isRecommend>0?"是":"否"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"优秀案例?",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.specialActivity&&i.specialActivity.isGood>0?"是":"否"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.setActivityWithGoodOrRecommend(e.$index,e.row,"isRecommend")}}},[t._v("推荐到首页")]),t._v(" "),n("br"),t._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.setActivityWithGoodOrRecommend(e.$index,e.row,"isGood")}}},[t._v("设为优秀案例")])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.current,limit:t.listQuery.size},on:{"update:page":function(e){return t.$set(t.listQuery,"current",e)},"update:limit":function(e){return t.$set(t.listQuery,"size",e)},pagination:t.getList}})],1)],1)])},r=[],a=(n("ac6a"),n("ca41")),o=n("333d"),s={components:{Pagination:o["a"]},data:function(){return{list:[],total:0,listLoading:!1,listQuery:{searchStr:"",current:1,size:20},listFilter:{type:""},clientHeight:"",maxHeight:400,activityTypes:{1:"报名",2:"抽奖",3:"海报",4:"砍价",5:"秒杀",6:"拼团",7:"投票",8:"预约",9:"助力",10:"代金券",11:"折扣券",12:"兑换券",13:"体验券"},status:{1:"正常",2:"已隐藏"}}},watch:{},created:function(){this.listLoading=!1,this.getList()},mounted:function(){this.clientHeight="".concat(document.documentElement.clientHeight);var t=this;window.onresize=function(){t.clientHeight="".concat(document.documentElement.clientHeight)}},methods:{changeFixed:function(t){this.maxHeight=t-85-110-100},getList:function(){var t=this;this.listLoading=!0,Object(a["e"])(this.listQuery,this.listFilter).then((function(e){e.data.records.length>0&&e.data.records.forEach((function(t){t.cover&&"string"!=t.cover&&(t.cover=JSON.parse(t.cover)),t.activitySetting&&(t.activitySetting=JSON.parse(t.activitySetting))})),t.list=e.data.records,t.total=e.data.total,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},setActivityWithGoodOrRecommend:function(t,e,n){var i=this,r={};"isRecommend"===n?r={id:e.id,isRecommend:1}:"isGood"===n&&(r={id:e.id,isGood:1}),Object(a["g"])(r).then((function(t){"200"===t.code?i.$message({type:"success",message:"操作成功!"}):i.$message({type:"error",message:t.msg})}))}}},c=s,u=(n("06fc"),n("2877")),l=Object(u["a"])(c,i,r,!1,null,"7a39f5ee",null);e["default"]=l.exports},aa77:function(t,e,n){var i=n("5ca1"),r=n("be13"),a=n("79e5"),o=n("fdef"),s="["+o+"]",c="​",u=RegExp("^"+s+s+"*"),l=RegExp(s+s+"*$"),d=function(t,e,n){var r={},s=a((function(){return!!o[t]()||c[t]()!=c})),u=r[t]=s?e(f):o[t];n&&(r[n]=u),i(i.P+i.F*s,"String",r)},f=d.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(l,"")),t};t.exports=d},c5f6:function(t,e,n){"use strict";var i=n("7726"),r=n("69a8"),a=n("2d95"),o=n("5dbc"),s=n("6a99"),c=n("79e5"),u=n("9093").f,l=n("11e9").f,d=n("86cc").f,f=n("aa77").trim,m="Number",p=i[m],v=p,h=p.prototype,y=a(n("2aeb")(h))==m,g="trim"in String.prototype,b=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=g?e.trim():f(e,3);var n,i,r,a=e.charCodeAt(0);if(43===a||45===a){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===a){switch(e.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+e}for(var o,c=e.slice(2),u=0,l=c.length;u<l;u++)if(o=c.charCodeAt(u),o<48||o>r)return NaN;return parseInt(c,i)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof p&&(y?c((function(){h.valueOf.call(n)})):a(n)!=m)?o(new v(b(e)),n,p):b(e)};for(var _,w=n("9e1e")?u(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;w.length>S;S++)r(v,_=w[S])&&!r(p,_)&&d(p,_,l(v,_));p.prototype=h,h.constructor=p,n("2aba")(i,m,p)}},ca41:function(t,e,n){"use strict";n.d(e,"f",(function(){return r})),n.d(e,"d",(function(){return a})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"b",(function(){return c})),n.d(e,"h",(function(){return u})),n.d(e,"e",(function(){return l})),n.d(e,"g",(function(){return d}));n("ac6a"),n("456d");var i=n("b775");function r(t,e){return Object(i["a"])({url:"/system/management/activity/getSpecialActivity?size="+t.size+"&current="+t.current,method:"post",data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function a(t,e){return Object(i["a"])({url:"/system/activity/getActivityScheme?size="+t.size+"&current="+t.current,method:"post",data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function o(t){return Object(i["a"])({url:"/system/activity/addActivityScheme",method:"post",data:t,transformRequest:[function(t){console.log(t);var e=Object.keys(t).length,n=0,i="";for(var r in t)i+=encodeURIComponent(r)+"="+encodeURIComponent(t[r]),n<e-1&&(i+="&",n++);return i}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function s(t){return Object(i["a"])({url:"/system/activity/getActivitySchemeInfo",method:"get",params:{schemeId:t}})}function c(t){return Object(i["a"])({url:"/system/activity/deleteScheme",method:"delete",params:{schemeId:t}})}function u(t){return Object(i["a"])({url:"/system/activity/updateActivityScheme",method:"post",data:t,transformRequest:[function(t){console.log(t);var e=Object.keys(t).length,n=0,i="";for(var r in t)i+=encodeURIComponent(r)+"="+encodeURIComponent(t[r]),n<e-1&&(i+="&",n++);return i}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function l(t,e){return Object(i["a"])({url:"/system/activity/getActivitys",method:"post",params:t,data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function d(t){return Object(i["a"])({url:"/system/management/activity/setActivityWithGoodOrRecommend",method:"post",params:t})}},fb22:function(t,e,n){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);