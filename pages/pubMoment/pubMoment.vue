<template>
	<view class="pub-moment">
		<uni-nav-bar
			statusBar="true" 
			:border="false" 
			leftIcon="left" 
			@clickLeft="back()"
		>
			<!-- #ifndef MP-WEIXIN -->
				<view slot="right" @click="pub">
					<text class="nav-right">发表</text>
				</view>
			<!-- #endif -->
		</uni-nav-bar>
		
		<view class="content">
			<!-- #ifdef MP-WEIXIN -->
			<view class="pub" @click="pub">
				<text class="nav-right">发表</text>
			</view>
			<!-- #endif -->
			
			<!-- 文本输入 -->
			<view class="text">
				<textarea class="text-input" placeholder="输入正文" v-model="content" :maxlength="1000" />
			</view>
			
			<AddImage @selectImg="selectImg"></AddImage>
			
			<SelectLabel :labels="labels" @selectIndex="selectIndex"></SelectLabel>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	import { request, uploadImg } from '@/network/request.js'
	
	import AddImage from '@/components/pubMoment/AddImage.vue'
	import SelectLabel from '@/components/pubMoment/SelectLabel.vue'
	
	export default {
		name: "pubMoment",
		components: {
			AddImage,
			SelectLabel
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				content: '',  // 文本输入的内容
				labels: [],
				labelIndex: null,
				imgListPath: [],
				progress: 0,  // 上传进度
			}
		},
		
		onReady() {
			this.getLabel()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			
			// 请求label
			async getLabel() {
				const res = await request({url: '/label'})
				if(res.statusCode != 200) return uni.showToast({title: res.data, icon: "error"})
				this.labels = res.data
			},
			
			// 选择label的索引
			selectIndex(i) {
				this.labelIndex = i
			},
			
			// 选择的图片信息数组
			selectImg(list) {
				this.imgListPath = list
			},
			
			// 发表动态
			async pub() {
				if(this.content == '' || this.labelIndex == null) {
					return uni.showToast({
						title: '内容和标签不能为空',
						icon: 'none'
					})
				}
				
				const moment = await request({
					url: '/moment',
					method: 'POST',
					data: {
						content: this.content,
						label: this.labels[this.labelIndex].id
					}
				}, true)
				
				if(moment.statusCode != 200) return uni.showToast({title: moment.data, icon: "error"})
				
				this.upload(moment.data.id, 0)
			},
			
			async upload(id, i) {
				// 上传进度
				uni.showLoading({
					title: `上传图片中 ${parseInt(i / this.imgListPath.length * 100)}%`,
					mask: true
				})
				
				const res = await uploadImg({
					url: `/upload/${id}/picture`,
					imgPath: this.imgListPath[i],
					name: 'picture',
					token: this.userInfo.token
				})
				
				if(i < this.imgListPath.length - 1) {
					this.upload(id, ++i)
				}else {
					uni.hideLoading()
					uni.showToast({title: '发表成功'})
					setTimeout(() =>{
						this.back()
					}, 600)
				}
			}
		}
	}
</script>

<style scoped>
	.nav-right {
		font-weight: 500;
		/* border: 1px solid #8a8a8a; */
		background-color: #000;
		color: #fff;
		border-radius: 4px;
		font-size: 14px;
		padding: 5px 15px;
	}
	
	.pub {
		height: 50px;
		float: right;
		margin-left: 10px;
	}
	
	.content {
		padding: 15px;
	}
	
	.text {
		height: 150px;
		overflow: hidden;
		margin-bottom: 15px;
	}
	
	.text-input {
		width: 100%;
		height: 100%;
	}
	
	

</style>
