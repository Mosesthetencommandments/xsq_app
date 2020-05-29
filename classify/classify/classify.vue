<template>
	<view class="classify-all">
		<view class="classify-search">
			<view class="classify-search-input" @click="gotoSearch">
				<img src="../../static/images/fenlei_03.png" alt="">
				<input type="text" placeholder="搜索店内宝贝">
			</view>
			<view class="classify-search-chat">
				<img src="../../static/images/chat_03.png" alt="">
			</view>
		</view>
	<!-- 	<view class="classify-check">
			<view class='classify-check-title'>
				<view class="classify-check-item" v-for="(item,index) in checkIndex" :key="index" @click="clickItem(item,index)">
					<view>{{item.group_name}}</view>
					<view class="active-title" v-if="activeIndex === index"></view>
				</view>
			</view>
		</view> -->
		<view>
			<scroll-view class="classify-check" scroll-x="true" scroll-left="0">
				<view class='classify-check-title'>
					<view class="classify-check-item" v-for="(item,index) in checkIndex" :key="index" @click="clickItem(item,index)">
						<view>{{item.group_name}}</view>
						<view class="active-title" v-if="activeIndex === index"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="classify-center">
			<view class="classify-banner loading">
				<view class="swiperbox">
					<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
						<swiper class="swiper-box" @change="change">
							<swiper-item v-for="(item ,index) in banners" :key="index">
								<view class="swiper-item">
									<!-- <image :src="item.img_url" mode=""></image> -->
									<img :src="item" alt="">
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>
			</view>
			<view class="classify-center-check">
				<view class="classify-center-check-item" v-for="(item,index) in checkTitle" :key="index" @click="clickTitle(index)">
					<view class="box" :class="[titleIndex === index && titleIndex !== 2 ? 'active' : '']">{{item.title}}
						<view class="box-img" v-if="index === 2">
							<img src="../../static/images/top_07.png" alt="" v-if="topPrice === false" @click="sortPriceT">
							<img src="../../static/images/top_06.png" alt="" v-else>
							<img src="../../static/images/bottom_03.jpg" alt="" v-if="bottomPrice === false" @click="sortPriceF">
							<img src="../../static/images/bottom_02.png" alt="" v-else>
						</view>
						<view class="box-img1" v-if="index === 3">
							<img src="../../static/images/shaixuan_03.png" alt="">
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="classify-gods">
			<view class="classify-gods-box">
				<view class="godsItem" v-for="(item,index) in gods" @click="gotoBuy(item)" :key="index">
					<view class="topImg">
						<img :src="item.main_images_default" alt="">
					</view>
					<view class="bottom-word">
						<view class="word">
							{{item.goods_title}}
						</view>
						<view class="price">
							<view class="price-left">￥{{item.price}}</view>
							<view class="price-right">
								<text>{{item.sold_count}}人已购</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "../../components/uni-swiper-dot/uni-swiper-dot.vue"
	export default{
		components: {
			uniSwiperDot,
		},
		
		onShow() {
			this.getGodsList()
		},
		data(){
			return {
				activeIndex:0,
				activeId:null,
				sort:'-created_at',
				checkIndex:[
					
				],
				titleIndex:0,
				checkTitle:[
					{id:0,title:"新品"},
					{id:1,title:"销量"},
					{id:2,title:"价格"},
					// {id:3,title:"筛选"},
				],
				gods:[
					
				],
				info: [
				
				],
				current: 0,
				mode: 'round',
				banners:[],
				topPrice:false,
				bottomPrice:false,
			}
		},
		methods:{
			async getGodsList(){
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsGroupList",{
					function_use:3,
					mode:1
				})
				if(res.data.code === 200){
					this.checkIndex = res.data.data.data
					this.activeId = this.checkIndex[0].id
					for(let i in this.checkIndex){
						if(this.checkIndex[i].id === this.activeId){
							this.banners = this.checkIndex[i].img
							this.info = this.checkIndex[i].img
						}
					}
				}
				this.getShopGoodsCommonList()
			},
			async getShopGoodsCommonList(){
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",{
					group_id:this.activeId,
					sort:this.sort
				})
				if(res.data.code === 200){
					this.gods = res.data.data.data
				}
			},
			gotoBuy(item){
				uni.navigateTo({
					url:"/buy/buy/buy?" + 'product_id=' + item.id
				})
			},
			clickItem(item,index){
				this.activeIndex = index 
				this.activeId = item.id
				for(let i in this.checkIndex){
					if(this.checkIndex[i].id === this.activeId){
						this.banners = this.checkIndex[i].img
						this.info = this.checkIndex[i].img
					}
				}
				this.getShopGoodsCommonList()
			},
			clickTitle(index){
				switch(index) {
					case 0:
						this.sort = '-created_at'
						this.topPrice = false
						this.bottomPrice = false
						this.getShopGoodsCommonList()
						this.titleIndex = index
						break
					case 1:					
						this.sort = '-sold_count'
						this.topPrice = false
						this.bottomPrice = false
						this.getShopGoodsCommonList()
						this.titleIndex = index
						break
					case 2:
						this.titleIndex = this.titleIndex
						break
					case 3:
						this.titleIndex = this.titleIndex
						break
					default:
						break
				}
			},
			sortPriceT(){
				this.sort = '+price'
				this.topPrice = true
				this.bottomPrice = false
				this.titleIndex = null
				this.getShopGoodsCommonList()
			},
			sortPriceF(){
				this.sort = '-price'
				this.topPrice = false
				this.bottomPrice = true
				this.titleIndex = null
				this.getShopGoodsCommonList()
			},
			gotoSearch(){
				uni.navigateTo({
					url:"/index-search/index-search/index-search"
				})
			},
			change(e) {
				this.current = e.detail.current;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.classify-all{
		width:100%;
		height:100vh;
		background:#f3f3f3;
		.classify-search{
			width:710upx;
			height:108upx;
			margin:0 auto;
			display:flex;
			align-items: center;
			.classify-search-input{
				width:630upx;
				height:58upx;
				background:#cbcbcb;
				border-radius: 40upx 40upx 40upx 40upx;
				display:flex;
				align-items: center;
				img{
					width:29upx;
					height:29upx;
					margin-left:26upx;
					margin-right:14upx;
				}
				input{
					height:58upx;
					font-size:26upx;
				}
			}
			.classify-search-chat{
				margin-top:-20upx;
				width:39upx;
				height:43upx;
				img{
					width:100%;
					height:100%;
					margin-left:30upx;
				}
			}
		}
		.classify-check{
			width:100%;
			height:88upx;
			background:#FFFFFF;
			border-bottom: 1px solid #f0f2f5;
			white-space: nowrap;
			.classify-check-title{
				height:88upx;
				margin: 0 45upx;
				display:flex;
				align-items: center;
				.classify-check-item{
					font-size:26upx;
					width:150upx;
					height:88upx;
					margin-right:76upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					position:relative;
					.active-title{
						width:64upx;
						height:4upx;
						background:#2c9894;
						position:absolute;
						bottom: 0;
					}
				}
				.classify-check-item:last-child{
					padding-right:45upx;
				}
			}
		}
		.classify-center{
			width:100%;
			height:386upx;
			background:#FFFFFF;
			overflow: hidden;
			.classify-banner{
				width:674upx;
				height:266upx;
				margin:0 auto;
				margin-top:34upx;
				border-radius: 20upx 20upx 20upx 20upx;
				.swiper{
					height: 266upx;
				}
				.swiper-item{
					width:100%;
					height:266upx;
					background: #007AFF;
					img{
						width:100%;
						height:100%;
					}
				}
				.loading{
					background: url(../../static/images/loading.gif) no-repeat;
					background-size: 140upx 140upx;
					background-position: 300upx;
				}
				.swiperbox{
					width:100%;
					height: 266upx;
				}
				.swiper-box{
					width:100%;
					height:266upx;
				}
			}
			.classify-center-check{
				width:674upx;
				height:86upx;
				margin:0 auto;
				display:flex;
				align-items: center;
				justify-content: space-around;
				.classify-center-check-item{
					font-size:28upx;
					.box{
						display: flex;
						&.active{
							color:#8ec8c6;
						}
						.box-img{
							display: flex;
							flex-direction: column;
							justify-content: center;
							img{
								width:17upx;
								height:8upx;
								margin-left:6upx;
							}
							img:nth-child(2){
								margin-top: 6upx;
							}
						}
						.box-img1{
							display: flex;
							flex-direction: column;
							justify-content: center;
							img{
								width:26upx;
								height:20upx;
								margin-left:11upx;
							}
						}
					}
				}
			}
		}
		.classify-gods{
			width:100%;
			min-height:904upx;
			height:100%;
			background:#f3f3f3;
			.classify-gods-box{
				padding: 0 38upx;
				display:flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-bottom:110upx;
				.godsItem{
					width:332upx;
					height:530upx;
					.topImg{
						width:332upx;
						margin-top:16upx;
						background:#e3e3e3;
						height:344upx;
						border-radius: 20upx 20upx 0 0;
						box-shadow: -1px 1px 1px #dddddd;
						img{
							width:100%;
							height:100%;
						}
					}
					.bottom-word{
						width:332upx;
						background:#ffffff;
						height:166upx;
						box-shadow: -1px 1px 1px #dddddd;
						overflow: hidden;
						.word{
							margin:0 14upx;
							margin-top:18upx;
							height:68upx;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							font-size:24upx;
							line-height: 34upx;;
						}
						.price{
							margin:0 14upx;
							margin-top:28upx;
							height:30;
							display: flex;
							justify-content: space-between;
							.price-left{
								font-size:30upx;
								color:#ff1800;
								font-weight: 600;
							}
							.price-right{
								width:140upx;
								height:30upx;
								margin-top:6upx;
								background:#ffd5d1;
								position:relative;
								border-radius: 20upx 20upx 20upx 20upx;
								display: flex;
								justify-content: center;
								align-items: center;
								text{
									color:#ff1800;
									font-size:20upx;
									font-weight: 600;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
