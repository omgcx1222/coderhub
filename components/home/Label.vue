<template>
	<view class="label">
		<view class="label-item" :class="{'label-active': current == index}"
			v-for="(item, index) in labels"
			:key="item.id"
			@click="clickLabel(index)"
		>
			{{item.name}}
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'Label',
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
				'current'
			])
		},
		methods: {
			// 点击labels
			clickLabel(index) {
				this.$store.dispatch('change_current', index)
				this.$store.dispatch('animationfinish', true)
			},
		}
	}
</script>

<style scoped>
	.label {
		white-space: nowrap;
		overflow: scroll;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-image: linear-gradient(to right, rgba(255,255,255,0) 95%,rgba(255,255,255,1) 100%);
	}
	
	.label-item {
		display: inline-block;
		background-color: #f5f5f7;
		border-radius: 12px;
		line-height: 30px;
		text-align: center;
		margin-right: 10px;
		padding: 0px 20px;
		mix-blend-mode: overlay;
	}
	
	.label-item:first-child{
		margin-left: 10px;
	}
	
	.label-active {
		background-color: #e6f7fe;
	}
	
	/* 隐藏滚动条 */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
