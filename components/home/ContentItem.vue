<template>
	<scroll-view 
		class="content"
		:style="{'height': height}"
		scroll-y 
		refresher-enabled 
		:refresher-triggered="shuaxin_status" 
		@refresherrefresh="xialashuaxin" 
		@scrolltolower="shanglajiazai"
		:refresher-threshold="80"
	>
		<view class="content-item" v-for="(content, index) in item.data[item.tab].list" :key="content.momentId">

			<AvatarHeader :imgSrc="content.author.avatarUrl" :nickname="content.author.nickname">
				<template>
					<text class="guanzhu">关注</text>
				</template>
			</AvatarHeader>
			
			<uni-card :cover="content.images ? content.images[0] : ''" @click="momentDetail(content.momentId)">
				<view class="text">{{content.content}}</view>
			</uni-card>
			
			<view class="toolbar">
				<view class="iconfont icon-31zhuanfa"></view>
				<view class="iconfont icon-pinglun" @click="momentDetail(content.momentId)">{{content.commentCount}}</view>
				<view class="iconfont" :class="[content.isAgree ? 'icon-dianzan_kuai' : 'icon-dianzan']" @click="like(index)">{{content.agree ? content.agree : ''}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	import { request } from '../../network/request.js'
	
	import AvatarHeader from '../common/AvatarHeader.vue'
	
	export default {
		name: 'ContentItem',
		components: {
			AvatarHeader
		},
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		computed: {
			...mapGetters([
				'current',
				'userInfo'
			])
		},
		data() {
			return {
				shuaxin_status: false,
				height: 0,
			}
		},
		created() {
			uni.getSystemInfo({
				success: (info) =>{
					this.height = info.screenHeight - (info.screenHeight - info.safeArea.bottom) - info.statusBarHeight - 44 - 40 - 40 - 50 + 'px'
				}
			})
		},
		methods: {
			// 点赞
			like(index) {
				this.$emit('like', index)
			},
			
			xialashuaxin() {
				this.shuaxin_status = true
				this.$emit('xialashuaxin', () =>{
					this.shuaxin_status = false
					uni.showToast({
						title: "刷新成功",
						icon: "none"
					})
				})
			},
			
			shanglajiazai() {
				this.$emit('shanglajiazai', () =>{
					uni.showToast({
						title: "没有新动态了ヾ(•ω•`)o",
						icon: "none"
					})
				})
			},
			
			// 动态详情
			momentDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/MomentDetail?id=${id}`
				})
			}
		},
		
		watch: {
			userInfo() {
				this.xialashuaxin()
			}
		}
	}
</script>

<style scoped>
	.content {
		/* height: calc(100vh - 44px - 40px - 50px); */
		overflow: scroll;
		background-color: #f5f5f7;
	}
	
	.content-item {
		padding: 10px 10px 0;
		background-color: #fff;
		margin-bottom: 5px;
	}
	
	.text {
		font-size: 15px;
		margin-bottom: 5px;
		padding-top: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: #000;
	}
	
	.toolbar {
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 30px;
		border-top: 2px #f5f5f7 solid;
	}
	.iconfont {
		line-height: 30px;
		text-align: center;
		width: 50px;
		
	}
	.guanzhu {
		border: 1px solid #8a8a8a;
		border-radius: 3px;
		padding: 2px 3px;
		font-size: 13px;
	}
</style>
