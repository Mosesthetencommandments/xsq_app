<template>
	<view class="banner loading">
		<view class="swiperbox">
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			    <swiper class="swiper-box" @change="change">
			        <swiper-item v-for="(item ,index) in banners" :key="item.id" @click="gotoUrl(item)">
			            <view class="swiper-item">
							<img :src="item.img_url" alt="">
			            </view>
			        </swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "../uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		components:{
			uniSwiperDot
		},
		
		data() {
			return {
				info: [

				],
				current: 0,
				mode: 'round',
				banners:[],
				url:""
			}
		},
		computed: {
		 },
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			async getbanners(){
				let [err,res] = await this.$http.post("/api/shop/getShopBannerList");
				if(res.data.code === 200){
					this.banners = res.data.data
					this.info = res.data.data
				}
			},
			gotoUrl(item){
				console.log(item)
				let web = item.link
				let head = web.substring(web.indexOf("/") +7,web.lastIndexOf("/"))
				let body = web.substring(web.indexOf("/") +7)
				this.url = '/' + head + '/' + body
				uni.navigateTo({
					url:this.url
				})
			},
		},
		mounted(){
			this.getbanners()
		}	
	}
</script>
	
<style lang="scss" scoped>
	img{
		width:100%;
		height: 310upx;
	}
	.swiper{
		height: 310upx;
	}
	.swiper-item{
		width:100%;
		height: 400upx;
		background: #007AFF;
	}
	.swiperbox{
		width:100%;
		height: 310upx;
	}
	.swiper-box{
		width:100%;
		height:310upx;
	}
</style>
