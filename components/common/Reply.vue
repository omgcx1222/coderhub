<template>
	<view class="reply" v-if="item">
		<AvatarHeader :imgSrc="item.user.avatarUrl" :nickname="item.user.nickname">
			<template>
				<view class="iconfont" :class="[item.isAgree ? 'icon-dianzan_kuai' : 'icon-dianzan']" @click="like">{{item.agree ? item.agree : ''}}</view>
			</template>
		</AvatarHeader>
		<view class="content">
			<view class="text" @click="clickContent">{{item.content}}</view>
			<view class="content-reply" v-if="showReply" @click="clickReply">相关回复共{{item.child_count}}条></view>
			<view class="time">{{$timeHandle(item.createTime)}}</view>
		</view>
	</view>
</template>

<script>
	import { request } from '@/network/request.js'
	import AvatarHeader from './AvatarHeader.vue'
	export default {
		name: "Reply",
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			},
			index: {
				default: 0
			},
			showReply: {
				default: true
			}
		},
		components: {
			AvatarHeader
		},

		methods: {
			// 点击评论
			clickContent() {
				this.$emit('clickContent', this.index)
			},
			
			// 点击相关回复
			clickReply() {
				this.$emit('clickReply', this.index)
			},
			
			// 点赞
			like() {
				this.$emit('like', this.index)
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 0 10px 10px 50px;
	}
	.text {
		padding: 10px;
	}
	.content-reply {
		background-color: #f5f5f5;
		font-size: 12px;
		padding: 5px 10px;
		color: #5b5b5b;
		border-radius: 3px;
	}
	.time {
		font-size: 12px;
		margin-top: 10px;
		color: #5b5b5b;
	}
	.lick {
		color: #fb7299;
	}
</style>
