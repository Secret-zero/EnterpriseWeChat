// import vue from 'vue'
import axios from "../config/http";
// import $ from 'jquery';
// import vue from 'vue';
let baseUrl;
if (process.env.NODE_ENV === "development") {
	baseUrl = "http://192.168.0.107:8048";
} else if (process.env.NODE_ENV === "production") {
	baseUrl = "http://work.goldemperor.com";
}
export default async (url = "", data, type) => {
	return new Promise((resolve, reject) => {
		if (!type) {
			axios.post(baseUrl + url, {}, { params: data }).then((res) => {
				console.log(res);
				resolve(res.data);
			});
		} else {
			axios.get(url, { params: data }).then((res) => {
				console.log(res);
				resolve(res.data);
			});
		}
	});
};
