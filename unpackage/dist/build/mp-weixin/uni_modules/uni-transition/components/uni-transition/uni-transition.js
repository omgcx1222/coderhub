(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-transition/components/uni-transition/uni-transition"],{"0f68":function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=i("3e4c");function o(t){return c(t)||s(t)||a(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,n){if(t){if("string"===typeof t)return u(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?u(t,n):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t){if(Array.isArray(t))return u(t)}function u(t,n){(null==n||n>t.length)&&(n=t.length);for(var i=0,e=new Array(n);i<n;i++)e[i]=t[i];return e}function f(t,n){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),i.push.apply(i,e)}return i}function l(t){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?f(Object(i),!0).forEach((function(n){m(t,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):f(Object(i)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(i,n))}))}return t}function m(t,n,i){return n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i,t}var d={name:"uniTransition",emits:["click","change"],props:{show:{type:Boolean,default:!1},modeClass:{type:[Array,String],default:function(){return"fade"}},duration:{type:Number,default:300},styles:{type:Object,default:function(){return{}}},customClass:{type:String,default:""}},data:function(){return{isShow:!1,transform:"",opacity:1,animationData:{},durationTime:300,config:{}}},watch:{show:{handler:function(t){t?this.open():this.isShow&&this.close()},immediate:!0}},computed:{stylesObject:function(){var t=l(l({},this.styles),{},{"transition-duration":this.duration/1e3+"s"}),n="";for(var i in t){var e=this.toLine(i);n+=e+":"+t[i]+";"}return n},transformStyles:function(){return"transform:"+this.transform+";opacity:"+this.opacity+";"+this.stylesObject}},created:function(){this.config={duration:this.duration,timingFunction:"ease",transformOrigin:"50% 50%",delay:0},this.durationTime=this.duration},methods:{init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.duration&&(this.durationTime=t.duration),this.animation=(0,e.createAnimation)(Object.assign(this.config,t),this)},onClick:function(){this.$emit("click",{detail:this.isShow})},step:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this.animation){for(var i in t)try{var e;if("object"===typeof t[i])(e=this.animation)[i].apply(e,o(t[i]));else this.animation[i](t[i])}catch(r){console.error("方法 ".concat(i," 不存在"))}return this.animation.step(n),this}},run:function(t){this.animation&&this.animation.run(t)},open:function(){var t=this;clearTimeout(this.timer),this.transform="",this.isShow=!0;var n=this.styleInit(!1),i=n.opacity,o=n.transform;"undefined"!==typeof i&&(this.opacity=i),this.transform=o,this.$nextTick((function(){t.timer=setTimeout((function(){t.animation=(0,e.createAnimation)(t.config,t),t.tranfromInit(!1).step(),t.animation.run(),t.$emit("change",{detail:t.isShow})}),20)}))},close:function(t){var n=this;this.animation&&this.tranfromInit(!0).step().run((function(){n.isShow=!1,n.animationData=null,n.animation=null;var t=n.styleInit(!1),i=t.opacity,e=t.transform;n.opacity=i||1,n.transform=e,n.$emit("change",{detail:n.isShow})}))},styleInit:function(t){var n=this,i={transform:""},e=function(t,e){"fade"===e?i.opacity=n.animationType(t)[e]:i.transform+=n.animationType(t)[e]+" "};return"string"===typeof this.modeClass?e(t,this.modeClass):this.modeClass.forEach((function(n){e(t,n)})),i},tranfromInit:function(t){var n=this,i=function(t,i){var e=null;"fade"===i?e=t?0:1:(e=t?"-100%":"0","zoom-in"===i&&(e=t?.8:1),"zoom-out"===i&&(e=t?1.2:1),"slide-right"===i&&(e=t?"100%":"0"),"slide-bottom"===i&&(e=t?"100%":"0")),n.animation[n.animationMode()[i]](e)};return"string"===typeof this.modeClass?i(t,this.modeClass):this.modeClass.forEach((function(n){i(t,n)})),this.animation},animationType:function(t){return{fade:t?1:0,"slide-top":"translateY(".concat(t?"0":"-100%",")"),"slide-right":"translateX(".concat(t?"0":"100%",")"),"slide-bottom":"translateY(".concat(t?"0":"100%",")"),"slide-left":"translateX(".concat(t?"0":"-100%",")"),"zoom-in":"scaleX(".concat(t?1:.8,") scaleY(").concat(t?1:.8,")"),"zoom-out":"scaleX(".concat(t?1:1.2,") scaleY(").concat(t?1:1.2,")")}},animationMode:function(){return{fade:"opacity","slide-top":"translateY","slide-right":"translateX","slide-bottom":"translateY","slide-left":"translateX","zoom-in":"scale","zoom-out":"scale"}},toLine:function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}}};n.default=d},"36ea":function(t,n,i){"use strict";var e;i.d(n,"b",(function(){return o})),i.d(n,"c",(function(){return r})),i.d(n,"a",(function(){return e}));var o=function(){var t=this,n=t.$createElement;t._self._c},r=[]},bdcb:function(t,n,i){"use strict";i.r(n);var e=i("36ea"),o=i("fa71");for(var r in o)"default"!==r&&function(t){i.d(n,t,(function(){return o[t]}))}(r);var a,s=i("f0c5"),c=Object(s["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);n["default"]=c.exports},fa71:function(t,n,i){"use strict";i.r(n);var e=i("0f68"),o=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(n,t,(function(){return e[t]}))}(r);n["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-transition/components/uni-transition/uni-transition-create-component',
    {
        'uni_modules/uni-transition/components/uni-transition/uni-transition-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("bdcb"))
        })
    },
    [['uni_modules/uni-transition/components/uni-transition/uni-transition-create-component']]
]);
