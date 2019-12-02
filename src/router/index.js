import Vue from "vue";
import Router from "vue-router";
import {routerMode} from "../config/env";

Vue.use(Router);

export default new Router({
	mode: routerMode,
	routes: [
		{
			path: "/login",
			name: "login",
			meta: {
				keepAlive: false,
				title: "用户注册绑定"
			},
			component: (resovle) => {
				require(["../views/index/login.vue"], resovle);
			}
		},
		{
			path: "/index",
			name: "index",
			meta: {
				keepAlive: false,
				title: "企业微信"
			},
			component: (resovle) => {
				require(["../views/index/index.vue"], resovle);
			}
		},
		{
			path: "/",
			name: "index",
			meta: {
				keepAlive: false,
				title: "企业微信"
			},
			component: (resovle) => {
				require(["../views/index/index.vue"], resovle);
			}
		},
		{
			path: "/personal",
			name: "personal",
			meta: {
				keepAlive: false,
				title: "个人信息"
			},
			component: (resovle) => {
				require(["../views/personal/index.vue"], resovle);
			}
		},
		{
			path: "/myVoucher",
			name: "myVoucher",
			meta: {
				keepAlive: false,
				title: "我的餐券"
			},
			component: (resovle) => {
				require(["../views/myVoucher/index.vue"], resovle);
			}
		},
		{
			path: "/voucherlist",
			name: "voucherlist",
			meta: {
				keepAlive: false,
				title: "我的餐券"
			},
			component: (resovle) => {
				require(["../views/myVoucher/voucherlist.vue"], resovle);
			}
		},
		{
			path: "/myWages",
			name: "myWages",
			meta: {
				keepAlive: false,
				title: "我的工资"
			},
			component: (resovle) => {
				require(["../views/myWages/index.vue"], resovle);
			}
		},
		{
			path: "/myProperty",
			name: "myProperty",
			meta: {
				keepAlive: false,
				title: "我的财产"
			},
			component: (resovle) => {
				require(["../views/myProperty/index.vue"], resovle);
			}
		},
		{
			path: "/myProperty/transfer",
			name: "myPropertyTransfer",
			meta: {
				keepAlive: false,
				title: "财产移交"
			},
			component: (resovle) => {
				require(["../views/myProperty/transfer.vue"], resovle);
			}
		},
		{
			path: "/myProperty/scrap",
			name: "myPropertyScrap",
			meta: {
				keepAlive: false,
				title: "财产报废"
			},
			component: (resovle) => {
				require(["../views/myProperty/scrap.vue"], resovle);
			}
		},
		{
			path: "/myProperty/inventory",
			name: "myPropertyInventory",
			meta: {
				keepAlive: false,
				title: "盘点"
			},
			component: (resovle) => {
				require(["../views/myProperty/inventory.vue"], resovle);
			}
		},
		{
			path: "/myProperty/info",
			name: "myPropertyInfo",
			meta: {
				keepAlive: false,
				title: "我的财产"
			},
			component: (resovle) => {
				require(["../views/myProperty/info.vue"], resovle);
			}
		},
		{
			path: "/assessment",
			name: "assessment",
			meta: {
				keepAlive: false,
				title: "我的考核"
			},
			component: (resovle) => {
				require(["../views/assessment/index.vue"], resovle);
			}
		},
		{
			path: "/leave",
			name: "leave",
			meta: {
				keepAlive: false,
				title: "我要请假"
			},
			component: (resovle) => {
				require(["../views/leave/index.vue"], resovle);
			}
		},
		{
			path: "/punch",
			name: "punch",
			meta: {
				keepAlive: false,
				title: "考勤打卡"
			},
			component: (resovle) => {
				require(["../views/punch/index.vue"], resovle);
			}
		},
		{
			path: "/yield",
			name: "yield",
			meta: {
				keepAlive: false,
				title: "我的产量"
			},
			component: (resovle) => {
				require(["../views/yield/index.vue"], resovle);
			}
		},
		{
			path: "/chargeCard",
			name: "chargeCard",
			meta: {
				keepAlive: false,
				title: "我要充卡"
			},
			component: (resovle) => {
				require(["../views/chargeCard/index.vue"], resovle);
			}
		},
		{
			path: "/dailyOutput",
			name: "dailyOutput",
			meta: {
				keepAlive: false,
				title: "成型当日产量"
			},
			component: (resovle) => {
				require(["../views/dailyOutput/index.vue"], resovle);
			}
		},
		{
			path: "/dailyOutput/info",
			name: "dailyOutputInfo",
			meta: {
				keepAlive: false,
				title: "成型当日产量详情"
			},
			component: (resovle) => {
				require(["../views/dailyOutput/info.vue"], resovle);
			}
		},
		{
			path: "/workShop",
			name: "workShop",
			meta: {
				keepAlive: false,
				title: "车间当日产量"
			},
			component: (resovle) => {
				require(["../views/workShop/index.vue"], resovle);
			}
		},
		{
			path: "/workShop/info",
			name: "workShopInfo",
			meta: {
				keepAlive: false,
				title: "车间当日产量明细"
			},
			component: (resovle) => {
				require(["../views/workShop/info.vue"], resovle);
			}
		},
		{
			path: "/workShop/info1",
			name: "workShopInfo1",
			meta: {
				keepAlive: false,
				title: "车间当日产量尺码明细"
			},
			component: (resovle) => {
				require(["../views/workShop/info1.vue"], resovle);
			}
		},
		{
			path: "/reportView",
			name: "reportView",
			meta: {
				keepAlive: false,
				title: "当日汇报查看"
			},
			component: (resovle) => {
				require(["../views/reportView/index.vue"], resovle);
			}
		},
		{
			path: "/visitor",
			name: "visitor",
			meta: {
				keepAlive: false,
				title: "访客系统"
			},
			component: (resovle) => {
				require(["../views/visitor/index.vue"], resovle);
			}
		},
		{
			path: "/invitation",
			name: "invitation",
			meta: {
				keepAlive: false,
				title: "来宾邀请"
			},
			component: (resovle) => {
				require(["../views/visitor/invitation.vue"], resovle);
			}
		},
		{
			path: "/invitationDetails",
			name: "invitationDetails",
			meta: {
				keepAlive: false,
				title: "来宾邀请详情"
			},
			component: (resovle) => {
				require(["../views/visitor/invitationDetails.vue"], resovle);
			}
		},
		{
			path: "/QRcode",
			name: "QRcode",
			meta: {
				keepAlive: false,
				title: "来访二维码"
			},
			component: (resovle) => {
				require(["../views/visitor/QRcode.vue"], resovle);
			}
		},
		{
			path: "/mailList",
			name: "mailList",
			meta: {
				keepAlive: false,
				title: "企业通讯录"
			},
			component: (resovle) => {
				require(["../views/mailList/index.vue"], resovle);
			}
		},
		{
			path: "/mailList/info",
			name: "mailListInfo",
			meta: {
				keepAlive: false,
				title: "企业通讯录详情"
			},
			component: (resovle) => {
				require(["../views/mailList/info.vue"], resovle);
			}
		},
		{
			path: "/mailListNew",
			name: "mailListNew",
			meta: {
				keepAlive: false,
				title: "企业通讯录"
			},
			component: (resovle) => {
				require(["../views/mailList/mailListNew.vue"], resovle);
			}
		},
		{
			path: "/mailList/mailListInfoNew",
			name: "mailListInfoNew",
			meta: {
				keepAlive: false,
				title: "企业通讯录详情"
			},
			component: (resovle) => {
				require(["../views/mailList/mailListInfoNew.vue"], resovle);
			}
		},
		{
			path: "/suggest",
			name: "suggest",
			meta: {
				keepAlive: false,
				title: "合理化建议查看"
			},
			component: (resovle) => {
				require(["../views/suggest/index.vue"], resovle);
			}
		},
		{
			path: "/suggest/info",
			name: "suggestInfo",
			meta: {
				keepAlive: false,
				title: "合理化建议"
			},
			component: (resovle) => {
				require(["../views/suggest/info.vue"], resovle);
			}
		},
		{
			path: "/auditForm",
			name: "auditForm",
			meta: {
				keepAlive: false,
				title: "来料稽核单发起"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionStart.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionWait",
			name: "inspectionWait",
			meta: {
				keepAlive: false,
				title: "来料稽核单等待"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionWait.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionCompleted",
			name: "inspectionCompleted",
			meta: {
				keepAlive: false,
				title: "来料稽核单完成"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionCompleted.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionException",
			name: "inspectionException",
			meta: {
				keepAlive: false,
				title: "来料稽核单异常"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionException.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionAdd",
			name: "inspectionAdd",
			meta: {
				keepAlive: false,
				title: "来料稽核单提交"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionAdd.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionDeal",
			name: "inspectionDeal",
			meta: {
				keepAlive: false,
				title: "来料稽核单处理"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionDeal.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionWatch",
			name: "inspectionWatch",
			meta: {
				keepAlive: false,
				title: "来料稽核单签收查看"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionWatch.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionExceptionDeal",
			name: "inspectionExceptionDeal",
			meta: {
				keepAlive: false,
				title: "来料稽核单异常处理"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionExceptionDeal.vue"], resovle);
			}
		},
		{
			path: "/auditForm/inspectionExceptionCompleted",
			name: "inspectionExceptionCompleted",
			meta: {
				keepAlive: false,
				title: "来料稽核单异常结案"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionExceptionCompleted.vue"], resovle);
			}
		},
		{
			path: "/inspectionTest",
			name: "inspectionTest",
			meta: {
				keepAlive: false,
				title: "来料稽核单异常结案"
			},
			component: (resovle) => {
				require(["../views/auditForm/inspectionTest.vue"], resovle);
			}
		},
		{
			path: "/h5Verify",
			name: "h5Verify",
			meta: {
				keepAlive: false,
				title: "实人认证"
			},
			component: (resovle) => {
				require(["../views/index/h5Verify.vue"], resovle);
			}
		},
		{
			path: "/dormitory",
			name: "dormitory",
			meta: {
				keepAlive: false,
				title: "新增房间床铺"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitory.vue"], resovle);
			}
		},
		{
			path: "/bedsAdd",
			name: "bedsAdd",
			meta: {
				keepAlive: false,
				title: "新增房间床铺"
			},
			component: (resovle) => {
				require(["../views/dormitory/bedsAdd.vue"], resovle);
			}
		},
		{
			path: "/dormitoryRegistration",
			name: "dormitoryRegistration",
			meta: {
				keepAlive: false,
				title: "待入住列表"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryRegistration.vue"], resovle);
			}
		},
		{
			path: "/dormitory/dormitoryRegistration1",
			name: "dormitoryRegistration1",
			meta: {
				keepAlive: false,
				title: "获取登记详情"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryRegistration1.vue"], resovle);
			}
		},
		{
			path: "/dormitory/dormitoryRegistration2",
			name: "dormitoryRegistration2",
			meta: {
				keepAlive: false,
				title: "可分配房间列表"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryRegistration2.vue"], resovle);
			}
		},
		{
			path: "/dormitory/dormitoryRegistration3",
			name: "dormitoryRegistration3",
			meta: {
				keepAlive: false,
				title: "多人间可分配的床铺"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryRegistration3.vue"], resovle);
			}
		},
		{
			path: "/dormitory/dormitoryRegistration4",
			name: "dormitoryRegistration4",
			meta: {
				keepAlive: false,
				title: "入住登记"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryRegistration4.vue"], resovle);
			}
		},
		{
			path: "/dormitoryExchange",
			name: "dormitoryExchange",
			meta: {
				keepAlive: false,
				title: "换房登记"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryExchange.vue"], resovle);
			}
		},
		{
			path: "/dormitoryExit",
			name: "dormitoryExit",
			meta: {
				keepAlive: false,
				title: "退宿登记"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryExit.vue"], resovle);
			}
		},
		{
			path: "/liveOutsideSubsidies",
			name: "liveOutsideSubsidies",
			meta: {
				keepAlive: false,
				title: "住外补贴登记"
			},
			component: (resovle) => {
				require(["../views/dormitory/liveOutsideSubsidies.vue"], resovle);
			}
		},
		{
			path: "/waterElectricMeterRegistration",
			name: "waterElectricMeterRegistration",
			meta: {
				keepAlive: false,
				title: "水电表登记"
			},
			component: (resovle) => {
				require(["../views/dormitory/waterElectricMeterRegistration.vue"], resovle);
			}
		},
		{
			path: "/waterElectricMeterRegistration2",
			name: "waterElectricMeterRegistration2",
			meta: {
				keepAlive: false,
				title: "入住情况"
			},
			component: (resovle) => {
				require(["../views/dormitory/waterElectricMeterRegistration2.vue"], resovle);
			}
		},
		{
			path: "/waterElectricMeterRegistration3",
			name: "waterElectricMeterRegistration3",
			meta: {
				keepAlive: false,
				title: "历史抄表"
			},
			component: (resovle) => {
				require(["../views/dormitory/waterElectricMeterRegistration3.vue"], resovle);
			}
		},
		{
			path: "/waterElectricMeterRegistration4",
			name: "waterElectricMeterRegistration4",
			meta: {
				keepAlive: false,
				title: "历史核算"
			},
			component: (resovle) => {
				require(["../views/dormitory/waterElectricMeterRegistration4.vue"], resovle);
			}
		},
		{
			path: "/waterElectricMeterCopy",
			name: "waterElectricMeterCopy",
			meta: {
				keepAlive: false,
				title: "水电表抄度管理"
			},
			component: (resovle) => {
				require(["../views/dormitory/waterElectricMeterCopy.vue"], resovle);
			}
		},
		{
			path: "/dormitoryRepair",
			name: "dormitoryRepair",
			meta: {
				keepAlive: false,
				title: "房间维护维修"
			},
			component: (resovle) => {
				require(["../views/dormitory/dormitoryRepair.vue"], resovle);
			}
		},
		{
			path: "/reminding",
			name: "reminding",
			meta: {
				keepAlive: false,
				title: "提醒"
			},
			component: (resovle) => {
				require(["../views/reminding/reminding.vue"], resovle);
			}
		},
		{
			path: "/baiduVerify",
			name: "baiduVerify",
			meta: {
				keepAlive: false,
				title: "百度人脸识别"
			},
			component: (resovle) => {
				require(["../views/index/baiduVerify.vue"], resovle);
			}
		},
		{
			path: "/patrol",
			name: "patrol",
			meta: {
				keepAlive: false,
				title: "巡查记录"
			},
			component: (resovle) => {
				require(["../views/patrol/patrol.vue"], resovle);
			}
		},
		{
			path: "/myWagesSignature",
			name: "myWagesSignature",
			meta: {
				keepAlive: false,
				title: "签字确认"
			},
			component: (resovle) => {
				require(["../views/myWages/myWagesSignature.vue"], resovle);
			}
		},
		{
			path: "/myWagesTest",
			name: "myWagesTest",
			meta: {
				keepAlive: false,
				title: "签字确认测试"
			},
			component: (resovle) => {
				require(["../views/myWages/myWagesTest.vue"], resovle);
			}
		}
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 };
	}
});
