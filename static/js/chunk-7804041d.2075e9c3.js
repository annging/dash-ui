(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7804041d"],{"09f4":function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),Math.easeInOutQuad=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function i(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(e,t,a){var o=i(),s=e-o,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var i=Math.easeInOutQuad(u,o,s,t);r(i),u<t?n(e):a&&"function"===typeof a&&a()};c()}},1:function(e,t){},"1c18":function(e,t,a){},2:function(e,t){},"2a8e":function(e,t,a){},3:function(e,t){},"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},r=[],i=(a("a9e3"),a("09f4")),o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&Object(i["a"])(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&Object(i["a"])(0,800)}}},s=o,l=(a("e498"),a("2877")),u=Object(l["a"])(s,n,r,!1,null,"6af373ef",null);t["a"]=u.exports},"37cc":function(e,t,a){"use strict";a("4355")},4355:function(e,t,a){},6814:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-content"},[a("div",{staticClass:"left-container"},[a("el-menu",{staticStyle:{"margin-bottom":"20px"},attrs:{"default-active":"2",mode:"horizontal",router:""}},[a("el-menu-item",{attrs:{index:"1",route:{path:"/user/index"}}},[e._v("用户列表")]),a("el-menu-item",{attrs:{index:"2",route:{path:"/user/virtual"}}},[e._v("虚拟用户")]),a("el-menu-item",{attrs:{index:"4",route:{path:"/user/admin"}}},[e._v("后台管理员")]),a("el-menu-item",{attrs:{index:"3",route:{path:"/user/black"}}},[e._v("小黑屋(已删除的用户)")])],1),a("el-row",{staticClass:"filter-container",staticStyle:{"margin-bottom":"20px"},attrs:{type:"flex"}},[a("el-button",{staticStyle:{"min-width":"120px","margin-right":"20px"},attrs:{type:"primary",size:"small",icon:"el-icon-circle-plus-outline"},on:{click:e.goCreate}},[e._v("批量添加虚拟用户")]),a("el-button",{staticStyle:{"min-width":"120px","margin-right":"20px"},attrs:{type:"default",size:"small"},on:{click:e.goImport}},[e._v("excel导入虚拟用户")])],1),a("el-row",{staticClass:"list"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"",size:"small","header-cell-style":{"background-color":"#f7f9fa",color:"#637282;"}}},[a("el-table-column",{attrs:{prop:"id",label:"ID",sortable:"",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.id))])]}}])}),a("el-table-column",{attrs:{label:"头像",width:"60"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[a("img",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t.wxImg}})]}}])}),a("el-table-column",{attrs:{label:"昵称"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.nickName))])]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.current,limit:e.listQuery.size},on:{"update:page":function(t){return e.$set(e.listQuery,"current",t)},"update:limit":function(t){return e.$set(e.listQuery,"size",t)},pagination:e.getList}})],1)],1)])},r=[],i=(a("a434"),a("c24f")),o=a("333d"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("input",{ref:"excel-upload-input",staticClass:"excel-upload-input",attrs:{type:"file",accept:".xlsx, .xls"},on:{change:e.handleClick}}),a("div",{staticClass:"drop",on:{drop:e.handleDrop,dragover:e.handleDragover,dragenter:e.handleDragover}},[e._v(" 把excel文件拖拽到这里或者 "),a("el-button",{staticStyle:{"margin-left":"16px"},attrs:{loading:e.loading,size:"mini",type:"primary"},on:{click:e.handleUpload}},[e._v(" 点击上传 ")])],1)])},l=[],u=(a("d3b7"),a("ac1f"),a("00b4"),a("b0c0"),a("1146")),c=a.n(u),d={props:{beforeUpload:Function,onSuccess:Function},data:function(){return{loading:!1,excelData:{header:null,results:null}}},methods:{generateData:function(e){var t=e.header,a=e.results;this.excelData.header=t,this.excelData.results=a,this.onSuccess&&this.onSuccess(this.excelData)},handleDrop:function(e){if(e.stopPropagation(),e.preventDefault(),!this.loading){var t=e.dataTransfer.files;if(1===t.length){var a=t[0];if(!this.isExcel(a))return this.$message.error("Only supports upload .xlsx, .xls, .csv suffix files"),!1;this.upload(a),e.stopPropagation(),e.preventDefault()}else this.$message.error("Only support uploading one file!")}},handleDragover:function(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"},handleUpload:function(){this.$refs["excel-upload-input"].click()},handleClick:function(e){var t=e.target.files,a=t[0];a&&this.upload(a)},upload:function(e){if(this.$refs["excel-upload-input"].value=null,this.beforeUpload){var t=this.beforeUpload(e);t&&this.readerData(e)}else this.readerData(e)},readerData:function(e){var t=this;return this.loading=!0,new Promise((function(a,n){var r=new FileReader;r.onload=function(e){var n=e.target.result,r=c.a.read(n,{type:"array"}),i=r.SheetNames[0],o=r.Sheets[i],s=t.getHeaderRow(o),l=c.a.utils.sheet_to_json(o);t.generateData({header:s,results:l}),t.loading=!1,a()},r.readAsArrayBuffer(e)}))},getHeaderRow:function(e){var t,a=[],n=c.a.utils.decode_range(e["!ref"]),r=n.s.r;for(t=n.s.c;t<=n.e.c;++t){var i=e[c.a.utils.encode_cell({c:t,r:r})],o="UNKNOWN "+t;i&&i.t&&(o=c.a.utils.format_cell(i)),a.push(o)}return a},isExcel:function(e){return/\.(xlsx|xls|csv)$/.test(e.name)}}},p=d,f=(a("37cc"),a("2877")),h=Object(f["a"])(p,s,l,!1,null,"4f1bd099",null),g=h.exports,m={components:{Pagination:o["a"],UploadExcelComponent:g},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{searchStr:"",current:1,size:20},listFilter:{},levels:{1:"普通会员"},userTypes:{0:"客户",1:"管理员",2:"客服"},userSources:{1:"商家版",2:"用户版"}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(i["h"])(this.listQuery).then((function(t){t.data&&(e.list=t.data.records,e.total=t.data.total),e.listLoading=!1}))},handleFilter:function(){this.listQuery.current=1,this.getList()},handleDelete:function(e,t){var a=this;Object(i["c"])({id:t.id}).then((function(t){"200"===t.code?(a.$message({type:"success",message:"操作成功!"}),a.list.splice(e,1)):a.$message({type:"error",message:t.msg})}))},goImport:function(){this.$router.push({path:"/user/virtualimport"})},goCreate:function(){this.$router.push({path:"/user/virtualcreate"})}}},v=m,y=(a("e362"),Object(f["a"])(v,n,r,!1,null,"838f6320",null));t["default"]=y.exports},7156:function(e,t,a){var n=a("861d"),r=a("d2bb");e.exports=function(e,t,a){var i,o;return r&&"function"==typeof(i=t.constructor)&&i!==a&&n(o=i.prototype)&&o!==a.prototype&&r(e,o),e}},a434:function(e,t,a){"use strict";var n=a("23e7"),r=a("23cb"),i=a("a691"),o=a("50c4"),s=a("7b0b"),l=a("65f0"),u=a("8418"),c=a("1dde"),d=a("ae40"),p=c("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,g=Math.min,m=9007199254740991,v="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!p||!f},{splice:function(e,t){var a,n,c,d,p,f,y=s(this),b=o(y.length),x=r(e,b),w=arguments.length;if(0===w?a=n=0:1===w?(a=0,n=b-x):(a=w-2,n=g(h(i(t),0),b-x)),b+a-n>m)throw TypeError(v);for(c=l(y,n),d=0;d<n;d++)p=x+d,p in y&&u(c,d,y[p]);if(c.length=n,a<n){for(d=x;d<b-n;d++)p=d+n,f=d+a,p in y?y[f]=y[p]:delete y[f];for(d=b;d>b-n+a;d--)delete y[d-1]}else if(a>n)for(d=b-n;d>x;d--)p=d+n-1,f=d+a-1,p in y?y[f]=y[p]:delete y[f];for(d=0;d<a;d++)y[d+x]=arguments[d+2];return y.length=b-n+a,c}})},a9e3:function(e,t,a){"use strict";var n=a("83ab"),r=a("da84"),i=a("94ca"),o=a("6eeb"),s=a("5135"),l=a("c6b6"),u=a("7156"),c=a("c04e"),d=a("d039"),p=a("7c73"),f=a("241c").f,h=a("06cf").f,g=a("9bf2").f,m=a("58a8").trim,v="Number",y=r[v],b=y.prototype,x=l(p(b))==v,w=function(e){var t,a,n,r,i,o,s,l,u=c(e,!1);if("string"==typeof u&&u.length>2)if(u=m(u),t=u.charCodeAt(0),43===t||45===t){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+u}for(i=u.slice(2),o=i.length,s=0;s<o;s++)if(l=i.charCodeAt(s),l<48||l>r)return NaN;return parseInt(i,n)}return+u};if(i(v,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var S,_=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof _&&(x?d((function(){b.valueOf.call(a)})):l(a)!=v)?u(new y(w(t)),a,_):w(t)},N=n?f(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),z=0;N.length>z;z++)s(y,S=N[z])&&!s(_,S)&&g(_,S,h(y,S));_.prototype=b,b.constructor=_,o(r,v,_)}},e362:function(e,t,a){"use strict";a("2a8e")},e498:function(e,t,a){"use strict";a("1c18")}}]);