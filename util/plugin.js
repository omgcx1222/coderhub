const plugin = {
  install(Vue, options) {
		Vue.prototype.$timeHandle = (time='') =>{
			const T = new Date(time)
			const nowDate = new Date()
			if(nowDate < T) return '时间错误'
			
			const yy = T.getFullYear()
			const mm = T.getMonth() + 1
			const dd = T.getDate()
			const hh = T.getHours()
			const mf = T.getMinutes() < 10 ? '0' + T.getMinutes() : T.getMinutes()
			// const ss = T.getSeconds() < 10 ? '0' + T.getSeconds() : T.getSeconds()
			
			if(nowDate.getFullYear() - yy >= 1) { //一年以前
				return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf
			}else if(nowDate.getDate() - dd >= 2 || nowDate.getMonth() + 1 - mm >= 1) {  // 两天之前一年以内
				return mm + '-' + dd + ' ' + hh + ':' + mf
			}else if(nowDate.getDate() - dd === 1) { // 昨天
				return '昨天' + ' ' + hh + ':' + mf
			}else { // 今天之内
				return hh + ':' + mf
			}
			
			// const newTime = time.replace('T', ' ').replace('.000', '').replace('Z', '')
			// return newTime
		}
    
  }
};

module.exports = plugin