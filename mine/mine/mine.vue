<template>
	<view class="mine-all">
		<view v-if="isSShow">
			<!-- 我的信息 -->
			<view class="mine-box">
				<view class="mine">
					<view class="mine-top">
						<view class="mine-top-l">
							<view class="kuang">
								<image :src="user_headimgurl" mode=""></image>
							</view>
						</view>
						<view class="mine-top-c">
							<view>{{user_nickname}}</view>
							<image src="../../static/images/son_0014_wo-xiugai.png" mode="" @click="ceshi"></image>
						</view>
						<view class="mine-top-r"></view>
					</view>
					<view class="mine-buttom">
						<view class="power" @click="gotocoupon">
							<view class="power-s">
								<image src="../../static/images/son_0011_wo-1.png" mode=""></image>
							</view>
							<view class="power-x">优惠券</view>
						</view>
						<view class="power" @click="goIntegralCenter">
							<view class="power-c-s">
								<image src="../../static/images/son_0013_wo-2.png" mode=""></image>
							</view>
							<view class="power-x">积分</view>
						</view>
						<view class="power">
							<view class="power-r-s" @click="gotovideo">
								<image src="../../static/images/son_0012_wo-3.png" mode=""></image>
							</view>
							<view class="power-x">种草视频</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单 -->
			<view class="orderForm-box">
				<view class="orderForm">
					<view class="orderForm-title">我的订单</view>
					<view class="item-box">
						<view class="item" v-for="item in powers" :key="item.id" @click="gotoorderlist(item.id)">
							<view class="item-s">
								<view class="img-box">
									<img :src="item.image" alt="">
								</view>
							</view>
							<view class="item-x">
								<text>{{item.title}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 金贝银贝 -->
			<view class="kimbe-box">
				<view class="kimbe">
					<view class="item">
						<view class="">金贝余额</view>
						<view class=""> <text>{{balance_gold}}</text> 个</view>
					</view>
					<view class="item1">
						<view class="">银贝余额</view>
						<view class=""> <text>{{balance_silver}}</text> 个</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wdlmine" v-else>
			<!-- 我的信息 -->
			<view class="mine-box">
				<view class="mine">
					<view class="mine-top">
						<view class="mine-top-l">
							<view class="kuang">
								<image src="../../static/images/APP-01_0007_DI-1.png" mode=""></image>
							</view>
						</view>
						<view class="mine-top-c">
							<button type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoAction" withCredentials="true">请登录</button>
						</view>
						<view class="mine-top-r"></view>
					</view>
					<view class="mine-buttom">
						<view class="power">
							<view class="power-s">
								<image src="../../static/images/son_0011_wo-1.png" mode=""></image>
							</view>
							<view class="power-x">优惠券</view>
						</view>
						<view class="power">
							<view class="power-c-s">
								<image src="../../static/images/son_0013_wo-2.png" mode=""></image>
							</view>
							<view class="power-x">积分</view>
						</view>
						<view class="power">
							<view class="power-r-s">
								<image src="../../static/images/son_0012_wo-3.png" mode=""></image>
							</view>
							<view class="power-x">种草视频</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单 -->
			<view class="orderForm-box">
				<view class="orderForm">
					<view class="orderForm-title">我的订单</view>
					<view class="item-box">
						<view class="item" v-for="item in powers" :key="item.id">
							<view class="item-s">
								<view class="img-box">
									<img :src="item.image" alt="">
								</view>
							</view>
							<view class="item-x">
								<text>{{item.title}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		components: {
		},
		onPullDownRefresh() { //下拉刷新
			this.getCustomerMoneyInfo()
		},
		onShow() {
			console.log(this.isSShow)
			this.getname1()
			this.getCustomerMoneyInfo()
			var page = getCurrentPages().pop();
			if (page == undefined || page == null) return;
			page.onLoad();
		},
		onLoad() {
			this.getname1()
			this.getCustomerMoneyInfo()
			// this.d_status = this.getQueryVariable("state")
		},
		data() {
			return {
				isSShow: false,
				name: '',
				user_nickname: '',
				user_headimgurl: "",
				openid: '',
				powers: [{id:0,image:"../../static/images/son_0010_wo-5.png",title:"待付款"},
					{id:1,image:"../../static/images/son_0009_wo-6.png",title:"待发货"},
					{id:2,image:"../../static/images/son_0008_wo-7.png",title:"待收货"},
					{id:3,image:"../../static/images/son_0007_wo-8.png",title:"已完成"} 
				],
				balance_gold: null,
				balance_silver: null,
				d_status: null
			};
		},
		methods: {
			ceshi() {
				uni.reLaunch({
					url: "/useredit/useredit/useredit"
				})
			},
			gotocoupon() {
				uni.navigateTo({
					url: "/coupon/coupon/coupon"
				})
			},
			gotointegralcenter() {
				uni.navigateTo({
					url: "/pages/integral-center/integral-center"
				})
			},
			gotovideo() {
				uni.navigateTo({
					url: "/pages/share/video"
				})
			},
			gotoorderlist(id) {
				uni.navigateTo({
					url: "/orderList/orderList/orderList?id=" + id
				})
			},
			async getname1() {
				let token = uni.getStorageSync("token")
				if (token === '' || token === undefined || token === null) {
					const openid = uni.getStorageSync('wx_open_id');
					if (openid !== null && openid !== '' && openid !== undefined) {
						let [err1, resp1] = await uni.request({
							url: config.webUrl + "/api/customer/wxLogin",
							data: {
								'wx_open_id': openid
							},
							methods: 'POST',
							header: {
								'shop': "7"
							},
						})
						if (resp1.data.data.success_message === "success") {
							token = resp1.data.data.token
							uni.setStorageSync('token', token)
						} else {
							this.isSShow = false
							return
						}
					} else {
						this.isSShow = false
						return
					}
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					this.user_nickname = res.data.data.user_nickname
					if (this.user_nickname == "") {
						this.user_nickname = res.data.data.phone + "的用户"
					}
					let user_headimgurl = res.data.data.user_headimgurl
					this.user_headimgurl = user_headimgurl
					let distribution_level_id = res.data.data.distribution_level_id
					uni.setStorageSync('distribution_level_id', distribution_level_id);
					let distribution_level_sort = res.data.data.distribution_level_sort
					uni.setStorageSync('distribution_level_sort', distribution_level_sort)
					if (this.user_headimgurl == "") {
						this.user_headimgurl = "../static/images/APP-qie8_0000_mo-head2.png"
					}
					this.isSShow = true
					uni.stopPullDownRefresh();
				}
			},
			gologin() {
				// uni.redirectTo({
				//     url: '/wx_login/wx_login?wx_type=mine'
				// });
			},
			async getCustomerMoneyInfo() { //获取用户金贝银贝信息
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					return
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerMoneyInfo');
				if (res.data.code === 200) {
					this.balance_gold = res.data.data.balance_gold
					this.balance_silver = res.data.data.balance_silver
				}
				uni.stopPullDownRefresh();
			},
			// getQueryVariable(variable){//获取URL中的state
			//    let query = window.location.search.substring(1);
			//    let vars = query.split("&");
			//    for (let i=0;i<vars.length;i++) {
			// 		   let pair = vars[i].split("=");
			// 		   if(pair[0] == variable){return pair[1];}
			//    }
			//    return(false);
			// },
			goIntegralCenter() {
				uni.navigateTo({
					url: "/integral-center/integral-center/integral-center"
				})
			},
			//登录注册
			getUserInfoAction(e) {
				// console.log(e)
				if (e.detail.userInfo) {
					//用户按了允许授权按钮
					var that = this
					// 获取到用户的信息了，打印到控制台上看下
					// console.log("用户的信息如下：")
					// console.log(e.detail.userInfo)
					//授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
					this.wx_login()
					//  this.isHide=false
					uni.switchTab({
						url:'/mine/mine/mine'
					})
					// console.log(this.isHide)
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
																var page = getCurrentPages().pop();
																if (page == undefined || page == null) return;
																page.onLoad();
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
																			var page = getCurrentPages().pop();
																			if (page == undefined || page == null) return;
																			page.onLoad();
																			// uni.switchTab({
																			// 	url: "/mine/mine/mine"
																			// })
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
		},

	}
</script>

<style lang="scss" scoped>
	.mine-all {
		height: 100vh;
		background: #FFFFFF;
		overflow: hidden;
	}

	.kimbe-box {
		overflow: hidden;
		// width:92%;
		height: 100%;
		padding-top: 140upx;
		padding: 140upx 30upx;

		.kimbe {
			width: 100%;
			height: 200upx;
			background: #f5f5f5;
			border-radius: 20upx;

			.item {
				width: 92%;
				padding: 0 26upx;
				height: 98upx;
				border-bottom: 2px solid #eeeeee;
				font-size: 28upx;
				color: #666666;
				display: flex;
				justify-content: space-between;
				line-height: 100upx;

				text {
					color: #55b0f9;
					margin-right: 10upx;
				}
			}

			.item1 {
				width: 92%;
				padding: 0 26upx;
				height: 100upx;
				font-size: 28upx;
				color: #666666;
				display: flex;
				justify-content: space-between;
				line-height: 100upx;

				text {
					color: #55b0f9;
					margin-right: 10upx;
				}
			}
		}
	}

	.wdlmine {
		.mine-top-c {
			color: #ffffff;

			button::after {
				border: none;
			}

			button {
				background-color: transparent;
				color: #ffffff;
			}
		}

		.mine {
			.mine-top {
				.mine-top-l {
					.kuang {
						background: #eeeeee;
						text-align: center;

						image {
							margin-top: 18upx;
							width: 70%;
							height: 70%;
						}
					}
				}
			}
		}

	}

	page {
		background: #ffffff;
	}

	.mine-box {
		// width:100%;

		height: 480upx;
		background-image: linear-gradient(to bottom right, #4ac6ff, #369eff);
		padding: 0 35upx;

		.mine-top {
			width: 100%;
			height: 200upx;
			overflow: hidden;
			display: flex;

			.kuang {
				width: 130upx;
				height: 130upx;
				border-radius: 100%;
				overflow: hidden;
				border: 6upx solid #FFFFFF;
				margin-left: 70upx;
				margin-top: 40upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.mine-top-c {
				font-size: 28upx;
				color: #ffffff;
				width: 100%;
				margin: 100upx 0 0 20upx;
				height: 48upx;
				display: flex;

				image {
					width: 28upx;
					height: 28upx;
					margin-left: 40upx;
					margin-top: 6upx;
				}
			}
		}

		.mine-top-r {
			width: 174upx;
			height: 68upx;
			margin-top: 96upx;
			margin-right: 100upx;
			background: url(../static/images/APP-01_0022_xinxi.png) no-repeat;
			background-size: 49upx 49upx;
		}

		.mine-buttom {
			width: 624upx;
			height: 142upx;
			margin: 0 28upx;
			display: flex;

			.power {
				width: 208upx;
				height: 142upx;

				.power-s {
					padding-top: 8upx;

					image {
						width: 70upx;
						height: 48upx;
						margin: 42upx 0 0 68upx;
					}
				}

				.power-c-s {

					image {
						width: 62upx;
						height: 56upx;
						margin: 42upx 0 0 72upx;
					}
				}

				.power-r-s {
					image {
						width: 46upx;
						height: 54upx;
						margin: 42upx 0 0 80upx;
					}

				}

				.power-x {
					color: #ffffff;
					text-align: center;
					lien-height: 48upx;
					font-size: 22upx;
				}
			}
		}
	}

	// 订单
	.orderForm-box {
		width: 92%;
		height: 200upx;
		position: fixed;
		top: 380upx;
		padding: 0 35upx;

		.orderForm {
			width: 100%;
			height: 200upx;
			background: #ffffff;
			border-radius: 26upx;
			box-shadow: 0 0 10upx #b5b5b5;
			z-index: 1;

			.orderForm-title {
				width: 100%;
				height: 66upx;
				font-size: 28upx;
				color: #333333;
				font-weight: 600;
				padding-left: 35upx;
				line-height: 66upx;
			}

			.item-box {
				width: 100%;
				height: 134upx;
				display: flex;
				justify-content: space-between;

				.item {
					width: 162upx;
					height: 134upx;
					text-align: center;

					.item-s {
						width: 100%;
						height: 80upx;
						overflow: hidden;

						.img-box {
							width: 48upx;
							height: 48upx;

							img {
								width: 100%;
								height: 100%;
								margin: 22upx 0 0 54upx;
							}
						}
					}

					.item-x {
						font-size: 22upx;
						color: #999999;
					}

				}

			}
		}
	}
</style>
