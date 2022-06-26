<template>
	<view class="card">
		<view class="text" v-if="title">
			{{title}}
		</view>
		
		<view class="picture-1" v-if="imgList.length == 1 && !isPreview">
			<image class="picture-item" :src="img" v-for="(img, i) in imgList" :key="i" lazy-load mode="widthFix" @click="clickImg(imgList, i)"></image>
		</view>
		<view class="picture-4" v-else-if="imgList.length === 4 && !isPreview">
			<image class="picture-item" :src="img" v-for="(img, i) in imgList" :key="i" lazy-load mode="aspectFill" @click="clickImg(imgList, i)"></image>
		</view>
		<view class="picture" v-else>
			<image class="picture-item" :src="img" v-for="(img, i) in imgList" :key="i" lazy-load mode="aspectFill" @click="clickImg(imgList, i)"></image>
			
			<!-- 预览状态下的添加图片按钮 -->
			<view class="icon" @click="addImage" v-if="isPreview && imgList.length < 9">
				<uni-icons class="add-image" type="plusempty" size="40"></uni-icons>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: "Card",
		props: {
			title: {
				type: String,
				default: ''
			},
			imgList: {
				type: Array,
				default() {
					return []
				}
			},
			
			// 是否预览，预览状态下无论几张图片都是九宫格形状
			isPreview: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			// 预览图片
			clickImg(arr, item) {
				uni.previewImage({
					current: item,
					urls: arr,
					indicator: "number"
				})
			},
			
			addImage() {
				this.$emit('addImage')
			}
		}
	}
</script>

<style scoped>
	.card {
		/* width: 100%; */
	}
	.text {
		margin-bottom: 10px;
	}
	
	.picture, .picture-1, .picture-4 {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	
	.picture .picture-item, .picture-4 .picture-item {
		width: 32.66%;
		height: 200upx;
		margin-top: 1%;
		margin-right: 1%;
	}
	
	.picture .picture-item:nth-child(3n) {
		margin-right: 0%;
	}
	
	.picture-1 .picture-item {
		max-width: 100%;
		max-height: 300px;
	}
	
	.picture-4 .picture-item:nth-child(2n) {
		margin-right: 10%;
	}
	
	.icon {
		width: 32.66%;
		height: 200upx;
		background-color: #e7e7e7;
		text-align: center;
		line-height: 100px;
		margin-top: 1%;
	}
</style>
