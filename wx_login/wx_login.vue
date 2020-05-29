<template>
	<view>
		<view v-if="isHide">
		    <view v-if="canIUse" >
		        <view class='header'>
		            <img src='./images/wx_login.png' />
		        </view>
		 
		        <view class='content'>
		            <view>申请获取以下权限</view>
		            <text>获得你的公开信息(昵称，头像等)</text>
		        </view>
		 
		        <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoAction" withCredentials="true">
		            授权登录
		        </button>
				<!-- <button open-type="getPhoneNumber"  @getuserinfo="getPhoneNumber">
					获取手机号
				</button> -->
		    </view>
		    <view v-else>请升级微信版本</view>
		</view>
		 
		<view v-else>
		    <!-- <view>我的首页内容</view> -->
			<!-- <button type="default" @click="remove">删除缓存</button> -->
		</view>
	</view>
</template>

<script>
	import config from '../common/config.js';
	export default {
		data() {
			return {
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				isHide: false,
				url:'/pages/index/index',
				wx_pid:null,
				
			};
		},
		onLoad(option) {
			if(option.wx_pid !== undefined && option.wx_pid !== '' && option.wx_pid !== null){
				this.wx_pid = option.wx_pid
			}
			if(option.wx_type == 'vip'){
				 uni.setStorageSync('wx_type', 'vip');
			}else if(option.wx_type == 'mine'){
				uni.setStorageSync('wx_type', 'mine');
			}else if(option.wx_type == 'buy'){
				uni.setStorageSync('wx_type', 'buy');
			}
			const D_PRODUCTA_ID =  uni.getStorageSync('product_id');
			const TYPE = uni.getStorageSync('wx_type');
			if (TYPE == 'vip') {
				this.url = '/vip/vip/vip'
			}else if (TYPE == 'mine'){
				this.url = '/mine/mine/mine'
			}else if (TYPE == 'buy'){
				this.url ='/buy/buy/buy?product_id=' + D_PRODUCTA_ID
			}
			if(option.wx_type !== undefined && option.wx_type !== '' && option.wx_type !== null){
				let type = option.wx_type
				if (type == 1) {
					this.url = '/pages/index/index'
				}else if (type == 2) {
					const value = option.product_id //商品id
					this.url = '/buy/buy/buy?product_id=' + value 
				}else if (type == 3) {
					this.url = '/coupon/coupon/coupon'
				}else if (type == 4){
					const roomid = option.roomid
					this.url = 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + roomid 
				}
				// else if (type == 'vip'){
				// 	this.url = '/vip/vip/vip'
				// }else if (type === 'mine') {
				// 	this.url = '/mine/mine/mine'
				// }
			}
			// uni.showModal({
			// 	 title: '提示',
			// 	 content:this.url ,
			// })
			this.ceshi()
		},
		methods:{
			getPhoneNumber (e) {
			    console.log(e.detail.errMsg)
			    console.log(e.detail.iv)
			    console.log(e.detail.encryptedData)
			},
			remove(){
				 uni.clearStorageSync();
			},
			ceshi(){
				
				var that = this;
				// 查看是否授权
				wx.getSetting({
					success:(res)=> {
						if (res.authSetting['scope.userInfo']) {
							wx.getUserInfo({
								success:(res)=> {
									// 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
									// 根据自己的需求有其他操作再补充
									// 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
									// console.log(res)
									let nickName = res.userInfo.nickName
									let avatarUrl = res.userInfo.avatarUrl
									let sex =  parseInt(res.userInfo.gender)
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
															wx_applet_open_id:res.data.data.data.openid,
															wx_union_id:res.data.data.data.unionid
														},
														method: 'POST',
														header: {
															'shop': 7
														}, 
														success: (res) => {
															if(res.data.data.success_message == 'success' ){
																uni.setStorageSync('token', res.data.data.token);
																if(this.url === '/pages/index/index' || this.url === '/mine/mine/mine'){
																	uni.switchTab({
																		url:this.url
																	})
																}else{
																	uni.redirectTo({
																		url:this.url
																	})
																}
															}else{
																uni.request({
																	url: config.webUrl + '/api/customer/wxAppletRegister',
																	data: {
																		wx_applet_open_id:wx_open_id,
																		wx_union_id:wx_union_id,
																		nickname :nickName,
																		headimgurl:avatarUrl,
																		sex:sex,
																		pid:this.wx_pid
																	},
																	method: 'POST',
																	header: {
																		'shop': 7
																	}, 
																	success: (res) => {
																		//openId、或SessionKdy存储//隐藏loading
																		if(res.data.data.success_message === "success"){
																			let token = res.data.data.token
																			uni.setStorageSync('token', res.data.data.token);
																			uni.request({
																				url: config.webUrl + '/api/customer/getCustomerInfo',
																				header: {
																					'Authorization': token,
																					'shop': 7
																				},
																				method: 'POST',
																				success:(res) => {
																					if(res.data.code === 200){
																						let customerInfo = res.data.data
																						uni.setStorageSync('customerInfo', customerInfo);
																					}
																				}
																			})
																			if(this.url === '/pages/index/index' || this.url === '/mine/mine/mine'){
																				uni.switchTab({
																					url:this.url
																				})
																			}else{
																				uni.redirectTo({
																					url:this.url
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
							
							that.isHide=true
							// uni.showToast({
							// 	title:'1231321332132'
							// })
						}
					}
				});
			},
			 getUserInfoAction(e) {
				 // console.log(e)
			        if (e.detail.userInfo) {
			            //用户按了允许授权按钮
			            var that = this
			            // 获取到用户的信息了，打印到控制台上看下
			            // console.log("用户的信息如下：")
			            // console.log(e.detail.userInfo)
			            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
			                this.isHide=false
							uni.redirectTo({
								url:'/wx_login/wx_login'
							})
			            console.log(this.isHide)
			        } else {
			            //用户按了拒绝按钮
			            wx.showModal({
			                title: '警告',
			                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
			                showCancel: false,
			                confirmText: '返回授权',
			                success:(res)=> {
			                    // 用户没有授权成功，不需要改变 isHide 的值
								
			                    if (res.confirm) {
			                        // console.log('用户点击了“返回授权”');
			                    }
			                }
			            });
			        }
			    }
		}
	}
</script>

<style lang="scss" scoped>
.header {
    margin: 90rpx 0 90rpx 50rpx;
    border-bottom: 1px solid #ccc;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    // line-height: 450rpx;
}
 
.header img {
    width: 200rpx;
    height: 200rpx;
}
 
.content {
    margin-left: 50rpx;
    margin-bottom: 90rpx;
}
 
.content text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
}
 
.bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
	height: 100upx;
	line-height: 100upx;
}
</style>
