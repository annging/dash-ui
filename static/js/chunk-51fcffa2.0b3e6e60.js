(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51fcffa2"],{"09f4":function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function r(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function i(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(t,e,n){var o=i(),u=t-o,s=20,l=0;e="undefined"===typeof e?500:e;var c=function t(){l+=s;var i=Math.easeInOutQuad(l,o,u,e);r(i),l<e?a(t):n&&"function"===typeof n&&n()};c()}},"1c18":function(t,e,n){},"333d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},r=[],i=(n("a9e3"),n("09f4")),o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&Object(i["a"])(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&Object(i["a"])(0,800)}}},u=o,s=(n("e498"),n("2877")),l=Object(s["a"])(u,a,r,!1,null,"6af373ef",null);e["a"]=l.exports},"48fb":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i}));n("e9c4");var a=n("b775");function r(){return Object(a["a"])({url:"/system/index/marketingData",method:"get"})}function i(t,e){return Object(a["a"])({url:"/system/order/pages",method:"post",params:t,data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}},"634a":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-content"},[n("div",{staticClass:"left-container"},[n("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"1",mode:"horizontal",router:""}},[n("el-menu-item",{attrs:{index:"1",route:{path:"/order/index"}}},[t._v("订单")])],1),n("el-row",{staticClass:"filter-container",staticStyle:{"margin-bottom":"20px",display:"none"},attrs:{type:"flex"}}),n("el-row",{staticClass:"list"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"",size:"small","header-cell-style":{"background-color":"#f7f9fa",color:"#637282;"}}},[n("el-table-column",{attrs:{prop:"id",label:"ID",sortable:"",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.id))])]}}])}),n("el-table-column",{attrs:{label:"订单号",width:"135px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.orderNum))])]}}])}),n("el-table-column",{attrs:{label:"活动"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("router-link",{staticStyle:{color:"#409EFF"},attrs:{target:"_blank",to:"/activity/detail/"+a.activityId+"/order"}},[t._v(t._s(a.activityId))])]}}])}),n("el-table-column",{attrs:{label:"活动类型",width:"70px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t.activityTypes[a.activityType]))])]}}])}),n("el-table-column",{attrs:{label:"商家"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("router-link",{staticStyle:{color:"#409EFF"},attrs:{target:"_blank",to:"/merchant/detail/"+a.merchantId+"/order"}},[t._v(t._s(a.merchantId))])]}}])}),n("el-table-column",{attrs:{label:"数量",width:"70px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.amount))])]}}])}),n("el-table-column",{attrs:{label:"金额"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.finalPrice.toFixed(2)))])]}}])}),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t.orderStatus[a.status]))])]}}])}),n("el-table-column",{attrs:{label:"创建时间",width:"140px"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t._f("moment")(a.createdAt,"YYYY-MM-DD HH:mm:ss")))])]}}])})],1),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.current,limit:t.listQuery.size},on:{"update:page":function(e){return t.$set(t.listQuery,"current",e)},"update:limit":function(e){return t.$set(t.listQuery,"size",e)},pagination:t.getList}})],1)],1)])},r=[],i=n("48fb"),o=n("333d"),u={components:{Pagination:o["a"]},data:function(){return{list:[],total:0,listLoading:!1,listQuery:{current:1,size:20},listFilter:{},activityTypes:{1:"报名",2:"抽奖",3:"海报",4:"砍价",5:"秒杀",6:"拼团",7:"投票",8:"预约",9:"助力",10:"代金券",11:"折扣券",12:"兑换券",13:"体验券","-1":"团购"},orderStatus:{1:"已下单待付款",2:"已付款待核销",3:"已发货",4:"已核销",5:"已完成",6:"已取消",7:"退款审核中",8:"退款完成",9:"审核中",10:"已超时",11:"审核未通过",12:"拼团未成团"}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(i["a"])(this.listQuery,this.listFilter).then((function(e){t.list=e.data.records,t.total=e.data.total,t.listLoading=!1}))},handleFilter:function(){this.listQuery.current=1,this.getList()},handleView:function(t,e){console.log(111)},handleUpdate:function(t,e){console.log(111)}}},s=u,l=(n("af45"),n("2877")),c=Object(l["a"])(s,a,r,!1,null,"6c4e0fc3",null);e["default"]=c.exports},7156:function(t,e,n){var a=n("861d"),r=n("d2bb");t.exports=function(t,e,n){var i,o;return r&&"function"==typeof(i=e.constructor)&&i!==n&&a(o=i.prototype)&&o!==n.prototype&&r(t,o),t}},a9e3:function(t,e,n){"use strict";var a=n("83ab"),r=n("da84"),i=n("94ca"),o=n("6eeb"),u=n("5135"),s=n("c6b6"),l=n("7156"),c=n("c04e"),d=n("d039"),f=n("7c73"),p=n("241c").f,m=n("06cf").f,g=n("9bf2").f,h=n("58a8").trim,b="Number",y=r[b],v=y.prototype,_=s(f(v))==b,w=function(t){var e,n,a,r,i,o,u,s,l=c(t,!1);if("string"==typeof l&&l.length>2)if(l=h(l),e=l.charCodeAt(0),43===e||45===e){if(n=l.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+l}for(i=l.slice(2),o=i.length,u=0;u<o;u++)if(s=i.charCodeAt(u),s<48||s>r)return NaN;return parseInt(i,a)}return+l};if(i(b,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var S,N=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof N&&(_?d((function(){v.valueOf.call(n)})):s(n)!=b)?l(new y(w(e)),n,N):w(e)},I=a?p(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;I.length>k;k++)u(y,S=I[k])&&!u(N,S)&&g(N,S,m(y,S));N.prototype=v,v.constructor=N,o(r,b,N)}},af45:function(t,e,n){"use strict";n("d5b0")},d5b0:function(t,e,n){},e498:function(t,e,n){"use strict";n("1c18")}}]);