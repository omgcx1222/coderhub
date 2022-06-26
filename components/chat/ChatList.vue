<template>
	<view class="chat-list">
		<view class="time">{{time}}</view>
		<view class="chat-container" :style="imgDirection">
			<view class="left">
				<image :src="img" class="img"></image>
			</view>
			<view class="text-container">
				<text class="title" :style="titleDirection">{{title}}</text>
				<text class="message" :style="messageDirection">{{message}}</text>
			</view>
			<view class="right"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ChatList',
		props: {
			direction: {
				type: String,
				default: "left",
			},
			title: {
				type: String,
				default: "标题",
			},
			img: {
				type: String,
				default: "图片",
			},
			message: {
				type: String,
				default: "内容",
			},
			time: {
				// type: String,
				default: "2022-05-02"
			}
		},
		computed: {
			imgDirection() {
				if(this.direction === 'right') {
					return "flex-direction: row-reverse;"
				}
			},
			titleDirection() {
				if(this.direction === 'right') {
					return "text-align: right;"
				}
			},
			messageDirection() {
				if(this.direction === 'right') {
					return "align-self: flex-end;"
				}else {
					return "align-self: flex-start;"
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.time {
		text-align: center;
		padding-top: 50rpx;
		font-size: 11px;
		color: #61666D;
	}
	.chat-container {
		display: flex;
		// width: calc(100% - 40px - 48rpx);
		padding: 10rpx 0;
	}
	.left, .right {
		width: 40px;
		padding: 20rpx 24rpx;
		.img {
			width: 40px;
			height: 40px;
			border-radius: 5px;
			display: block;
		}
	}
	.text-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		.title {
			font-size: 12px;
			color: #61666D;
			padding: 15rpx 0;
		}
		.message {
			padding: 20rpx;
			background-color: #fff;
			border-radius: 10rpx;
			font-size: 15px;
		}
	}
</style>