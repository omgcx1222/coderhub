(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-fab/components/uni-fab/uni-fab"],{"1c80":function(t,n,i){"use strict";i.r(n);var o=i("e536"),e=i.n(o);for(var r in o)"default"!==r&&function(t){i.d(n,t,(function(){return o[t]}))}(r);n["default"]=e.a},2312:function(t,n,i){"use strict";var o=i("4451"),e=i.n(o);e.a},"2fd7":function(t,n,i){"use strict";i.r(n);var o=i("cd7f"),e=i("1c80");for(var r in e)"default"!==r&&function(t){i.d(n,t,(function(){return e[t]}))}(r);i("2312");var s,u=i("f0c5"),c=Object(u["a"])(e["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=c.exports},4451:function(t,n,i){},cd7f:function(t,n,i){"use strict";i.d(n,"b",(function(){return e})),i.d(n,"c",(function(){return r})),i.d(n,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(i.bind(null,"7ae5"))}},e=function(){var t=this,n=t.$createElement;t._self._c},r=[]},e536:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o="other",e={name:"UniFab",emits:["fabClick","trigger"],props:{pattern:{type:Object,default:function(){return{}}},horizontal:{type:String,default:"left"},vertical:{type:String,default:"bottom"},direction:{type:String,default:"horizontal"},content:{type:Array,default:function(){return[]}},show:{type:Boolean,default:!1},popMenu:{type:Boolean,default:!0}},data:function(){return{fabShow:!1,isShow:!1,isAndroidNvue:"android"===o,styles:{color:"#3c3e49",selectedColor:"#007AFF",backgroundColor:"#fff",buttonColor:"#007AFF",iconColor:"#fff"}}},computed:{contentWidth:function(t){return 55*(this.content.length+1)+15+"px"},contentWidthMin:function(){return"55px"},boxWidth:function(){return this.getPosition(3,"horizontal")},boxHeight:function(){return this.getPosition(3,"vertical")},leftBottom:function(){return this.getPosition(0,"left","bottom")},rightBottom:function(){return this.getPosition(0,"right","bottom")},leftTop:function(){return this.getPosition(0,"left","top")},rightTop:function(){return this.getPosition(0,"right","top")},flexDirectionStart:function(){return this.getPosition(1,"vertical","top")},flexDirectionEnd:function(){return this.getPosition(1,"vertical","bottom")},horizontalLeft:function(){return this.getPosition(2,"horizontal","left")},horizontalRight:function(){return this.getPosition(2,"horizontal","right")}},watch:{pattern:{handler:function(t,n){this.styles=Object.assign({},this.styles,t)},deep:!0}},created:function(){this.isShow=this.show,0===this.top&&(this.fabShow=!0),this.styles=Object.assign({},this.styles,this.pattern)},methods:{_onClick:function(){this.$emit("fabClick"),this.popMenu&&(this.isShow=!this.isShow)},open:function(){this.isShow=!0},close:function(){this.isShow=!1},_onItemClick:function(t,n){this.$emit("trigger",{index:t,item:n})},getPosition:function(t,n,i){return 0===t?this.horizontal===n&&this.vertical===i:1===t?this.direction===n&&this.vertical===i:2===t?this.direction===n&&this.horizontal===i:this.isShow&&this.direction===n?this.contentWidth:this.contentWidthMin}}};n.default=e}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-fab/components/uni-fab/uni-fab-create-component',
    {
        'uni_modules/uni-fab/components/uni-fab/uni-fab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2fd7"))
        })
    },
    [['uni_modules/uni-fab/components/uni-fab/uni-fab-create-component']]
]);
