// date functions by huangtianhan 2018/10/23
const date = {
	// 传入时间例如：let day = new Date('2018/10/24')  zx 表示你要输出的是周几还是星期几
	getWeekDay (day, zx) {
		let cnDay = ['周日','周一','周二','周三','周四','周五','周六']
		let cnDay1 = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
		if (typeof Z_XQ == 'undefined' || Z_XQ === 'Z') {
			return cnDay[day.getDay()]
		} else {
			return cnDay1[day.getDay()];
		}
	},
	// 获取AddDayCount天后的日期 负的则表示 多少天之前
	getDateStr (AddDayCount) {
		let dd = new Date(); 
		dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期 
		let y = dd.getFullYear()
		let m = dd.getMonth() + 1 //获取当前月份的日期 
		let d = dd.getDate() 
		if (m < 10) {
			m = '0' + m
		}
		if (d < 10) {
			d = '0' + d
		}
		return y + "-" + m + "-" + d
	},
	/*倒计时 timeEnd结束的时间*/
	show_time (timeEnd, index) {
		let day = timeEnd.replace(/-/g,'/')
		let now = new Date()
		let time_distance
		if (index === 1) { //非时间戳格式
			let timeEnd = new Date(day)
			time_distance = timeEnd.getTime() - now.getTime()
		} else {  //时间戳格式
			time_distance = timeEnd - now.getTime()
		}
		if (time_distance < 0) {
			return false
		}
		// 获取天
		//this.time.d = Math.floor(time_distance / (24*3600*1000))
		//time_distance -= this.time.d * (24*3600*1000)
		// 获取时
		let time_h = Math.floor(time_distance/3600000) 
		time_distance -= time_h * 3600000
		if (time_h <= 9) {
			time_h = '0' + time_h
		}
		 // 获取分
		let time_m = Math.floor(time_distance/60000) 
		time_distance -= time_m * 60000
		if (time_m <= 9) {
			time_m = '0' + time_m
		}
		// 获取秒
		let time_s = Math.floor(time_distance/1000) 
		time_distance -= time_s * 1000
		if (time_s <= 9) {
			time_s = '0' + time_s
		}
		// 获取毫秒
		let time_ms = Math.floor(time_distance/100) 
		//this.time.ms = this.time.ms
		return {
			time_h:time_h,
			time_m:time_m,
			time_s:time_s,
			time_ms:time_ms
		}
	}
}
export default date