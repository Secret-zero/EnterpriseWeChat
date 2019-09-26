/**
 *wechat.js 是一个微信SDK文件
 */
import Vue from 'vue'
import { getSignature } from '@/api/getData'
import { WechatPlugin } from 'vux'

const wx = {
	methods: {
		async getSignature (callback) {
			let form = {
				url: location.href,
				type: 0
			}
			try {
				const data = await getSignature(form)
				console.log(data)
				WechatPlugin.$wechat.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.appid, // 必填，公众号的唯一标识
					timestamp: parseInt(data.timeStamp), // 必填，生成签名的时间戳
					nonceStr: data.nonceStr, // 必填，生成签名的随机串
					signature: data.sig, // 必填，签名，见附录1
					jsApiList: ['getLocation', 'checkJsApi', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
			} catch (err) {}
			WechatPlugin.$wechat.ready(() => {
				if (callback) {
					console.log(callback)
					callback()
				}
			})
		},
		/**
		 * 
		 * @param {float} lat 
		 * @param {float} lng 
		 */
		// 打开微信内置位置信息
		getLocation (option = {}) {
			this.$wechat.getLocation({
				type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function (res) {
					console.log('success', res)
					// let res = 
					option.success(res)
					// Vue.$store.commit('SAVE_LOCATION', {lat: res.latitude, lng: res.longitude})
					// var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					// var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					// var speed = res.speed; // 速度，以米/每秒计
					// var accuracy = res.accuracy; // 位置精度
				},
				fail: function(res) {
					console.log('error', res)
				}
			});
		}
	}
}

export default wx
