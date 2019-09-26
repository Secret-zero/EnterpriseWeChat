import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "./config/http";
import { baseUrl, h5Url } from "./config/env";
import { ToastPlugin, WechatPlugin, ConfirmPlugin, AlertPlugin } from "vux";
import vueTouch from "kim-vue-touch";
import libs from "./utils/common";
import ElementUI from "element-ui";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";

Vue.use(vueTouch);
Vue.use(App);
Vue.use(libs);
Vue.use(ToastPlugin);
Vue.use(WechatPlugin);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin);
Vue.use(ElementUI);
// Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
	defaultOptions: {
		zIndex: 9999
	}
});
// Vue.prototype.$http.defaults.headers.common['Authorization'] = 11
Vue.prototype.domainName = baseUrl;
Vue.prototype.domainNameH5 = h5Url;
Vue.config.productionTip = false;

Vue.prototype.$http = axios;

router.beforeEach((to, from, next) => {
	// debugger
	// 解决登录后，token没有更新
	// Vue.prototype.$http.defaults.headers.token = store.getters.getUserInfo
	// loading状态
	store.commit("updateLoadingStatus", {isLoading: true});
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	if (from.name === "baiduVerify") {
		document.getElementsByTagName("html")[0].classList.remove("body-bg");
	}
	next();
});

router.afterEach(function (to) {
	store.commit("updateLoadingStatus", {isLoading: false});
});

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,
	components: { App },
	template: "<App/>"
});
