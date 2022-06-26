(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pubMoment/SelectLabel"],{"0497":function(t,e,n){"use strict";n.r(e);var a=n("0ee2"),u=n("1ba3");for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);n("a19e");var r,i=n("f0c5"),o=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,"8a6a5556",null,!1,a["a"],r);e["default"]=o.exports},"0ee2":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},c=[]},"1ba3":function(t,e,n){"use strict";n.r(e);var a=n("283a"),u=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=u.a},"283a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"SelectLabel",props:["labels"],data:function(){return{title:"# 选择标签"}},methods:{selectLabel:function(){var e=this,n=this.labels.map((function(t){return t.name}));t.showActionSheet({itemList:n,success:function(t){e.title=n[t.tapIndex],e.$emit("selectIndex",t.tapIndex)}})}}};e.default=n}).call(this,n("543d")["default"])},"64f5":function(t,e,n){},a19e:function(t,e,n){"use strict";var a=n("64f5"),u=n.n(a);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pubMoment/SelectLabel-create-component',
    {
        'components/pubMoment/SelectLabel-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0497"))
        })
    },
    [['components/pubMoment/SelectLabel-create-component']]
]);
