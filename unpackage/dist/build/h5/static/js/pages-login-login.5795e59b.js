(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{1086:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,".header[data-v-7360638a]{height:%?250?%;display:flex;align-items:flex-end;justify-content:space-between;padding:10px 20px 0;font-weight:600;color:#8a8a8a;position:relative}.title[data-v-7360638a]{color:#000;font-size:40px}.form[data-v-7360638a]{padding:20px}.form uni-input[data-v-7360638a]{height:36px;font-size:18px;background-color:#ededed;padding:5px 10px;border-radius:5px}.form uni-button[data-v-7360638a]{background-color:#000;color:#dfdfdf;font-weight:600}.tips[data-v-7360638a]{width:100%;display:inline-block;margin-bottom:10px;color:red;font-size:13px}.password[data-v-7360638a]{position:relative}.password uni-input[data-v-7360638a]{padding-right:40px}.password .iconfont[data-v-7360638a]{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);font-size:20px;color:#8a8a8a}.password .showpwd[data-v-7360638a]{color:#000}.user-agreement[data-v-7360638a]{margin:0 0 20px}.read[data-v-7360638a]{color:#8a8a8a}.agreement[data-v-7360638a]{color:#000;text-decoration:underline}\n[data-v-7360638a] .uni-checkbox-input{border-color:#d1d1d1;color:#fff!important;background-color:#fff!important}[data-v-7360638a] .uni-checkbox-input:hover{border-color:#ff9e01!important}[data-v-7360638a] .uni-checkbox-input-checked{border-color:#ff9e01!important;background-color:#ff9e01!important}\n.isLogin[data-v-7360638a]{text-align:center;margin:30px auto}",""]),e.exports=t},"244b":function(e,t,a){var n=a("1086");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("757a64f4",n,!0,{sourceMap:!1,shadowMode:!1})},"28cb":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var n={uniNavBar:a("74e5").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"login"},[a("uni-nav-bar",{attrs:{statusBar:"true",border:!1,leftIcon:"left"},on:{clickLeft:function(t){arguments[0]=t=e.$handleEvent(t),e.back()}}}),a("v-uni-view",{staticClass:"header"},[a("v-uni-text",{staticClass:"title"},[e._v("coderhub")]),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.isLogin,expression:"isLogin"}],on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.wangjimima.apply(void 0,arguments)}}},[e._v("忘记密码？")])],1),a("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"form"},[e.isLogin?e._e():a("v-uni-view",[a("v-uni-input",{staticClass:"nickname",attrs:{type:"text",name:"nickname",placeholder:"昵称（1~10）",maxlength:"10"}}),a("v-uni-text",{staticClass:"tips"},[e._v(e._s(e.nicknameTip))])],1),a("v-uni-input",{attrs:{type:"text",name:"username",placeholder:"账号（4~16，英文或数字）",maxlength:"20"}}),a("v-uni-text",{staticClass:"tips"},[e._v(e._s(e.usernameTip))]),a("v-uni-view",{staticClass:"password"},[a("v-uni-input",{attrs:{type:"text",name:"password",password:!e.showpwd,placeholder:"密码(4~16,至少包含数字英文字符两种)",maxlength:"30"}}),a("v-uni-text",{staticClass:"iconfont icon-yanjing",class:{showpwd:e.showpwd},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showPwd.apply(void 0,arguments)}}})],1),a("v-uni-text",{staticClass:"tips"},[e._v(e._s(e.passwordTip))]),a("v-uni-checkbox-group",{staticClass:"user-agreement",attrs:{name:"agree"}},[a("v-uni-label",[a("v-uni-checkbox"),a("v-uni-text",{staticClass:"read"},[e._v("已阅读并同意")])],1),a("v-uni-text",{staticClass:"agreement",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.readAgreement.apply(void 0,arguments)}}},[e._v("《用户协议》")])],1),a("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:e.isLogin,expression:"isLogin"}],attrs:{"form-type":"submit"}},[e._v("登 录")]),a("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!e.isLogin,expression:"!isLogin"}],attrs:{"form-type":"submit"}},[e._v("注 册")]),a("v-uni-view",{staticClass:"isLogin"},[a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:e.isLogin,expression:"isLogin"}],on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.gozhuce.apply(void 0,arguments)}}},[e._v("没有账号？去注册")]),a("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:!e.isLogin,expression:"!isLogin"}],on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.gozhuce.apply(void 0,arguments)}}},[e._v("已有账号？去登录")])],1)],1)],1)],1)},o=[]},"4e57":function(e,t,a){"use strict";var n=a("244b"),i=a.n(n);i.a},"652d":function(e,t,a){"use strict";a.r(t);var n=a("28cb"),i=a("74f6");for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);a("4e57");var s,r=a("f0c5"),u=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"7360638a",null,!1,n["a"],s);t["default"]=u.exports},"74f6":function(e,t,a){"use strict";a.r(t);var n=a("92e7"),i=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=i.a},"92e7":function(e,t,a){"use strict";var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var i=n(a("1da1")),o=a("3eee"),s={name:"login",data:function(){return{isLogin:!0,nicknameTip:"",usernameTip:"",passwordTip:"",showpwd:!1}},methods:{formSubmit:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var n,i,s,r,u,c,d,l,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=e.detail.value,i=n.nickname,s=n.username,r=n.password,u=n.agree,0!==u.length){a.next=3;break}return a.abrupt("return",uni.showToast({title:"未同意用户协议",icon:"error"}));case 3:if(!t.isLogin){a.next=19;break}if(s){a.next=8;break}t.usernameTip="用户名为空",a.next=17;break;case 8:if(r){a.next=12;break}t.passwordTip="密码为空",a.next=17;break;case 12:return uni.showLoading({title:"登录中..."}),a.next=15,(0,o.request)({url:"/login",method:"POST",data:{username:s,password:r}});case 15:c=a.sent,200===c.statusCode?(uni.hideLoading(),uni.showToast({title:"登录成功"}),uni.setStorageSync("userInfo",c.data),t.$store.dispatch("login",c.data),t.back()):uni.showToast({title:"用户名或密码错误",icon:"error"});case 17:a.next=44;break;case 19:if(t.usernameTip="",t.passwordTip="",t.nicknameTip="",d=/^[a-zA-Z0-9]{4,16}$/,l=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{4,16}$/,!(i.length<=0||i.length>10)){a.next=28;break}t.nicknameTip="昵称长度1-10",a.next=44;break;case 28:if(d.test(s)){a.next=32;break}t.usernameTip="账号长度4-16，数字或字母组成",a.next=44;break;case 32:if(l.test(r)){a.next=36;break}t.passwordTip="密码长度4-16，数字、英文、字符中的两种以上组成",a.next=44;break;case 36:return uni.showLoading({title:"注册中..."}),a.next=39,(0,o.request)({url:"/user",method:"POST",data:{nickname:i,username:s,password:r}});case 39:if(p=a.sent,200==p.statusCode){a.next=42;break}return a.abrupt("return",uni.showToast({title:p.data,icon:"error"}));case 42:uni.hideLoading(),uni.showToast({title:"注册成功！"});case 44:case"end":return a.stop()}}),a)})))()},showPwd:function(){this.showpwd=!this.showpwd},back:function(){uni.navigateBack()},readAgreement:function(){uni.navigateTo({url:"/pages/login/agreement"})},gozhuce:function(){this.isLogin=!this.isLogin},wangjimima:function(){uni.showModal({content:"忘记密码找作者，作者QQ：2389342251",showCancel:!1,confirmColor:"#000"})}}};t.default=s}}]);