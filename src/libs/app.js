import cookie from 'js-cookie'
/**
 * 2018/10/09 by huangtianhan
 * nativeApp function
 * 原生方法
 */
export default {
	install (Vue, option) {
		// 浏览器类型
		Vue.prototype.getNavigatorType = () => {
			//console.log(navigator.userAgent)
			let type =1
			let ua = navigator.userAgent    
			if (ua.match('AppNative')) {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					type=3
					//window.location.href ="iPhone.html"
				} else if (/(Android)/i.test(navigator.userAgent)) {
					type=2
					//window.location.href ="Android.html"
				} else {
					//window.location.href ="pc.html"
				}
			} else {
				type=1
			}
			return type
		},
		// 调用原生页面 只需一个参数的时候调用此方法 例如： this.nativeDirect('11')
		Vue.prototype.nativeDirect = function (status,subId,subStr,obj,refresh) {
			if(window.ggzApp === true) {
				let iframe = document.createElement("iframe")
				let type = Vue.prototype.getNavigatorType()
				if (type === 3) {
					alert('ios')
					Vue.prototype.nativeDirectIos(status,subId,subStr,obj,refresh)
				} else {
					let v = Vue.prototype.getCurrentVersion()
					if(v === '3.0.8'){
						window.baseObj.nativeDirect(status,subId,subStr,obj,refresh)
					} else {
						if(status&&!subId&&!subStr&&!obj&&!refresh){
							let dest = status
							let checkLogin = ''
							let linkInfo = ''
							window.baseObj.nativePageDirect(checkLogin,dest,linkInfo)
						}
					}
				}
			} else {
				if (status === '11') {
					Vue.prototype.Login()
				}
			}
		},
		/**
		* 页面导航
		* 安卓
		* @param checkLogin 判断登录 1需要 0 不需要
		* @param dest       目的页面
		* @param linkInfo   连接信息
		*/
		// 调用安卓页面方法
		Vue.prototype.nativePageDirect = function (checkLogin,dest,linkInfo){
			if(window.ggzApp == true){
				let iframe = document.createElement("iframe")
				let type = Vue.prototype.getNavigatorType()
				if (type === 3) {

				} else {
					window.baseObj.nativePageDirect(checkLogin,dest,linkInfo)
				}
			}
		},
		// 调用ios页面方法
		Vue.prototype.nativeDirectIos = function (status,subId,subStr,obj,refresh) {
			window.webkit.messageHandlers.nativeDirect.postMessage({
				status:status,
				subId:subId,
				subStr:subStr,
				obj:obj,
				refresh:refresh
			})
		},
		// 获取版本号
		Vue.prototype.getCurrentVersion = function () {
			let iframe = document.createElement("iframe")
			let type = Vue.prototype.getNavigatorType()
			if (type === 3) {
				let data = JSON.parse(b64_to_utf8($.fn.cookie('address')))
				return data.version
			} else {
				return window.baseObj.getCurrentVersion()
			}
		},
		//获取token
		Vue.prototype.getToken = function (){
			let iframe = document.createElement("iframe")
			let type = Vue.prototype.getNavigatorType()
			if (type == 3) {
				return cookie.get('token')
				//return "TVRBd01ERTFNelUzNjhkZTI0YTllYjI4NDYwMTgzYTVhYjYxYTdhNjU3NDc="
			} else if(type == 1){
				let user = {}
				if(window.localStorage.user == undefined) {
					user.token = ''
				} else {
					user = Vue.prototype.Decrypt(window.localStorage.user)
					user = user.user
				}
				return user.token
				//return "TVRBd01ERTFNelEyNjE2M2M1MDU0NTcyNDhkNDlkMmMzMDk3ZWQwMWQ4YWI="
			}
			else {
				return window.baseObj.getToken()
				//return "TVRBd01ERTFORFkyYThhYzI1ZTUxZTRhNDY1MThkNzM5ODEwZDRjNjdhMjY="
			}
		},
		//打开通讯录获取联系人
		Vue.prototype.doPickContact = function () {
			let iframe = document.createElement("iframe")
			let type = Vue.prototype.getNavigatorType()
			if (type == 3) {
				window.webkit.messageHandlers.doPickContact.postMessage({
				})
			} else {
				window.baseObj.doPickContact()
			}
		},
		Vue.prototype.doNativePay = function (payType,jsonObj) {
			let iframe = document.createElement("iframe")
			let type = Vue.prototype.getNavigatorType()
			if (type == 3) {
				window.webkit.messageHandlers.doNativePay.postMessage({
					payType: payType,
					jsonObj: jsonObj
				})
			} else {
				window.baseObj.doNativePay(payType,jsonObj)
			}
		},
		//安卓获取联系人之后分析通讯录
		Vue.prototype.doAnalyseContacts = function () {
			let type = Vue.prototype.getNavigatorType()
			if (type != 3) {
				window.baseObj.doAnalyseContacts()
			}
		},
		/**
		 * 开始定位(安卓)
		 * @param coorType gcj02（国测局坐标）、bd09（百度墨卡托坐标）和bd09ll（百度经纬度坐标）
		 * 需要在页面上写onLocationInfo，onLocationError两个方法 安卓会调用此方法返回信息
		 */
		Vue.prototype.startLoacation = function (coorType) {
			if (window.ggzApp == true) {
				let iframe = document.createElement("iframe")
			    let type = Vue.prototype.getNavigatorType()
			    window.baseObj.startLoacation(coorType)
			}
		},
		// 结束定位
		Vue.prototype.stopLocation = function () { //在获取经纬度之后 停止定位
			if (window.ggzApp == true) {
				window.baseObj.stopLocation()
			}
		},
		// nativeApp 分享方法
		Vue.prototype.shareUrl = function (url,title,content,iconUrl) {
			let iframe = document.createElement("iframe")
			let type = Vue.prototype.getNavigatorType()
			if (type == 3) {
		    	Vue.prototype.shareUrlIos(url,title,content,iconUrl)
			} else {
		    	console.log(url,title,content,iconUrl)
		    	Vue.prototype.shareUrlAndroid(url,title,content,iconUrl)
		    }
		},
		// 安卓分享方法
		Vue.prototype.shareUrlAndroid = function (url,title,content,iconUrl) {
			window.baseObj.shareUrl(title,content,url,iconUrl)
		},
		// ios分享方法
		Vue.prototype.shareUrlIos = function (url,title,content,iconUrl) {
			window.webkit.messageHandlers.shareUrl.postMessage({
		        url:url,
		        title:title,
		        content:content,
		        iconUrl:iconUrl
		    })
		}
 	}
}