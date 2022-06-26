<template>
	<view class="">
		<uni-nav-bar statusBar="true" :border="false" left-icon="left" @clickLeft="back()"></uni-nav-bar>
		
		<scroll-view :style="{'height': bodyHeight + 'px'}" 
			scroll-y 
			refresher-enabled
			:refresher-threshold="80"
			@refresherrefresh="xialashuaxin" 
			:refresher-triggered="isXialashuaxin"
			lower-threshold="100"
			@scrolltolower="shanglajiazai"
		>
			<Moment :moment="moment" @toolbar="toolbar"></Moment>
			<CommentList :commentList="commentList" @clickContent="clickContent" @clickReply="clickReply" @like="like"></CommentList>
		</scroll-view>
		
		<KeyInput :placeholder="placeholder" @pub="pub" ref="input" @blur="blur"></KeyInput>
		
		<Popup ref="popup" 
			:comment="commentList[clickCommentIndex]" 
			:replyList="replyList"
			@pubReply="pubReply"
			@like="popupLike"
			@likeItem="likeItem"
		>
		</Popup>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	import { request } from '@/network/request.js'
	
	import Moment from '@/components/detail/Moment.vue'
	import CommentList from '@/components/detail/CommentList.vue'
	import KeyInput from '@/components/detail/KeyInput.vue'
	import Popup from '@/components/detail/Popup.vue'
	
	export default {
		name: 'MomentDetail',
		components: {
			Moment,
			CommentList,
			KeyInput,
			Popup
		},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		data() {
			return {
				moment: {},
				commentList: [],
				bodyHeight: 0,
				placeholder: '发表一条友善的评论',
				clickCommentIndex: null,
				replyList: [],
				isXialashuaxin: false,
				page: 0,
				isPub: false
			}
		},
		onLoad: function (option) {
			this.getMomentDetail(option.id)
			this.getComment(option.id)
			
			const res = uni.getSystemInfoSync()
			this.bodyHeight = res.windowHeight - res.statusBarHeight - 44 - 60
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			
			// 请求动态详情
			async getMomentDetail(id) {
				const res = await request({
					url: `/moment/${id}`
				})
				
				this.moment = res.data
				if(res.statusCode != 200) return uni.showToast({title: res.data, icon: "error"})
				if(!res.data.momentId) return uni.showToast({title: "动态已被删除！", icon: "error"})
				this.moment = res.data
			},
			
			// 请求评论
			async getComment(id) {
				const offset = this.page * 10
				const limit = (this.page + 1) * 10
				const res = await request({
					url: '/comment',
					data: {
						momentId: id,
						order: 0,
						offset,
						limit,
						userId: this.userInfo.id || ''
					}
				})
				if(res.statusCode != 200) return uni.showToast({title: "评论获取失败╰(*°▽°*)╯", icon: "error"})
				
				this.page += 1
				this.commentList.push(...res.data)
			},
			
			// 请求回复
			async getReplyList(id) {
				const res = await request({
					url: '/comment',
					data: {
						commentId: id,
						userId: this.userInfo.id || ''
					}
					
				})
				if(res.statusCode != 200) return uni.showToast({title: "回复获取失败╰(*°▽°*)╯", icon: "error"})

				this.replyList = res.data
			},
			
			// 点击评论
			clickContent(index) {
				this.clickCommentIndex = index
				this.placeholder = `回复 ${this.commentList[index].user.nickname}：`
				this.$refs.input.isFocus = true
				this.isPub = true
			},
			
			// 点击相关回复
			clickReply(index) {
				this.$refs.popup.popupOpen()
				this.clickCommentIndex = index
				this.getReplyList(this.commentList[this.clickCommentIndex].id)
			},
			
			// 二级发表的重复代码
			async pubReplyRequest(comment, value) {
				const res = await request({
					url: `/comment/${this.commentList[this.clickCommentIndex].id}`,
					method: 'POST',
					data: {
						"content": `回复 ${comment.user.nickname}：${value}`,
						"momentId": this.moment.momentId
					}
				}, true)
				if(res.statusCode != 200) return uni.showToast({title: res.data, icon: "none"})
				
				// KeyInput
				uni.$emit('pubSuccess')
				this.commentList[this.clickCommentIndex].child_count += 1
				
				const newComment = await request({
					url: '/comment',
					data: {
						id: this.userInfo.id,
						offset: 0,
						limit: 1
					}
				})
				this.replyList.unshift(newComment.data[0])
				
				uni.showToast({title: res.data, icon: "none"})
			},
			
			// 点击发表
			async pub(value) {
				this.isPub = true
				if(value == " ") return uni.showToast({title: "评论不能为空", icon: "error"})
				if(this.clickCommentIndex == null) {  // 对动态发表评论
					const res = await request({
						url: '/comment',
						method: 'POST',
						data: {
							"content": value,
							"momentId": this.moment.momentId
						}
					}, true)
					
					if(res.statusCode != 200) return uni.showToast({title: res.data, icon: "none"})
					// KeyInput
					uni.$emit('pubSuccess')
					
					const newComment = await request({
						url: '/comment',
						data: {
							id: this.userInfo.id,
							offset: 0,
							limit: 1
						}
					})
					this.commentList.unshift(newComment.data[0])
					uni.showToast({
						title: res.data,
						icon: "none"
					})
				}else {  // 对动态的评论发表回复
					await this.pubReplyRequest(this.commentList[this.clickCommentIndex], value)
				}
				this.isPub = false
				this.placeholder = '发表一条友善的评论'
				this.clickCommentIndex = null
			},
			
			// popup内点击发表
			pubReply({value, index}) {
				if(index == null) {
					this.pubReplyRequest(this.commentList[this.clickCommentIndex], value)
				}else {
					this.pubReplyRequest(this.replyList[index], value)
				}
			},
			
			// 点赞的重复代码
			async likeCode(index, commentOrReplyList) {
				const res = await request({
					url: `/comment/${this[commentOrReplyList][index].id}/like`,
					method: 'POST'
				}, true)
				
				if(res.statusCode != 200) return uni.showToast({title: res.data, icon: "none"})
				
				this[commentOrReplyList][index].isAgree = !this[commentOrReplyList][index].isAgree
				res.data === '点赞成功' ? ++this[commentOrReplyList][index].agree : --this[commentOrReplyList][index].agree
				uni.showToast({
					title: res.data,
					icon: "none"
				})
				
			},
			
			// 评论点赞
			like(index) {
				this.likeCode(index, 'commentList')
			},
			
			// popup内给评论点赞
			popupLike() {
				this.likeCode(this.clickCommentIndex, 'commentList')
			},
			
			// popup内给回复点赞
			likeItem(index) {
				this.likeCode(index, 'replyList')
			},
			
			// 下拉刷新
			async xialashuaxin() {
				this.isXialashuaxin = true
				
				await this.getMomentDetail(this.moment.momentId)

				if(this.moment.momentId) {
					this.page = 0
					this.commentList = []
					await this.getComment(this.moment.momentId)
					uni.showToast({title: '刷新成功', icon: 'none'})
				}else {
					uni.showToast({title: "动态已被删除！", icon: "error"})
				}
				
				this.isXialashuaxin = false
			},
			
			// 上拉加载
			shanglajiazai() {
				this.getComment(this.moment.momentId)
			},
			
			// 失去焦点
			blur() {
				this.isPub = false
				setTimeout(() =>{
					if(!this.isPub) {
						this.placeholder = '发表一条友善的评论'
						this.clickCommentIndex = null
					}
				})
			},
			
			// 工具栏（三个点）
			toolbar(id) {
				uni.showActionSheet({
					itemList: ['删除'],
					success: async (i) => {
						const res = await request({
							url: `/moment/${id}`,
							method: 'DELETE'
						}, true)
						
						if(res.statusCode != 200) return uni.showToast({title: res.data, icon: "none"})
						
						uni.showToast({
							title: '删除成功'
						})
					}
				})
			},
		}
	}
</script>

<style scoped>
</style>
