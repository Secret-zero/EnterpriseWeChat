/**
 * http配置
 */

import axios from "axios";
// import store from '../store';
import {baseUrl} from "../config/env";

// axios 配置
axios.defaults.baseURL = baseUrl;
// axios.defaults.headers.phoneType = 5;
// axios.defaults.headers.storeToken = '5abb0a4abffbd39eb88fae12';
// axios.defaults.headers.token = 'TVRBd01ERTFOakV3NDEyMjkzN2UyMTg5NGY2OGJkMDExZjJiNWZkZmVmYWY=';

// http request 拦截器
axios.interceptors.request.use(
	config => {
		// var token = store.getters.getUserInfo.token;
		// console.log(token);
		// if (token) {
		// axios.defaults.headers.token = '11111111111';
		// }
		return config;
	},
	err => {
		console.log(2);
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	response => {
		// console.log(response)
		return response;
	},
	error => {
		if (error.response) {
			console.log(error);
		}
		// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
		return Promise.reject(error);
	}
);

export default axios;
