webpackJsonp([25],{ANpX:function(e,_){},RMmU:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__=__webpack_require__("mvHQ"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__=__webpack_require__("woOf"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__=__webpack_require__("Xxa5"),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__),__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__=__webpack_require__("exGp"),__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__),__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__=__webpack_require__("Dd8w"),__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__),__WEBPACK_IMPORTED_MODULE_5_vuex__=__webpack_require__("NYxO"),__WEBPACK_IMPORTED_MODULE_6_vux_src_components_x_button_index_vue__=__webpack_require__("2sLL"),__WEBPACK_IMPORTED_MODULE_7_vux_src_components_popup_picker_index_vue__=__webpack_require__("7Ah8"),__WEBPACK_IMPORTED_MODULE_8__api_getData__=__webpack_require__("1h8J");__webpack_exports__.a={data:function(){return{value5:[],showPopupPicker:!1,EmpCode:"",FCardIDList:[],resultList:[],info:"",recipient:"",oldRecipient:"",employeeInfo:[],FARichesMoveJson:{FARichesMoveJson:[]}}},computed:__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({},Object(__WEBPACK_IMPORTED_MODULE_5_vuex__.b)({removeList:function(e){return e.mutations.removeList},wxOpenId:function(e){return e.mutations.wxOpenId}})),watch:{EmpCode:function(e){6==e.length&&(this.getRecipient(e),this.getEmployeeInfoByNumber(e))}},components:{XButton:__WEBPACK_IMPORTED_MODULE_6_vux_src_components_x_button_index_vue__.a,PopupPicker:__WEBPACK_IMPORTED_MODULE_7_vux_src_components_popup_picker_index_vue__.a},mounted:function(){var e=this;this.removeList.forEach(function(_){e.FCardIDList.push(_.FinterID)}),this.confirmRemove(),this.getRemoveInfo()},methods:{changeValue:function(e){},getOldRecipient:function getOldRecipient(val){var _this2=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.j)({EmpCode:val});case 2:data=_context.sent,_this2.oldRecipient=eval(data),console.log(eval(data));case 5:case"end":return _context.stop()}},_callee,_this2)}))()},getRecipient:function getRecipient(val){var _this3=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee2(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.j)({EmpCode:val});case 2:data=_context2.sent,_this3.recipient=eval(data),console.log(eval(data));case 5:case"end":return _context2.stop()}},_callee2,_this3)}))()},getEmployeeInfoByNumber:function getEmployeeInfoByNumber(val){var _this4=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee3(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.l)({FEmpNumber:val});case 2:data=_context3.sent,_this4.employeeInfo=eval(data),console.log(eval(data));case 5:case"end":return _context3.stop()}},_callee3,_this4)}))()},confirmRemove:function confirmRemove(){var _this5=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee4(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.K)({CardIDList:_this5.FCardIDList.join(",")});case 2:data=_context4.sent,console.log(data),_this5.resultList=eval(data);case 5:case"end":return _context4.stop()}},_callee4,_this5)}))()},getRemoveInfo:function getRemoveInfo(){var _this6=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee5(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5){for(;;)switch(_context5.prev=_context5.next){case 0:return _context5.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.m)({FWeixinOpenID:_this6.wxOpenId});case 2:data=_context5.sent,console.log(data),_this6.info=eval(data)[0],console.info(_this6.info),_this6.getOldRecipient(_this6.info.EmpNumber);case 7:case"end":return _context5.stop()}},_callee5,_this6)}))()},confirm:function(){var e=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _(){var t,a;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:if(e.EmpCode){_.next=2;break}return _.abrupt("return",e.$vux.toast.text("请填写接收人工号"));case 2:if(e.value5[0]){_.next=4;break}return _.abrupt("return",e.$vux.toast.text("请选择调拨原因"));case 4:return alert(e.employeeInfo[0].FOrganizeID),t={FInterID:"",FNumber:"",FRemoveEmpID:"",FRemoveOrganizeID:"",FRemoveDeptID:"",Fdate:"",FCardID:"",FQty:"",FOldManager:"",FOldLiableEmpID:"",FManager:"",FLiableEmpID:"",FOldAddress:"",FAddress:"",FTakeOverEmpID:"",FTakeOverOrganizeID:"",FTakeOverDeptID:"",Fnote:"",FOperatorID:"",FOperateDate:"",FCheckerID:"",FCheckDate:"",FMoveReason:""},e.resultList.forEach(function(_){t.FInterID=_.FinterID,t.FNumber=_.FNumber,t.FRemoveEmpID=_.FRemoveEmpID,t.FRemoveOrganizeID=_.FRemoveOrganizeID,t.FRemoveDeptID=_.FRemoveDeptID,t.Fdate=(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate(),t.FCardID=_.FCardID,t.FQty=_.FQty,alert(_.manager),t.FOldManager=e.oldRecipient.FLiableEmpName,t.FOldLiableEmpID=e.oldRecipient.FLiableEmpID,t.FManager=e.recipient.FLiableEmpName,t.FLiableEmpID=e.recipient.FLiableEmpID,t.FOldAddress=_.FOldAddress,t.FAddress=_.FAddress,t.FTakeOverEmpID=e.recipient.FEmpID,t.FTakeOverOrganizeID=e.employeeInfo[0].FOrganizeID,t.FTakeOverDeptID=e.recipient.FDeptmentID,t.FCheckDate="",t.FCheckerID="",t.Fnote="",t.FOperatorID="-1",t.FMoveReason=e.value5[0],console.info(t),e.FARichesMoveJson.FARichesMoveJson.push(t),t=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({},{})}),e.FARichesMoveJson.FARichesMoveJson=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(e.FARichesMoveJson.FARichesMoveJson),console.log(e.FARichesMoveJson),_.prev=9,e.$store.commit("updateLoadingStatus",{isLoading:!0}),_.next=13,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.Y)(e.FARichesMoveJson);case 13:a=_.sent,e.$store.commit("updateLoadingStatus",{isLoading:!1}),e.$vux.toast.text(a),e.$router.push({path:"/myProperty"}),_.next=23;break;case 19:_.prev=19,_.t0=_.catch(9),e.$store.commit("updateLoadingStatus",{isLoading:!1}),e.FARichesMoveJson={FARichesMoveJson:[]};case 23:case"end":return _.stop()}},_,e,[[9,19]])}))()},FLiableEmpCode:function FLiableEmpCode(val){var _this8=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee7(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7){for(;;)switch(_context7.prev=_context7.next){case 0:if(6!=val.length){_context7.next=7;break}return _context7.next=3,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.l)({FEmpNumber:val});case 3:data=_context7.sent,_this8.oldRecipient.FLiableEmpName=eval(data)[0].EmpName,_this8.oldRecipient.FLiableEmpID=eval(data)[0].FitemID,console.log(eval(data));case 7:case"end":return _context7.stop()}},_callee7,_this8)}))()}}}},fZvW:function(e,_,t){"use strict";Object.defineProperty(_,"__esModule",{value:!0});t("ynte");var a=t("RMmU"),n={render:function(){var e=this,_=e.$createElement,t=e._self._c||_;return t("div",{staticClass:"wrap myProperty",attrs:{id:"wrap"}},[e._l(e.resultList,function(_,a){return t("div",{key:a,staticClass:"info"},[t("div",{staticClass:"head"},[t("div",[t("span",[e._v("编号：")]),e._v(e._s(_.FNumber))]),e._v(" "),t("div",[t("span",[e._v("名称：")]),e._v(e._s(_.FName))]),e._v(" "),t("div",[t("span",[e._v("规格：")]),e._v(e._s(_.FModel))]),e._v(" "),t("div",[t("span",[e._v("数量：")]),e._v(e._s(_.FQty))])]),e._v(" "),t("div",{staticClass:"amount"},[t("div",[e._v("接收人存放地址：")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:_.FAddress,expression:"item.FAddress"}],attrs:{type:"text"},domProps:{value:_.FAddress},on:{input:function(t){t.target.composing||e.$set(_,"FAddress",t.target.value)}}})])])}),e._v(" "),t("div",{staticClass:"emplyInfo"},[t("ul",[t("li",[t("div",{staticClass:"name"},[e._v("移交人组织")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.info.OrgName))])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("移交人工号")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.info.EmpNumber))])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("移交人姓名")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.info.EmpName))])]),e._v(" "),t("li",{staticClass:"input"},[t("div",{staticClass:"name"},[e._v("原监管人工号")]),e._v(" "),t("div",{staticClass:"content"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.oldRecipient.FLiableEmpCode,expression:"oldRecipient.FLiableEmpCode"}],attrs:{placeholder:"请填写原监管人工号",type:"number"},domProps:{value:e.oldRecipient.FLiableEmpCode},on:{input:[function(_){_.target.composing||e.$set(e.oldRecipient,"FLiableEmpCode",_.target.value)},function(_){return e.FLiableEmpCode(e.oldRecipient.FLiableEmpCode)}]}})])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("原监管人姓名")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.oldRecipient.FLiableEmpName))])]),e._v(" "),t("li",{staticClass:"input"},[t("div",{staticClass:"name"},[e._v("接收人工号")]),e._v(" "),t("div",{staticClass:"content"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.EmpCode,expression:"EmpCode"}],attrs:{placeholder:"请填写接收人工号",type:"number"},domProps:{value:e.EmpCode},on:{input:function(_){_.target.composing||(e.EmpCode=_.target.value)}}})])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("接收人组织")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.recipient.OrgName))])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("接收人姓名")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.recipient.FEmpName))])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("监管人工号")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.recipient.FLiableEmpCode))])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("监管人姓名")]),e._v(" "),t("div",{staticClass:"content"},[e._v(e._s(e.recipient.FLiableEmpName))])]),e._v(" "),t("li",[t("div",{staticClass:"name"},[e._v("调拨原因")]),e._v(" "),t("div",{staticClass:"content"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.value5[0],expression:"value5[0]"}],staticClass:"reason",attrs:{type:"text",placeholder:"请选择调拨原因",readonly:""},domProps:{value:e.value5[0]},on:{click:function(_){e.showPopupPicker=!0},input:function(_){_.target.composing||e.$set(e.value5,0,_.target.value)}}})])])])]),e._v(" "),t("popup-picker",{attrs:{show:e.showPopupPicker,"show-cell":!1,data:[["资产调剂","离职移交","岗位调动"]]},on:{"update:show":function(_){e.showPopupPicker=_},"on-change":e.changeValue},model:{value:e.value5,callback:function(_){e.value5=_},expression:"value5"}}),e._v(" "),t("x-button",{staticClass:"button mt20",attrs:{gradients:["#d93309","#aa0000"]},nativeOn:{click:function(_){return e.confirm(_)}}},[e._v("提交")])],2)},staticRenderFns:[]};var r=function(e){t("ANpX")},o=t("VU/8")(a.a,n,!1,r,"data-v-ed0b019c",null);_.default=o.exports},ynte:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__=__webpack_require__("mvHQ"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__=__webpack_require__("woOf"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__=__webpack_require__("Xxa5"),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__),__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__=__webpack_require__("exGp"),__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__),__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__=__webpack_require__("Dd8w"),__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__),__WEBPACK_IMPORTED_MODULE_5_vuex__=__webpack_require__("NYxO"),__WEBPACK_IMPORTED_MODULE_6_vux_src_components_x_button_index_vue__=__webpack_require__("2sLL"),__WEBPACK_IMPORTED_MODULE_7_vux_src_components_popup_picker_index_vue__=__webpack_require__("7Ah8"),__WEBPACK_IMPORTED_MODULE_8__api_getData__=__webpack_require__("1h8J"),_unused_webpack_default_export={data:function(){return{value5:[],showPopupPicker:!1,EmpCode:"",FCardIDList:[],resultList:[],info:"",recipient:"",oldRecipient:"",employeeInfo:[],FARichesMoveJson:{FARichesMoveJson:[]}}},computed:__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({},Object(__WEBPACK_IMPORTED_MODULE_5_vuex__.b)({removeList:function(e){return e.mutations.removeList},wxOpenId:function(e){return e.mutations.wxOpenId}})),watch:{EmpCode:function(e){6==e.length&&(this.getRecipient(e),this.getEmployeeInfoByNumber(e))}},components:{XButton:__WEBPACK_IMPORTED_MODULE_6_vux_src_components_x_button_index_vue__.a,PopupPicker:__WEBPACK_IMPORTED_MODULE_7_vux_src_components_popup_picker_index_vue__.a},mounted:function(){var e=this;this.removeList.forEach(function(_){e.FCardIDList.push(_.FinterID)}),this.confirmRemove(),this.getRemoveInfo()},methods:{changeValue:function(e){},getOldRecipient:function getOldRecipient(val){var _this2=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.j)({EmpCode:val});case 2:data=_context.sent,_this2.oldRecipient=eval(data),console.log(eval(data));case 5:case"end":return _context.stop()}},_callee,_this2)}))()},getRecipient:function getRecipient(val){var _this3=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee2(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.j)({EmpCode:val});case 2:data=_context2.sent,_this3.recipient=eval(data),console.log(eval(data));case 5:case"end":return _context2.stop()}},_callee2,_this3)}))()},getEmployeeInfoByNumber:function getEmployeeInfoByNumber(val){var _this4=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee3(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.l)({FEmpNumber:val});case 2:data=_context3.sent,_this4.employeeInfo=eval(data),console.log(eval(data));case 5:case"end":return _context3.stop()}},_callee3,_this4)}))()},confirmRemove:function confirmRemove(){var _this5=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee4(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.K)({CardIDList:_this5.FCardIDList.join(",")});case 2:data=_context4.sent,console.log(data),_this5.resultList=eval(data);case 5:case"end":return _context4.stop()}},_callee4,_this5)}))()},getRemoveInfo:function getRemoveInfo(){var _this6=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee5(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5){for(;;)switch(_context5.prev=_context5.next){case 0:return _context5.next=2,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.m)({FWeixinOpenID:_this6.wxOpenId});case 2:data=_context5.sent,console.log(data),_this6.info=eval(data)[0],console.info(_this6.info),_this6.getOldRecipient(_this6.info.EmpNumber);case 7:case"end":return _context5.stop()}},_callee5,_this6)}))()},confirm:function(){var e=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _(){var t,a;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function(_){for(;;)switch(_.prev=_.next){case 0:if(e.EmpCode){_.next=2;break}return _.abrupt("return",e.$vux.toast.text("请填写接收人工号"));case 2:if(e.value5[0]){_.next=4;break}return _.abrupt("return",e.$vux.toast.text("请选择调拨原因"));case 4:return alert(e.employeeInfo[0].FOrganizeID),t={FInterID:"",FNumber:"",FRemoveEmpID:"",FRemoveOrganizeID:"",FRemoveDeptID:"",Fdate:"",FCardID:"",FQty:"",FOldManager:"",FOldLiableEmpID:"",FManager:"",FLiableEmpID:"",FOldAddress:"",FAddress:"",FTakeOverEmpID:"",FTakeOverOrganizeID:"",FTakeOverDeptID:"",Fnote:"",FOperatorID:"",FOperateDate:"",FCheckerID:"",FCheckDate:"",FMoveReason:""},e.resultList.forEach(function(_){t.FInterID=_.FinterID,t.FNumber=_.FNumber,t.FRemoveEmpID=_.FRemoveEmpID,t.FRemoveOrganizeID=_.FRemoveOrganizeID,t.FRemoveDeptID=_.FRemoveDeptID,t.Fdate=(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate(),t.FCardID=_.FCardID,t.FQty=_.FQty,alert(_.manager),t.FOldManager=e.oldRecipient.FLiableEmpName,t.FOldLiableEmpID=e.oldRecipient.FLiableEmpID,t.FManager=e.recipient.FLiableEmpName,t.FLiableEmpID=e.recipient.FLiableEmpID,t.FOldAddress=_.FOldAddress,t.FAddress=_.FAddress,t.FTakeOverEmpID=e.recipient.FEmpID,t.FTakeOverOrganizeID=e.employeeInfo[0].FOrganizeID,t.FTakeOverDeptID=e.recipient.FDeptmentID,t.FCheckDate="",t.FCheckerID="",t.Fnote="",t.FOperatorID="-1",t.FMoveReason=e.value5[0],console.info(t),e.FARichesMoveJson.FARichesMoveJson.push(t),t=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({},{})}),e.FARichesMoveJson.FARichesMoveJson=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(e.FARichesMoveJson.FARichesMoveJson),console.log(e.FARichesMoveJson),_.prev=9,e.$store.commit("updateLoadingStatus",{isLoading:!0}),_.next=13,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.Y)(e.FARichesMoveJson);case 13:a=_.sent,e.$store.commit("updateLoadingStatus",{isLoading:!1}),e.$vux.toast.text(a),e.$router.push({path:"/myProperty"}),_.next=23;break;case 19:_.prev=19,_.t0=_.catch(9),e.$store.commit("updateLoadingStatus",{isLoading:!1}),e.FARichesMoveJson={FARichesMoveJson:[]};case 23:case"end":return _.stop()}},_,e,[[9,19]])}))()},FLiableEmpCode:function FLiableEmpCode(val){var _this8=this;return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee7(){var data;return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7){for(;;)switch(_context7.prev=_context7.next){case 0:if(6!=val.length){_context7.next=7;break}return _context7.next=3,Object(__WEBPACK_IMPORTED_MODULE_8__api_getData__.l)({FEmpNumber:val});case 3:data=_context7.sent,_this8.oldRecipient.FLiableEmpName=eval(data)[0].EmpName,_this8.oldRecipient.FLiableEmpID=eval(data)[0].FitemID,console.log(eval(data));case 7:case"end":return _context7.stop()}},_callee7,_this8)}))()}}}}});
//# sourceMappingURL=25.17431f609f3904547120.js.map