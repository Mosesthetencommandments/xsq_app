<template>
	<view>
		<view class="mask1" v-if="isLoading">
			<img src="../static/images/alpha.gif" alt="" class="loadingImg">
		</view>
		<view v-if="isSShow" class="all">
			<!-- 推荐 -->
			<view class="header-box">
				<view class="header-s"></view>
				<view class="header-x">
					<view style="height: 60upx;">
						<view class="kuang">
							<image v-if="isClick" :src="parentHeadimgurl" mode=""></image>
							<image v-else src="../static/images/APP-qie8_0000_mo-head2.png" mode=""></image>
						</view>
						<view class="title">
							<text class="headline">推荐人</text>
							<text class="name" v-if="isClick">{{parentName}}</text>
							<text class="name" v-else>您还没有推荐人，<text class="isloin" @click="goInvitation">点击填写</text></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 卡片 -->
			<view class="card-box">
				<view class="card">
					<view class="card-top">
						<view class="kuang">
							<image :src="user_headimgurl" mode=""></image>
						</view>
						<view class="card-name">
							<view class="text">{{user_nickname}}</view>
							<view class="VIPimg">
								<img src="../static/images/son_0000_VIP_02.png" alt="">
								<view class="VIPimg-box">{{user_distribution_level_name}}</view>
							</view>
						</view>
						
					</view>
					<view class="card-bottom">
						<view class="earnings">累计收益</view>
						<view class="money">￥  <text>{{profit_all}}</text></view>
					</view>
				</view>
			</view>
			<!-- 余额 -->
			<view class="arrange-box">
				<view class="arrange">
					<view class="arrange-top">
						<view class="top-left">
							<view class="yu">冻结佣金</view>
							<view class="qian">￥ <text>{{profit_frozen}}</text></view>
						</view>
						
					</view>
					<view class="arrange-center">
						<view class="top-left">
							<view>
								<view class="yu">可用账户</view>
								<view class="qian">￥ <text>{{balance}}</text></view>
							</view>
							<view class="top-right">
								<button class="withdraw" @click="gotoAccount"><image src="../static/images/son_0020_anniu-tixian.png" mode=""></image>立即提现</button>
							</view>
						</view>
					</view>
					<view class="arrange-center-second">
						<view class="top-left-second">
							<view>
								<text>账单</text>
							</view>
						</view>
						<view class="top-right-second" @click="gotomyBill">
							<view>
								<text>查看记录</text>
								<img src="../static/images/right_10.png" alt="">
							</view>
						</view>
					</view>
					<view class="arrange-buttom">
						<view>每月1~5日可提现可用账户的收益</view>
					</view>
				</view>
			</view>
			<!-- 底部三个卡片 -->
			<view class="footer-box">
				<view class="footer">
					<button class="footer-left ka" open-type="share">
						<view class="fx-header1">好友分享</view>
						<view class="fx-title1">点击分享给我的好友</view>
					</button>
					<view class="footer-center ka" @click="gotoAssociation">
						<view class="fx-header">我的社群</view>
						<view class="fx-title">我的团队我管理</view>
					</view>
					<view class="footer-right ka" @click="gotoEarnings">
						<view class="fx-header">收益明细</view>
						<view class="fx-title">查看收益详细情况</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wdlvip" v-else>
			<view class="header-box">
				<view class="header-s"></view>
				<view class="header-x">
					<view style="height: 60upx;">
						<view class="kuang">
							<image src="../static/images/APP-qie8_0000_mo-head2.png" mode=""></image>
						</view>
						<view class="title">
							<text class="headline">推荐人</text>
							<text class="name" >您还没有推荐人，<text class="isloin">点击填写</text></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 卡片 -->
			<view class="card-box">
				<view class="card">
					<view class="card-top">
						<view class="kuang">
							<image src="../static/images/APP-qie8_0001_mo-head1.png" mode=""></image>
						</view>
						<view class="card-name">
							<text class="text" @click="gologin">请 登录</text>
						</view>
					</view>
					<view class="card-bottom">
						<view class="earnings">累计收益</view>
						<view class="money">￥  <text>0</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js'
	export default {
		onPullDownRefresh() {//下拉刷新
			this.getCustomerMoneyInfo()
		},
		onShow(){
			this.getname1()
		},
		onLoad() {
			this.getCustomerMoneyInfo()
			this.getCumstomerInfo()
			// uni.showShareMenu({
			// 	withShareTicket:true,
			// 	title:"vip",
			// 	path:"http://shopapp.home258.com"
			// })
		},
		onShareAppMessage(res) {
			let customerInfo = uni.getStorageSync("customerInfo")
			if (res.from === 'button') {// 来自页面内分享按钮
				
			}
			return {
				title: '给你一份福利',
				path: '/wx_login/wx_login?wx_pid=' + customerInfo.customer_id + "&wx_type=1"
			}
		},
		data() {
			return {
				isClick:true,
				isSShow:true,
				name:'',
				user_headimgurl:"",
				openid:'',
				balance:'',
				profit_all:'',
				profit_frozen:'',
				parentName:'',
				parentHeadimgurl:"",
				pid:"",
				isDe:true,
				user_nickname:null,
				user_distribution_level_name:null,
				d_status:null,
				swiper1:null,
				swiper2:null,
				isHave:false,
				imgInfo:[
					
				],
				copyText:null,
				customerInfo:[],
				isLoading:false,
				current: 0,
				current1:0,
			};
		},
		methods:{
			change(e){
			    this.current = e.detail.current
			},
			change1(e){
				this.current1 = e.detail.current
			},
			goInvitation(){
				uni.redirectTo({
					url:"/invitation/invitation/invitation"
				})
			},
			gotoAccount(){
				uni.navigateTo({
					url:"/account/account/account"
				})
			},
			gotoAssociation(){
				uni.navigateTo({
					url:"/association/association/association"
				})
			},
			gotoEarnings(){
				uni.navigateTo({
					url:"/earnings/earnings/earnings"
				})
			},
			async getSharePoster(){//获取用户分享海报
				this.isLoading = true
				let [err,res] = await this.$http.post("/api/coupon/shareShopCouponCode",{
					shop_coupon_url: config.webUrl1+'/#/pages/QRcode/QRcode',
					type:3,
				});
				if(res.data.code === 200){
					this.imgInfo = res.data.data
				}
				this.isLoading = false
				this.goSharePosters()
			},
			async getname1(){//通过token换用户信息
				let token = uni.getStorageSync("token")
				if (token === '' || token === undefined || token === null) {
					const openid = uni.getStorageSync('wx_open_id');
					if (openid !== null && openid !== '' && openid !== undefined) {
						let [err1, resp1] = await uni.request({
							url:config.webUrl+"/api/customer/wxLogin",
							data: { 'wx_open_id': openid },
							methods:'POST',
							header:{
								'shop':"1"
							},
						})
						if(resp1.data.data.success_message === "success") {
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
				let [err,res] = await this.$http.post('/api/customer/getCustomerInfo');
				if(res.data.code === 200){
					this.user_distribution_level_name = res.data.data.distribution_level_name
					this.user_nickname = res.data.data.user_nickname
					if(this.user_nickname == ""){
						this.user_nickname = res.data.data.phone + "的用户"
					}
					let user_headimgurl = res.data.data.user_headimgurl
					this.user_headimgurl = user_headimgurl
					let distribution_level_id = res.data.data.distribution_level_id
					uni.setStorageSync('distribution_level_id', distribution_level_id);
					let distribution_level_sort = res.data.data.distribution_level_sort
					uni.setStorageSync('distribution_level_sort',distribution_level_sort)
					if(this.user_headimgurl == ""){//判断头像 昵称  若是获取不到 则显示默认
						this.user_headimgurl = "../static/images/APP-qie8_0000_mo-head2.png"
					}
					let pid = res.data.data.pid
					this.pid = pid
					if(this.pid !== "" && this.pid !== null){//判断有没有推荐人
						this.getCustomerParentInfo()
					}else{
						this.isClick = false
					}
					this.isSShow = true
				}
				
			},
			async getCumstomerInfo() { //获取用户个人信息
				let token = uni.getStorageSync("token")
				if(token === undefined || token === null || token === ''){
					return false
				}
				let [err, res] = await this.$http.post('/api/customer/getCustomerInfo');
				if (res.data.code === 200) {
					this.customerInfo = res.data.data
				}
			},
			async getCustomerMoneyInfo(){//获取用户金额信息
				const token = uni.getStorageSync('token')
				if (token === '' || token === null || token === undefined) {
					return
				}
				let [err,res] = await this.$http.post('/api/customer/getCustomerMoneyInfo');
				if(res.data.code == 200){
					let balance = res.data.data.balance
					this.balance = balance
					let profit_all = res.data.data.profit_all
					this.profit_all = profit_all
					let profit_frozen = res.data.data.profit_frozen
					this.profit_frozen = profit_frozen
				}
				uni.stopPullDownRefresh();
			},
			async getCustomerParentInfo(){//推荐人的数据
				let [err,res] = await this.$http.post('/api/customer/getCustomerParentInfo');
				if(res.data.code == 200){
					let parentName = res.data.data.user_nickname
					this.parentName = parentName
					let parentHeadimgurl = res.data.data.user_headimgurl
					this.parentHeadimgurl = parentHeadimgurl
					let phone = res.data.data.phone
					let reg = /^(\d{3})\d*(\d{4})$/;
					if(phone !== null && phone !== '' && phone !== undefined){
						let newPhone = phone.replace(reg,'$1****$2')
					}
					if(this.parentHeadimgurl == ""){//判断头像 昵称  若是获取不到 则显示默认
						this.parentHeadimgurl = "../static/images/APP-qie8_0000_mo-head2.png"
					}
					if(this.parentName == ""){//判断 昵称  若是获取不到 则显示默认
						this.parentName = newPhone + '的用户'
					}
					this.isDe= false
					
				}else{
					uni.showToast({
					    title: '获取推荐人失败',
					    duration: 2000
					});
				}
			},
			gologin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			gotomyBill(){
				uni.navigateTo({
					url:"/myBill/myBill/myBill"
				})
			},
			goSharePosters(){
				this.isHave = true
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
		}
	}
</script>

<style lang="scss" scoped>
	.mask1{
		position: fixed;
		top:0;
		left:0;
		z-index:999;
		width:100%;
		height:100vh;
		background:rgba(0,0,0,0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		.loadingImg{
			width:400upx;
			height:400upx;
		}
	}
	.mask{
		position: fixed;
		top:0;
		left:0;
		z-index:999;
		width:100%;
		height:100vh;
		background:rgba(0,0,0,0.7);
		.gotoX{
			width:40upx;
			height:40upx;
			position:absolute;
			top:20upx;
			right:90upx;
			img{
				width:100%;
				height:100%;
			}
		}
		.firstImg{
		    width:100%;
		    height:820upx;
			margin-top:70upx;
			margin-left:70upx;
			.swiper-slide{
				&.active{
					img{
						transform: scale(1);
					}
				}
			}
		}
		.firstImg img{
		    width:90%;
		    height:90%;
			transform: scale(0.8);
		}
		.secondImg{
			width:300upx;
			height:150upx;
			margin:0 auto;
			margin-top:10upx;
			.swiper-slide {
				width:40upx;
				height:150upx;
			}
		}
		.secondImg img{
		    width:40upx;
		    height:90%;
			transform: scale(0.8);
		}
	}
	.copylink{
		margin:0 auto;
		width:200upx;
		height:120upx;
		.copyImg{
			margin:0 auto;
			width:80upx;
			height:80upx;
			margin-bottom:10upx;
			img{
				width:100%;
				height:100%;
			}
		}
		.copyText{
			margin:0 auto;
			display:flex;
			justify-content: center;
			align-items: center;
			text{
				font-size:24upx;
				color:#FFFFFF;
			}
		}
	}
	.wdlvip {
		.isloin{
			color:#379dff;
			text-decoration:underline;
		}
	}
	.isloin{
		color:#379dff;
		text-decoration:underline;
	}
	.all{
		width:100%;
		background:#ffffff;	
		overflow: hidden;
	}
	.header-box{
		background:#ffffff;	
		height: 130upx;
		padding: 0 20upx;
		.header-s{
			height: 70upx;
			background: #53aefc;
			border-bottom-left-radius: 30upx;
			border-bottom-right-radius: 30upx;
		}
		.header-x{
			width:100%;
			height: 60upx;
			display: flex;
			position: relative;
			view{
				width: 100%;
				position: absolute;
				.kuang{
					overflow: hidden;
					width:80upx;
					height: 80upx;
					border-radius: 100%;
					border:4upx solid #FFFFFF;
					margin-left:30upx;
					margin-top:-44upx;
					image{
						width:100%;
						height: 100%;
					}
				}
				.title{
					width:500upx;
					height: 70upx;
					margin:-32upx 0 0 132upx;
					.headline{
						font-size:18upx;
						color: #ffffff;
						line-height: 28upx;
						display: block;
						
					}
					.name{
						display: block;
						font-size: 20upx;
						color:#666666;
						line-height: 40upx;
						
					}
				}
			}
		} 
	}
	.VIPimg{
		width:100%;
		height:30upx ;
		display: flex;
		padding-left: 16upx;
		img{
			width:18upx;
			height:30upx;
		}
		.VIPimg-box{
			height:30upx;
			background:#3D3D3D;
			font-size:22upx;
			line-height:29upx;
			color:#FFE2A0;
			min-width: 60upx;
			border-radius:0 20upx 20upx 0;
			padding-right:10upx;
			p{
				margin-right:15upx;
			}
		}
	}
	// 卡片
	.card-box{
		height: 342upx;
		padding: 0 20upx;
		.card{
			width: 100%;
			height: 320upx;
			background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqgAAAFACAYAAABwR44uAAAACXBIWXMAAAsTAAALEwEAmpwYAABojGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0wNy0yNVQwODo0MTowNiswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMTAtMTlUMTQ6MTY6NTQrMDg6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE5LTEwLTE5VDE0OjE2OjU0KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo1NDA5NDZlOC1lYTJmLWVlNGUtODVjMy0wMTAxNmRiMzE5MGI8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDowMDM4NGFlNy0yY2E1LWFjNGMtYjMzNy0zMzU0NmM4ZmQ2N2M8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDoxZDQwYzFmOC02MmYwLTg2NGItYjhkYi0zOTJmNTg5MDNlOWI8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWQ0MGMxZjgtNjJmMC04NjRiLWI4ZGItMzkyZjU4OTAzZTliPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA3LTI1VDA4OjQxOjA2KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmEwNzQ4OWIwLWRlZGUtYjk0OS05YTYzLWIwMjczMTg0YzU4MDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wNy0yNVQwOTowMDozMiswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpmMmQ1OTFkYi0xODViLWM2NGYtYWJkYS04YzE1YmYwNzAwODI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMTAtMTlUMTQ6MTY6NTQrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjU0MDk0NmU4LWVhMmYtZWU0ZS04NWMzLTAxMDE2ZGIzMTkwYjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0xMC0xOVQxNDoxNjo1NCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOmYyZDU5MWRiLTE4NWItYzY0Zi1hYmRhLThjMTViZjA3MDA4Mjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAwMzg0YWU3LTJjYTUtYWM0Yy1iMzM3LTMzNTQ2YzhmZDY3Yzwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjFkNDBjMWY4LTYyZjAtODY0Yi1iOGRiLTM5MmY1ODkwM2U5Yjwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+6IiM5bCP5LqMPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7oiIzlsI/kuow8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+5o6o6I2Q5Lq6PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7mjqjojZDkuro8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+6aOe57+U55qE5bCP5Za1PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7po57nv5TnmoTlsI/llrU8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+6aG+6ZeuPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7pob7pl648L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+6L+Z5piv5oKo55qE5pi156ewPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7ov5nmmK/mgqjnmoTmmLXnp7A8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+VklQPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5WSVA8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+57Sv6K6h5pS255uKPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7ntK/orqHmlLbnm4o8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+ODk2NjIuMDU8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0Pjg5NjYyLjA1PC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPu+/pTwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+77+lPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPuS9meminTwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+5L2Z6aKdPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPjY1NzkuMTU8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PjY1NzkuMTU8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+77+lPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7vv6U8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+5Y2z5bCG5Yiw6LSmPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7ljbPlsIbliLDotKY8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+MTg2LjA1PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD4xODYuMDU8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+77+lPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7vv6U8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+5q+P5pyIMX415pel5Y+v5o+Q546w5bey57uT566X55qE5pS255uKPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7mr4/mnIgxfjXml6Xlj6/mj5DnjrDlt7Lnu5PnrpfnmoTmlLbnm4o8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+56uL5Y2z5o+Q546wPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7nq4vljbPmj5DnjrA8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+5L2Z6aKdPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7kvZnpop08L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+NjU3OS4xNTwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+NjU3OS4xNTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7vv6U8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0Pu+/pTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7ljbPlsIbliLDotKY8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PuWNs+WwhuWIsOi0pjwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT4xODYuMDU8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PjE4Ni4wNTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7vv6U8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0Pu+/pTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7mr4/mnIgxfjXml6Xlj6/mj5DnjrDlt7Lnu5PnrpfnmoTmlLbnm4o8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0Puavj+aciDF+NeaXpeWPr+aPkOeOsOW3sue7k+eul+eahOaUtuebijwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7nq4vljbPmj5DnjrA8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0Pueri+WNs+aPkOeOsDwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7liIbkuqvmtbfmiqU8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PuWIhuS6q+a1t+aKpTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7ngrnlh7vliIbkuqvmiJHnmoTmtbfmiqU8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PueCueWHu+WIhuS6q+aIkeeahOa1t+aKpTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7miJHnmoTnpL7nvqQ8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PuaIkeeahOekvue+pDwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7miJHnmoTlm6LpmJ/miJHnrqHnkIY8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PuaIkeeahOWboumYn+aIkeeuoeeQhjwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7mlLbnm4rmmI7nu4Y8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PuaUtuebiuaYjue7hjwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT7mn6XnnIvmlLbnm4ror6bnu4bmg4XlhrU8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0Puafpeeci+aUtuebiuivpue7huaDheWGtTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT54PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD54PC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPuKApjwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+4oCmPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPuWjueWPo+S4pOWPozwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+5aO55Y+j5Lik5Y+jPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPummlumhtTwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+6aaW6aG1PC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPuWIhuS6qzwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+5YiG5LqrPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPuWPo+iiizwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+5Y+j6KKLPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPuaIkeeahDwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+5oiR55qEPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPuS8muWRmOS4reW/gzwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+5Lya5ZGY5Lit5b+DPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPkZBTlFJRTwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+RkFOUUlFPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPjA4OjQ3PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD4wODo0NzwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyTmFtZT44MiU8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PjgyJTwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6VGV4dExheWVycz4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MDY0MEM0MzY3NTY0RjA3OTc4RjcxMUZFNTkwQkUwMjQ8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4xM0JFM0ZGNzBFOEY5RTE3RTAxOTI0RDc5QzI3RDc4MzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjIwNEU5QUZEMjFCODA3MEVEOEZCNjRCNDk3OEMwNjVCPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDoyNkYyREI2OEU5QUMxMUU5OTNENEYyMUFGRkJGNEEyQTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6MzJFODIxM0VFOEI5MTFFOUI5RTI4OENFMDhFRjdBNTQ8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT54bXAuZGlkOjQ5NzhBRUI1RTk3RTExRTlCMkY2QkI3QUYzQjhFMjBBPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDo5RjEwNDRBN0U3RTAxMUU5QURBMjgyMEM2ODdGRTJFNjwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6QzczNjU5MTY0MkIwMTFFODg2Q0FBRUVGMDNFNDk1NzI8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT54bXAuZGlkOkNBNkMxQTg0MURDMzExRTc4OEM4QTEzQzIwODc1NUIwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDpFODUwMjRDRjY2QkRFOTExQUZEM0U4NzhCODYyMDE0MTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NjgwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjMyMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+zl++6wAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAD3HUlEQVR42uz9a6xu65IeBlWNOddln32u3aJpAY4ikFsCRYHYUSJZTogUIX4gFEsoCMdIECsKskAiAilIEQIbIYRQQI0wIlyU/pE4WCARhXBJsILtxHESqzu+dHCILSe24zZtO919bvvsdZnzK3583xhv1VNPvWPMtdZc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') no-repeat;
			background-size:100% 100% ;
			border-radius: 26upx;
			box-shadow: 0 8upx 14upx #bbbbbb;
		}
		.card-top{
			width:100%;
			height: 162upx;
			padding: 0 20upx;
			overflow: hidden;
			display: flex;
			position:relative;
			.kuang{
				overflow: hidden;
				width:136upx;
				height:136upx;
				border-radius: 100%;
				border:6upx solid #FFFFFF;
				margin-top:20upx;
				image{
					width:100%;
					height: 100%;
				}
			}
			.card-name{
				width:480upx;
				height: 142upx;
				margin-top:26upx;
				.text{
					font-size: 28upx;	
					color:#ffffff;
					margin-left: 20upx;
					line-height: 68upx;
				}
			}
			
		}
		.card-bottom{
			width:100%;
			height: 158upx;
			.earnings{
				font-size: 26upx;
				line-height: 47upx;
				color:#369eff;
				padding-left: 178upx;
			}
			.money{
				color:#369eff;
				line-height: 74upx;
				font-size: 48upx;
				padding-left: 170upx;
			}
		}
	}
//余额
.top-right{
	margin-left: 360upx;
	.withdraw{
		width:176upx;
		height: 52upx;
		font-size: 24upx;
		margin-top:34upx;
		line-height: 52upx;
		box-shadow:8upx #aaaaaa;
		image{
			width:33upx;
			height: 33upx;
			margin:0 8upx -8upx -12upx;	
		}
	}
}
.arrange-box{
	height: 324upx;
	padding:0 20upx;
	.arrange{
		width:100%;
		height: 330upx;
		background: #ffffff;
		border-radius: 26upx 26upx 0 0;
		box-shadow: 0upx 0upx 12upx #bbbbbb;
		margin-top:21upx;
		.arrange-top{
			width:100%;
			height: 117upx ;
			display: flex;
			border-bottom:2upx solid #f2f2f2;
			.top-left{
				padding-left: 30upx;
				.yu{
					margin-top:20upx;
					color:#666666;
					font-size: 28upx;
					line-height: 40upx;
				}
				.qian{
					color:#666666;
					font-size: 24upx;
					text{
						color:#53aefc;
					}
				}
			}
			
		}
		.arrange-center{
			width:100%;
			height: 111upx;
			overflow: hidden;
			border-bottom: 1px solid #f2f2f2;
			padding:0 30upx;
			display: flex;
			justify-content: space-between;
			.top-left{
				display: flex;
				.yu{
					margin-top:20upx;
					color:#666666;
					font-size: 26upx;
					line-height: 40upx;
				}
				.qian{
					color:#666666;
					font-size: 24upx;
					text{
						color:#53aefc;
					}
				}
			}
		}
		.arrange-center-second{
			width:100%;
			height: 111upx;
			overflow: hidden;
			display:flex;
			justify-content: space-between;
			align-items: center;
			.top-left-second{
				margin-left:30upx;
				text{
					font-size: 26upx;
				}
			}
			.top-right-second{
				margin-right:20upx;
				font-size: 24upx;
				img{
					margin-left:20upx;
					height:24upx;
					width:13upx;
				}
			}
		}
		.arrange-buttom{
			width:100%;
			height: 56upx;
			background:#f2f2f2;
			border-bottom-left-radius: 26upx;
			border-bottom-right-radius: 26upx;
			font-size:20upx;
			color:#b3b3b3;
			line-height: 56upx;
			view{
				padding-left: 30upx;
			}
		}
	}
}
//底部三个卡片
.fx-header{
	font-size: 24upx;
	color:#333333;
	font-weight: 900;
	line-height: 33upx;
	margin:17upx 0 0 16upx;
}
.fx-title{
	font-size:16upx;
	color:#666666;
	line-height: 25upx;
	margin:4upx 0 0 16upx;
}
.footer-box{
	width:100%;
	height: 100%;
	padding: 100upx 20upx;
	.footer{
		display: flex;
		width:94%;
		height: 100%;
		justify-content: space-between;
		button::after{ border: none;}
		.ka{
			width:209upx;
			height: 91upx;
			background:#FFB400;
			border-radius: 10upx;
			box-shadow: 0upx 0upx 8upx #dedede;
		}
		.footer-left{
			background:url(../static/images/son_0006_cai-1.png) no-repeat;
			background-size:100% 100%;
			.fx-header1{
				font-size: 24upx;
				color:#333333;
				font-weight: 900;
				line-height: 33upx;
				text-align:left;
				margin:17upx 0 0 16upx;
			}
			.fx-title1{
				font-size:16upx;
				color:#666666;
				line-height: 25upx;
				text-align:left;
				margin:4upx 0 0 16upx;
			}
		}
		.footer-center{
			background:url(../static/images/son_0005_cai-2.png) no-repeat;
			background-size:100% 100%;
		}
		.footer-right{
			background:url(../static/images/son_0004_cai-3.png) no-repeat;
			background-size:100% 100%;
		}
	}
}
</style>
