<template>
	<view class="chat">
		<uni-nav-bar :border="false" statusBar fixed>
			<view slot="default" class="nav-bar">{{title}}</view>
		</uni-nav-bar>
		
		<view class="chat-record" v-if="userInfo.id">
			<scroll-view class="scroll-view" scroll-y :scroll-top="scrollTop" @scroll="scroll" scroll-with-animation="true">
				<ChatList v-for="(item, i) in recordList" :key="i" 
					:direction="item.user.nickname==userInfo.nickname? 'right':'left'" 
					:title="item.user.nickname" 
					:img="item.user.avatarUrl" 
					:message="item.content"
					:time="time(i)"
				>
				</ChatList>
			</scroll-view>
			<KeyInput @focus="focus" @blur="blur" @pub="pub" :bottom="bottom" ref="input"></KeyInput>
		</view>
		<view v-else>
			登录后即可体验即时聊天功能
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { connectSocket } from '@/network/request.js'
	
	import ChatList from '@/components/chat/ChatList.vue'
	import KeyInput from '@/components/detail/KeyInput.vue'
	
	export default {
		data() {
			return {
				chatData: null,
				recordList: [],
				onLine: 0,
				bottom: 50,
				scrollTop: 0,
			}
		},
		components: {
			ChatList,
			KeyInput
		},
		onShow() {
			// 创建连接
			connectSocket()
		},
		onLoad() {
			// 监听连接打开
			uni.onSocketOpen((res) =>{
				this.$nextTick(() =>{
					this.sendMsg({userInfo: this.userInfo})
				})
			});
			// 监听接收信息
			uni.onSocketMessage((msg) =>{
				const res = JSON.parse(msg.data)
				this.onLine = res.onLineCount
				if(Array.isArray(res.data)) {
					this.recordList = res.data
					setTimeout(() =>{
						this.scrollTop += 999999;
					})
				}else if(res.data.content){
					this.recordList.push(res.data)
					if(res.data.user.id === this.userInfo.id) {
						setTimeout(() =>{
							this.scrollTop += 500;
						})
					}
				}
			})
		},
		onUnload() {
			// 关闭连接
			uni.closeSocket()
		},
		computed: {
			...mapGetters(['userInfo']),
			title() {
				return `聊天(${this.onLine}人在线)`
			},
		},
		methods: {
			sendMsg(data) {
				uni.sendSocketMessage({
					data: JSON.stringify(data),
					fail: (err) =>{
						uni.showToast({
							title: err,
							icon: "error"
						})
					},
					success: () => {
						this.$refs.input.inputValue = ''
					}
				})
			},
			time(i) {
				const currentT = new Date(this.recordList[i].createTime.replace('Z', '')).getTime()
				const preT = new Date(this.recordList[i-1]?.createTime?.replace('Z', '') || 0).getTime()
				if(currentT - preT <= 120000) { // 2分钟内
					return ''
				}else {
					return this.$timeHandle(currentT)
				}
			},
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
			},
			focus() {
				this.bottom = 0
				uni.hideTabBar()
			},
			blur() {
				setTimeout(() =>{
					this.bottom = 50
					uni.showTabBar()
				})
			},
			pub(val) {
				this.sendMsg({userInfo: this.userInfo, message: val})
			}
		},
		
		watch: {
			userInfo(n) {
				if(n.id) {
					this.sendMsg({userInfo: this.userInfo})
				}else {
					// 关闭连接
					uni.closeSocket()
				}
			}
		}
	}
</script>

<style scoped>
	.nav-bar {
		font-size: 20px;
		font-weight: 600;
		margin: 0 auto;
		line-height: 44px;
	}
	
	.chat {
		background-color: #f5f5f7;
	}
	.chat-record {
		height: calc(100vh - 44px - 50px);
	}
	.scroll-view {
		height: calc(100% - 60px);
	}
</style>
