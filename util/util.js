// 防抖
const debounce = function(fn, delay=500, immediate=false) {
	let time = null
	return function(...args) {
		if(time) clearTimeout(time)
		if(immediate) {
			if(!time) fn.apply(this, args);
			time = setTimeout(() =>{
				time = null
			}, delay)
		}else {
			time = setTimeout(() =>{
				fn.apply(this, args)
			}, delay)
		}
	}
}

// 节流
const throttle = function(fn, delay=500) {
	let start = 0
	return function(...args) {
		const current = new Date()
		if(current - start > delay) {
			fn.apply(this, args)
			start = current
		}
	}
}

// 
// const timeHandle = function(time) {
// 	// 转为正常的时间格式 年-月-日 时:分:秒
// 	const newTime = time.replace('T', ' ').replace('.000', '').replace('Z', '')
// 	return newTime
// }

export {
	debounce,
	throttle
}