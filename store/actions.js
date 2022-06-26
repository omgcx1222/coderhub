import { request } from '@/network/request.js'
export default {
	// 首页label滑块发生改变
	change_current(ctx, index) {
		ctx.commit('change_current', index)
	},
	// 首页label滑块滑动动画是否结束
	animationfinish(ctx, boolean) {
		ctx.commit('is_finish', boolean)
	},
	
	// 保存登录状态
	login(ctx, data) {
		ctx.commit('LOGIN', data)
	},
	
	// 退出登录
	loginOut(ctx) {
		ctx.commit('LOGIN_OUT')
	},
	
	setUserInfo(ctx, url) {
		ctx.commit('SET_USERINFO', url)
	},
	
	// 更新购物车
	// changeShopCart(ctx, data) {
	// 	ctx.commit('Change_Shop_Cart', data)
	// },
	// 重置购物车
	clearShopCart({commit}) {
		commit('clear_Shop_Cart')
	},
	
	// 改变数量
	async changeValue(ctx, goods) {
		if(Object.keys(ctx.state.userInfo).length != 0) {
			const res = await request({
				url: '/goods',
				method: 'POST',
				data: {
					"goodsId": goods.id,
					"count": goods.count
				}
			}, true)
		}
		
		if(ctx.state.shopCart.length == 0) return ctx.commit('createShop', goods);
		
		const index = ctx.state.shopCart.findIndex((item, i) => item.id === goods.id )
		
		if(index != -1) {
			if(goods.count <= 0) {
				ctx.commit('clearShop', index)
			}else {
				ctx.commit('changeCount', {index, count: goods.count})
			}
		}else {
			ctx.commit('createShop', goods)
		}
	}
}