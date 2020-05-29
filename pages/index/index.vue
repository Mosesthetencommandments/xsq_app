<template>
	<view>
		<!-- 遮罩层11 -->
		<view class="mask" @click="isHave=false" v-if="isHave">
			<view class="newCoupon_box">
				<view class="newCoupon">
					<view class="newCoupon_title">
						<image src="../../static/images/APP-qie16_0001_13.png" mode=""></image>
						<view class="">
							恭喜您获得<text>{{fullReduction.length}}</text>张优惠券
						</view>
					</view>
					<view class="discountCoupon">
						<view class="discountCoupon_title">
							歆丝泉送您{{fullReduction.length}}张代金券，直接放入账户中 可在“我的优惠券”中查看
						</view>
						 <scroll-view  scroll-y="true" class="scroll-Y" >
						    <view class="" v-for="(item,index) in couponList" :key="index" >
						    	<!-- 满减 -->
						    	<view class="discountCoupon_content" v-if="item.coupon_type === 1">
						    		<view class="leftInfo">
						    			<view class="discountCoupon_content_money">
						    				<text>￥</text>{{item.offset_money}}
						    			</view>
						    			<view class="discountCoupon_content_fill">
						    				<view>优惠券</view>
						    				<view>满{{item.require_total_pay}}使用</view>
						    			</view>
						    		</view>
						    		<view class="discountCoupon_content_type">{{item.coupon_name}}</view>
						    	</view>
						    	<!-- 折扣 -->
						    	<view class="discountCoupon_content" v-else>
						    		<view class="leftInfo">
						    			<view class="discountCoupon_content_money">
						    				<text>折</text>{{item.offset_percent / 10}}
						    			</view>
						    			<view class="discountCoupon_content_fill">
						    				<view>优惠券</view>
						    				<view>满{{item.require_total_pay}}使用</view>
						    			</view>
						    		</view>
						    		<view class="discountCoupon_content_type">{{item.coupon_name}}</view>
						    	</view>
						    </view>         	
						 </scroll-view>
						<button class="d_draw" v-if="wx_isLogin" @click.stop="getAllCoupon">一键领取</button>
						<button class="d_draw" v-else type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoAction" @click="wodlowd('type1')" withCredentials="true">一键领取</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 首页消息 -->
		<view class="earnings-box" v-if="isshow" @tap.stop="conceal">
			<view class="earnings">
				<view class="triangle"></view>
				<view class="triangele-bottom" @tap.stop="skip()">
					<!-- 收益列表 -->
					<view class="earnings-item" v-for="(item,index) in getMoney" :key="index">
						<view class="item-img">
							<img src="../../static/images/APP-qie3_0001_qd.png" alt="">
						</view>
						<view class="item-title">
							<view class="title-time">{{time}}</view>
							<view class="title-money">收益 <text>{{item.profit}}</text>元</view>						
						</view>
						<view class="item-redBall">
							<view class="redBall"></view>
						</view>
					</view>
					<view class="more">
						更多消息 
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="header">
			<view class="header-search-left" @click="goto">
				<img src="../../static/images/0108_03.png" mode="">
				<view class="search">
					<p>红血丝修护</p>
				</view>
			</view>
			<view class="header-search-right" @click="earnings()">
				<img src="../../static/images/0109_03.png" alt="">
			</view>
		</view>
		<!-- 热门 -->
		<view class="hot">
			<view class="hot_content">
				<p class="">热门</p>
				<view class="" v-for="(item,index) in hotmen" :key="index" @click.stop="goSearch(item.goods_name)">
					{{item.goods_name}}
				</view>
			</view>
		</view>
		<!-- banner -->
		<view class="banner">
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
		<view style="height: 116upx;"></view>
		<!-- icons -->
		<view class="icons_box">
			<view class="icons_title">
				<view class="icons_title_item">
					<view class="headline">
						<image src="../../static/images/0104_03.png" mode=""></image>
					</view>
					<p>一对一服务</p>
				</view>
				<view class="icons_title_item" v-for="(item,index) in icons" :key="index">
					<view class="headline">
						{{item.url}}
					</view>
					<p>{{item.title}}</p>
				</view>
			</view>
			<view class="icons_center">
				<view class="icons_center_item" v-for="(item,index) in icons_items" :key="index">
					<image :src="item.icon" mode=""></image>
					<view class="">{{item.group_name}}</view>
				</view>
			</view>
		</view>
		<!-- 标题区 -->
		<view class="herder-area-box">
			<!-- 大块 -->
			<view class="agglomerate"></view>
			<!-- 福利 -->
			<view class="weal-box">
				<view class="weal-item1" v-if="wx_isLogin" @click="gointegral">
					<p>金币换礼</p>
					<p>金币换购不花钱</p>
					<view class="whtie">
					</view>
				</view>
				<button class="weal-item1" v-else type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoAction" withCredentials="true" @click="wodlowd('type2')">
					<p>登录</p>
					<p>金币换购不花钱</p>
					<view class="whtie">
					</view>
				</button>
				<view class="weal-item2">
					<p>粉丝福利</p> 
					<p>好货每天0元领</p>
					<view class="whtie">
					</view>
				</view>
				<view class="weal-item3">
					<p>新人特惠</p>
					<p>新人首单至半价</p>
					<view class="whtie">
					</view>
				</view>
			</view>
			<!-- 4快 -->
			<view class="Four-large-box">
				<view class="Four-large">
					<view class="Four-large-item1" v-for="(item,index) in classifyList" :key="index" @click="goProductlist(item.url)">
						<img :src="item.icon" alt="">
						<!-- <view class="Four-large-item-title">
							<view class="">
								<image src="../../static/images/05_03.png" mode=""></image>
							</view>
							<p>舒敏退红</p>
						</view>
						<view class="p1">从此告别红脸</view>
						<view class="p2">巩固肌肤 强韧肌底</view> -->
					</view>
