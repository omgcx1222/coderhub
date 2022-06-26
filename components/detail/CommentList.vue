<template>
	<view class="comment-container">
		<view class="header">
			<text class="text">全部评论（{{commentCount}}）</text>
		</view>
		
		<!-- 评论列表 -->
		<view class="comment">
			<view class="comment-list" v-for="(item, index) in commentList" :key="index" v-if="!item.commentId">
				<Reply 
					:showReply="item.child_count" 
					:item="item" :index="index" 
					@clickContent="clickContent" 
					@clickReply="clickReply"
					@like="like"
				>
				</Reply>
			</view>
		</view>
	</view>
</template>

<script>
	import Reply from '@/components/common/Reply.vue'
	
	export default {
		name: "CommentList",
		components: {
			Reply
		},
		props: ['commentList'],
		computed: {
			commentCount() {
				let count = this.commentList.length
				this.commentList.forEach(item =>{
					count += item.child_count
				})
				return count
			}
		},
		methods: {
			// 点击评论
			clickContent(index) {
				this.$emit('clickContent', index)
			},
			
			clickReply(index) {
				this.$emit('clickReply', index)
			},
			
			like(index) {
				this.$emit('like', index)
			}
		}
	}
</script>

<style scoped>
	.header {
		line-height: 40px;
		padding: 0 10px;
		font-size: 15px;
		font-weight: 600;
		border-bottom: 2px solid #f5f5f5;
	}
	
	.comment-list {
		margin: 10px 10px 0 10px;
		border-bottom: 2px solid #f5f5f5;
	}
</style>
