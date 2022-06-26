<template>
	<view class="add-image">
		<Card :imgList="imagePath" :isPreview="true" @addImage="addImage"></Card>
	</view>
</template>

<script>
	import Card from '@/components/common/Card.vue'
	export default {
		name: 'AddImage',
		components: {
			Card
		},
		data() {
			return {
				imagePath: [],
			}
		},
		methods: {
			addImage() {
				uni.chooseImage({
					success: (file) => {
						if(this.imagePath.length + file.tempFilePaths.length > 9) {
							return uni.showToast({title: '最多选择9张图片', icon: 'error'})
						}
						this.imagePath.push(...file.tempFilePaths)
						
						this.$emit('selectImg', this.imagePath)
					}
				})
			}
		}
	}
</script>

<style scoped>
	
</style>
