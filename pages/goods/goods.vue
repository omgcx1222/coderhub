<template>
	<view class="goods">
		<uni-nav-bar :border="false" statusBar fixed>
			<view slot="default" class="nav-bar">周边</view>
		</uni-nav-bar>

		<u-swiper :list="swiper" bgColor="#fff" height="300rpx" indicator indicatorMode="dot" circular previousMargin="40" nextMargin="40" imgMode="scaleToFill"></u-swiper>
		
		<view class="menu">
			<menu-list ref="shopList"></menu-list>
		</view>
		
		<view class="goods-nav-box">
			<goods-nav @popupShow="popupShow"></goods-nav>
		</view>
		
		<u-popup :show="popupIsShow" :round="10" @close="close">
			<view class="list">
				<menu-list-item 
					v-for="(item,index) in shopCart" 
					:key="index" 
					:goods="item"
					:index="index"
					@changeList="changeList"
				></menu-list-item>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { request } from '@/network/request.js'
	import { mapGetters } from 'vuex'
	
	import MenuList from '@/components/goods/MenuList.vue'
	import GoodsNav from '@/components/goods/GoodsNav.vue'
	import MenuListItem from '@/components/goods/MenuListItem.vue'
	
	export default {
		components: {
			MenuList,
			GoodsNav,
			MenuListItem
		},
		data() {
			return {
				swiper: [],
				popupIsShow: false,
			}
		},
		computed: {
			...mapGetters(['shopCart']),
		},
		onReady() {
			this.getSwiper()
		},
		
		methods: {
			async getSwiper() {
				const res = await request({
					url: '/goods/swiper'
				})
				this.swiper = res.data.swiper
			},
			
			// 弹起popup
			popupShow() {
				if(this.shopCart.length) {
					this.popupIsShow = true
				}
			},
			
			// 收起popup
			close() {
				this.popupIsShow = false
			},
			
			// popup内改变数量
			changeList({goods, value}) {
				const i = this.$refs.shopList.goodsList.findIndex((item, i) => item.id === goods.id)
				this.$refs.shopList.goodsList[i].count = value
				this.$store.dispatch('changeValue', this.$refs.shopList.goodsList[i])
			}
		}
	}
</script>

<style scoped>
	.goods {
		height: 100vh;
		overflow: hidden;
		/* #ifdef H5 */
		height: calc(100vh - 50px);
		/* #endif */
		position: relative;
	}
	.nav-bar {
		font-size: 20px;
		font-weight: 600;
		margin: 0 auto;
		line-height: 44px;
	}
	
	.menu {
		height: 200px;
	}
	
	.goods-nav-box {
		position: absolute;
		bottom: 0px;
		/* #ifndef H5 */
		z-index: 10076;
		/* #endif */
	}
	
	/* #ifndef H5 */
	.list:after {
		content: '';
		display: block;
		width: 100%;
		height: 50px;
	}
	/* #endif */

</style>
