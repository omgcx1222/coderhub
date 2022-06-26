<template>
	<view class="tab">
		<view class="tab-title">
			<view class="title-item" :class="{'tab-active': current == index}" 
				v-for="(item, index) in tabData" 
				:key="item.name" 
				@click="clickTab(index)"
			>
				{{item.name}}
			</view>
			<view class="bottom-line" :style="{'left': distance + 'px'}"></view>
		</view>

		<swiper class="tab-content" :duration="100" :current="current" @transition="transition" @change="change" @animationfinish="animationfinish">
			<swiper-item class="content-item"
				v-for="(item, index) in tabData"
				:key="index"
			>
				<view :class="{'scroll': isScroll}">
					<view class="moment">
						<view class="item" v-for="(i, idx) in item.list" :key="idx">
							<image class="img" v-if="i.images" :src="i.images[0]" mode=""></image>
							<view class="content">
								<view class="title">{{i.content}}</view>
								<view class="time">{{$timeHandle(i.createTime)}}</view>
							</view>
						</view>
					</view>
				</view>

			</swiper-item>
		</swiper>

	</view>
	
</template>

<script>
	export default {
		name: 'Tab',
		props: {
			tabData: {
				type: Array,
				default() {
					return []
				}
			},
			isScroll: {
				type: Boolean,
				default: false
			}
			// current: {
			// 	type: Number,
			// 	default: 0
			// }
		},
		data() {
			return {
				current: 0,
				distance: 0,
				left: 0,
				
				preDistance: 0,
				nextDistance: 0,
				contentWidth: 0,
				
				click: false,
			}
		},
		mounted() {
			this.setDistance()
			uni.createSelectorQuery().in(this).selectAll(".content-item").boundingClientRect(data =>{
				this.contentWidth = data[0].width
			}).exec()
		},
		methods: {
			setDistance() {
				uni.createSelectorQuery().in(this).selectAll(".title-item").boundingClientRect(data =>{
					this.distance = data[this.current].left + (data[this.current].width - 30) / 2
					this.left = data[this.current].left + (data[this.current].width - 30) / 2
					
					this.preDistance = data[this.current - 1] && this.left - data[this.current - 1].left + (data[this.current - 1].width - 30) / 2
					this.nextDistance = data[this.current + 1] && data[this.current + 1].left + (data[this.current + 1].width - 30) / 2 - this.left
				}).exec()
			},
			
			clickTab(index) {
				this.click = true
				this.current = index
				this.setDistance()
			},
			
			transition(event) {
				if(this.click) return;
				if(event.detail.dx > 0) {
					this.distance = event.detail.dx / this.contentWidth * this.nextDistance + this.left
					// console.log(this.distance)
				}else {
					this.distance = event.detail.dx / this.contentWidth * this.preDistance + this.left
				}
			},
			
			change(event) {
				this.current = event.detail.current
			},
			
			animationfinish() {
				this.setDistance()
				this.left = this.distance
				this.click = false
			}
		}
	}
</script>

<style scoped>
	.tab {
		width: 100%;
		height: calc(100vh - 44px - 50px);
		background-color: #fff;
	}
	.tab-title {
		position: relative;
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 18px;
		white-space: nowrap;
		overflow: scroll;
	}
	
	/* 隐藏滚动条 */
	.tab-title::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	
	.title-item {
		display: inline-block;
		/* padding: 5px 0 8px 0; */
		margin-left: 30px;
		color: #8a8a8a;
	}
	
	/* .title-item:first-child {
		margin-left: 0;
	} */
	
	.tab-active {
		color: #000000;
		font-weight: 600;
	}
	
	.bottom-line {
		position: absolute;
		left: 0;
		bottom: 5px;
		width: 30px;
		height: 3px;
		border-radius: 20px;
		background-color: #000000;
		transition: left .1s;
	}
	
	.tab-content {
		width: 100%;
		height: calc(100% - 60px);
		/* background-color: red; */
	}
	
	.content-item {
		/* overflow: scroll; */
	}
	
	.scroll {
		overflow: scroll;
		height: 100%;
	}
	
	.moment {
		/* height: 100%; */
		padding: 0 10px;
	}
	
	.item {
		width: 100%;
		height: 80px;
		overflow: hidden;
		display: flex;
		align-items: center;
		
	}
	.img {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		/* display: inline-block; */
		margin-right: 10px;
	}
	.content {
		/* width: calc(100% - 50px - 20px); */
		flex: 1;
		height: 50px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.content .title {
		/* width: 100%; */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.time {
		font-size: 12px;
		color: #8a8a8a;
	}
</style>
