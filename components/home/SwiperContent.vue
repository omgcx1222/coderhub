<template>
	<swiper class="content-container" 
		:style="{'height': height}"
		duration="250" 
		:current="current" 
		@transition="transition" 
		@change="change" 
		@animationfinish="animationfinish"
	>
		<swiper-item v-for="(item, index) in moment" :key="index">
			
			<Tabs :momentItem="item" @clickTab="clickTab"></Tabs>

			<Content-Item :item="item" @xialashuaxin="xialashuaxin" @shanglajiazai="shanglajiazai" @like="like"></Content-Item>
			
		</swiper-item>
	</swiper>
</template>

<script>
	import { request } from '../../network/request.js'

	import Tabs from './Tabs.vue'
	import ContentItem from './ContentItem.vue'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'SwiperContent',
		components: {
			Tabs,
			ContentItem
		},
		props: {
			labels: {
				type: Array,
				default() {
					return []
				}
			}
		},
		computed: {
			...mapGetters([
				'current',
				'clickSlide',
				'userInfo'
			])
		},
		data() {
			return {
				moment: [],
				height: 0
			}
		},
		created() {
			uni.getSystemInfo({
				success: (info) =>{
					this.height = info.screenHeight - (info.screenHeight - info.safeArea.bottom) - info.statusBarHeight - 44 - 40 - 50 + 'px'
				}
			})
		},
		methods: {
			// 请求动态数据(哪个label的动态，是否需要判断该label的动态是否为空，该请求是否为刷新)
			async getMoment(moment, bool=false, is_shuaxin=false) {
				if(!moment) return; // 判断这个动态是否存在
				if(moment.data[moment.tab].list.isRequest) return; // 判断这个动态是否正在请求中
				if(bool && moment.data[moment.tab].list.length) return; // 判断这个动态的数据是否为空
				
				if(is_shuaxin) moment.data[moment.tab].page = 0
				const limit = (moment.data[moment.tab].page + 1) * 5
				const offset = moment.data[moment.tab].page  * 5
				
				moment.data[moment.tab].list.isRequest = true
				const res = await request({
					url: '/moment',
					data: {
						label: moment.label.id,
						order: moment.tab,
						offset,
						limit,
						userId: this.userInfo.id || ''
					}
				})
				
				if(res.data.length != 0) moment.data[moment.tab].page += 1
				is_shuaxin ? moment.data[moment.tab].list = res.data : moment.data[moment.tab].list.push(...res.data)
				moment.data[moment.tab].list.isRequest = false

				// console.log(this.moment)
			},
			
			// 点击tabs
			clickTab(arr) {
				this.moment[this.current].lineLeft = arr[1] + 'px'
				this.moment[this.current].tab = arr[0]
				
				// // 如果数据为空则获取数据
				this.getMoment(this.moment[this.current], true)
			},
			
			transition(event){
				if(this.clickSlide) return;
				if(event.detail.dx > 0) {  // 左滑
					this.getMoment(this.moment[this.current + 1], true)
				}else {  // 右滑
					this.getMoment(this.moment[this.current - 1], true)
				}
				this.$store.dispatch('animationfinish', true)
			},
			
			change(event) {
				this.$store.dispatch('change_current', event.detail.current)
				this.getMoment(this.moment[this.current], true)
			},
			
			animationfinish() {
				this.$store.dispatch('animationfinish', false)
			},
			
			async xialashuaxin(fn) {
				await this.getMoment(this.moment[this.current], false, true)
				fn()
			},
			
			async shanglajiazai(fn) {
				const moment = this.moment[this.current]
				const l = moment.data[moment.tab].list.length
				await this.getMoment(moment)
				if(l == moment.data[moment.tab].list.length) fn()
			},
			
			async like(index) {
				const moment = this.moment[this.current].data[this.moment[this.current].tab].list[index]
				const res = await request({
					url: `/moment/${moment.momentId}/like`,
					method: "POST"
				}, true)
				if(res.statusCode != 200) {
					uni.showToast({
						title: "请先登录",
						icon: "none"
					})
				}else {
					moment.isAgree = !moment.isAgree
					res.data === '点赞成功' ? ++moment.agree : --moment.agree
					uni.showToast({
						title: res.data,
						icon: "none"
					})
				}
			}
		},
		watch: {
			labels() {
				for(let l of this.labels) {
					const obj = {
						label: l,
						data: [
							{
								page: 0,
								list: [],
								isRequest: false // 是否正发送请求
							},
							{
								page: 0,
								list: [],
								isRequest: false
							}
						],
						tab: 0,
						lineLeft: '10px'
					}
					this.moment.push(obj)
				}
				this.getMoment(this.moment[0], 0)
			}
		}
	}
</script>

<style scoped>
	
	
	/* .content-container {
		height: calc(100vh - 40px - 50px);
	} */
	
	
	
</style>
