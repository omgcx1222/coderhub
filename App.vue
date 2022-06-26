<script>
	import { request } from './network/request.js'
	
	export default {
		onLaunch: function() {
			// 判断用户是否登录
			request({
				url: '/token',
				method: 'POST'
			}, true).then(res =>{
				if(res.statusCode === 200) {
					// 更新用户信息
					uni.setStorageSync('userInfo', res.data)
					
					// 更新用户登录的信息到vuex
					this.$store.dispatch('login', res.data)
				}else {
					const userInfo = uni.getStorageSync('userInfo')
					if(userInfo) {
						uni.removeStorage({
							key: "userInfo"
						})
						uni.showToast({
							title: "登录已失效",
							icon: "error"
						})
					}
				}
			});
			
		},
		onShow: function() {
			// console.log(this.$store.state.shopCart)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	/* @import url('@/static/icon/iconfont.css'); */
	/* .isLick {
		color: #fb7299;
	} */
	

	@import url('@/static/icon/iconfont.css');

	
	/* #ifdef MP-WEIXIN */
	@font-face {
	  font-family: "iconfont"; /* Project id 3172164 */
	  src: url('//at.alicdn.com/t/font_3172164_pyfn6eqxmyp.woff2?t=1646661345477') format('woff2'),
	       url('//at.alicdn.com/t/font_3172164_pyfn6eqxmyp.woff?t=1646661345477') format('woff'),
	       url('//at.alicdn.com/t/font_3172164_pyfn6eqxmyp.ttf?t=1646661345477') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-fabu:before {
	  content: "\ec8d";
	}
	
	.icon-dianzan_kuai:before {
	  content: "\ec8c";
	}
	
	.icon-guanbi2fill:before {
	  content: "\e724";
	}
	
	.icon-yanjing:before {
	  content: "\e6e2";
	}
	
	.icon-31zhuanfa:before {
	  content: "\e600";
	}
	
	.icon-pinglun:before {
	  content: "\e891";
	}
	
	.icon-dianzan:before {
	  content: "\ec7f";
	}
	
	.icon-wode:before {
	  content: "\e6a2";
	}
	
	.icon-shouye:before {
	  content: "\e8c6";
	}
	
	.icon-IMliaotian:before {
	  content: "\e6ff";
	}
	
	.icon-setting:before {
	  content: "\e609";
	}
	
	.icon-sousuo:before {
	  content: "\e61e";
	}
	
	/* #endif */

	
	.icon-dianzan_kuai {
		color: #fb7299;
	}
</style>
