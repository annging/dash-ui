(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fa3ffe12"],{"09f4":function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),Math.easeInOutQuad=function(t,e,n,r){return t/=r/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function a(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function i(t,e,n){var i=o(),s=t-i,u=20,l=0;e="undefined"===typeof e?500:e;var c=function t(){l+=u;var o=Math.easeInOutQuad(l,i,s,e);a(o),l<e?r(t):n&&"function"===typeof n&&n()};c()}},"48fb":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var r=n("b775");function a(){return Object(r["a"])({url:"/system/index/marketingData",method:"get"})}function o(t){return Object(r["a"])({url:"/system/index/userData",method:"get",params:t})}function i(t,e){return Object(r["a"])({url:"/system/order/getOrders",method:"post",params:t,data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}},"5fa0":function(t,e,n){},"634a":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-content"},[n("div",{staticClass:"left-container"},[n("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"1",mode:"horizontal",router:""}},[n("el-menu-item",{attrs:{index:"1",route:{path:"/order/index"}}},[t._v("订单")])],1),t._v(" "),n("el-row",{staticClass:"filter-container",staticStyle:{"margin-bottom":"20px"},attrs:{type:"flex"}}),t._v(" "),n("el-row",{staticClass:"list"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"",size:"small","header-cell-style":{"background-color":"#f7f9fa",color:"#637282;"}}},[n("el-table-column",{attrs:{prop:"id",label:"ID",sortable:"",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"订单号",width:"135px"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.orderNum))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.activityId))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动类型"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(t.activityTypes[r.activityType]))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"数量"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.amount))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"金额"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.finalPrice.toFixed(2)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(t.orderStatus[r.status]))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间",width:"140px"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(t._f("moment")(r.createdAt,"YYYY-MM-DD HH:mm:ss")))])]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleView(e.$index,e.row)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.current,limit:t.listQuery.size},on:{"update:page":function(e){return t.$set(t.listQuery,"current",e)},"update:limit":function(e){return t.$set(t.listQuery,"size",e)},pagination:t.getList}})],1)],1)])},a=[],o=n("48fb"),i=n("333d"),s={components:{Pagination:i["a"]},data:function(){return{list:[],total:0,listLoading:!1,listQuery:{searchStr:"",current:1,size:20},listFilter:{},activityTypes:{1:"报名",2:"抽奖",3:"海报",4:"砍价",5:"秒杀",6:"拼团",7:"投票",8:"预约",9:"助力",10:"代金券",11:"折扣券",12:"兑换券",13:"体验券"},orderStatus:{1:"已下单待付款",2:"已付款待核销",3:"已发货",4:"已核销",5:"已完成",6:"已取消",7:"退款审核中",8:"退款完成"}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(o["a"])(this.listQuery,this.listFilter).then((function(e){t.list=e.data.records,t.total=e.data.total,t.listLoading=!1}))},handleFilter:function(){this.listQuery.current=1,this.getList()},handleView:function(t,e){console.log(111)},handleUpdate:function(t,e){console.log(111)}}},u=s,l=(n("a949"),n("2877")),c=Object(l["a"])(u,r,a,!1,null,"58b880ef",null);e["default"]=c.exports},a949:function(t,e,n){"use strict";var r=n("5fa0"),a=n.n(r);a.a},aa77:function(t,e,n){var r=n("5ca1"),a=n("be13"),o=n("79e5"),i=n("fdef"),s="["+i+"]",u="​",l=RegExp("^"+s+s+"*"),c=RegExp(s+s+"*$"),f=function(t,e,n){var a={},s=o((function(){return!!i[t]()||u[t]()!=u})),l=a[t]=s?e(d):i[t];n&&(a[n]=l),r(r.P+r.F*s,"String",a)},d=f.trim=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},c5f6:function(t,e,n){"use strict";var r=n("7726"),a=n("69a8"),o=n("2d95"),i=n("5dbc"),s=n("6a99"),u=n("79e5"),l=n("9093").f,c=n("11e9").f,f=n("86cc").f,d=n("aa77").trim,p="Number",m=r[p],v=m,b=m.prototype,_=o(n("2aeb")(b))==p,h="trim"in String.prototype,y=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=h?e.trim():d(e,3);var n,r,a,o=e.charCodeAt(0);if(43===o||45===o){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+e}for(var i,u=e.slice(2),l=0,c=u.length;l<c;l++)if(i=u.charCodeAt(l),i<48||i>a)return NaN;return parseInt(u,r)}}return+e};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof m&&(_?u((function(){b.valueOf.call(n)})):o(n)!=p)?i(new v(y(e)),n,m):y(e)};for(var g,w=n("9e1e")?l(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;w.length>N;N++)a(v,g=w[N])&&!a(m,g)&&f(m,g,c(v,g));m.prototype=b,b.constructor=m,n("2aba")(r,p,m)}},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);