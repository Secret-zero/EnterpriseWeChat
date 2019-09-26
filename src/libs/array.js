// common functions by huangtianhan 2018/10/22
const array = {
	// arr 数组 value 要查询的元素
	containVal (arr, value) {
		if (arr.indexOf(value) !== -1) { // 包含有该元素
			return true
		} else { // 不包含有该元素
			return false
		}
	},
	// arr 数组 obj 要查询的对象
	containObj (arr, obj) {
		if (JSON.stringify(arr).indexOf(JSON.stringify(obj) !== -1)) { // 包含有该对象
			return true
		} else { // 不含有该对象
			return false
		}
	},
	// 数组递增排序
	increasingSort (arr) {
		arr.sort(new Function("a","b","return a-b"));//设置比较函数
		var sortedArr = [];
		for (var i = 0; i < arr.length; i++) {
			sortedArr.push(arr[i])
		}
		return sortedArr
	},
	// 获取元素或对象的下标 返回数组下面
	getArrIndex (arr, obj) {
		let index = null;
		let key = Object.keys(obj)[0]
		arr.every(function(value, i) {
			if (value[key] === obj[key]) {
				index = i
				return false
			}
			return true
		})
		return index
	},
	// 去除数组中重复的数据 并返回新的数组
	uniqueArr (arr) {
		let newArr = []
		let origLen = arr.length
		let found
		let x
		let y
		for (x = 0; x < origLen; x++) {
			found = undefined
			for (y = 0; y < newArr.length; y++) {
				if (arr[x] === newArr[y]) {
					found = true
					break
				}
			}
		if (!found) newArr.push(arr[x])
		}
		return newArr
	}
}
export default array