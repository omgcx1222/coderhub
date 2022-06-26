<template>
	<view>
		<uni-nav-bar statusBar="true" :border="false" leftWidth="100px">
			<view slot="left" class="nav-bar">coderhub</view>
		</uni-nav-bar>
		
		<Label :labels="labels"></Label>
		
		<Swiper-Content :labels="labels"></Swiper-Content>
		
		<!-- 悬浮按钮 -->
		<uni-fab 
			@trigger="trigger"
			horizontal="right"
			:pattern="pattern"
			:content="content"
		>
		</uni-fab>
	</view>
</template>

<script>
	import { request } from '../../network/request.js'
	import Label from '@/components/home/Label.vue'
	import SwiperContent from '@/components/home/SwiperContent.vue'
	export default {
		data() {
			return {
				labels: [],
				isClick: false, // 滑块是否通过点击labels进行滑动
				pattern: {
					color: '#000',
					selectedColor: '#000',
					backgroundColor: '#fff',
					buttonColor: '#000',
				},
				content: [
					{
						text: '发表动态',
						iconPath: '/static/fabu.png'
					},
				]
			}
		},
		components: {
			Label,
			SwiperContent
		},
		onReady() {
			this.getLabels()
		},
		
		methods: {
			// 请求labels数据
			async getLabels() {
				const res = await request({url: '/label'})
				this.labels = res.data
			},
			
			// 点击悬浮按钮的内容
			trigger(info) {
				uni.navigateTo({
					url: '/pages/pubMoment/pubMoment'
				})
			}
		}
	}
</script>

<style scoped>
	.nav-bar {
		font-size: 20px;
		font-weight: 600;
	}
</style>
