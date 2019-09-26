export function MP () {
	return new Promise(function (resolve, reject) {
		window.onload = function () {
			resolve(wx);
		};
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js";
		document.head.appendChild(script);
	});
}
