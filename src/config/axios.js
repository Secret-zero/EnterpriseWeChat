// import vue from 'vue'
import axios from "../config/http";
import $ from "jquery";
import vue from "vue";
import Qs from "qs";
export default async (url = "", data, type) => {
	return new Promise((resolve, reject) => {
		// let form;
		console.log(data);
		// if (isEncrypt) {
		// 	form.data = Encrypt(data.data)
		// } else {
		// 	form = data.data
		// }
		if (!window.sessionStorage.getItem("isfirst")) {
			// axios.defaults.headers.APPID = 'jiedian'
			// axios.defaults.headers.APPKey = '70A62C9BFEB46644B2A37338E4FD8143'
			// axios.get('http://220.189.245.171:8056/SAPForAPPServer.asmx/OpenServer', {}).then((res) => {
			// 	console.log(axios.defaults.headers)
			// 	window.sessionStorage.setItem('isfirst', '1')
			// })
			// window.location.reload()
		}

		axios.post(url, Qs.stringify(data)).then((res) => {
			res = $.parseXML(res.data).firstChild.textContent;
			res = decodeURIComponent(res);
			res = JSON.parse(res);
			if (res.ReturnType === "success" || res.ReturnType === "S") {
				// console.log(res.ReturnMsg)
				if (type === "parse") {
					resolve(JSON.parse(res.ReturnMsg));
				}
				if (type === "UrlDecode") {
					resolve(UrlDecode(res.ReturnMsg));
				} else {
					resolve(res.ReturnMsg);
				}
			} else {
				console.log(url, data.data, res);
				if (type === "UrlDecode") {
					vue.$vux.toast.text(UrlDecode(res.ReturnMsg));
					// vue.$store.commit("updateLoadingStatus", { isLoading: false });
					// console.log(vue.$store)
					reject(UrlDecode(res.ReturnMsg));
				} else {
					vue.$vux.toast.text(res.ReturnMsg);
					// vue.$store.commit("updateLoadingStatus", { isLoading: false });
					// console.log(vue.$store)
					reject(res.ReturnMsg);
				}
			}
		});
	});
};
function UrlDecode (str) {
	var ret = "";
	for (var i = 0; i < str.length; i++) {
		var chr = str.charAt(i);
		if (chr === "+") {
			ret += " ";
		} else if (chr === "%") {
			var asc = str.substring(i + 1, i + 3);
			if (parseInt("0x" + asc) > 0x7f) {
				ret += asc2str(parseInt("0x" + asc + str.substring(i + 4, i + 6)));
				i += 5;
			} else {
				ret += asc2str(parseInt("0x" + asc));
				i += 2;
			}
		} else {
			ret += chr;
		}
	}
	return ret;
}
