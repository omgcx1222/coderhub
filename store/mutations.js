export default {
	change_current(state, index) {
		state.current = index
	},
	is_finish(state, boolean) {
		state.clickSlide = boolean
	},
	
	LOGIN(state, data) {
		state.userInfo = data
	},
	
	LOGIN_OUT(state) {
		state.userInfo = {}
		uni.removeStorageSync('userInfo')
		uni.closeSocket()
	},
	
	SET_USERINFO(state, url) {
		state.userInfo.avatarUrl = url
		uni.setStorageSync('userInfo', state.userInfo)
	},
	
	// Change_Shop_Cart(state, data) {
	// 	state.shopCart = data
	// },
	
	// 重置购物车
	clear_Shop_Cart(state) {
		state.shopCart = []
	},
	
	// 清除商品
	clearShop(state, index) {
		state.shopCart.splice(index, 1)
	},
	
	// 改变数量
	changeCount(state, {index, count}) {
		state.shopCart[index].count = count
	},
	
	// 新增商品
	createShop(state, data) {
		state.shopCart.push(data)
	}
	
}