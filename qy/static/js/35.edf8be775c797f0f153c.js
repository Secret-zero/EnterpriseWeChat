webpackJsonp([35],{amnM:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("Xxa5"),o=n.n(s),r=n("exGp"),a=n.n(r),i=n("Dd8w"),u=n.n(i),c=n("1h8J"),l=n("NYxO"),f=n("2sLL"),m=n("YxJB"),x=n("3Lt7"),d=n("pDNl"),v=(n("7t+N"),n("gAs1"),u()({},Object(l.b)({wxOpenId:function(t){return t.mutations.wxOpenId},userInfo:function(t){return t.mutations.userInfo}})),f.a,m.a,x.a,d.a,{data:function(){return{result:"",FNumber:""}},computed:u()({},Object(l.b)({wxOpenId:function(t){return t.mutations.wxOpenId},userInfo:function(t){return t.mutations.userInfo}})),components:{XButton:f.a,Flexbox:m.a,FlexboxItem:x.a,XInput:d.a},mounted:function(){console.log(this.userInfo),this.getWaitForCheckInEmpList()},methods:{getWaitForCheckInEmpList:function(){var t=this;return a()(o.a.mark(function e(){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.userInfo[0]),e.next=3,Object(c.I)({FNumber:t.FNumber,FUserID:"362"});case 3:n=e.sent,console.log(n),t.result=n;case 6:case"end":return e.stop()}},e,t)}))()},toInfo:function(t){this.$router.push({path:"/dormitory/dormitoryRegistration1",query:{FItemID:t}})},search:function(){}}}),b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap",attrs:{id:"wrap"}},[n("x-input",{staticClass:"weui-vcode",attrs:{placeholder:"输入工号","show-clear":!1},model:{value:t.FNumber,callback:function(e){t.FNumber=e},expression:"FNumber"}},[n("x-button",{attrs:{slot:"right",type:"primary",mini:""},nativeOn:{click:function(e){return t.getWaitForCheckInEmpList(e)}},slot:"right"},[t._v("搜索")])],1),t._v(" "),n("div",{staticClass:"list",staticStyle:{background:"#e2e2e2"}},[n("ul",t._l(t.result,function(e,s){return n("li",{key:s,staticClass:"mt20",style:s%2==0?"background: #00BFFF":"background: #fff",on:{click:function(n){return t.toInfo(e.FitemID)}}},[n("flexbox",[n("flexbox-item",[n("div",{staticClass:"flex-demo"},[t._v("工号："+t._s(e.FEmpNumber))])]),t._v(" "),n("flexbox-item",[n("div",{staticClass:"flex-demo"},[t._v("姓名："+t._s(e.FEmpName))])]),t._v(" "),n("flexbox-item",[n("div",{staticClass:"flex-demo"},[t._v("性别："+t._s(e.FSexName))])])],1),t._v(" "),n("flexbox",[n("flexbox-item",[n("div",{staticClass:"flex-demo"},[t._v("职务："+t._s(e.FDutyName))])]),t._v(" "),n("flexbox-item",[n("div",{staticClass:"flex-demo"},[t._v("级别："+t._s(e.FFunctionName))])]),t._v(" "),n("flexbox-item",[n("div",{staticClass:"flex-demo"},[t._v("吃住："+t._s(e.FeatStay))])])],1)],1)}),0)])],1)},staticRenderFns:[]};var p=n("VU/8")(v,b,!1,function(t){n("kbl5")},"data-v-f864d540",null);e.default=p.exports},kbl5:function(t,e){}});
//# sourceMappingURL=35.edf8be775c797f0f153c.js.map