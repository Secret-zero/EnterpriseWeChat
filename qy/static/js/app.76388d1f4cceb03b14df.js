webpackJsonp([66],{"/kga":function(t,e,n){"use strict";var i=n("JkZY"),o=(i.a,Boolean,String,String,Number,String,String,Boolean,Object,Boolean,{mixins:[i.a],name:"x-dialog",model:{prop:"show",event:"change"},props:{show:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},maskZIndex:[String,Number],dialogTransition:{type:String,default:"vux-dialog"},dialogClass:{type:String,default:"weui-dialog"},hideOnBlur:Boolean,dialogStyle:Object,scroll:{type:Boolean,default:!0,validator:function(t){return!0}}},computed:{maskStyle:function(){if(void 0!==this.maskZIndex)return{zIndex:this.maskZIndex}}},mounted:function(){"undefined"!=typeof window&&window.VUX_CONFIG&&"VIEW_BOX"===window.VUX_CONFIG.$layout&&(this.layout="VIEW_BOX")},watch:{show:function(t){this.$emit("update:show",t),this.$emit(t?"on-show":"on-hide"),t?this.addModalClassName():this.removeModalClassName()}},methods:{shouldPreventScroll:function(){var t=/iPad|iPhone|iPod/i.test(window.navigator.userAgent),e=this.$el.querySelector("input")||this.$el.querySelector("textarea");if(t&&e)return!0},hide:function(){this.hideOnBlur&&(this.$emit("update:show",!1),this.$emit("change",!1),this.$emit("on-click-mask"))}},data:function(){return{layout:""}}}),a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",class:{"vux-x-dialog-absolute":"VIEW_BOX"===t.layout}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-mask",style:t.maskStyle,on:{click:t.hide}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:t.dialogClass,style:t.dialogStyle},[t._t("default")],2)])],1)},staticRenderFns:[]};var s=n("VU/8")(o,a,!1,function(t){n("6Erz")},null,null);e.a=s.exports},"62KO":function(t,e,n){"use strict";var i=n("/kga"),o=(i.a,Boolean,Boolean,String,String,Boolean,String,String,String,String,Number,String,String,String,Boolean,Object,Boolean,String,Boolean,Boolean,{name:"confirm",components:{XDialog:i.a},props:{value:{type:Boolean,default:!1},showInput:{type:Boolean,default:!1},placeholder:{type:String,default:""},theme:{type:String,default:"ios"},hideOnBlur:{type:Boolean,default:!1},title:String,confirmText:String,cancelText:String,maskTransition:{type:String,default:"vux-fade"},maskZIndex:[Number,String],dialogTransition:{type:String,default:"vux-dialog"},content:String,closeOnConfirm:{type:Boolean,default:!0},inputAttrs:Object,showContent:{type:Boolean,default:!0},confirmType:{type:String,default:"primary"},showCancelButton:{type:Boolean,default:!0},showConfirmButton:{type:Boolean,default:!0}},created:function(){this.showValue=this.show,this.value&&(this.showValue=this.value)},watch:{value:function(t){this.showValue=t},showValue:function(t){var e=this;this.$emit("input",t),t&&(this.showInput&&(this.msg="",setTimeout(function(){e.$refs.input&&e.setInputFocus()},300)),this.$emit("on-show"))}},data:function(){return{msg:"",showValue:!1}},methods:{getInputAttrs:function(){return this.inputAttrs||{type:"text"}},setInputValue:function(t){this.msg=t},setInputFocus:function(t){t&&t.preventDefault(),this.$refs.input.focus()},_onConfirm:function(){this.showValue&&(this.closeOnConfirm&&(this.showValue=!1),this.$emit("on-confirm",this.msg))},_onCancel:function(){this.showValue&&(this.showValue=!1,this.$emit("on-cancel"))}}}),a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-confirm"},[n("x-dialog",{attrs:{"dialog-class":"android"===t.theme?"weui-dialog weui-skin_android":"weui-dialog","mask-transition":t.maskTransition,"dialog-transition":"android"===t.theme?"vux-fade":t.dialogTransition,"hide-on-blur":t.hideOnBlur,"mask-z-index":t.maskZIndex},on:{"on-hide":function(e){return t.$emit("on-hide")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[t.title?n("div",{staticClass:"weui-dialog__hd",class:{"with-no-content":!t.showContent}},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]):t._e(),t._v(" "),t.showContent?[t.showInput?n("div",{staticClass:"vux-prompt"},["checkbox"===t.getInputAttrs().type?n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:"checkbox"},domProps:{checked:Array.isArray(t.msg)?t._i(t.msg,null)>-1:t.msg},on:{touchend:t.setInputFocus,change:function(e){var n=t.msg,i=e.target,o=!!i.checked;if(Array.isArray(n)){var a=t._i(n,null);i.checked?a<0&&(t.msg=n.concat([null])):a>-1&&(t.msg=n.slice(0,a).concat(n.slice(a+1)))}else t.msg=o}}},"input",t.getInputAttrs(),!1)):"radio"===t.getInputAttrs().type?n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:"radio"},domProps:{checked:t._q(t.msg,null)},on:{touchend:t.setInputFocus,change:function(e){t.msg=null}}},"input",t.getInputAttrs(),!1)):n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:t.getInputAttrs().type},domProps:{value:t.msg},on:{touchend:t.setInputFocus,input:function(e){e.target.composing||(t.msg=e.target.value)}}},"input",t.getInputAttrs(),!1))]):n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2)]:t._e(),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[t.showCancelButton?n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_default",attrs:{href:"javascript:;"},on:{click:t._onCancel}},[t._v(t._s(t.cancelText||"取消"))]):t._e(),t._v(" "),t.showConfirmButton?n("a",{staticClass:"weui-dialog__btn",class:"weui-dialog__btn_"+t.confirmType,attrs:{href:"javascript:;"},on:{click:t._onConfirm}},[t._v(t._s(t.confirmText||"确定"))]):t._e()])],2)],1)},staticRenderFns:[]};var s=n("VU/8")(o,a,!1,function(t){n("PgbK")},null,null);e.a=s.exports},"6Erz":function(t,e){},"8vzP":function(t,e){},Bfwr:function(t,e,n){"use strict";Boolean,String,String,String;var i={name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(t){this.$emit("update:show",t)}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading",class:t.text?"":"vux-loading-no-text"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2):t._e()])])])},staticRenderFns:[]};var a=n("VU/8")(i,o,!1,function(t){n("t+oN")},null,null);e.a=a.exports},"FT/c":function(t,e,n){"use strict";var i=n("//Fk"),o=n.n(i),a=n("mtWM"),s=n.n(a),l=n("uaSg");s.a.defaults.baseURL=l.a,s.a.interceptors.request.use(function(t){return t},function(t){return console.log(2),o.a.reject(t)}),s.a.interceptors.response.use(function(t){return t},function(t){return t.response&&console.log(t),o.a.reject(t)}),e.a=s.a},IwgP:function(t,e){},N1kN:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),o=n("Dd8w"),a=n.n(o),s=n("Bfwr"),l=n("NYxO"),r=(a()({},Object(l.b)({isLoading:function(t){return t.common.isLoading}})),s.a,{computed:a()({},Object(l.b)({isLoading:function(t){return t.common.isLoading}})),mounted:function(){},components:{Loading:s.a}}),c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("loading",{model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),n("keep-alive",[t.$route.meta.keepAlive?n("router-view"):t._e()],1),t._v(" "),t.$route.meta.keepAlive?t._e():n("router-view")],1)},staticRenderFns:[]};var u=n("VU/8")(r,c,!1,function(t){n("yroz")},null,null).exports,p=n("/ocq"),m=n("uaSg");i.default.use(p.a);var h,d=new p.a({mode:m.d,routes:[{path:"/login",name:"login",meta:{keepAlive:!1,title:"用户注册绑定"},component:function(t){Promise.all([n.e(0),n.e(33)]).then(function(){var e=[n("XP/F")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/index",name:"index",meta:{keepAlive:!1,title:"企业微信"},component:function(t){Promise.all([n.e(0),n.e(1)]).then(function(){var e=[n("JXTs")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/",name:"index",meta:{keepAlive:!1,title:"企业微信"},component:function(t){Promise.all([n.e(0),n.e(1)]).then(function(){var e=[n("JXTs")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/personal",name:"personal",meta:{keepAlive:!1,title:"个人信息"},component:function(t){Promise.all([n.e(0),n.e(53)]).then(function(){var e=[n("uTKz")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myVoucher",name:"myVoucher",meta:{keepAlive:!1,title:"我的餐券"},component:function(t){Promise.all([n.e(0),n.e(5)]).then(function(){var e=[n("clb9")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/voucherlist",name:"voucherlist",meta:{keepAlive:!1,title:"我的餐券"},component:function(t){Promise.all([n.e(0),n.e(7)]).then(function(){var e=[n("x0pj")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myWages",name:"myWages",meta:{keepAlive:!1,title:"我的工资"},component:function(t){Promise.all([n.e(0),n.e(25)]).then(function(){var e=[n("xhKK")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myProperty",name:"myProperty",meta:{keepAlive:!1,title:"我的财产"},component:function(t){Promise.all([n.e(0),n.e(11)]).then(function(){var e=[n("djNB")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myProperty/transfer",name:"myPropertyTransfer",meta:{keepAlive:!1,title:"财产移交"},component:function(t){Promise.all([n.e(0),n.e(26)]).then(function(){var e=[n("fZvW")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myProperty/scrap",name:"myPropertyScrap",meta:{keepAlive:!1,title:"财产报废"},component:function(t){Promise.all([n.e(0),n.e(13)]).then(function(){var e=[n("xpyv")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myProperty/inventory",name:"myPropertyInventory",meta:{keepAlive:!1,title:"盘点"},component:function(t){Promise.all([n.e(0),n.e(46)]).then(function(){var e=[n("bv4y")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myProperty/info",name:"myPropertyInfo",meta:{keepAlive:!1,title:"我的财产"},component:function(t){Promise.all([n.e(0),n.e(62)]).then(function(){var e=[n("KGHk")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/assessment",name:"assessment",meta:{keepAlive:!1,title:"我的考核"},component:function(t){Promise.all([n.e(0),n.e(32)]).then(function(){var e=[n("VPiV")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/leave",name:"leave",meta:{keepAlive:!1,title:"我要请假"},component:function(t){Promise.all([n.e(0),n.e(15)]).then(function(){var e=[n("LZH8")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/punch",name:"punch",meta:{keepAlive:!1,title:"考勤打卡"},component:function(t){Promise.all([n.e(0),n.e(24)]).then(function(){var e=[n("KmOi")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/yield",name:"yield",meta:{keepAlive:!1,title:"我的产量"},component:function(t){Promise.all([n.e(0),n.e(12)]).then(function(){var e=[n("oFgO")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/chargeCard",name:"chargeCard",meta:{keepAlive:!1,title:"我要充卡"},component:function(t){Promise.all([n.e(0),n.e(45)]).then(function(){var e=[n("EfR/")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dailyOutput",name:"dailyOutput",meta:{keepAlive:!1,title:"成型当日产量"},component:function(t){Promise.all([n.e(0),n.e(28)]).then(function(){var e=[n("j0mf")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dailyOutput/info",name:"dailyOutputInfo",meta:{keepAlive:!1,title:"成型当日产量详情"},component:function(t){Promise.all([n.e(0),n.e(27)]).then(function(){var e=[n("IHol")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/workShop",name:"workShop",meta:{keepAlive:!1,title:"车间当日产量"},component:function(t){Promise.all([n.e(0),n.e(20)]).then(function(){var e=[n("SiBJ")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/workShop/info",name:"workShopInfo",meta:{keepAlive:!1,title:"车间当日产量明细"},component:function(t){Promise.all([n.e(0),n.e(19)]).then(function(){var e=[n("157G")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/workShop/info1",name:"workShopInfo1",meta:{keepAlive:!1,title:"车间当日产量尺码明细"},component:function(t){Promise.all([n.e(0),n.e(18)]).then(function(){var e=[n("dj4/")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/reportView",name:"reportView",meta:{keepAlive:!1,title:"当日汇报查看"},component:function(t){Promise.all([n.e(0),n.e(10)]).then(function(){var e=[n("JfmE")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/visitor",name:"visitor",meta:{keepAlive:!1,title:"访客系统"},component:function(t){Promise.all([n.e(0),n.e(23)]).then(function(){var e=[n("EauC")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/invitation",name:"invitation",meta:{keepAlive:!1,title:"来宾邀请"},component:function(t){Promise.all([n.e(0),n.e(22)]).then(function(){var e=[n("onGS")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/invitationDetails",name:"invitationDetails",meta:{keepAlive:!1,title:"来宾邀请详情"},component:function(t){Promise.all([n.e(0),n.e(21)]).then(function(){var e=[n("Vcip")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/QRcode",name:"QRcode",meta:{keepAlive:!1,title:"来访二维码"},component:function(t){Promise.all([n.e(0),n.e(4)]).then(function(){var e=[n("CQQL")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/mailList",name:"mailList",meta:{keepAlive:!1,title:"企业通讯录"},component:function(t){Promise.all([n.e(0),n.e(3)]).then(function(){var e=[n("F+Ll")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/mailList/info",name:"mailListInfo",meta:{keepAlive:!1,title:"企业通讯录详情"},component:function(t){Promise.all([n.e(0),n.e(17)]).then(function(){var e=[n("6jqg")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/mailListNew",name:"mailListNew",meta:{keepAlive:!1,title:"企业通讯录"},component:function(t){Promise.all([n.e(0),n.e(2)]).then(function(){var e=[n("YCYm")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/mailList/mailListInfoNew",name:"mailListInfoNew",meta:{keepAlive:!1,title:"企业通讯录详情"},component:function(t){Promise.all([n.e(0),n.e(16)]).then(function(){var e=[n("WMPK")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/suggest",name:"suggest",meta:{keepAlive:!1,title:"合理化建议查看"},component:function(t){n.e(48).then(function(){var e=[n("0LtF")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/suggest/info",name:"suggestInfo",meta:{keepAlive:!1,title:"合理化建议"},component:function(t){Promise.all([n.e(0),n.e(47)]).then(function(){var e=[n("ZWA7")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm",name:"auditForm",meta:{keepAlive:!1,title:"来料稽核单发起"},component:function(t){Promise.all([n.e(0),n.e(9)]).then(function(){var e=[n("hj2x")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionWait",name:"inspectionWait",meta:{keepAlive:!1,title:"来料稽核单等待"},component:function(t){Promise.all([n.e(0),n.e(29)]).then(function(){var e=[n("x47n")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionCompleted",name:"inspectionCompleted",meta:{keepAlive:!1,title:"来料稽核单完成"},component:function(t){Promise.all([n.e(0),n.e(14)]).then(function(){var e=[n("dvP3")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionException",name:"inspectionException",meta:{keepAlive:!1,title:"来料稽核单异常"},component:function(t){Promise.all([n.e(0),n.e(30)]).then(function(){var e=[n("jgMA")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionAdd",name:"inspectionAdd",meta:{keepAlive:!1,title:"来料稽核单提交"},component:function(t){Promise.all([n.e(0),n.e(8)]).then(function(){var e=[n("+AHw")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionDeal",name:"inspectionDeal",meta:{keepAlive:!1,title:"来料稽核单处理"},component:function(t){Promise.all([n.e(0),n.e(31)]).then(function(){var e=[n("DD0W")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionWatch",name:"inspectionWatch",meta:{keepAlive:!1,title:"来料稽核单签收查看"},component:function(t){Promise.all([n.e(0),n.e(54)]).then(function(){var e=[n("SUIy")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionExceptionDeal",name:"inspectionExceptionDeal",meta:{keepAlive:!1,title:"来料稽核单异常处理"},component:function(t){Promise.all([n.e(0),n.e(61)]).then(function(){var e=[n("yDRr")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/auditForm/inspectionExceptionCompleted",name:"inspectionExceptionCompleted",meta:{keepAlive:!1,title:"来料稽核单异常结案"},component:function(t){Promise.all([n.e(0),n.e(37)]).then(function(){var e=[n("lHLf")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/inspectionTest",name:"inspectionTest",meta:{keepAlive:!1,title:"来料稽核单异常结案"},component:function(t){Promise.all([n.e(0),n.e(51)]).then(function(){var e=[n("U5Vf")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/h5Verify",name:"h5Verify",meta:{keepAlive:!1,title:"实人认证"},component:function(t){Promise.all([n.e(0),n.e(42)]).then(function(){var e=[n("E4OC")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitory",name:"dormitory",meta:{keepAlive:!1,title:"新增房间床铺"},component:function(t){n.e(34).then(function(){var e=[n("vxWW")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/bedsAdd",name:"bedsAdd",meta:{keepAlive:!1,title:"新增房间床铺"},component:function(t){Promise.all([n.e(0),n.e(41)]).then(function(){var e=[n("fXcA")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitoryRegistration",name:"dormitoryRegistration",meta:{keepAlive:!1,title:"待入住列表"},component:function(t){Promise.all([n.e(0),n.e(64)]).then(function(){var e=[n("amnM")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitory/dormitoryRegistration1",name:"dormitoryRegistration1",meta:{keepAlive:!1,title:"获取登记详情"},component:function(t){Promise.all([n.e(0),n.e(43)]).then(function(){var e=[n("/Ga/")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitory/dormitoryRegistration2",name:"dormitoryRegistration2",meta:{keepAlive:!1,title:"可分配房间列表"},component:function(t){Promise.all([n.e(0),n.e(35)]).then(function(){var e=[n("wkZx")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitory/dormitoryRegistration3",name:"dormitoryRegistration3",meta:{keepAlive:!1,title:"多人间可分配的床铺"},component:function(t){Promise.all([n.e(0),n.e(40)]).then(function(){var e=[n("wh9B")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitory/dormitoryRegistration4",name:"dormitoryRegistration4",meta:{keepAlive:!1,title:"入住登记"},component:function(t){Promise.all([n.e(0),n.e(36)]).then(function(){var e=[n("Hthi")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitoryExchange",name:"dormitoryExchange",meta:{keepAlive:!1,title:"换房登记"},component:function(t){Promise.all([n.e(0),n.e(55)]).then(function(){var e=[n("mazV")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitoryExit",name:"dormitoryExit",meta:{keepAlive:!1,title:"退宿登记"},component:function(t){Promise.all([n.e(0),n.e(63)]).then(function(){var e=[n("pUES")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/liveOutsideSubsidies",name:"liveOutsideSubsidies",meta:{keepAlive:!1,title:"住外补贴登记"},component:function(t){Promise.all([n.e(0),n.e(50)]).then(function(){var e=[n("ZbwC")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/waterElectricMeterRegistration",name:"waterElectricMeterRegistration",meta:{keepAlive:!1,title:"水电表登记"},component:function(t){Promise.all([n.e(0),n.e(58)]).then(function(){var e=[n("t1tQ")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/waterElectricMeterRegistration2",name:"waterElectricMeterRegistration2",meta:{keepAlive:!1,title:"入住情况"},component:function(t){Promise.all([n.e(0),n.e(59)]).then(function(){var e=[n("Se3V")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/waterElectricMeterRegistration3",name:"waterElectricMeterRegistration3",meta:{keepAlive:!1,title:"历史抄表"},component:function(t){Promise.all([n.e(0),n.e(60)]).then(function(){var e=[n("n7R0")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/waterElectricMeterRegistration4",name:"waterElectricMeterRegistration4",meta:{keepAlive:!1,title:"历史核算"},component:function(t){Promise.all([n.e(0),n.e(44)]).then(function(){var e=[n("8WzZ")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/waterElectricMeterCopy",name:"waterElectricMeterCopy",meta:{keepAlive:!1,title:"水电表抄度管理"},component:function(t){Promise.all([n.e(0),n.e(39)]).then(function(){var e=[n("cV7w")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dormitoryRepair",name:"dormitoryRepair",meta:{keepAlive:!1,title:"房间维护维修"},component:function(t){Promise.all([n.e(0),n.e(57)]).then(function(){var e=[n("s24c")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/reminding",name:"reminding",meta:{keepAlive:!1,title:"提醒"},component:function(t){Promise.all([n.e(0),n.e(49)]).then(function(){var e=[n("0FF+")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/baiduVerify",name:"baiduVerify",meta:{keepAlive:!1,title:"百度人脸识别"},component:function(t){Promise.all([n.e(0),n.e(56)]).then(function(){var e=[n("sGV+")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/patrol",name:"patrol",meta:{keepAlive:!1,title:"巡查记录"},component:function(t){Promise.all([n.e(0),n.e(6)]).then(function(){var e=[n("D2/m")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myWagesSignature",name:"myWagesSignature",meta:{keepAlive:!1,title:"签字确认"},component:function(t){Promise.all([n.e(0),n.e(38)]).then(function(){var e=[n("C7X0")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/myWagesTest",name:"myWagesTest",meta:{keepAlive:!1,title:"签字确认测试"},component:function(t){n.e(52).then(function(){var e=[n("/oQJ")];t.apply(null,e)}.bind(this)).catch(n.oe)}}],scrollBehavior:function(t,e,n){return{x:0,y:0}}}),f={state:{isLoading:!1},mutations:{updateLoadingStatus:function(t,e){t.isLoading=e.isLoading},getLocation:function(t,e){console.log(1)}}},v=n("lbHh"),g=n.n(v),y={state:{},getters:{},mutations:{}},w={state:{indexScroll:""},getters:{getIndexScroll:function(t){return t.indexScroll}},mutations:{setIndexScroll:function(t,e){t.indexScroll=e}}},S=n("bOdI"),_=n.n(S),b=n("mvHQ"),k=n.n(b),x="SET_USERINFO",I="SET_WXOPENID",A="SET_REMOVELIST",P="SET_SCRAPLIST",E="SET_CONDITIONLIST",T="SET_YIELDLIST",C="SAVE_ORDERLIST",L="SAVE_LOCATION",O={state:{userInfo:sessionStorage.getItem("SET_USERINFO")?JSON.parse(sessionStorage.getItem("SET_USERINFO")):"",wxOpenId:g.a.get("SET_WXOPENID")||"",removeList:sessionStorage.getItem("SET_REMOVELIST")?JSON.parse(sessionStorage.getItem("SET_REMOVELIST")):"",scrapList:sessionStorage.getItem("SET_SCRAPLIST")?JSON.parse(sessionStorage.getItem("SET_SCRAPLIST")):"",conditionlist:sessionStorage.getItem("SET_CONDITIONLIST")?JSON.parse(sessionStorage.getItem("SET_CONDITIONLIST")):"",yieldList:sessionStorage.getItem("SET_YIELDLIST")?JSON.parse(sessionStorage.getItem("SET_YIELDLIST")):"",orderList:g.a.get("SAVE_ORDERLIST")||"",latlng:g.a.get("SAVE_LOCATION")||""},mutations:(h={},_()(h,x,function(t,e){t.userInfo=e,sessionStorage.setItem("SET_USERINFO",k()(e))}),_()(h,I,function(t,e){t.wxOpenId=e,g.a.set("SET_WXOPENID",e,{expires:15})}),_()(h,A,function(t,e){t.removeList=e,sessionStorage.setItem("SET_REMOVELIST",k()(e))}),_()(h,P,function(t,e){t.scrapList=e,sessionStorage.setItem("SET_SCRAPLIST",k()(e))}),_()(h,E,function(t,e){t.conditionlist=e,sessionStorage.setItem("SET_CONDITIONLIST",k()(e))}),_()(h,T,function(t,e){t.yieldList=e,sessionStorage.setItem("SET_YIELDLIST",k()(e))}),_()(h,C,function(t,e){t.orderList=e,sessionStorage.setItem("SAVE_ORDERLIST",k()(e))}),_()(h,L,function(t,e){t.latlng=e,sessionStorage.setItem("SAVE_LOCATION",k()(e))}),h)};i.default.use(l.a);var N=new l.a.Store({modules:{common:f,user:y,scroll:w,mutations:O},strict:!1}),V=n("FT/c"),R=n("3BeM"),B=n("n6Wb"),F=n("NXWw"),$=n("Peep"),D=n("GoTr"),M=n.n(D),W=n("//Fk"),j=n.n(W),U={install:function(t,e){t.prototype.uploadImgToBase64=function(t){return new j.a(function(e,n){var i=new FileReader;i.readAsDataURL(t),i.onload=function(){e(i)},i.onerror=n})},t.prototype.getFileUrl=function(t){return window.URL.createObjectURL(t.files.item(0))}}},z=n("zL8q"),H=n.n(z),X=n("EAZf"),Z=n.n(X);n("N1kN");i.default.use(M.a),i.default.use(u),i.default.use(U),i.default.use(R.a),i.default.use(B.a),i.default.use(F.a),i.default.use($.a),i.default.use(H.a),i.default.use(Z.a,{defaultOptions:{zIndex:9999}}),i.default.prototype.domainName=m.a,i.default.prototype.domainNameH5=m.c,i.default.config.productionTip=!1,i.default.prototype.$http=V.a,d.beforeEach(function(t,e,n){N.commit("updateLoadingStatus",{isLoading:!0}),t.meta.title&&(document.title=t.meta.title),"baiduVerify"===e.name&&document.getElementsByTagName("html")[0].classList.remove("body-bg"),n()}),d.afterEach(function(t){N.commit("updateLoadingStatus",{isLoading:!1})}),new i.default({el:"#app",router:d,store:N,components:{App:u},template:"<App/>"})},PgbK:function(t,e){},mzja:function(t,e,n){"use strict";var i=n("/kga"),o=(i.a,Boolean,String,String,String,Boolean,String,String,Number,String,{name:"alert",components:{XDialog:i.a},created:function(){void 0!==this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,hideOnBlur:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},maskZIndex:[Number,String]},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}),a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition,"hide-on-blur":t.hideOnBlur,"mask-z-index":t.maskZIndex},on:{"on-hide":function(e){return t.$emit("on-hide")},"on-show":function(e){return t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]};var s=n("VU/8")(o,a,!1,function(t){n("IwgP")},null,null);e.a=s.exports},rLAy:function(t,e,n){"use strict";var i=n("xNvf"),o=(i.a,Boolean,Number,String,String,String,Boolean,String,String,{name:"toast",mixins:[i.a],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}),a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content",style:t.style},[t._t("default")],2)])])],1)},staticRenderFns:[]};var s=n("VU/8")(o,a,!1,function(t){n("8vzP")},null,null);e.a=s.exports},"t+oN":function(t,e){},uaSg:function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return i}),n.d(e,"d",function(){return s});var i="https://h5.ggzlive.com",o="http://220.189.245.171:8019",a="http://220.189.245.171:8112",s="hash";o="http://220.189.245.171:8019"},yroz:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.76388d1f4cceb03b14df.js.map