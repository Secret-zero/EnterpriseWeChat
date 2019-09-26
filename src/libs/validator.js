/**
 *validator.js 是一个验证表单文件
 */

/**
 * 手机号码
 * @param {int} value 需要验证的值
 * @param {int} required 是否必填
 */
exports.tel = (value, required) => {
	if (required === true && (value === null || value === '')) {
		return '请输入手机号码'
	}
	if (!(/^1[34578]\d{9}$/.test(value))) {
		return '手机号码有误，请重填'
	}
}

/**
 * 短信
 * @param {int} value 需要验证的值
 * @param {int} required 是否必填
 */
exports.sms = (value, required) => {
	if (required === true && (value === null || value === '')) {
		return '请输入验证码'
	}
	if (value.length < 4) {
		return '请输入正确的验证码'
	}
}

/**
 * 身份证
 * @param {int} value 需要验证的值
 * @param {int} required 是否必填
 */
exports.idCard = (value, required) => {
	if (required === true && (value === null || value === '')) {
		return '请输入身份证号码'
	}
	if (!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value))) {
		return '身份证号码有误，请重填'
	}
}
