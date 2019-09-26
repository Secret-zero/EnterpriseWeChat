const plugin = (Vue) => {
	if (plugin.installed) {
		return;
	}
	let utils = require.context(".", false, /\.js$/);
	let $util = {};
	utils.keys().forEach(key => {
		if (key === "./index.js") return;
		let utilName = key.replace(/^\.\//, "").replace(/\.js/, ""); // key = './abcd.js'   utilName = 'abcd'
		$util[utilName] = utils(key).default; // $util['abcd'] = utils('./abcd.js')
	});
	console.log($util);
	Vue.prototype.$util = $util;
};

export default plugin;