<!-- 					<view class="Four-large-item2">
						<view class="Four-large-item-title">
							<view class="">
								<image src="../../static/images/05_03.png" mode=""></image>
							</view>
							<p>舒敏退红</p>
						</view>
						<view class="p1">从此告别红脸</view>
						<view class="p2">巩固肌肤 强韧肌底</view>
					</view>
					<view class="Four-large-item3">
						<view class="Four-large-item-title">
							<view class="">
								<image src="../../static/images/05_03.png" mode=""></image>
							</view>
							<p>舒敏退红</p>
						</view>
						<view class="p1">从此告别红脸</view>
						<view class="p2">巩固肌肤 强韧肌底</view>
					</view>
					<view class="Four-large-item4">
						<view class="Four-large-item-title">
							<view class="">
								<image src="../../static/images/05_03.png" mode=""></image>
							</view>
							<p>舒敏退红</p>
						</view>
						<view class="p1">从此告别红脸</view>
						<view class="p2">巩固肌肤 强韧肌底</view>
					</view> -->
				</view>
			</view>
		</view>
		<!-- 下方选项卡 -->
		<view class="stucky-father">
			<view class="tab-box">
				<!-- 选项卡 -->
				<view class="tabControl">
					<!-- 上方tabbar -->
					<view class="tabHeader" :class="sTop > 980 ? 'fixation' : ''">
						<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
							<view class="scroll-box">
								<view v-for="(scroll,index) in scrolls" :key="scroll.id" class="tabHeader-title" @tap="onClickItem(index,scroll)">
									<view class="big-title" :class="{'active':tabIndex===index}">{{scroll.group_name}}</view>
									<view class="small-title" :class="{'active':tabIndex===index}">
										<view class="smallbox"><text>{{scroll.remark}}</text></view>
									</view>
								</view>
							</view>

						</scroll-view>
					</view>
					<!-- 选项卡下方商品 -->
					<view class="tabCenter">
						<view class="view-box" :current="tabIndex" @change="tabChange">
							<view>
								<view class="tabCenter-item" style="display: flex;">
									<view class="bjt"  v-for="(item,index) in scrollsList" :key="index" @click="toDetail(item.id)">
										<view class="imgbox">
											<image :src="item.main_images_default" mode=""></image>
										</view>
										<view class="po-box">
											<view class="tabCenter-bigtitle_box">
												<view class="tabCenter-bigtitle">
													{{item.goods_name}}
												</view>

											</view>
											<view class="Number-money">
												<view class="money">
													￥{{item.price}}
												</view>
												<view class="number">
													{{item.sold_count}}人已购
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="isloading" v-if="this.scrollsList.length === 0" @click="ceshi">
							<img src="../../static/images/loading.gif" alt="">
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "../../components/uni-swiper-dot/uni-swiper-dot.vue"
	import config from '../../common/config.js'
	export default {
		components:{
			uniSwiperDot,
		},
		data() {
			return {
				info: [],
				current: 0,
				mode: 'round',
				banners:[],
				icons:[{'url':'官','title':'官方直售'},{'url':'邮','title':'满300包邮'},{'url':'售','title':'售后无忧'}],
				icons_items:[],
				scrolls:[],
				sTop: 0,
				tabIndex: 0,
				group_id:null,
				page: 1,
				getMore: true,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 
				scrollsList: [],
				d_status: null,
				hotmen:[],
				isshow:false,
				getMoney:[],
				time:null,
				classifyList:[],
				isHave: false,
				fullReduction:[],
				couponList:[],
				wx_isLogin:null,
				wx_url:'/coupon/coupon/coupon'
			}
		},
		onLoad(optaion) {
			this.getbanners()//banner
			this.getTitleData()
			this.hotList()//热门
			this.getIcons()//icons图标
			this.getShopCouponList()//优惠券列表
			// if (optaion.customer_id) {
			// 	uni.setStorageSync('customer_id', optaion.customer_id);
			// }
		},
		onShow(optaion) {
			//判断有没有登录   没有的话去登录页面
			const value = uni.getStorageSync('token');
			if (!value) {
				this.wx_isLogin = false
			}
			this.getbanners()//banner
			this.getTitleData()
			this.hotList()//热门
			this.getIcons()//icons图标
			this.getShopCouponList()//优惠券列表
			var page = getCurrentPages().pop();
			if (page == undefined || page == null) return;
			page.onLoad();
		},
		onPageScroll(res){
			this.sTop = res.scrollTop
		},
		methods: {
			wodlowd(item){
				if(item === 'type1'){
					this.wx_url = '/coupon/coupon/coupon'
				}else if(item === 'type2'){
					this.wx_url = '/integral-center/integral-center/integral-center'
				}
				console.log(item)
			},
			goProductlist(url){
				console.log(url)
			},
			gointegral(){
				uni.navigateTo({
					url:'/integral-center/integral-center/integral-center'
				})
			},
			async getShopCouponList(){//获取优惠券列表
				let [err,res] = await this.$http.post("/api/coupon/getShopCouponList",{
					only_new_customer:2//通用券
				});
				if(res.data.code !== 200){
					return
				}
				this.fullReduction = []
				let list = res.data.data
				this.fullReduction = list
				if(this.fullReduction.length >= 1){
					this.isHave = true
				}
				this.couponList = list
			},
			async getIcons(){//icons图标
				let [err,res] = await this.$http.post("/api/shop_goods/getShopGoodsGroupList")
				if(res.data.code === 200){
					let list = res.data.data[0]
					this.icons_items = list.slice(0,8)
					this.classifyList = list.slice(8)
					// console.log(this.classifyList)
				}
			},
			change(e) {
				this.current = e.detail.current;
			},
			goSearch(item){//热门
				uni.navigateTo({
					url:"/index-search/index-search/index-search?index_goods_name="+ item
				})
			},
			goto(){
				uni.navigateTo({
					url:"/index-search/index-search/index-search"
				})
			},
			toDetail(id){
				uni.navigateTo({
					url:"/buy/buy/buy?" + 'product_id=' + id
				})
			},
			conceal(){
				this.isshow=!this.isshow;
			},
			earnings(){
				if(!uni.getStorageSync('token')){
					
				}else{
					this.isshow=!this.isshow;
				}
			},
			skip(){
				uni.navigateTo({
				    url: '/earnings/earnings/earnings'
				});
			},
			async getbanners(){
				let [err,res] = await this.$http.post("/api/shop/getShopBannerList");
				if(res.data.code === 200){
					this.banners = res.data.data
					this.info = res.data.data
				}
			},
			onClickItem(index, scroll) {
				if (this.current !== index) {
					this.group_id = scroll.id
					this.tabIndex = index
					this.scrollsList = []
					this.getMore = true
					this.page = 1
					this.loadingType = 0
					this.current = index;
					if(this.sTop >= 980){
						uni.pageScrollTo({
						    scrollTop: 981,
						    duration: 0
						});
					}
					switch (index) {
						case 0:
							this.getshengxiandata()
							break;
						case 1:
							this.getshengxiandata()
							break;
						case 2:
							this.getshengxiandata()
							break;
						case 3:
							this.getshengxiandata()
							break;
						case 4:
							this.getshengxiandata()
							break;
						case 5:
							this.getshengxiandata()
							break;
						case 6:
							this.getshengxiandata()
							break;
						default:
							break
					}
				}
			},
			//获取首页标题信息
			async getTitleData() {
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsGroupList");
				if (res.data.code === 200) {
					this.scrolls = res.data.data[3]
					this.group_id = this.scrolls[0].id
					if (this.group_id !== null) {
						this.getshengxiandata()
					}
				}
			},
			async getshengxiandata() {
				if (this.loadingType !== 0) {
					uni.stopPullDownRefresh() //loadingType!=0;直接返回
					return false;
				}
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList", {
					group_id: this.group_id,
					page: this.page,
					page_size: 6,
				})
				if (res.data.code === 200) {
					if (res.data.data.current_page === res.data.data.last_page) {
						this.getMore = false
					}
					if (res.data.data.current_page > res.data.data.last_page) { //没有数据
						this.loadingType = 2;
						return;
					}
					let scrollbox = []
					scrollbox = res.data.data.data
					this.scrollsList = this.scrollsList.concat(scrollbox)
					for (let i = 0; i < this.scrollsList.length; i++) {
						for (let k = i + 1; k < this.scrollsList.length; k++) {
							if (this.scrollsList[i].id === this.scrollsList[k].id) {
								this.scrollsList.splice(k, 1)
							}
						}
					}
					this.isLoading = false
					this.page++; //得到数据之后page+1
					this.loadingType = 0
				}
				uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
			},
			async hotList(){//热门
				let [err, res] = await this.$http.post("/api/shop_goods/getShopGoodsCommonList", {page_size: 4});
				if(res.data.code === 200){
					this.hotmen = res.data.data.data
				}
			},
			//一键领取全部优惠券
			getAllCoupon(){
				uni.navigateTo({
					url:"/coupon/coupon/coupon"
				})
			},
			//登录
			getUserInfoAction(e) {
				console.log(e)
				if (e.detail.userInfo) {
					this.wx_login()
				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
						showCancel: false,
						confirmText: '返回授权',
						success: (res) => {
							// 用户没有授权成功，不需要改变 isHide 的值
			
							if (res.confirm) {
								// console.log('用户点击了“返回授权”');
							}
						}
					});
				}
			},
			wx_login() {
				var that = this;
				// 查看是否授权
				wx.getSetting({
					success: (res) => {
						if (res.authSetting['scope.userInfo']) {
							wx.getUserInfo({
								success: (res) => {
									// 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
									// 根据自己的需求有其他操作再补充
									// 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
									// console.log(res)
									let nickName = res.userInfo.nickName
									let avatarUrl = res.userInfo.avatarUrl
									let sex = parseInt(res.userInfo.gender)
									// console.log(typeof(sex))
									wx.login({
										success: res => {
											// 获取到用户的 code 之后：res.code
											// console.log("用户的code:" + res.code);
											let code = res.code
											// 可以传给后台，再经过解析获取用户的 openid
											// 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
											//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
											// uni.showToast({
											// 	title:code
											// })
											uni.request({
												url: config.webUrl + '/api/customer/getAppletOpenId',
												data: {
													code: code,
												},
												method: 'POST',
												header: {
													'shop': 7
												},
												success: (res) => {
													//openId、或SessionKdy存储//隐藏loading
													// console.log(res)
													let wx_open_id = res.data.data.data.openid
													let wx_union_id = res.data.data.data.unionid
													uni.setStorageSync('wx_open_id', res.data.data.data.openid);
													uni.setStorageSync('wx_union_id', res.data.data.data.unionid);
													wx.request({
														url: config.webUrl + '/api/customer/wxAppletLogin',
														data: {
															wx_applet_open_id: res.data.data.data.openid,
															wx_union_id: res.data.data.data.unionid
														},
														method: 'POST',
														header: {
															'shop': 7
														},
														success: (res) => {
															if (res.data.data.success_message == 'success') {
																uni.setStorageSync('token', res.data.data.token);
																if(this.url === '/pages/index/index' || this.url === '/mine/mine/mine'){
																	uni.switchTab({
																		url:this.wx_url
																	})
																}else{
																	uni.redirectTo({
																		url:this.wx_url
																	})
																}
															} else {
																uni.request({
																	url: config.webUrl + '/api/customer/wxAppletRegister',
																	data: {
																		wx_applet_open_id: wx_open_id,
																		wx_union_id: wx_union_id,
																		nickname: nickName,
																		headimgurl: avatarUrl,
																		sex: sex,
																		pid: this.wx_pid
																	},
																	method: 'POST',
																	header: {
																		'shop': 7
																	},
																	success: (res) => {
																		//openId、或SessionKdy存储//隐藏loading
																		if (res.data.data.success_message === "success") {
																			let token = res.data.data.token
																			uni.setStorageSync('token', res.data.data.token);
																			uni.request({
																				url: config.webUrl + '/api/customer/getCustomerInfo',
																				header: {
																					'Authorization': token,
																					'shop': 7
																				},
																				method: 'POST',
																				success: (res) => {
																					if (res.data.code === 200) {
																						let customerInfo = res.data.data
																						uni.setStorageSync('customerInfo', customerInfo);
																					}
																				}
																			})
																			if(this.url === '/pages/index/index' || this.url === '/mine/mine/mine'){
																				uni.switchTab({
																					url:this.wx_url
																				})
																			}else{
																				uni.redirectTo({
																					url:this.wx_url
																				})
																			}
																		}
																	}
																});
															}
														}
													});
												},
												fail(err) {
			
												}
											});
										}
									});
								}
							});
						} else {
							// 用户没有授权
							// 改变 isHide 的值，显示授权页面
			
							that.isHide = true
							// uni.showToast({
							// 	title:'1231321332132'
							// })
						}
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #f3f3f3;
		button::after {
			border: none;
		}
	}
	// 导航样式
	.header{
		// width:100%;
		height:96upx;
		background:#2c9793;
		padding:0 32upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.header-search-left{
			width:578upx;
			height:58upx;
			border-radius: 50upx;
			background-color: #71bbb8;
			padding: 0 26upx;
			display: flex;
			align-items: center;
			img{
				width:29upx;
				height: 29upx;
			}
			.search{
				font-size: 24upx;
				color: #fff;
				margin-left: 12upx;
			}
		}
		.header-search-right{
			height: 58upx;
			display: flex;
			align-items: center;
			img{
				width:38upx;
				height: 44upx;
			}
		}
	}
	//热门
	.hot{
		height: 70upx;
		background: #2c9793;
		padding: 0 20upx 0 34upx;
		overflow: hidden;
		.hot_content{
			margin-top: 6upx;
			width: 100%;
			height: 42upx;
			display: flex;
			align-items: center;
			font-size: 24upx;
			color: #fff;
			p{
				margin-right: 8upx;
			}
			view{
				width:150upx;
				height: 42upx;
				background: #72bdba;
				border-radius: 100upx;
				padding: 0 ;
				text-align: center;
				line-height: 42upx;
				margin-right: 11upx;
				overflow: hidden;
			}
		}
	}
	// banner
	.banner{
		width:100%;
		height: 274upx;
		background:#f3f3f3 ;
		position: relative;
		z-index: 1;
		// overflow: hidden;
	}
	.banner::after {
		position: absolute;
		left:0;
		right: 0;
		bottom: 0px;
		content: '';
		z-index: 1;
		height: 274upx;
		width:100%;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		background: #2c9793;
	}
	.swiperbox{
		position: absolute;
		top:0;
		left: 50%;
		margin-left: -354upx;
		width:94%;
		height: 364upx;
		z-index: 100;
		border-radius: 30upx;
		overflow: hidden;
		box-shadow: 0,0,20upx,#888888;
	}
	.swiper-box{
		width:100%;
		height:364upx;
		// z-index: 100;
		
	}
	.swiper{
		height: 364upx;
	}
	.swiper-item{
		width:100%;
		height: 364upx;
		background: #007AFF;
		img{
			width:100%;
			height: 100%;
		}
	}
	// icons
	.icons_box{
		height: 436upx;
		padding: 0 20upx;
		.icons_title{
			width:100%;
			height: 38upx;
			display: flex;
			align-items: center;
			font-size: 24upx;
			color: #888888;
			justify-content: space-between;
			.icons_title_item{
				height:38upx;
				display: flex;
				align-items: center;
				.headline{
					width:33upx;
					height: 33upx;
					border:1px solid #888888;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 12upx;
					image{
						width:20upx;
						height: 22upx;
					}
				}
			}
		}
		.icons_center{
			width:100%;
			height:398upx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap; 
			.icons_center_item{
				width:25%;
				height: 158upx;
				padding-top: 40upx;
				text-align: center;
				image{
					width: 98upx;
					height: 98upx;
					border-radius: 100%;
					overflow: hidden;
				}
				font-size: 24upx;
				color: #4c515d;
				line-height: 38upx;
			}
		}
	}
	//标题区
	.herder-area-box{
		padding: 0 20upx;
		.agglomerate{
			width:100%;
			height: 172upx;
			background-color: #9fe2df;
			border-radius: 80upx;
			margin-bottom: 32upx;
		}
		.weal-box{
			height: 290upx;
			// background: #2C405A;
			padding: 0 20upx;
			display: flex;
			justify-content: space-between;
			overflow: hidden;
			margin-bottom: 28upx;
			.weal-item1{
				width:196upx;
				height: 290upx;
				background: url(../../static/images/01_03.png) no-repeat;
				background-size: 100% 100%;
				padding: 0 10upx;
				p:nth-child(1){
					font-size: 28upx;
					color: #000000;
					margin-top: 20upx;
				}
				p:nth-child(2){
					width: 156upx;
					margin-top: 10upx;
					font-size: 20upx;
					color: #ffffff;
					height: 30upx;
					background: #34a29e;
					border-radius: 60upx;
					text-align: center;
					line-height: 30upx;
					margin-bottom: 10upx;
				}
				.whtie{
					height: 172upx;
					background: #fff;
					border-radius: 20upx;
				}
			}
			.weal-item2{
				width:196upx;
				height: 290upx;
				background: url(../../static/images/02_03.png) no-repeat;
				background-size: 100% 100%;
				padding: 0 10upx;
				p:nth-child(1){
					font-size: 28upx;
					color: #000000;
					margin-top: 20upx;
				}
				p:nth-child(2){
					width: 156upx;
					margin-top: 10upx;
					font-size: 20upx;
					color: #ffffff;
					height: 30upx;
					background: #34a29e;
					border-radius: 60upx;
					text-align: center;
					line-height: 30upx;
					margin-bottom: 10upx;
				}
				.whtie{
					height: 172upx;
					background: #fff;
					border-radius: 20upx;
				}
			}
			.weal-item3{
				width:196upx;
				height: 290upx;
				background: url(../../static/images/03_03.png) no-repeat;
				background-size: 100% 100%;
				padding: 0 10upx;
				p:nth-child(1){
					font-size: 28upx;
					color: #000000;
					margin-top: 20upx;
				}
				p:nth-child(2){
					width: 156upx;
					margin-top: 10upx;
					font-size: 20upx;
					color: #ffffff;
					height: 30upx;
					background: #34a29e;
					border-radius: 60upx;
					text-align: center;
					line-height: 30upx;
					margin-bottom: 10upx;
				}
				.whtie{
					height: 172upx;
					background: #fff;
					border-radius: 20upx;
				}
			}
		}
	}
	.Four-large-box{
		// background-color: #007AFF;
		height: 412upx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 32upx;
		.Four-large{
			height:400upx;
			// background: #4CD964;
			overflow: hidden;
			border-radius:30upx ;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			// padding: 0upx 32upx;
			.Four-large-item1{
				width:318upx;
				height: 190upx;
				// background-image: linear-gradient(to bottom right,#fef4f0, #f3a986);
				border-top-left-radius: 24upx;
				border-bottom-left-radius: 15upx;
				box-shadow: 0 0 16upx #cfcfcf;
				// padding: 0 10upx;
				img{
					width:100%;
					height: 100%;
				}
				.Four-large-item-title{
					height: 34upx;
					margin-top: 30upx;
					font-size: 28upx;
					color: #000000;
					font-weight: 600;
					line-height: 34upx;
					display: flex;
					align-items: center;
					view{
						width: 28upx;
						height: 28upx;
						background: #da8962;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 4upx;
						image{width:17upx;height: 24upx;}
					}
				}
				.p1{
					font-size: 20upx;
					color: #da8962;
					margin-top: 14upx;
				}
				.p2{
					width: 202upx;
					height: 28upx;
					background: #da8962;
					border-radius: 20upx;
					font-size: 16upx;
					color: #fff;
					text-align: center;
					line-height: 28upx;
					margin-top: 30upx;
				}
			}
			.Four-large-item2{
				width:318upx;
				height: 190upx;
				background-image: linear-gradient(to bottom right,#f3fbfa, #8ed6d3);
				border-top-right-radius: 24upx;
				border-bottom-right-radius: 15upx;
				box-shadow: 0 0 16upx #cfcfcf;
				padding: 0 10upx;
				.Four-large-item-title{
					height: 34upx;
					margin-top: 30upx;
					font-size: 28upx;
					color: #000000;
					font-weight: 600;
					line-height: 34upx;
					display: flex;
					align-items: center;
					view{
						width: 28upx;
						height: 28upx;
						background: #389a97;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 4upx;
						image{width:17upx;height: 24upx;}
					}
				}
				.p1{
					font-size: 20upx;
					color: #389a97;
					margin-top: 14upx;
				}
				.p2{
					width: 202upx;
					height: 28upx;
					background: #389a97;
					border-radius: 20upx;
					font-size: 16upx;
					color: #fff;
					text-align: center;
					line-height: 28upx;
					margin-top: 30upx;
				}
			}
			.Four-large-item3{
				width:318upx;
				height: 190upx;
				background-image: linear-gradient(to bottom right,#fcfcf0, #e1e674);
				border-top-left-radius:15upx;
				border-bottom-left-radius: 24upx;
				margin-top:8upx;
				box-shadow: 0 0 16upx #cfcfcf;
				padding: 0 10upx;
				.Four-large-item-title{
					height: 34upx;
					margin-top: 30upx;
					font-size: 28upx;
					color: #000000;
					font-weight: 600;
					line-height: 34upx;
					display: flex;
					align-items: center;
					view{
						width: 28upx;
						height: 28upx;
						background: #d5c559;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 4upx;
						image{width:17upx;height: 24upx;}
					}
				}
				.p1{
					font-size: 20upx;
					color: #d5c559;
					margin-top: 14upx;
				}
				.p2{
					width: 202upx;
					height: 28upx;
					background: #d5c559;
					border-radius: 20upx;
					font-size: 16upx;
					color: #fff;
					text-align: center;
					line-height: 28upx;
					margin-top: 30upx;
				}
			}
			.Four-large-item4{
				width:318upx;
				height: 190upx;
				background-image: linear-gradient(to bottom right,#f9fcf5, #dcf6b4);
				border-top-right-radius: 15upx;
				border-bottom-right-radius: 24upx;
				margin-top:8upx;
				box-shadow: 0 0 16upx #cfcfcf;
				padding: 0 10upx;
				.Four-large-item-title{
					height: 34upx;
					margin-top: 30upx;
					font-size: 28upx;
					color: #000000;
					font-weight: 600;
					line-height: 34upx;
					display: flex;
					align-items: center;
					view{
						width: 28upx;
						height: 28upx;
						background: #aed277;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 4upx;
						image{width:17upx;height: 24upx;}
					}
				}
				.p1{
					font-size: 20upx;
					color: #aed277;
					margin-top: 14upx;
				}
				.p2{
					width: 202upx;
					height: 28upx;
					background: #aed277;
					border-radius: 20upx;
					font-size: 16upx;
					color: #fff;
					text-align: center;
					line-height: 28upx;
					margin-top: 30upx;
				}
			}
		}
	}
// 选项卡
.stucky-father {
		position: relative;
	}

	.tab-box {
		position: sticky;
		top: 0;
	}

	.tabControl {
		width: 100%;
		height: 100%;
		// background: #555555;
		overflow: hidden;
		// padding: 0 28upx;

		margin-bottom: 50upx;

		.tabHeader:last-child {
			margin-right: 10upx;
		}

		.tabHeader {
			width: 100%;
			height: 152upx;
			background: #f7f7f7;
			&.fixation {
				position: fixed;
				top: 0px;
				width: 100%;
				z-index: 1;
			}
		}
	}
	.scroll-view_H {
		width: 90%;
		white-space: nowrap;
		padding:0 28upx;
	}
	
	.scroll-box {
		// padding: 0 20upx;
		display: flex;
		::-webkit-scrollbar {
			width: 0px;
		}
	
		::-webkit-scrollbar {
			display: none;
		}
	}
	.actives {
		position: fixed;
		top: 0upx;
		background: #f2f2f2;
	}
	.tabHeader-title {
		width: 120upx;
		height: 152upx;
		// background:#007AFF;
		margin-right: 20upx;
	
		.big-title {
			width: 120upx;
			height: 72upx;
			font-size: 36upx;
			font-weight: 400;
			color: #464545;
			text-align: center;
			line-height: 112upx;
	
			&.active {
				// color: #53aefc !important;
			}
		}
	
		.small-title {
			width: 120upx;
			height: 62upx;
			line-height: 62upx;
			font-size: 20upx;
			text-align: center;
			color: #a6adbc;
			
			&.active {
				color: #ffffff;
				text-align: center;
				font-size: 20upx;
				line-height: 36upx;
				display: flex;
	
				.smallbox {
					width: 120upx;
					height: 42upx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #ff1800;
					border-radius: 20upx;
					margin-top: 12upx;
				}
			}
		}
	}
	.tabHeader-title:last-child{
		margin-right:30upx;
	}
// 选项卡下方商品
// 下方样式
	.po-box {
		padding: 14upx;
	}
	.tabFill {
		width: 100%;
		height: 304upx;
	}

	.tabCenter {
		padding:38upx 38upx 84upx;
		height:100%;
		min-height: 583px;
		margin-bottom: 50upx;
		::-webkit-scrollbar {
			width: 0px;
		}
		::-webkit-scrollbar {
			display: none;
		}
	}

	.tabCenter-item {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 30px;
		box-shadow: 0 0 10 #dadada;
		::-webkit-scrollbar {
			width: 0px;
		}

		::-webkit-scrollbar {
			display: none;
		}

		.bjt {
			width: 332upx;
			height: 510upx;
			background: white;
			border-radius: 8upx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20upx;
			.imgbox {
				height: 346upx;
				image {
					width: 100%;
					height: 100%;
				}
			}

		}

		.tabCenter-bigtitle_box {
			font-size: 28upx;
			color: #464545;
			line-height: 40upx;
			width: 100%;
			.tabCenter-bigtitle {
				height: 80upx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				white-space: wrap;
				overflow: hidden;
			}

		}
		.Number-money{
			width:100%;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24upx;
			color: #ff1800;
			margin-top: 20upx;
			.money{
				font-weight: 600;
			}
			.number{
				height: 20upx;
				background-color: #ffd5d1;
				border-radius: 50upx;
				padding: 0 22upx;
				line-height: 20upx;
				text-align: center;
				font-size: 14upx;
			}
		}
	}
	// 首页消息样式
	.earnings-box{
		width:100vw;
		height: 100vh;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:500;
		top:0;
		.earnings{
			width:260upx;
			height:415upx;
			float: right;
			margin:80upx 20upx 0 0;	
			.triangle{
					width:0;
				    height:0;
					border-right:12upx solid transparent;
					border-left:12upx solid transparent;
					border-bottom:24upx solid #ffffff;
					margin-left:216upx;
					// border-top-left-radius: 10upx;
					// border-top-right-radius: 10upx;
			}
			.triangele-bottom{
				width:260upx;
				height: 404upx;
				background: #ffffff;
				border-radius: 8upx;
				padding:0 10upx;
				position:relative;
				.earnings-item{
					width:100%;
					height: 85upx;
					border-bottom: 4upx solid #e2e2e2;
					display: flex;
					
					.item-img{
						width:72upx;
						height: 85upx;
						padding:20upx 16upx;
						img{
							width:100%;
							height: 100%;
						}
					}
					.item-title{
						width:152upx;
						height: 85upx;
						padding-top:25upx;
						font-size:18upx;
						color:#666666;
						line-height: 24upx;
						text{
							color:#f49d17;
							margin:0 8upx;
						}
					}
					.item-redBall{
						width:16upx;
						height: 85upx;
						.redBall{
							margin-top:38upx;
							width:14upx;
							height: 14upx;
							background:#ff2626;
							border-radius: 100%;
						}
					}
					
				}
			}
		}
	}
	.more{
		width:240upx;
		height: 57upx;
		line-height: 57upx;
		font-size: 18upx;
		color:#666666;
		text-align: center;
		position:absolute;
		bottom:0;
	}
	.isloading {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	
		img {
			width: 40%;
		}
	}
	//优惠
	/* 遮罩层 */
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		.newCoupon_box {
			width: 478upx;
			height: 780upx;
			// background: #2C405A;
			margin: auto;
			overflow: hidden;
			
			.newCoupon {
				background-color: #ffffff;
				height: 732upx;
				position:relative;
				border-radius: 30upx;
	
				.newCoupon_title {
					position: relative;
					text-align: center;
					width: 100%;
					height: 218upx;
					// background: #f33c5a;
					margin-top: 32upx;
					border-top-right-radius: 30upx;
					border-top-left-radius: 30upx;
					background: url("../../static/images/APP-qie16_0000_2.png") no-repeat;
					background-size: 478upx 218upx;
	
					// // border-bottom-left-radius: 100upx;
					// border-radius: 0 0 50% 50%;
					image {
						width: 220upx;
						height: 170upx;
						margin-top: -30upx;
					}
	
					view {
						font-size: 28upx;
						color: #ffffff;
	
						text {
							font-size: 32upx;
							font-weight: 600;
							margin: 0 8upx;
						}
					}
				}
	
				.newCoupon_title {
					position: relative;
					text-align: center;
					width: 100%;
					height: 218upx;
					// background: #f33c5a;
					margin-top: 32upx;
					border-top-right-radius: 30upx;
					border-top-left-radius: 30upx;
					background: url("../../static/images/APP-qie16_0000_2.png") no-repeat;
					background-size: 478upx 218upx;
	
					// // border-bottom-left-radius: 100upx;
					// border-radius: 0 0 50% 50%;
					image {
						width: 220upx;
						height: 170upx;
						margin-top: -30upx;
					}
	
					view {
						font-size: 28upx;
						color: #ffffff;
	
						text {
							font-size: 32upx;
							font-weight: 600;
							margin: 0 8upx;
						}
					}
				}
				.discountCoupon{
					// background-color: #007AFF;
					padding: 0 36upx;
					text-align: center;
					overflow: hidden;
					.discountCoupon_title{
						margin-top: 10upx;
						font-size: 22upx;
						color:#666666;
						line-height: 30upx;
						margin-bottom: 20upx;
					}
					.scroll-Y{
						width:100%;
						height:334upx;
					}
					.discountCoupon_content{
						margin-left: 26upx;
						margin-top:10upx;
						width:350upx;
						height: 102upx;
						background: url(../../static/images/APP-qie16_0000_进入界面-优惠券.png) no-repeat;
						background-size: 362upx 102upx;
						color:#FFFFFF;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 30upx 10upx 18upx;
						.leftInfo{
							width:222upx;
							height:98upx;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
						.discountCoupon_content_money{
							text-align: left;
							width:108upx;
							text{
								font-size: 26upx;
							}
							font-size: 50upx;
						}
						.discountCoupon_content_fill{
							text-align: left;
							width:110upx;
							font-size: 26upx;
							view:last-child{
								font-size: 16upx;
							}
							margin-left: -20upx;
						}
						.discountCoupon_content_type{
							width:130upx;
							height: 95upx;
							font-size: 20upx;
							margin-left:2upx;
							display:flex;
							align-items: center;
							justify-content: center;
							text-align:left;
						}
					}
					.d_draw{
						text-align: center;
						position:absolute;
						bottom: 20upx;
						width:265upx;
						height: 58upx;
						background: #f49c17;
						line-height: 58upx;
						border-radius: 50upx;
						font-size: 32upx;
						color:#ffffff;
						margin-left: 80upx;
						margin-top:18upx;
					}
				}
			}
	
	
	
		}
	}
</style>
