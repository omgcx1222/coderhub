<template>
	<view class="">
		<view class="goods">
			<view class="img">
				<image :src="goods.img[0]" mode=""></image>
			</view>
			<view class="text">
				<text class="title">{{goods.title}}</text>
				<text class="detail">{{goods.detail}}</text>
				<view class="num">
					<text class="price">￥{{goods.price}}/个</text>
					
					<u-number-box :value="goods.count" min="0" @change="valChange" :showMinus="!!goods.count">
						<view slot="minus" class="minus">
							<u-icon name="minus" size="8" color="#000"></u-icon>
						</view>
						<text slot="input" class="input" v-show="!!goods.count">{{goods.count}}</text>
						<view slot="plus" class="plus">
							<u-icon name="plus" size="8" color="#000"></u-icon>
					 </view>
					</u-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MenuListItem',
		props: ['goods', 'index'],
		methods: {
			valChange(e) {
				this.$emit('changeList', {goods: this.goods, index: this.index, value: e.value})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.goods {
		display: flex;
		margin: 40rpx 20rpx;
	
		.img {
			width: 150rpx;
			height: 150rpx;
			margin-right: 10px;
	
			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 5px;
			}
		}
	
		.text {
			flex-grow: 1;
			position: relative;
	
			.title {
				width: 400rpx;
				font-size: 28rpx;
				font-weight: 600;
				white-space: nowrap;
				overflow: hidden;
				display: block;
				text-overflow: ellipsis;
	
			}
	
			.detail {
				font-size: 24rpx;
				padding-right: 10px;
				color: #8a8a8a;
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				/* 对齐方式，横向对齐 */
				-webkit-line-clamp: 2;
				/* 盒子溢出行数 */
			}
	
			.num {
				width: 100%;
				display: flex;
				justify-content: space-between;
				position: absolute;
				bottom: 0;
			}
	
			.price {
				font-size: 13px;
				color: #ff557f;
			}
		}
	}
	
	.minus, .plus {
		width: 40rpx;
		height: 40rpx;
		border: 1px solid #ffd144;
		border-radius: 50%;
		@include flex;
		justify-content: center;
		align-items: center;
	}
	
	.input {
		padding: 0 10px;
	}
	
	.plus {
		background-color: #ffd144;
		margin-right: 10px;
	}
</style>
