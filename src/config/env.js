/**
 * 配置编译环境和线上环境之间的切换
 *
 * h5Url: web页面域名地址
 * baseUrl: api域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let h5Url = "https://h5.ggzlive.com";
// let h5Url = 'http://192.168.1.79:15010'
let baseUrl = "http://220.189.245.171:8019";
let baseUrl2 = "http://220.189.245.171:8112";
// let baseUrl2 = "http://192.168.101.233:9999";
// let baseUrl2 = "http://192.168.0.107:8048";
// let baseUrl = 'http://192.168.1.79:15008'
let routerMode = "hash";
let imgBaseUrl;

if (process.env.NODE_ENV === "development") {
	imgBaseUrl = "http://cangdu.org:8001/img/";
} else if (process.env.NODE_ENV === "production") {
	baseUrl = "http://220.189.245.171:8019";
	// imgBaseUrl = 'http://cangdu.org:8001/img/'
}

export {
	baseUrl,
	baseUrl2,
	h5Url,
	routerMode,
	imgBaseUrl
};
