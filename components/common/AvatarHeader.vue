<template>
	<view class="header">
		<image class="avatar" :src="imgSrc" mode="" lazy-load></image>
		<text class="nickname">{{nickname}}</text>
		<view class="guanzhu">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "AvatarHeader",
		props: {
			imgSrc: {
				default: ''
			},
			nickname: {
				default: ''
			}
		}
	}
</script>

<style scoped>
	.header {
		height: 40px;
		display: flex;
		line-height: 40px;
		justify-content: flex-start;
		/* margin: 0 10px; */
	}
	
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 10px;
	}
	
	.nickname {
		color: #3d3d3d;
		font-size: 14px;
	}
	
	.guanzhu {
		margin-left: auto;
	}
	
/* 	.text {
		border: 1px solid #8a8a8a;
		border-radius: 3px;
		padding: 2px 3px;
		font-size: 13px;
	} */
</style>
