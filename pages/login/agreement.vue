<template>
	<view class="agreement">
		<uni-nav-bar statusBar="true" :border="false" leftIcon="left" @clickLeft="back()"></uni-nav-bar>
		<view class="title">coderhub · 使用条例</view>
		<view class="content">
			<view class="item">1、别发布违法的东西！富强、民主、文明、和谐......</view>
			<view class="item">2、由于在服务器端使用了jimp依赖压缩图片，而jimp依赖不支持类似gif的动图，所以上传图片时尽量上传png、jpg等格式的图</view>
			<view class="item">3、H5网页端在动态详情发表评论时，键盘弹起功能有bug，在app端不流畅有点卡顿，在微信小程序端比较“正常”。多端兼容太难了🥲</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'agreement',
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	.title {
		/* height: 50px; */
		line-height: 80px;
		border-bottom: 1px solid #e2e2e2;
		text-align: center;
		font-size: 1.5em;
		font-weight: bold;
	}
	.item {
		font-size: 1.1em;
		margin-top: 20px;
		padding: 0 10px;
		font-weight: bold;
	}
</style>
