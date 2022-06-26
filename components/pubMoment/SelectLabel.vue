<template>
	<view class="select-label">
		<text class="label" @click="selectLabel">{{title}}</text>
	</view>
</template>

<script>
	
	export default {
		name: 'SelectLabel',
		props: ['labels'],
		data() {
			return {
				title: '# 选择标签'
			}
		},
		methods: {
			selectLabel() {
				let list = this.labels.map(item =>{
					return item.name
				})
				uni.showActionSheet({
					itemList: list,
					success: (i) =>{
						this.title = list[i.tapIndex]
						this.$emit('selectIndex', i.tapIndex)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.select-label {
		margin-top: 15px;
		/* padding: 10px 20px; */
		border-top: 1px solid #f5f5f5;
		height: 50px;
		line-height: 50px;
	}
	
	.label {
		border: 2px solid #000;
		padding: 5px 15px;
		border-radius: 18px;
		font-size: 13px;
		font-weight: 600;
	}
</style>
