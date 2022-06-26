<template>
	<view class="header">
		<view class="user-info">
			<view class="info">
				<image class="avatar" :src="avatarPath || userInfo.avatarUrl || '../../static/user.png'" mode="" @click="selectAvatar"></image>
				<text class="nickname">{{userInfo.nickname || '未登录'}}</text>
			</view>
			<view class="menu">
				<view class="login" v-if="!userInfo.token" @click="login">去登录></view>
				<view class="setInfo" v-else @click="loginOut">退出登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	import { uploadImg } from '@/network/request.js'
	
	export default {
		name: 'UserHeader',
		data() {
			return {
				avatarPath: '', // 更换的头像本地地址
			}
		},
		mounted() {
			uni.createSelectorQuery().in(this).select(".nickname").boundingClientRect(data =>{
				// nickname距离顶部导航栏的距离
				this.$emit('nickName', data)
			}).exec()
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			// 跳转到登录页面
			login() {
				uni.navigateTo({
				  url: '/pages/login/login'
				});
			},
			
			// 点击退出登录
			loginOut() {
				this.$store.dispatch('loginOut')
				this.avatarPath = ''
			},
			
			// 选择头像
			selectAvatar() {
				uni.showActionSheet({
					itemList: ['更换头像'],
					success: (file) => {
						if(file.tapIndex == 0) {
							uni.chooseImage({
								count: 1,
								success: async (file) => {
									uni.showLoading({
										title: '正在上传头像',
										mask: true
									})
									const res = await uploadImg({
										url: '/upload/avatar',
										imgPath: file.tempFilePaths[0],
										name: 'avatar',
										token: this.userInfo.token
									}).catch(err =>{
										return uni.showModal({
											title: "上传出错！",
											content: "请不要上传奇奇怪怪格式的图片，例如gif",
											showCancel: false
										})
									})
									
									uni.hideLoading()
									if(res.statusCode != 200) return uni.showToast({title: res.data, icon: 'error'})
									uni.showToast({title: "更换头像成功"})
									
									this.$store.dispatch('setUserInfo', res.data)
									this.avatarPath = file.tempFilePaths[0]
								}
							})
						}
					}
				})
				
			}
		}
	}
</script>

<style scoped>
	.header {
		background-color: #fff;
	}
	
	.header::before {
		content: "";
		display: block;
		height: 100px;
		background-color: #f7f7f5;
	}
	
	.user-info {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		transform: translateY(-35%);
		font-size: 18px;
		font-weight: 600;
	}
	
	.info {
		display: flex;
		flex-direction: column;
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	
	.nickname {
		text-align: center;
		margin-top: 10px;
	}
	
	.menu {
		align-self: center;
	}
	
	.login {
		padding: 5px;
	}
	
	.setInfo {
		font-weight: 500;
		border: 1px solid #8a8a8a;
		border-radius: 8px;
		font-size: 14px;
		padding: 3px 6px;
	}
</style>
