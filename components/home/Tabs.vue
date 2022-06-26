<template>
	<view class="tabs">
		<view class="tabs-item" :class="{'tabs-active': tabActive(momentItem, index2)}" 
			v-for="(item2, index2) in tabs" 
			:key="item2" 
			@click="clickTab(index2)"
		>
			{{item2}}
		</view>
		<view class="bottom-line" :style="{'left': momentItem.lineLeft}"></view>
	</view>
</template>

<script>
	export default {
		name: 'Tabs',
		props: {
			momentItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				tabs: ['最热', '最新'],
			}
		},
		methods: {
			tabActive(item, index2) {
				if(item) {
					return item.tab === index2
				}
			},
			
			// 点击tabs
			clickTab(index) {
				// 获取点击的tab的位置
				uni.createSelectorQuery().in(this).selectAll(".tabs-item").boundingClientRect(data =>{
					this.$emit('clickTab', [index, data[index].left])
				}).exec()
				
			},
		}
	}
</script>

<style scoped>
	.tabs {
		display: flex;
		padding-left: 10px;
		position: relative;
		height: 40px;
	}
	
	.tabs-item {
		padding: 10px 0;
		margin-right: 30px;
		color: #8a8a8a;
	}
	
	.tabs-active {
		color: #000000;
		font-weight: bold;
	}
	
	.bottom-line {
		position: absolute;
		left: 0;
		bottom: 3px;
		width: 30px;
		height: 3px;
		border-radius: 20px;
		background-color: #000000;
		transition: left .1s;
	}
</style>
