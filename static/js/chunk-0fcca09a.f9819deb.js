(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fcca09a"],{"09f4":function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),Math.easeInOutQuad=function(t,e,n,r){return t/=r/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function i(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function a(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(t,e,n){var o=a(),s=t-o,u=20,c=0;e="undefined"===typeof e?500:e;var l=function t(){c+=u;var a=Math.easeInOutQuad(c,o,s,e);i(a),c<e?r(t):n&&"function"===typeof n&&n()};l()}},"0ccb":function(t,e,n){var r=n("50c4"),i=n("1148"),a=n("1d80"),o=Math.ceil,s=function(t){return function(e,n,s){var u,c,l=String(a(e)),d=l.length,f=void 0===s?" ":String(s),p=r(n);return p<=d||""==f?l:(u=p-d,c=i.call(f,o(u/f.length)),c.length>u&&(c=c.slice(0,u)),t?l+c:c+l)}};t.exports={start:s(!1),end:s(!0)}},1148:function(t,e,n){"use strict";var r=n("a691"),i=n("1d80");t.exports="".repeat||function(t){var e=String(i(this)),n="",a=r(t);if(a<0||a==1/0)throw RangeError("Wrong number of repetitions");for(;a>0;(a>>>=1)&&(e+=e))1&a&&(n+=e);return n}},3123:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n("b775");function i(){return Object(r["a"])({url:Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:"/dash-ui/"}).VUE_APP_XIAOCHENGXU_API+"/api/v1/upload/token",method:"get"})}},3549:function(t,e,n){"use strict";n("a8a7")},"466d":function(t,e,n){"use strict";var r=n("d784"),i=n("825a"),a=n("50c4"),o=n("1d80"),s=n("8aa5"),u=n("14c3");r("match",1,(function(t,e,n){return[function(e){var n=o(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,n):new RegExp(e)[t](String(n))},function(t){var r=n(e,t,this);if(r.done)return r.value;var o=i(t),c=String(this);if(!o.global)return u(o,c);var l=o.unicode;o.lastIndex=0;var d,f=[],p=0;while(null!==(d=u(o,c))){var m=String(d[0]);f[p]=m,""===m&&(o.lastIndex=s(c,a(o.lastIndex),l)),p++}return 0===p?null:f}]}))},"4d90":function(t,e,n){"use strict";var r=n("23e7"),i=n("0ccb").start,a=n("9a0c");r({target:"String",proto:!0,forced:a},{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},6062:function(t,e,n){"use strict";var r=n("6d61"),i=n("6566");t.exports=r("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,e,n){"use strict";var r=n("9bf2").f,i=n("7c73"),a=n("e2cc"),o=n("0366"),s=n("19aa"),u=n("2266"),c=n("7dd0"),l=n("2626"),d=n("83ab"),f=n("f183").fastKey,p=n("69f3"),m=p.set,v=p.getterFor;t.exports={getConstructor:function(t,e,n,c){var l=t((function(t,r){s(t,l,e),m(t,{type:e,index:i(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=r&&u(r,t[c],t,n)})),p=v(e),h=function(t,e,n){var r,i,a=p(t),o=g(t,e);return o?o.value=n:(a.last=o={index:i=f(e,!0),key:e,value:n,previous:r=a.last,next:void 0,removed:!1},a.first||(a.first=o),r&&(r.next=o),d?a.size++:t.size++,"F"!==i&&(a.index[i]=o)),t},g=function(t,e){var n,r=p(t),i=f(e);if("F"!==i)return r.index[i];for(n=r.first;n;n=n.next)if(n.key==e)return n};return a(l.prototype,{clear:function(){var t=this,e=p(t),n=e.index,r=e.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete n[r.index],r=r.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,n=p(e),r=g(e,t);if(r){var i=r.next,a=r.previous;delete n.index[r.index],r.removed=!0,a&&(a.next=i),i&&(i.previous=a),n.first==r&&(n.first=i),n.last==r&&(n.last=a),d?n.size--:e.size--}return!!r},forEach:function(t){var e,n=p(this),r=o(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.next:n.first){r(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!g(this,t)}}),a(l.prototype,n?{get:function(t){var e=g(this,t);return e&&e.value},set:function(t,e){return h(this,0===t?0:t,e)}}:{add:function(t){return h(this,t=0===t?0:t,t)}}),d&&r(l.prototype,"size",{get:function(){return p(this).size}}),l},setStrong:function(t,e,n){var r=e+" Iterator",i=v(e),a=v(r);c(t,e,(function(t,e){m(this,{type:r,target:t,state:i(t),kind:e,last:void 0})}),(function(){var t=a(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),l(e)}}},"6d61":function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),a=n("94ca"),o=n("6eeb"),s=n("f183"),u=n("2266"),c=n("19aa"),l=n("861d"),d=n("d039"),f=n("1c7e"),p=n("d44e"),m=n("7156");t.exports=function(t,e,n){var v=-1!==t.indexOf("Map"),h=-1!==t.indexOf("Weak"),g=v?"set":"add",y=i[t],b=y&&y.prototype,_=y,w={},I=function(t){var e=b[t];o(b,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(h&&!l(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return h&&!l(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(h&&!l(t))&&e.call(this,0===t?0:t)}:function(t,n){return e.call(this,0===t?0:t,n),this})};if(a(t,"function"!=typeof y||!(h||b.forEach&&!d((function(){(new y).entries().next()})))))_=n.getConstructor(e,t,v,g),s.REQUIRED=!0;else if(a(t,!0)){var E=new _,S=E[g](h?{}:-0,1)!=E,A=d((function(){E.has(1)})),O=f((function(t){new y(t)})),x=!h&&d((function(){var t=new y,e=5;while(e--)t[g](e,e);return!t.has(-0)}));O||(_=e((function(e,n){c(e,_,t);var r=m(new y,e,_);return void 0!=n&&u(n,r[g],r,v),r})),_.prototype=b,b.constructor=_),(A||x)&&(I("delete"),I("has"),v&&I("get")),(x||S)&&I(g),h&&b.clear&&delete b.clear}return w[t]=_,r({global:!0,forced:_!=y},w),p(_,t),h||n.setStrong(_,t,v),_}},"7db0":function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").find,a=n("44d2"),o=n("ae40"),s="find",u=!0,c=o(s);s in[]&&Array(1)[s]((function(){u=!1})),r({target:"Array",proto:!0,forced:u||!c},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a(s)},"9a0c":function(t,e,n){var r=n("342f");t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r)},a15b:function(t,e,n){"use strict";var r=n("23e7"),i=n("44ad"),a=n("fc6a"),o=n("a640"),s=[].join,u=i!=Object,c=o("join",",");r({target:"Array",proto:!0,forced:u||!c},{join:function(t){return s.call(a(this),void 0===t?",":t)}})},a434:function(t,e,n){"use strict";var r=n("23e7"),i=n("23cb"),a=n("a691"),o=n("50c4"),s=n("7b0b"),u=n("65f0"),c=n("8418"),l=n("1dde"),d=n("ae40"),f=l("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,v=Math.min,h=9007199254740991,g="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var n,r,l,d,f,p,y=s(this),b=o(y.length),_=i(t,b),w=arguments.length;if(0===w?n=r=0:1===w?(n=0,r=b-_):(n=w-2,r=v(m(a(e),0),b-_)),b+n-r>h)throw TypeError(g);for(l=u(y,r),d=0;d<r;d++)f=_+d,f in y&&c(l,d,y[f]);if(l.length=r,n<r){for(d=_;d<b-r;d++)f=d+r,p=d+n,f in y?y[p]=y[f]:delete y[p];for(d=b;d>b-r+n;d--)delete y[d-1]}else if(n>r)for(d=b-r;d>_;d--)f=d+r-1,p=d+n-1,f in y?y[p]=y[f]:delete y[p];for(d=0;d<n;d++)y[d+_]=arguments[d+2];return y.length=b-r+n,l}})},a8a7:function(t,e,n){},a9e3:function(t,e,n){"use strict";var r=n("83ab"),i=n("da84"),a=n("94ca"),o=n("6eeb"),s=n("5135"),u=n("c6b6"),c=n("7156"),l=n("c04e"),d=n("d039"),f=n("7c73"),p=n("241c").f,m=n("06cf").f,v=n("9bf2").f,h=n("58a8").trim,g="Number",y=i[g],b=y.prototype,_=u(f(b))==g,w=function(t){var e,n,r,i,a,o,s,u,c=l(t,!1);if("string"==typeof c&&c.length>2)if(c=h(c),e=c.charCodeAt(0),43===e||45===e){if(n=c.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+c}for(a=c.slice(2),o=a.length,s=0;s<o;s++)if(u=a.charCodeAt(s),u<48||u>i)return NaN;return parseInt(a,r)}return+c};if(a(g,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var I,E=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof E&&(_?d((function(){b.valueOf.call(n)})):u(n)!=g)?c(new y(w(e)),n,E):w(e)},S=r?p(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;S.length>A;A++)s(y,I=S[A])&&!s(E,I)&&v(E,I,m(y,I));E.prototype=b,b.constructor=E,o(i,g,E)}},bb2f:function(t,e,n){var r=n("d039");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},ca41:function(t,e,n){"use strict";n.d(e,"q",(function(){return i})),n.d(e,"i",(function(){return a})),n.d(e,"a",(function(){return o})),n.d(e,"h",(function(){return s})),n.d(e,"f",(function(){return u})),n.d(e,"v",(function(){return c})),n.d(e,"l",(function(){return l})),n.d(e,"j",(function(){return d})),n.d(e,"n",(function(){return f})),n.d(e,"s",(function(){return p})),n.d(e,"t",(function(){return m})),n.d(e,"k",(function(){return v})),n.d(e,"p",(function(){return h})),n.d(e,"c",(function(){return g})),n.d(e,"u",(function(){return y})),n.d(e,"d",(function(){return b})),n.d(e,"o",(function(){return _})),n.d(e,"g",(function(){return w})),n.d(e,"b",(function(){return I})),n.d(e,"e",(function(){return E})),n.d(e,"m",(function(){return S})),n.d(e,"r",(function(){return A})),n.d(e,"w",(function(){return O})),n.d(e,"x",(function(){return x}));n("e9c4"),n("b64b");var r=n("b775");function i(t,e){return Object(r["a"])({url:"/system/management/activity/getSpecialActivity?size="+t.size+"&current="+t.current,method:"post",data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function a(t,e){return Object(r["a"])({url:"/system/activity/getActivityScheme?size="+t.size+"&current="+t.current,method:"post",data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function o(t){return Object(r["a"])({url:"/system/activity/addActivityScheme",method:"post",data:t,transformRequest:[function(t){console.log(t);var e=Object.keys(t).length,n=0,r="";for(var i in t)r+=encodeURIComponent(i)+"="+encodeURIComponent(t[i]),n<e-1&&(r+="&",n++);return r}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function s(t){return Object(r["a"])({url:"/system/activity/getActivitySchemeInfo",method:"get",params:{schemeId:t}})}function u(t){return Object(r["a"])({url:"/system/activity/deleteScheme",method:"delete",params:{schemeId:t}})}function c(t){return Object(r["a"])({url:"/system/activity/updateActivityScheme",method:"post",data:t,transformRequest:[function(t){console.log(t);var e=Object.keys(t).length,n=0,r="";for(var i in t)r+=encodeURIComponent(i)+"="+encodeURIComponent(t[i]),n<e-1&&(r+="&",n++);return r}],headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function l(t,e){return Object(r["a"])({url:"/system/activity/getActivitys",method:"post",params:t,data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function d(t){return Object(r["a"])({url:"/system/activity/getActivityInfo",method:"post",params:{id:t}})}function f(t,e){return Object(r["a"])({url:"/system/activity/getCouponActivityList",method:"post",params:t,data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function p(t){return Object(r["a"])({url:"/system/management/activity/setActivityWithGoodOrRecommend",method:"post",params:t})}function m(t){return Object(r["a"])({url:"/system/management/setWeight",method:"get",params:t})}function v(t,e){return Object(r["a"])({url:"/system/activity/getActivityOptions",method:"post",params:t,data:e,headers:{"Content-Type":"application/json"},transformRequest:[function(t,e){for(var n in t)""===t[n]&&delete t[n];return t=JSON.stringify(t),t}]})}function h(){return Object(r["a"])({url:Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:"/dash-ui/"}).VUE_APP_XIAOCHENGXU_API+"/api/v1/activity/config/require/column",method:"get"})}function g(t){return Object(r["a"])({url:"/api/v1/activity/common/create",method:"post",data:t,headers:{loginToken:"adminLoginToken"}})}function y(t){return Object(r["a"])({url:Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:"/dash-ui/"}).VUE_APP_XIAOCHENGXU_API+"/api/v1/activity/common/update",method:"post",data:t,headers:{loginToken:"adminLoginToken"}})}function b(t){return Object(r["a"])({url:Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:"/dash-ui/"}).VUE_APP_XIAOCHENGXU_API+"/api/v1/activity/common/deleteActivityById/"+t,method:"delete",headers:{loginToken:"adminLoginToken"}})}function _(){return Object(r["a"])({url:"/system/activity/getJoinCount",method:"get"})}function w(t){return Object(r["a"])({url:"/system/scheme/adviser/pageAdvisers",method:"get",params:t})}function I(t){return Object(r["a"])({url:"/system/scheme/adviser/addOrUpdate",method:"post",data:t})}function E(t){return Object(r["a"])({url:"/system/scheme/adviser/delete/"+t,method:"get"})}function S(t){return Object(r["a"])({url:"/system/scheme/adviser/get/"+t,method:"get"})}function A(t){return Object(r["a"])({url:Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:"/dash-ui/"}).VUE_APP_XIAOCHENGXU_API+"/api/v1/order/vote/queryOrderVoteByVoteGroupId",method:"get",params:t})}function O(t){return Object(r["a"])({url:Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:"/dash-ui/"}).VUE_APP_XIAOCHENGXU_API+"/api/v1/order/vote/updateOrderVoteBy",method:"post",data:t,headers:{"Content-Type":"application/json"}})}function x(t){return Object(r["a"])({url:Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:"/dash-ui/"}).VUE_APP_XIAOCHENGXU_API+"/api/v1/order/vote/hide/"+t,method:"get"})}},d26b:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{staticClass:"filter-container",staticStyle:{"margin-bottom":"20px"},attrs:{type:"flex",justify:"space-between"}},[n("div",[n("el-input",{staticClass:"filter-item",staticStyle:{width:"300px","margin-right":"20px"},attrs:{placeholder:"请输入选手的名字","prefix-icon":"el-icon-search",size:"small",clearable:""},on:{clear:t.handleFilter},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.search,callback:function(e){t.$set(t.listQuery,"search",e)},expression:"listQuery.search"}}),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{size:"small",placeholder:"全部"},on:{change:t.handleFilter},model:{value:t.listQuery.voteGroupId,callback:function(e){t.$set(t.listQuery,"voteGroupId",e)},expression:"listQuery.voteGroupId"}},[n("el-option",{attrs:{label:"全部",value:""}}),t._l(t.groupNames,(function(t,e){return n("el-option",{key:t.id,attrs:{label:t.group,value:t.id}})}))],2),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{size:"small",placeholder:"排序"},on:{change:t.handleFilter},model:{value:t.listQuery.orderBy,callback:function(e){t.$set(t.listQuery,"orderBy",e)},expression:"listQuery.orderBy"}},[n("el-option",{attrs:{label:"投票排名",value:2}}),n("el-option",{attrs:{label:"最新参赛",value:1}})],1),n("el-button",{staticClass:"filter-item",attrs:{size:"small",type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(" 搜索 ")])],1)]),n("el-row",{staticClass:"list"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"",size:"small","header-cell-style":{"background-color":"#f7f9fa",color:"#637282;"}}},[n("el-table-column",{attrs:{prop:"id",label:"ID",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.id))])]}}])}),n("el-table-column",{attrs:{label:"封面",width:"100"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.row;return[n("img",{staticStyle:{width:"80px"},attrs:{src:e.cover+"?imageView2/0/w/80"}})]}}])}),n("el-table-column",{attrs:{label:"选手名称"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.name))])]}}])}),n("el-table-column",{attrs:{label:"分组"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[t._v(" "+t._s(t.groupTemp=t.getGroup(r.activityVoteGroupId))+" ")]),r.activityVoteGroupId?n("span",[t._v(t._s(t.groupTemp[0].group))]):n("span",[t._v(" - ")])]}}])}),n("el-table-column",{attrs:{label:"投票编号"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.voteCode))])]}}])}),n("el-table-column",{attrs:{label:"排名",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.rank))])]}}])}),n("el-table-column",{attrs:{label:"虚拟票数",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.virtualVote))])]}}])}),n("el-table-column",{attrs:{label:"票数",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.ticketsNum))])]}}])}),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.status))])]}}])}),n("el-table-column",{attrs:{label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(t.parseTime(r.createdAt)))])]}}])}),n("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){return t.handleHide(e.$index,e.row)}}},[t._v("下架")]),n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){return t.goHandleEdit(e.$index,e.row)}}},[t._v("编辑")]),n("el-button",{staticStyle:{color:"#F56C6C"},attrs:{size:"mini",type:"text"},on:{click:function(n){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.offset,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"offset",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1),n("el-dialog",{attrs:{title:"编辑选手",width:"680px",visible:t.handleEditVisible,"modal-append-to-body":!1,"append-to-body":!0},on:{"update:visible":function(e){t.handleEditVisible=e}}},[n("el-form",{ref:"voteItemForm",attrs:{rules:t.rules,model:t.editItem,"label-width":"100px",size:"small"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[t._v(t._s(t.isVideo=t.isAssetTypeAnVideo(t.editItem.cover)))]),n("el-form-item",{attrs:{label:"选手"}},[n("el-upload",{staticClass:"avatar-uploader uploader",staticStyle:{"margin-right":"15px"},attrs:{data:t.dataObj,multiple:!1,action:"http://upload-z2.qiniup.com","show-file-list":!1,"on-success":function(e,n){return t.handleDataSuccess(e,n,t.index)},"before-upload":t.beforeUpload}},[t.editItem.cover&&!t.isVideo?n("img",{staticClass:"avatar",staticStyle:{width:"120px","max-height":"150px"},attrs:{src:t.editItem.cover+"?imageView2/0/w/120"}}):t.editItem.cover&&t.isVideo?n("video",{attrs:{controls:"",width:"120"}},[n("source",{attrs:{src:t.editItem.cover}}),t._v(" Sorry, your browser doesn't support embedded videos. ")]):n("i",{staticClass:"el-icon-plus avatar-uploader-icon",staticStyle:{width:"120px",height:"150px"}})])],1),n("el-form-item",{attrs:{label:"名称"}},[n("el-input",{attrs:{placeholder:"选手名称"},model:{value:t.editItem.name,callback:function(e){t.$set(t.editItem,"name",e)},expression:"editItem.name"}})],1),n("el-form-item",{attrs:{label:"投票编号"}},[n("el-input",{attrs:{placeholder:"投票编号",disabled:""},model:{value:t.editItem.voteCode,callback:function(e){t.$set(t.editItem,"voteCode",e)},expression:"editItem.voteCode"}})],1),n("el-form-item",{attrs:{label:"虚拟投票数"}},[n("el-input",{attrs:{placeholder:"虚拟投票数"},model:{value:t.editItem.virtualVote,callback:function(e){t.$set(t.editItem,"virtualVote",e)},expression:"editItem.virtualVote"}})],1),n("el-form-item",{attrs:{label:"分组"}},[n("el-select",{attrs:{disabled:"",placeholder:"全部"},model:{value:t.editItem.activityVoteGroupId,callback:function(e){t.$set(t.editItem,"activityVoteGroupId",e)},expression:"editItem.activityVoteGroupId"}},t._l(t.groupNames,(function(t,e){return n("el-option",{key:t.id,attrs:{label:t.group,value:t.id}})})),1)],1),n("el-form-item",{attrs:{label:"详情"}},[n("span",[t._v("待开发")])]),n("el-form-item",{attrs:{label:"更新时间"}},[n("span",[t._v(t._s(t.parseTime(t.editItem.updatedAt)))])]),n("el-form-item",{attrs:{label:"创建时间"}},[n("span",[t._v(t._s(t.parseTime(t.editItem.createdAt)))])])],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.handleEditVisible=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:t.voteItemSave}},[t._v("确 定")])],1)],1)],1)},i=[],a=(n("d3b7"),n("b0c0"),n("4de4"),n("a434"),n("bc3a"),n("ca41")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},s=[],u=(n("a9e3"),n("09f4")),c={name:"Pagination2",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page+1},set:function(t){this.$emit("update:page",1*t-1)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:1*this.currentPage-1,limit:t}),this.autoScroll&&Object(u["a"])(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&Object(u["a"])(0,800)}}},l=c,d=(n("3549"),n("2877")),f=Object(d["a"])(l,o,s,!1,null,"73c631a3",null),p=f.exports,m=n("ed08"),v=n("3123"),h={components:{Pagination:p},data:function(){return{groupNames:[],list:[],total:0,listLoading:!0,listQuery:{activityId:"",offset:0,limit:10,search:"",orderBy:2,voteGroupId:""},activityTypes:{1:"报名",2:"抽奖",3:"海报",4:"砍价",5:"秒杀",6:"拼团",7:"投票",8:"预约",9:"助力",10:"代金券",11:"折扣券",12:"兑换券",13:"体验券","-1":"团购"},handleEditVisible:!1,editItem:{cover:""},rules:{},dataObj:{token:"",key:""}}},created:function(){this.fetchToken(),this.listQuery.activityId=this.$route.params&&this.$route.params.id,this.groupNames=JSON.parse(decodeURIComponent(this.$route.query&&this.$route.query.groupNames)),console.log(this.groupNames),this.getList()},mounted:function(){},methods:{fetchToken:function(){var t=this;return new Promise((function(e,n){Object(v["a"])().then((function(n){var r=n.data;t._data.dataObj.token=r,e(!0)})).catch((function(t){console.log(t),n(!1)}))}))},beforeUpload:function(t){var e=t.name,n=this.getAssetType(e),r="ttz_"+(new Date).getTime()+"."+n,i=encodeURI("".concat(r));this.dataObj.key=i;var a=t.size/1024/1024<200;return a||this.$message.error("上传图片大小不能超过 200MB!"),a},handleDataSuccess:function(t,e,n){this.editItem.cover="https://ttz-user-file.qiniu.tuantuanzhan.cn/"+t.key},getList:function(){var t=this;this.listLoading=!0,Object(a["r"])(this.listQuery).then((function(e){e.data.offset=Math.ceil(e.data.total/t.listQuery.limit),e.data.limit=t.listQuery.limit,t.list=e.data.result,t.total=e.data.total,t.listLoading=!1}))},getGroup:function(t){return this.groupNames.filter((function(e){return e.id==t}))},handleFilter:function(){this.listQuery.offset=0,this.getList()},goHandleEdit:function(t,e){this.editItem=Object.assign({},e),this.handleEditVisible=!0},voteItemSave:function(){var t=this;Object(a["w"])(this.editItem).then((function(e){1*e.code===200?(t.$message({message:"编辑成功",type:"success"}),setTimeout((function(){t.handleEditVisible=!1}),1500)):t.$message({message:e.msg,type:"error"})}))},parseTime:function(t){return Object(m["e"])(t)},isAssetTypeAnVideo:function(t){return Object(m["d"])(t)},handleHide:function(t,e){var n=this;Object(a["x"])(e.id).then((function(e){1*e.code===200?(n.$message({message:"操作成功",type:"success"}),setTimeout((function(){n.handleEditVisible=!1,n.list.splice(t,1)}),1500)):n.$message({message:e.msg,type:"error"})}))},handleDelete:function(t,e){alert("。。。")}}},g=h,y=Object(d["a"])(g,r,i,!1,null,"07b2952d",null);e["default"]=y.exports},ed08:function(t,e,n){"use strict";n.d(e,"e",(function(){return i})),n.d(e,"a",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return s})),n.d(e,"b",(function(){return u}));var r=n("53ca");n("ac1f"),n("00b4"),n("5319"),n("4d63"),n("2c3e"),n("25f0"),n("d3b7"),n("4d90"),n("a15b"),n("d81d"),n("b64b"),n("1276"),n("fb6a"),n("159b"),n("a630"),n("3ca3"),n("6062"),n("ddb0"),n("466d"),n("7db0");function i(t,e){if(0===arguments.length)return null;var n,i=e||"{y}-{m}-{d} {h}:{i}:{s}";"object"===Object(r["a"])(t)?n=t:("string"===typeof t&&(t=/^[0-9]+$/.test(t)?parseInt(t):t.replace(new RegExp(/-/gm),"/")),"number"===typeof t&&10===t.toString().length&&(t*=1e3),n=new Date(t));var a={y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate(),h:n.getHours(),i:n.getMinutes(),s:n.getSeconds(),a:n.getDay()},o=i.replace(/{([ymdhisa])+}/g,(function(t,e){var n=a[e];return"a"===e?["日","一","二","三","四","五","六"][n]:n.toString().padStart(2,"0")}));return o}function a(t,e,n){var r,i,a,o,s,u=function u(){var c=+new Date-o;c<e&&c>0?r=setTimeout(u,e-c):(r=null,n||(s=t.apply(a,i),r||(a=i=null)))};return function(){for(var i=arguments.length,c=new Array(i),l=0;l<i;l++)c[l]=arguments[l];a=this,o=+new Date;var d=n&&!r;return r||(r=setTimeout(u,e)),d&&(s=t.apply(a,c),a=c=null),s}}function o(t){var e=t.split("."),n=e[e.length-1],r=["png","jpg","jpeg","bmp","gif","webp","psd","svg","tiff"],i="";return n&&(n=n.toLocaleLowerCase(),i=r.find((function(t){return t===n}))),!!i}function s(t){var e=t.split("."),n=e[e.length-1],r=["mp4","webm","avi","rmvb","3gp","flv"],i="";return n&&(n=n.toLocaleLowerCase(),i=r.find((function(t){return t===n}))),!!i}function u(t){var e=t.split("."),n=e[e.length-1];return n}},f183:function(t,e,n){var r=n("d012"),i=n("861d"),a=n("5135"),o=n("9bf2").f,s=n("90e3"),u=n("bb2f"),c=s("meta"),l=0,d=Object.isExtensible||function(){return!0},f=function(t){o(t,c,{value:{objectID:"O"+ ++l,weakData:{}}})},p=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,c)){if(!d(t))return"F";if(!e)return"E";f(t)}return t[c].objectID},m=function(t,e){if(!a(t,c)){if(!d(t))return!0;if(!e)return!1;f(t)}return t[c].weakData},v=function(t){return u&&h.REQUIRED&&d(t)&&!a(t,c)&&f(t),t},h=t.exports={REQUIRED:!1,fastKey:p,getWeakData:m,onFreeze:v};r[c]=!0}}]);