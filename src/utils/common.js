// import cookie from "js-cookie";
/**
 * 2018/10/09 by huangtianhan
 */
export default {
	install (Vue, option) {
		// 浏览器类型
		Vue.prototype.uploadImgToBase64 = (file) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function () { // 图片转base64完成后返回reader对象
					resolve(reader);
				};
				reader.onerror = reject;
			});
		};
		Vue.prototype.getFileUrl = (obj) => {
			let url;
			url = window.URL.createObjectURL(obj.files.item(0));
			return url;
		};
	}
};
