webpackJsonp([36],{Hthi:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("mvHQ"),s=n.n(r),i=n("BO1k"),a=n.n(i),c=n("Gu7T"),u=n.n(c),o=n("Xxa5"),l=n.n(o),v=n("fZjL"),f=n.n(v),m=n("exGp"),p=n.n(m),h=n("1h8J"),d=(n("NYxO"),n("2sLL")),_=(n("mzja"),n("7t+N")),F=n.n(_),I=(d.a,{data:function(){return{result:"",fileList:[],upLoadImgList:[],FEmpNumber:this.$route.query.FEmpNumber,FSpouseEmpNumber:this.$route.query.FSpouseEmpNumber,FItemID:this.$route.query.FItemID,FInterID:this.$route.query.FItemID}},components:{XButton:d.a},mounted:function(){},methods:{addPic:function(){return F()("input[type=file]").trigger("click"),!1},imgChange:function(t){var e=this;return p()(l.a.mark(function n(){var r,s,i,c,o,v,m,h,d;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(r=[],t.target.files.length){n.next=3;break}return n.abrupt("return");case 3:(s=f()(t.target.files).map(function(e){return t.target.files[e]})).length>5&&(s=s.filter(function(t,e){if(e<5)return t})),i=s.map(function(){var t=p()(l.a.mark(function t(n,r){var s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.uploadImgToBase64(n);case 2:return s=t.sent,t.abrupt("return",s.result);case 4:case"end":return t.stop()}},t,e)}));return function(e,n){return t.apply(this,arguments)}}()),c=!0,o=!1,v=void 0,n.prev=9,m=a()(i);case 11:if(c=(h=m.next()).done){n.next=21;break}return d=h.value,n.t0=r,n.next=16,d;case 16:n.t1=n.sent,n.t0.push.call(n.t0,n.t1);case 18:c=!0,n.next=11;break;case 21:n.next=27;break;case 23:n.prev=23,n.t2=n.catch(9),o=!0,v=n.t2;case 27:n.prev=27,n.prev=28,!c&&m.return&&m.return();case 30:if(n.prev=30,!o){n.next=33;break}throw v;case 33:return n.finish(30);case 34:return n.finish(27);case 35:if(!(e.fileList.length+r.length>5)){n.next=38;break}return e.$vux.alert.show({title:"注意",content:"最多可上传五张图片",onShow:function(){console.log("Plugin: I'm showing")},onHide:function(){console.log("Plugin: I'm hiding now")}}),n.abrupt("return");case 38:e.fileList=[].concat(u()(e.fileList),r);case 39:case"end":return n.stop()}},n,e,[[9,23,27,35],[28,,30,34]])}))()},upLoadImg:function(){var t=this;return p()(l.a.mark(function e(){var n,r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n={FCheckInterID:t.result.FCheckInterID,EmpCode:t.userInfo1[0].Fnumber,Pictures:[]}).Pictures=t.fileList.map(function(t){return{photo:t.replace(/.*;base64,/,"")}}),n.Pictures=s()(n.Pictures),console.log(n),e.next=6,Object(h._9)(n);case 6:r=e.sent,console.log(r),t.$vux.toast.text(r);case 9:case"end":return e.stop()}},e,t)}))()},submitSsDormitory:function(){var t=this;return p()(l.a.mark(function e(){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={FItemID:t.FItemID,FEmpID:t.FEmpID,FEmpName:t.FEmpName,FSpouseEmpID:t.FSpouseEmpID,Fdate:t.Fdate,FHobby:t.FHobby,FNote:t.FNote},console.info(n),e.next=4,Object(h._4)({FEmpCode:FEmpCode,Json:n});case 4:e.sent;case 5:case"end":return e.stop()}},e,t)}))()}}}),b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap",attrs:{id:"wrap"}},[n("div",{staticClass:"list"},[n("ul",[n("li",[n("div",{staticClass:"title"},[t._v("床铺ID")]),t._v(" "),n("div",{staticClass:"content"},[t._v(t._s(t.FitemID))])]),t._v(" "),n("li",[n("div",{staticClass:"title"},[t._v("工号ID")]),t._v(" "),n("div",{staticClass:"content"},[t._v(t._s(t.FEmpNumber))])]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("div",{staticClass:"title"},[this._v("姓名")]),this._v(" "),e("div",{staticClass:"content"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("div",{staticClass:"title"},[this._v("配偶工号ID")]),this._v(" "),e("div",{staticClass:"content"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("div",{staticClass:"title"},[this._v("入住日期")]),this._v(" "),e("div",{staticClass:"content"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("div",{staticClass:"title"},[this._v("个人癖好")]),this._v(" "),e("div",{staticClass:"content"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("div",{staticClass:"title"},[this._v("备注")]),this._v(" "),e("div",{staticClass:"content"})])}]};var g=n("VU/8")(I,b,!1,function(t){n("ny5w")},"data-v-cdfe2b54",null);e.default=g.exports},ny5w:function(t,e){}});
//# sourceMappingURL=36.ebe4b5f7e2096ab34e53.js.map