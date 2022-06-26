<template>
	<view class="login">
		<uni-nav-bar statusBar="true" :border="false" leftIcon="left" @clickLeft="back()"></uni-nav-bar>
		
		<view class="header">
			<text class="title">coderhub</text>
			<text v-show="isLogin" @click="wangjimima">忘记密码？</text>
		</view>
		
		<form @submit="formSubmit">
			<view class="form">
				<view v-if="!isLogin">
					<input class="nickname" type="text" name="nickname" placeholder="昵称（1~10）" maxlength="10" />
					<text class="tips">{{nicknameTip}}</text>
				</view>
				
				
				<input type="text" name="username" placeholder="账号（4~16，英文或数字）" maxlength="20" />
				<text class="tips">{{usernameTip}}</text>
				
				<view class="password">
					<input type="text" name="password" :password="!showpwd" placeholder="密码(4~16,至少包含数字英文字符两种)" maxlength="30" />
					<text :class="{'showpwd': showpwd}" class="iconfont icon-yanjing" @click="showPwd"></text>
				</view>
				<text class="tips">{{passwordTip}}</text>
				
				<checkbox-group class="user-agreement" name="agree">
					<label>
						<checkbox/>
						<text class="read">已阅读并同意</text>
					</label>
					<text class="agreement" @click="readAgreement">《用户协议》</text>
				</checkbox-group>
				
				<button form-type="submit" v-show="isLogin">登 录</button>
				<button form-type="submit" v-show="!isLogin">注 册</button>
				
				<view class="isLogin">
					<text v-show="isLogin" @click="gozhuce">没有账号？去注册</text>
					<text v-show="!isLogin" @click="gozhuce">已有账号？去登录</text>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import { request, uploadImg } from '@/network/request.js'
	export default {
		name: 'login',
		data() {
			return {
				isLogin: true, // true为登录，false为注册
				nicknameTip: '',  // 校验提示
				usernameTip: '',
				passwordTip: '',
				showpwd: false  ,// 密码是否显示（小眼睛）
			}
		},
		methods: {
			// 表单提交
			async formSubmit(e) {
				const { nickname, username, password, agree } = e.detail.value
				
				if(agree.length === 0) {
					return uni.showToast({
						title: "未同意用户协议",
						icon: "error"
					})
				}
				
				// 登录
				if(this.isLogin) {
					if(!username) {
						this.usernameTip = "用户名为空"
					}else if(!password){
						this.passwordTip = "密码为空"
					}else {
						uni.showLoading({title: '登录中...'})
						const res = await request({
							url: '/login',
							method: 'POST',
							data: {
								"username": username,
								"password": password
							}
						})
						if(res.statusCode === 200) {
							uni.hideLoading()
							uni.showToast({title: '登录成功'})
							uni.setStorageSync('userInfo', res.data)
							
							// 保存用户登录的信息到vuex
							this.$store.dispatch('login', res.data)
							
							// 返回上一页
							this.back()
						}else {
							uni.showToast({
								title: "用户名或密码错误",
								icon: "error"
							})
						}
					}
				}else { // 注册
					this.usernameTip = ''
					this.passwordTip = ''
					this.nicknameTip = ''
					
					// 校验规则
					const usernameRule = /^[a-zA-Z0-9]{4,16}$/;
					const passwordRule = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{4,16}$/;
					if (nickname.length <= 0 || nickname.length > 10){
						this.nicknameTip = "昵称长度1-10"
						
					}else if (!usernameRule.test(username)) {
						this.usernameTip = "账号长度4-16，数字或字母组成"
						
					}else if (!passwordRule.test(password)) {
						this.passwordTip = "密码长度4-16，数字、英文、字符中的两种以上组成"
						
					}else {
						uni.showLoading({title: '注册中...'})
						const res = await request({
							url: '/user',
							method: 'POST',
							data: {
								nickname,
								username,
								password
							}
						})
						
						if(res.statusCode != 200) return uni.showToast({title: res.data, icon: 'error'})
						uni.hideLoading()
						uni.showToast({title: '注册成功！'})
					}
				}
			},
			showPwd() {
				this.showpwd = !this.showpwd
			},
			// 返回
			back() {
				uni.navigateBack()
			},
			
			// 查看用户协议
			readAgreement() {
				uni.navigateTo({
					url: '/pages/login/agreement'
				})
			},
			
			gozhuce() {
				this.isLogin = !this.isLogin
			},
			
			wangjimima() {
				uni.showModal({
					content: '忘记密码找作者，作者QQ：2389342251',
					showCancel: false,
					confirmColor: '#000'
				})
			}
		}
	}
</script>

<style scoped>
	.header {
		height: 250upx;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 10px 20px 0;
		font-weight: 600;
		color: #8a8a8a;
		position: relative;
	}

	.title {
		color: #000000;
		font-size: 40px;
	}

	.form {
		padding: 20px;
	}
	
	.form input{
		height: 36px;
		font-size: 18px;
		background-color: #ededed;
		padding: 5px 10px;
		border-radius: 5px;
	}
	
	.form button {
		background-color: #000000;
		color: #dfdfdf;
		font-weight: 600;
	}
	
	.tips {
		width: 100%;
		display: inline-block;
		margin-bottom: 10px;
		color: red;
		font-size: 13px;
	}
	
	.password {
		position: relative;
	}
	.password input {
		padding-right: 40px;
	}
	.password .iconfont {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 20px;
		color: #8A8A8A;
	}
	
	.password .showpwd {
		color: #000;
	}
	
	.user-agreement {
		margin: 0 0 20px;
	}
	
	.read {
		color: #8A8A8A;
	}
	
	.agreement {
		color: #000000;
		text-decoration: underline;
	}
	
	/* #ifdef H5 */
	/deep/ .uni-checkbox-input {
		border-color: #d1d1d1;
		color: #fff !important;
		background-color: #fff !important;
	}
	/deep/ .uni-checkbox-input:hover {
		border-color: #ff9e01 !important;
	}
	/deep/ .uni-checkbox-input-checked {
	  border-color: #ff9e01 !important;
	  background-color: #ff9e01 !important;
	}
	/* #endif */
	
	/* #ifdef MP-WEIXIN */
	/deep/ .wx-checkbox-input {
		border-color: #d1d1d1;
		color: #fff !important;
		background-color: #fff !important;
	}
	/deep/ .wx-checkbox-input:hover {
		border-color: #ff9e01 !important;
	}
	/deep/ .wx-checkbox-input-checked {
	  border-color: #ff9e01 !important;
	  background-color: #ff9e01 !important;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	/deep/ .app-checkbox-input {
		border-color: #d1d1d1;
		color: #fff !important;
		background-color: #fff !important;
	}
	/deep/ .app-checkbox-input:hover {
		border-color: #ff9e01 !important;
	}
	/deep/ .app-checkbox-input-checked {
	  border-color: #ff9e01 !important;
	  background-color: #ff9e01 !important;
	}
	/* #endif */

	.isLogin {
		text-align: center;
		margin: 30px auto;
	}
</style>
