<template>
	<view class="moment" v-if="Object.keys(moment).length">
		<AvatarHeader :imgSrc="moment.author.avatarUrl" :nickname="moment.author.nickname">
			<template>
				<uni-icons size="28" type="more-filled" @click="toolbar(moment.momentId)"></uni-icons>
			</template>
		</AvatarHeader>
		
		<view class="label">
			<uni-tag :text="moment.label.name" type="primary" inverted size="small"></uni-tag>
		</view>
		
		<Card :title="moment.content" :imgList="moment.images || []"></Card>
		
		<view class="time">
			<text>{{$timeHandle(moment.updateTime)}}</text>
		</view>
	</view>
</template>

<script>
	import AvatarHeader from '@/components/common/AvatarHeader.vue'
	import Card from '@/components/common/Card.vue'
	
	export default {
		name: "Moment",
		props: ['moment'],
		components: {
			AvatarHeader,
			Card
		},
		methods: {
			toolbar(id) {
				this.$emit('toolbar', id)
			}
		}
	}
</script>

<style scoped>
	.moment {
		padding: 10px 10px 0;
		border-bottom: 10px solid #f5f5f5;
	}
	
	.moment .label {
		height: 50px;
		line-height: 50px;
	}
	
	.guanzhu {
		border: 1px solid #8a8a8a;
		border-radius: 3px;
		padding: 2px 3px;
		font-size: 13px;
	}
	
	.time, .toolbar {
		color: #8a8a8a;
	}
	
	.time {
		font-size: 12px;
		padding: 10px 0;
	}
</style>
