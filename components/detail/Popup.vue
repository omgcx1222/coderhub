<template>
	<uni-popup ref="popup" type="bottom" background-color="#fff" :safe-area="false" @change="popupChange">
		<view class="popup">
			<scroll-view class="scroll" scroll-y>
				<view class="comment">
					<Reply :showReply="false" :item="comment" @clickContent="clickComment" @like="like"></Reply>
				</view>
				
				<view class="item" v-for="(reply, index) in replyList" :key="index">
					<Reply :showReply="false" :item="reply" :index="index" @clickContent="clickReplyItem" @like="likeItem"></Reply>
				</view>
			</scroll-view>
			
			<KeyInput :placeholder="placeholder" @pub="pub" ref="input" @blur="blur"></KeyInput>
		</view>
	</uni-popup>
</template>

<script>
	import KeyInput from '@/components/detail/KeyInput.vue'
	import Reply from '@/components/common/Reply.vue'
	
	export default {
		name: 'Popup',
		props: ['comment', 'replyList'],
		components: {
			KeyInput,
			Reply
		},
		data() {
			return {
				placeholder: '发表一条友善的评论',
				clickIndex: null,
				isPub: false,
			}
		},
		methods: {
			popupOpen() {
				this.$refs.popup.open()
			},
			
			clickComment() {
				this.isPub = true
				this.placeholder = `回复 ${this.comment.user.nickname}：`
				this.clickIndex = null
				this.$refs.input.isFocus = true
			},
			
			clickReplyItem(index) {
				this.isPub = true
				this.placeholder = `回复 ${this.replyList[index].user.nickname}：`
				this.clickItem = index
				this.$refs.input.isFocus = true
			},
			
			// popup状态改变
			popupChange() {
				this.placeholder = "发表一条友善的评论"
			},
			
			async pub(value) {
				this.isPub = true
				await this.$emit('pubReply', {value, index: this.clickItem})
				this.isPub = false
				this.placeholder = '发表一条友善的评论'
				this.clickIndex = null
			},
			
			like() {
				this.$emit('like')
			},
			
			likeItem(index) {
				this.$emit('likeItem', index)
			},
			
			blur() {
				this.isPub = false
				setTimeout(() =>{
					if(!this.isPub) {
						this.placeholder = '发表一条友善的评论'
						this.clickIndex = null
					}
				})
			}
		}
		
	}
</script>

<style scoped>
	.popup {
		height: calc(100vh - 150px);
		background-color: #fff;
	}

	.scroll {
		height: calc(100% - 60px);
	}
	
	/* 隐藏滚动条 */
	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		background-color: transparent;
	}
	
	.comment {
		border-bottom: 10px #f5f5f5 solid;
		margin-bottom: 10px;
		padding: 10px;
	}
	
	.item {
		padding: 10px;
	}
</style>
