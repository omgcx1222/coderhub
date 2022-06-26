// 网络请求封装
const BASE_URL = 'http://175.178.104.121:8888'
const WEBSOCKET_Url = 'ws://175.178.104.121:8888'
// const BASE_URL = 'http://192.168.72.20:8888'
// const WEBSOCKET_Url = 'ws://192.168.72.20:8888'

export function request(config={}, isToken=false) {
	return new Promise((resolved, rejected) =>{
		const userInfo = uni.getStorageSync('userInfo')
		uni.request({
			url: BASE_URL + config.url,
			method: config.method || 'GET',
			header: {
				'Authorization': isToken ? `Bearer ${userInfo.token}` : ''
			},
			data: config.data,
			success: (res) => {
				resolved(res)
			},
			fail: (err) => {
				rejected(err)
			}
		})
	})
}

// 上传图片
export function uploadImg({url, imgPath='', name='avatar', token}) {
	return new Promise((resolved, rejected) =>{
		const userInfo = uni.getStorageSync('userInfo')
		
		uni.uploadFile({
			url: BASE_URL + url,
			header: {
				'Authorization': `Bearer ${token}`
			},
			fileType: 'image',
			filePath: imgPath,
			name,
			timeout: 60000,
			success: (res) => {
				resolved(res)
			},
			fail: (err) =>{
				rejected(err)
			}
		})
	})
}

export function connectSocket() {
	return new Promise((resolved, rejected) =>{
		// 创建连接
		uni.connectSocket({
			url: WEBSOCKET_Url + '/socket',
			success: (res) =>{
				resolved(res)
			},
			fail: (err) =>{
				console.log(err);
				rejected(err)
			},
		})
	})
}