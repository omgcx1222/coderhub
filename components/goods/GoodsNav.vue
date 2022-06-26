<template>
	<view class="goods-nav">
		<uni-badge :text="allCount" type="error" absolute="rightTop">
			<uni-icons type="cart-filled" size="40" color="#ffd144" @click="shopDetail"></uni-icons>
		</uni-badge>
		
		<text @click="shopDetail">￥{{price}}</text>
		<view class="go" @click="go">
			去结算
		</view>
	</view>
</template>

<script>
	import { request } from '@/network/request.js'
	import { mapGetters } from 'vuex'
	export default {
		name: 'GoodsNav',
		computed: {
			...mapGetters(['shopCart', 'userInfo']),
			price() {
				return this.shopCart.reduce((pre, curr) =>{
					return pre + curr.price * curr.count
				}, 0)
			},
			allCount() {
				return this.shopCart.reduce((pre, curr) =>{
					return pre + curr.count
				}, 0)
			}
		},
		methods: {
			// 弹起<goods>页面的popup框
			shopDetail() {
				this.$emit('popupShow')
			},
			
			// 去结算
			go() {
				// 判断购物车是否为空
				if(this.shopCart.length) {
					// 判断是否登录
					if(Object.keys(this.userInfo).length) {
						uni.showModal({
							title: "不能支付！",
							content: "这么贵也支付？请直接给我转账，谢谢😍",
							showCancel: false,
							confirmColor: "#000"
						})
						// uni.requestPayment({
						// 	provider: "wxpay",
						// 	orderInfo: "",
						// 	timeStamp: String(Data.now()),
						// 	signType: "MD5"
						// })
					}else {
						uni.showToast({
							title: "请先登录",
							icon: "none"
						})
					}
				}else {
					uni.showToast({
						title: "请先选择商品",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style scoped>
	.goods-nav {
		width: 100vw;
		height: 50px;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ebebeb;
		background-color: #fff;
	}
	.go {
		margin-right: 40rpx;
		margin-left: auto;
		background-color: #ffd144;
		padding: 20rpx 40rpx;
		border-radius: 50rpx;
		color: #000;
	}
</style>
