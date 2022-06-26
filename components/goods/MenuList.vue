<template>
	<view class="menu-box">
		<scroll-view class="scroll" scroll-y>
			<view 
				:class="{item: true, active: current == index}" 
				v-for="(item, index) in menu" 
				:key="index"
				@click="change(index)"
			>
				{{item}}
			</view>
		</scroll-view>

		<view class="view" v-if="current === 0">
			<menu-list-item @changeList="changeList" v-for="(goods, index) in goodsList" :key="index" :goods="goods" :index="index">
				
			</menu-list-item>
		</view>

		<view class="view" v-else>
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { request } from '@/network/request.js'
	import MenuListItem from '@/components/goods/MenuListItem.vue'
	
	export default {
		name: 'MenuList',
		components: {
			MenuListItem
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				menu: ['英雄联盟', '绝地求生'],
				current: 0,
				goodsList: []
			}
		},
		mounted() {
			this.getGoods()
		},
		methods: {
			async getGoods() {
				const res = await request({
					url: '/goods/list'
				}, true)
				this.goodsList = res.data
				
				for(const i in this.goodsList) {
					if(this.goodsList[i].count > 0) this.$store.dispatch('changeValue', this.goodsList[i]);
				}
			},
			
			change(i) {
				this.current = i
			},
			
			changeList({index, value}) {
				this.goodsList[index].count = value
				this.$store.dispatch('changeValue', this.goodsList[index])
			}
		},
		watch: {
			userInfo(n) {
				if(n.id) {
					this.$store.dispatch('clearShopCart');
					this.getGoods()
				}
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.menu-box {
		display: flex;
		margin-top: 20px;
	}

	.scroll {
		height: 100%;
		width: 70px;
		text-align: center;
		font-size: 24rpx;

		.item {
			margin: 20px 0;
			color: #8a8a8a;
			border-left: 4px solid #fff;
		}

		.active {
			color: #000;
			border-left: 4px solid #000;
			font-weight: 600;
		}
	}

	.view {
		flex: 1;
		overflow: hidden;
	}
	
	.mli {
		margin: 40rpx 20rpx;
	}
</style>
