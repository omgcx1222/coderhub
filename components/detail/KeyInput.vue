<template>
	<view class="key-input" :style="{'bottom': (bottom?bottom:inputBottom) + 'px'}">
		<view class="back" v-show="backShow" @click="pubBack"></view>
		<view class="form">
			<input type="text"
				v-model="inputValue" 
				:placeholder="placeholder" 
				:adjust-position="false"
				@keyboardheightchange="keyChange"
				:focus="isFocus"
				@focus="focus"
				@blur="blur"
				maxlength="300"
			/>
			<button @click="pub">发表</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "KeyInput",
		props: {
			placeholder: {
				type: String,
				default() {
					return '发表一条友善的评论'
				}
			},
			bottom: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				backShow: false,
				inputValue: '',
				inputBottom: 0,
				isFocus: false
			}
		},
		mounted() {
			// MomentDetail
			uni.$on('pubSuccess', this.clear)
		},
		methods: {
			pub() {
				this.$emit('pub', this.inputValue)
			},
			
			clear() {
				this.inputValue = ''
			},
			
			// 键盘高度发生变化
			keyChange(e) {
				this.inputBottom = e.detail.height
				// #ifndef H5
				if(e.detail.height == 0) {
					this.isFocus = false
					this.$emit('blur')
					this.inputBottom = 0
				}
				// #endif
			},
			
			// 聚焦
			focus(e) {
				this.$emit('focus')
				this.isFocus = true
			},
			
			// 失去焦点
			blur(e) {
				this.isFocus = false
				this.$emit('blur')
				this.inputBottom = 0
			},
		},
		beforeDestroy() {
			// MomentDetail
			uni.$off('pubSuccess', this.clear)
		}
	}
</script>

<style scoped>
	.key-input {
		width: 100%;
		/* height: 60px; */
		position: fixed;
		left: 0;
		z-index: 9;
	}
	.back {
		height: calc(100vh - 60px);
	}
	.form {
		/* height: 60px; */
		padding: 10px 20px;
		background-color: #fff;
		border-top: 2px solid #f5f5f5;
		display: flex;
	}

	.form input {
		background-color: #f0f3f8;
		padding: 0 10px;
		border-radius: 5px;
		flex: 1;
		height: 30px;
		box-sizing: border-box;
		margin-right: 10px;
	}
	.form button {
		width: 40px;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		padding: 0;
		border: none;
		background-color: transparent;
	}
</style>
