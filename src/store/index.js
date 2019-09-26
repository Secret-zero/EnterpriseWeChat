import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import user from "./modules/user";
import scroll from "./modules/scroll";
import mutations from "./mutations";
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		common,
		user,
		scroll,
		mutations
	},
	strict: process.env.NODE_ENV !== "production"
});
