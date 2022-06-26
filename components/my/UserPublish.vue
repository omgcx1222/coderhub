<template>
	<view class="publish">
		<!-- tab -->
		<Tab class="tab" :tabData="tabData" :isScroll="isScroll"></Tab>
	</view>
</template>

<script>
	import { request } from '@/network/request.js'
	import { mapGetters } from 'vuex'
	
	import Tab from '@/components/my/Tab.vue'
	export default {
		name: 'UserPublish',
		components: {
			Tab
		},
		props: {
			isScroll: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		data() {
			return {
				abc: "aaaa",
				tabData: [
					{
						name: "发表的动态",
						page: 0,
						list: []
					},
					{
						name: "发表的评论",
						page: 0,
						list: []
					}
				]
			}
		},
		methods: {
			// 获取用户发表的动态
			async getMoment(page) {
				const offset = page * 10
				const limit = (page + 1) * 10
				const res = await request({
					url: '/moment',
					data: {
						userId: this.userInfo.id,
						offset,
						limit
					}
				})
				this.tabData[0].page += 1
				this.tabData[0].list.push(...res.data)
			},
			
			// 获取用户发表的评论
			async getComment(page) {
				const offset = page * 10
				const limit = (page + 1) * 10
				const res = await request({
					url: '/comment',
					data: {
						id: this.userInfo.id,
						offset,
						limit
					}
				})
				
				this.tabData[1].page += 1
				this.tabData[1].list.push(...res.data)
			}
		},
		mounted() {
			if(this.userInfo.id) {
				this.getMoment(this.tabData[0].page)
				
				this.getComment(this.tabData[1].page)
			}
		},
		watch: {
			userInfo(n, o) {
				this.tabData[0].page = 0
				this.tabData[0].list = []
				this.tabData[1].page = 0
				this.tabData[1].list = []
				this.getMoment(this.tabData[0].page)
				this.getComment(this.tabData[1].page)
			} 
		}
	}
</script>

<style scoped>
	
</style>
