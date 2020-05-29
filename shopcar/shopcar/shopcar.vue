<template>
	<view class="shopcar-all">
		<view class="shopcar-header">
			<view class="header-center">
				<view class="title">购物车</view>
				<img src="/static/images/dingwei_03.jpg" alt="">
			</view>
			<view class="guanli">
				<text v-if="isManage === false" @click="manage()">管理</text>
				<text v-else @click="manage()">确定</text>
			</view>
		</view>
		<view class="shopcar-content">
			<view class="shopcar-content-all">
				<view class="shopcar-box" v-for="(item,index) in car" :key="index">
					<view class="center">
						<view class="left-img">
							<img src="/static/images/son_0018_right2.png" alt=""  v-if="item.isCheck===false" @click="isCheckT(item,index)">
							<img src="/static/images/son_0019_right1.png" alt=""  v-else @click="notCheck(index)">
						</view>
						
						<view class="img-box">
							<view class="real-box">
								<img :src="item.shop_goods.image_thumb" alt="">
							</view>
							<view class="left-price">
								<text>￥{{item.shop_goods.actual_price}}</text>
							</view>
						</view>
						<view class="all-info">
							<view class="head-title">
								<text>
									{{item.shop_goods_common.goods_title}}
								</text>
							</view>
							<view class="center-info" v-for="items in item.shop_goods.species_value" :key="items.id">
								<text>产品规格:{{items}}</text>
							</view>
							<!-- <view class="left-price">
								<text>￥{{item.shop_goods.actual_price}}</text>
							</view> -->
							<view class="right-number">
								<view class="left" :class="[isManage === true || item.number === 1 ? 'manage' : '']" @click="reduce(item)">
									-
								</view>
								<view class="number">
									{{item.number}}
								</view>
								<view class="right" :class="[isManage === true ? 'manage' : '']" @click="add(item)">
									+
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shopcar-like">
			<view class="middle-info">
				<view class="middle-info-left"></view>
				<view class="middle-info-center">
					<view class="middle-info-center-img">
						<img src="/static/images/xin_03.png" alt="">
					</view>
					<view class="middle-info-center-text">
						猜你喜欢
					</view>
				</view>
				<view class="middle-info-right"></view>
			</view>
		</view>
		<view class="classify-gods">
			<view class="classify-gods-box">
				<view class="godsItem" v-for="(item,index) in youlike" :key="index"  @click="gotoBuy(item)">
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
		<view class="bottom-info">
			<view class="left-button">
				<view class="button" @click="checkAll()">
					<img src="/static/images/son_0018_right2.png" alt="" v-if="allCheck === false">
					<img src="/static/images/son_0019_right1.png" alt="" v-else>
				</view>
				<view class="allCheck">
					全选
				</view>
			</view>
			<view class="all-money">
				合计:
				<text>￥{{choosePrice}}</text>
			</view>
			<view class="button-right" @click="AllGods">
				<text v-if="isManage === false">结算({{chooseNum}})</text>
				<text v-else>删除({{chooseNum}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				car:[
					
				],
				ceshi:[],
				car1:[{number:1,isCheck:false},{number:2,isCheck:false}],
				money:1100,
				allCheck:false,
				isManage:false,
				youlike:[],
				group:[],
				group_id:null,
			}
		},
		onLoad() {
			this.getUserShopCar()
		},
		onShow() {
			this.getUserShopCar()
			this.getGodsList()
			this.allCheck = false
			this.isManage = false
			var page = getCurrentPages().pop();
		    if (page == undefined || page == null) return;
		    page.onLoad();
		},
		computed:{
			//已选总数
			chooseNum(index) {
				var num_choose = 0
				this.car.forEach(item => {
					if (item.isCheck === true) {
						num_choose += item.number
					}
				})
				return num_choose
			},
			//已选总价
			choosePrice(index) {
				var price_choose = 0
				this.car.forEach(item => {
					if (item.isCheck === true) {
						price_choose += item.number * item.shop_goods.actual_price
					}
				})
				return price_choose
			},
			chooseID() {
				var ID_choose = []
				this.car.forEach(item => {
					if (item.isCheck === true) {
						// ID_choose = item.id
						ID_choose.push(item.id)
					}
				})
				return ID_choose
			}
		},
		methods: {
			async getGodsList(){
				this.group = []
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsGroupList",{
					function_use:3,
					mode:1
				})
				if(res.data.code === 200){
					let arr = []
					arr = res.data.data.data
					for(const v in arr){
						this.group.push(arr[v].id)
					}
					this.group_id = this.group[Math.floor(Math.random() * this.group.length)] 
				}
				this.getShopGoodsCommonList()
			},
			async getShopGoodsCommonList(){
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList",{
					group_id:this.group_id,
					sort:'-created_at'
				})
				if(res.data.code === 200){
					this.youlike = res.data.data.data
				}
			},
			async getUserShopCar() {//列表
				let [err, res] = await this.$http.post("/api/cart/getUserCartItemsList")
				if (res.data.code === 200) {
					this.car = res.data.data
					this.car = this.car.filter(item => {
						if(item.shop_goods === null){
							return false
						}
						return true
					})
					for (const v in this.car) {
						this.$set(this.car[v], "isCheck", false)
					}
					uni.stopPullDownRefresh();
				}
			},
			async deleteGods(item){
				if (uni.getStorageSync('token')) {
					let [err, res] = await this.$http.post("/api/cart/deleteGoodsFromCartMassively", {
						shop_cart_items_ids: this.chooseID
					})
					if (res.data.code === 200) {
						this.getUserShopCar()
						this.allCheck = false
					} 
				} 
			},
			async pay() {
				if (this.chooseNum === 0) {
					uni.showToast({
						title: '请您挑选您的商品',
						duration: 1000,
						icon:'none'
					})
					return
				}
				if (uni.getStorageSync('token')) {
					let [err, res] = await this.$http.post("/api/orders/updatePreparedOrders", {
						shop_orders_source: 2,
						shop_cart_items_ids: this.chooseID
					})
					if (res.data.code === 200) {
						this.chooseId = this.chooseID
						let timer = setTimeout(() => {
							uni.showToast({
								title: '正在跳转结算页面',
								duration: 1000,
								icon:'none'
							})
							clearTimeout(timer)
							let timer2 = setTimeout(() => {
								uni.navigateTo({
									url: "/settle-accounts/settle-accounts/settle-accounts"
								})
								clearTimeout(timer2)
							}, 1000)
						}, 0);
					} else {
						
					}
				} else {
					let timer = setTimeout(() => {
						uni.showToast({
							title: "请登录",
							duration: 1000,
							icon:'none'
						})
						clearTimeout(timer)
						let timer2 = setTimeout(() => {
							uni.redirectTo({
								url: "/login/login/login"
							})
						}, 1000)
					}, 0)
				}
			},
			AllGods(){
				if(this.isManage === false){
					this.pay()
				}else{
					this.deleteGods()
				}
			},
			isCheckT(item,index){
				this.car[index].isCheck = true
				let number = 0
				for(let i in this.car){
					if(this.car[i].isCheck === true){
						number++
						if(this.car.length === 0){
							this.allCheck = false
						}
						if(number === this.car.length){
							this.allCheck = true
						}
					}
				}
			},
			notCheck(index){
				this.car[index].isCheck = false
				this.allCheck = false
			},
			add(item){
				item.number++
			},
			reduce(item){
				if(item.number === 1) return 
				item.number--
			},
			checkAll(){
				if(this.allCheck === false){
					for(let i in this.car){
						this.car[i].isCheck = true
						this.allCheck = true
					}
				}else{
					for(let i in this.car){
						this.car[i].isCheck = false
						this.allCheck = false
					}
				}
			},
			manage(){
				this.isManage = !this.isManage
			},
			gotoBuy(item){
				uni.navigateTo({
					url:"/buy/buy/buy?" + 'product_id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopcar-all{
		width:100%;
		height:100vh;
		background:#f3f3f3;
		.shopcar-header{
			width:100%;
			height:115upx;
			display:flex;
			justify-content: center;
			align-items: center;
			position:relative;
			.header-center{
				width:158upx;
				height:35upx;
				display:flex;
				.title{
					font-size:35upx;
					line-height:35upx;
					vertical-align: text-top;
					margin-right:20upx;
				}
				img{
					width:28upx;
					height:35upx;
				}
			}
			.guanli{
				position:absolute;
				right:26upx;
				bottom:40upx;
				font-size:26upx;
			}
		}
		.shopcar-content{
			width:100%;
			.shopcar-content-all{
				margin:0 20upx;
				border-radius: 20upx 20upx 20upx 20upx;
				.shopcar-box{
					height:280upx;
					background: #FFFFFF;
					border-radius: 20upx 20upx 20upx 20upx;
					overflow: hidden;
					margin-bottom: 30upx;
					.center{
						margin-top:26upx;
						height:196upx;
						display: flex;
						.left-img{
							width:32upx;
							height:32upx;
							margin-top:88upx;
							margin-left:26upx;
							img{
								width:100%;
								height:100%;
							}
						}
						.img-box{
							width:216upx;
							height:196upx;
							.left-price{
								margin-top:10upx;
								margin-left:220upx;
								font-size:22upx;
								color:#ff1800;
							}
							.real-box{
								width:188upx;
								height:188upx;
								margin-left:22upx;
								img{
									width:100%;
									height:100%;
								}
							}
						}
						.all-info{
							width:405upx;
							height:196upx;
							position: relative;
							.head-title{
								width:405upx;
								height:46upx;
								text{
									font-size:26upx;
									line-height:46upx;
									vertical-align: text-bottom;
								}
							}
							.center-info{
								width:216upx;
								height:32upx;
								border-radius: 10upx 10upx 10upx 10upx;
								margin-top:10upx;
								background:#eeeeee;
								display:flex;
								justify-content: center;
								align-items: center;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
								word-break: break-all;
								text{
									white-space: nowrap;
									text-overflow: ellipsis;
									overflow: hidden;
									word-break: break-all;
									font-size:20upx;
									color:#bdbdbd;
								}
							}
							.right-number{
								width:138upx;
								height:40upx;
								background: #fafafa;
								position: absolute;
								bottom:0;
								right:30upx;
								display: flex;
								.left{
									width:46upx;
									height:40upx;
									border: 1px solid #c5c5c5;
									display: flex;
									justify-content: center;
									align-items:center;
									&.manage{
										background: #b9b9b9;
										cursor: not-allowed;
										pointer-events: none;
									}
								}
								.number{
									width:46upx;
									height:40upx;
									border-top: 1px solid #c5c5c5;
									border-bottom: 1px solid #c5c5c5;
									display: flex;
									justify-content: center;
									align-items:center;
									font-size:18upx;
								}
								.right{
									width:46upx;
									height:40upx;
									border: 1px solid #c5c5c5;
									display: flex;
									justify-content: center;
									align-items:center;
									&.manage{
										background: #b9b9b9;
										cursor: not-allowed;
										pointer-events: none;
									}
								}
							}
						}
					}
				}
			}
		}
		.shopcar-like{
			width:100%;
			height:114upx;
			background:#f3f3f3;
			display: flex;
			align-items: center;
			.middle-info{
				margin:0 auto;
				width:348upx;
				height:27upx;
				display: flex;
				justify-content: space-between;
				.middle-info-left{
					height:13upx;
					width:47upx;
					border-bottom: 1px solid #d7d7d7;
				}
				.middle-info-center{
					width:140upx;
					height:27upx;
					display:flex;
					justify-content: space-between;
					.middle-info-center-img{
						margin-top:-13upx;
						width:26upx;
						height:26upx;
						img{
							width:100%;
							height:100%
						}
					}
					.middle-info-center-text{
						font-size:27upx;
						line-height:27upx;
					}
				}
				.middle-info-right{
					height:13upx;
					width:47upx;
					border-bottom: 1px solid #d7d7d7;
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
				padding-bottom: 210upx;
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
								}
							}
						}
					}
				}
			}
		}
		.bottom-info{
			width:100%;
			height:101upx;
			border:1px solid #e7ecf1;
			background: #FFFFFF;
			position:fixed;
			bottom:1upx;
			display: flex;
			align-items: center;
			.left-button{
				width:108upx;
				height:36upx;
				margin-left:27upx;
				display: flex;
				align-items: center;
				.button{
					width:36upx;
					height:36upx;
					margin-top:-10upx;
					img{
						width:100%;
						height:100%;
					}
				}
				.allCheck{
					margin-left:16upx;
					font-size:27upx;
					line-height: 36upx;
					height:36upx;
					color:#747474;
				}
			}
			.all-money{
				margin-left:180upx;
				width:190upx;
				height:36upx;
				font-size:27upx;
				line-height:36upx;
				color:#747474;
				text{
					color:#ff1800
				}
			}
			.button-right{
				width:200upx;
				height:78upx;
				background:#ff1800;
				border-radius: 35upx 35upx 35upx 35upx;
				margin-left:24upx;
				display:flex;
				align-items: center;
				justify-content: center;
				text{
					color:#FFFFFF;
					font-size:30upx;
				}
			}
		}
	}
</style>
