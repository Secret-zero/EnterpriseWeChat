webpackJsonp([33],{HQ2I:function(e,t){},"XP/F":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Xxa5"),o=n.n(r),s=n("exGp"),a=n.n(s),i=n("bOdI"),u=n.n(i),c=n("1h8J"),p=(Number,Boolean,{name:"countdown",props:{value:Number,start:{type:Boolean,default:!0}},created:function(){this.currentTime=this.time,this.value&&(this.currentTime=this.value)},methods:{tick:function(){var e=this;this.interval=setInterval(function(){e.currentTime>0?e.currentTime--:(e.stop(),e.index++,e.$emit("on-finish",e.index))},1e3)},stop:function(){clearInterval(this.interval)}},watch:{value:function(e){this.currentTime=e},currentTime:function(e){this.$emit("input",e)},start:function(e,t){!0===e&&!1===t&&this.currentTime>0&&this.tick(),!1===e&&!0===t&&this.stop()}},mounted:function(){this.start&&this.tick()},data:function(){return{interval:null,index:0,currentTime:60}}}),m={render:function(){var e=this.$createElement;return(this._self._c||e)("span",[this._v(this._s(this.currentTime))])},staticRenderFns:[]},v=n("VU/8")(p,m,!1,null,null,null).exports,l=n("oWtu"),d=(l.a,Boolean,String,{name:"check-icon",components:{Icon:l.a},methods:{updateValue:function(){this.$emit("update:value",!this.value)}},props:{value:{type:Boolean,default:!1},type:{type:String,default:"default"}}}),h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vux-check-icon",on:{click:e.updateValue}},[n("icon",{directives:[{name:"show",rawName:"v-show",value:"default"===e.type&&e.value,expression:"type === 'default' && value"}],attrs:{type:"success"}}),e._v(" "),n("icon",{directives:[{name:"show",rawName:"v-show",value:"plain"===e.type&&e.value,expression:"type === 'plain' && value"}],attrs:{type:"success_circle"}}),e._v(" "),n("icon",{directives:[{name:"show",rawName:"v-show",value:!e.value,expression:"!value"}],attrs:{type:"circle"}}),e._v(" "),n("span",[e._t("default")],2)],1)},staticRenderFns:[]};var f=n("VU/8")(d,h,!1,function(e){n("HQ2I")},null,null).exports,_=n("HD9R"),x=n("2sLL"),w=n("63CM"),g=(w.a,_.a,x.a,{data:function(){var e;return{time:120,isSmsMessage:!0,form:(e={userpic:this.$route.query.headImg?this.$route.query.headImg:"",nickname:this.$route.query.nickName?this.$route.query.nickName:"",name:"",sex:"",Phone:""},u()(e,"name",""),u()(e,"agree",!1),u()(e,"WeixinOpenID",this.$route.query.openId),e),popupShow:!1,code:"",smsCode:""}},computed:{},directives:{TransferDom:w.a},components:{Countdown:v,CheckIcon:f,Popup:_.a,XButton:x.a},mounted:function(){if(this.$route.query.openId)return this.$store.commit("SET_WXOPENID",this.$route.query.openId),void this.getUserInfo1()},methods:{test:function(){this.$store.commit("SET_WXOPENID","ob9om0tCsmvYG4WGZQgaG5TF4jaY")},getUserInfo1:function(){var e=this;return a()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(c._8)({FWeixinOpenID:e.$route.query.openId});case 2:t.sent,e.$store.commit("SET_WXOPENID",e.$route.query.openId),e.$router.replace({path:"/",query:{openId:e.$route.query.openId}});case 5:case"end":return t.stop()}},t,e)}))()},wxbind:function(){var e=this;return a()(o.a.mark(function t(){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(999999==parseInt(e.smsCode)||parseInt(e.code)===parseInt(e.smsCode)){t.next=5;break}return e.$vux.toast.text("请输入正确验证码"),t.abrupt("return");case 5:if(e.form.name){t.next=8;break}return e.$vux.toast.text("请输入真实姓名"),t.abrupt("return");case 8:if(e.form.Phone){t.next=11;break}return e.$vux.toast.text("请填写手机号码"),t.abrupt("return");case 11:if(e.form.agree){t.next=14;break}return e.$vux.toast.text("请先阅读并同意相关协议"),t.abrupt("return");case 14:return t.next=16,Object(c._5)(e.form);case 16:n=t.sent,e.$vux.toast.text(n),e.$router.push({path:"/index",query:{openId:e.$route.query.openId}}),console.log(n),console.log(e.form);case 21:case"end":return t.stop()}},t,e)}))()},finish:function(){this.time=120,this.isSmsMessage=!0},onSms:function(){var e=this;return a()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.$vux.toast.text("验证码暂时先用999999"),e.code=999999;case 2:case"end":return t.stop()}},t,e)}))()},popupClose:function(){this.form.agree=!0,this.popupShow=!1}}}),$={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap",attrs:{id:"wrap"}},[n("div",{staticClass:"wxLogin"},[n("div",{staticClass:"form"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],attrs:{type:"text",name:"",placeholder:"请输入真实姓名"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.Phone,expression:"form.Phone"}],attrs:{type:"tel",name:"",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:e.form.Phone},on:{input:function(t){t.target.composing||e.$set(e.form,"Phone",t.target.value)}}}),e._v(" "),n("div",{staticClass:"code"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.smsCode,expression:"smsCode"}],attrs:{type:"text",name:"",placeholder:"请输入验证码"},domProps:{value:e.smsCode},on:{input:function(t){t.target.composing||(e.smsCode=t.target.value)}}}),e._v(" "),e.isSmsMessage?n("div",{staticClass:"btn submit",on:{click:function(t){return e.onSms()}}},[e._v("获取验证码")]):e._e(),e._v(" "),e.isSmsMessage?e._e():n("div",{staticClass:"btn submit"},[n("countdown",{on:{"on-finish":e.finish},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)])]),e._v(" "),n("div",{staticClass:"login-agree"},[n("check-icon",{attrs:{value:e.form.agree},on:{"update:value":function(t){return e.$set(e.form,"agree",t)}}},[e._v("已阅读并同意")]),e._v(" "),n("b",{on:{click:function(t){e.popupShow=!e.popupShow}}},[e._v("《企业移动应用平台用户协议》")])],1),e._v(" "),n("div",{staticClass:"submit",on:{click:e.wxbind}},[e._v("绑定")])]),e._v(" "),n("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[n("popup",{attrs:{height:"100%"},model:{value:e.popupShow,callback:function(t){e.popupShow=t},expression:"popupShow"}},[n("div",{staticClass:"popup-content"},[n("h1",[e._v("企业移动应用平台用户协议")]),e._v(" "),n("p",[e._v("欢迎您使用本公司企业移动应用平台！")]),e._v(" "),n("p",[e._v("　　为使用本公司企业移动应用平台服务（以下简称“本服务”），请你审慎阅读并充分理解《企业移动应用平台用户协议》（以下简称“本协议”）各条款内容，特别是免除或限制责任的相应条款，并选择接受或不接受。你选择接受，则视为你自愿遵守本协议之所有规定。")]),e._v(" "),n("p",[e._v("　　除非你已阅读并接受本协议所有条款，否则你无权使用企业移动应用平台服务。你对本服务的登录、查看、发布、处理信息等行为即视为你已阅读并同意本协议的约束。")]),e._v(" "),n("p",[e._v("　　1、本协议是你与金帝集团股份有限公司及其相关服务可能存在的运营关联单位（以下简称“本公司”）之间关于你使用本服务所订立的协议。 “用户”是指注册、关注、登录、使用本公司企业信息平台的个人或组织，在本协议中更多地称为“你”。")]),e._v(" "),n("p",[e._v("　　2、企业移动应用平台是本公司向用户提供的信息发布、内部联络、工作服务、工作管理以及与此相关的互联网信息技术服务。本公司企业移动应用平台包括企业微信公众号（金帝集团股份有限公司）、企业微信号（金帝集团股份有限公司）、OA（http://oa.goldemperor.com）、MES小程序等。")]),e._v(" "),n("p",[e._v("　　3、如需使用本公司企业移动应用平台服务，须先成为本公司企业移动应用平台的关注用户。你须使用你自己注册且是用你本人身份证验证通过的实名制微信号关注本公司的企业微信公众号、企业微信号。成为关注用户应当如实填写和提交帐号注册与认证资料，完成信息登记，并对资料的真实性、合法性、准确性和有效性承担责任。")]),e._v(" "),n("p",[e._v("　　4、你同意授权本公司在法律允许和审核需要的范围内对你提交的资料、信息及相关背景信息、关联信息进行查询，并根据审核情况进行独立判断后确定认证结果。本公司依据你填写和提交的帐号资料，在法律允许的范围内备案存档并可向其他用户展示你的注册信息。")]),e._v(" "),n("p",[e._v("　　5、一旦你使用你的微信成功关注本公司的企业微信公众号、企业微信号，即视为是你自己本人所为。使用你成为本企业移动应用平台的关注用户的微信号在企业移动应用平台进行信息发布、工作处理、用户消息处理等均视为是你自己本人所为。")]),e._v(" "),n("p",[e._v("　　6、你理解并同意，本服务平台是为关注用户提供信息发布、分享、获取以及工作服务、处理的平台，你必须为自己使用本公司企业移动应用平台的一切行为负责，包括你所发布、处理的任何内容以及由此产生的任何后果。你应对本服务平台的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因风险而导致的任何损失或损害承担责任。")]),e._v(" "),n("h2",[e._v("金帝集团股份有限公司")]),e._v(" "),n("x-button",{attrs:{type:"warn"},nativeOn:{click:function(t){return e.popupClose(t)}}},[e._v("已阅并同意")])],1)])],1)])},staticRenderFns:[]};var y=n("VU/8")(g,$,!1,function(e){n("kP7x")},"data-v-99086b3c",null);t.default=y.exports},kP7x:function(e,t){}});
//# sourceMappingURL=33.109f839adacb285f6d2b.js.map