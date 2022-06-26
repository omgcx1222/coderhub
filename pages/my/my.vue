<template>
	<view>
		<uni-nav-bar statusBar="true" :border="false" leftWidth="100px" :background-color="navColor">
			<view slot="left" class="nav-bar">{{title}}</view>
		</uni-nav-bar>
		<scroll-view class="content" 
			scroll-y 
			@scroll="contentScroll"
			refresher-background="#f7f7f5"
			refresher-enabled
			:refresher-threshold="80"
			@refresherrefresh="xialashuaxin" 
			:refresher-triggered="isXialashuaxin"
		>
			<UserHeader @nickName="nickName"></UserHeader>
			<UserPublish :isScroll="isScroll" ref="userPub"></UserPublish>
		</scroll-view>
	</view>
</template>

<script>
	import UserHeader from '@/components/my/UserHeader.vue'
	import UserPublish from '@/components/my/UserPublish.vue'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			UserHeader,
			UserPublish
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				title: 'coderhub',
				navColor: 'rgba(247, 247, 245, 1)',
				nickNameTop: 0,
				isScroll: false,
				isXialashuaxin: false,
			}
		},
		methods: {
			// 接收子组件传过来的高度
			nickName(data) {
				this.nickNameTop = data.top - 44
			},
			// 上下滑动改变导航文字
			contentScroll(event) {
				const top = event.detail.scrollTop
				if(top <= 44) {
					// 1  10  22  30  44   x/44
					// 1      0.5     0
					this.navColor = `rgba(247, 247, 245, ${1 - top / 44})`
					
				}else if(top > 44 && top < this.nickNameTop){
					this.title = "coderhub"
					this.isScroll = false
				}else {
					this.navColor = `rgba(247, 247, 245, 0)`
					this.title = this.userInfo.nickname || "未登录"
					this.isScroll = true
				}
			},
			
			async xialashuaxin() {
				this.isXialashuaxin = true
				this.$refs.userPub.tabData[0].page = 0
				this.$refs.userPub.tabData[0].list = []
				this.$refs.userPub.tabData[1].page = 0
				this.$refs.userPub.tabData[1].list = []
				await this.$refs.userPub.getMoment(this.$refs.userPub.tabData[0].page)
				
				await this.$refs.userPub.getComment(this.$refs.userPub.tabData[1].page)
				this.isXialashuaxin = false
			}
		}
	}
</script>

<style scoped>
	.nav-bar {
		font-size: 20px;
		font-weight: 600;
	}
	.content {
		height: calc(100vh - 44px - 50px);
	}
</style>
