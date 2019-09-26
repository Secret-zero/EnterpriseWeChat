import types from "./types";
import cookie from "js-cookie";
const state = {
	userInfo: sessionStorage.getItem("SET_USERINFO") ? JSON.parse(sessionStorage.getItem("SET_USERINFO")) : "",
	wxOpenId: cookie.get("SET_WXOPENID") || "",
	removeList: sessionStorage.getItem("SET_REMOVELIST") ? JSON.parse(sessionStorage.getItem("SET_REMOVELIST")) : "",
	scrapList: sessionStorage.getItem("SET_SCRAPLIST") ? JSON.parse(sessionStorage.getItem("SET_SCRAPLIST")) : "",
	conditionlist: sessionStorage.getItem("SET_CONDITIONLIST") ? JSON.parse(sessionStorage.getItem("SET_CONDITIONLIST")) : "",
	yieldList: sessionStorage.getItem("SET_YIELDLIST") ? JSON.parse(sessionStorage.getItem("SET_YIELDLIST")) : "",
	orderList: cookie.get("SAVE_ORDERLIST") || "",
	latlng: cookie.get("SAVE_LOCATION") || ""
};

const mutations = {
	[types.SET_USERINFO] (state, info) {
		state.userInfo = info;
		// cookie.set('SET_USERINFO', info, {expires: 15}) // 将token存入cookie 并保留半个月 {domain: '.gefuzi.com'}
		sessionStorage.setItem("SET_USERINFO", JSON.stringify(info));
	},
	[types.SET_WXOPENID] (state, info) {
		state.wxOpenId = info;
		cookie.set("SET_WXOPENID", info, {expires: 15}); // 将token存入cookie 并保留半个月 {domain: '.gefuzi.com'}
	},
	[types.SET_REMOVELIST] (state, info) {
		state.removeList = info;
		sessionStorage.setItem("SET_REMOVELIST", JSON.stringify(info));
	},
	[types.SET_SCRAPLIST] (state, info) {
		state.scrapList = info;
		sessionStorage.setItem("SET_SCRAPLIST", JSON.stringify(info));
	},
	[types.SET_CONDITIONLIST] (state, info) {
		state.conditionlist = info;
		sessionStorage.setItem("SET_CONDITIONLIST", JSON.stringify(info));
	},
	[types.SET_YIELDLIST] (state, info) {
		state.yieldList = info;
		sessionStorage.setItem("SET_YIELDLIST", JSON.stringify(info));
	},
	[types.SAVE_ORDERLIST] (state, info) {
		state.orderList = info;
		// cookie.set('SET_USERINFO', info, {expires: 15}) // 将token存入cookie 并保留半个月 {domain: '.gefuzi.com'}
		sessionStorage.setItem("SAVE_ORDERLIST", JSON.stringify(info));
	},
	[types.SAVE_LOCATION] (state, info) {
		state.latlng = info;
		// cookie.set('SET_USERINFO', info, {expires: 15}) // 将token存入cookie 并保留半个月 {domain: '.gefuzi.com'}
		sessionStorage.setItem("SAVE_LOCATION", JSON.stringify(info));
	}
};

export default {
	state,
	mutations
};
