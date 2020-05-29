<template>
	<view class="liveAll">
		<view class="share">
			<!-- 选项卡 -->
			<view class="share-tab-box">
				<view class="share-tab" :class="(this.titleIndex!=2?'newheight':'')">
					<view class="share-tab-item" v-for="(item,index) in titles" :key="index">
						<view class="tab-item-s" :class="{'active':titleIndex==index}" @click="adb(item)">
							{{item.title}}
						</view>
						<view class="tab-item-x" :class="{'active':titleIndex==index}">
							
						</view>
					</view>
				</view> 
			</view>
			<!-- 直播达人 -->
			<view v-if="titleIndex==0">
				<view>
<!-- 					<view class="myattention">
						<view class="m-top">
							<view class="xian"></view>
							<view>我的关注</view>
						</view>
						<view class="m-bottom">
							<view class="m-item" v-for="(items,index) in status_arr" :key="items.id">
								<view class="whiteBox">
									<view class="view" v-if="items.status == 0"></view>
									<view class="vessel">
										<image :src="items.anchor_img" mode=""></image>
									</view>
								</view>
								<view class="m-name">
									<view class="d_name">{{items.anchor_nickname}}</view>
									<view class="peopleNumber" v-if="items.status == 0">正在休息</view>
									<view class="peopleNumber" v-else>{{items.look_count}}人观看</view>
								</view>
							</view>
							<view class="m-item" v-for="(items,index) in status_arr1" :key="items.id">
								<view class="whiteBox">
									<view class="view" v-if="items.status == 0"></view>
									<view class="vessel">
										<image :src="items.anchor_img" mode=""></image>
									</view>
								</view>
								<view class="m-name">
									<view class="d_name">{{items.anchor_nickname}}</view>
									<view class="peopleNumber" v-if="items.status == 0">正在休息</view>
									<view class="peopleNumber" v-else>{{items.look_count}}人观看</view>
								</view>
							</view>
						</view>
					</view> -->
					<view class="m-recommend">
						<view class="xian"></view>
						<view>为您推荐</view>
					</view>
					<view class="videoItemBox">
						<view class="viedoItem" v-for="(item,index) in liveRoom" :key="index">
							<view class="viedo" @click="goInLiveRoom(item)">							
								<view 
								>
									<view class="cover" v-if="item.is_full !== true">
										<view class="blankScreen" @click.stop="noLive(item)" v-if="item.status === 0"></view>
										<image :src="item.cover_img" mode=""></image>
										<view class="viedo-status">
											<view class="viedo-status-left">
												<view></view>
												{{[item.live_status === 101 ? '直播中' : item.live_status === 102 ? '未开始' : item.live_status === 103 ? '已结束'
													: item.live_status === 104 ? '禁播' : item.live_status === 105 ? '暂停中' : item.live_status === 106 ? '异常' : '已过期'
												]}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="live" v-if="item.is_full !== true">
								<view class="live-title">{{item.name}}</view>
								<view class="live-name">
									<image class="img" :src="item.share_img" mode=""></image>
									<view>{{item.anchor_name}}</view>
									<button open-type="share" :data-rid="item">
										<img class="sli" src="../static/images/APP-qie12_0000_.png" />
									</button>
								</view>
							</view>
						</view>

						<view class="viedoItem" v-for="(item,index) in d_videoList2" :key="item.id">
							<view class="viedo">
								<view class="cover" v-if="item.status === 0">
									<view class="blankScreen" @click.stop="noLive(item)" v-if="item.status === 0"></view>
									<view v-if="item.status === 0" class="d_mc"></view>
									<image :src="item.room_img" mode=""></image>
									<view class="nextNotice_box">
										<view class="nextNotice">
											<image src="../static/images/APP-qie13_0011_gb.png" mode=""></image>
											<marquee scrollamount=10><text class="viewss">
													下次开播时间
													<text class="noticeTime">
														{{item.next_live_time}}
													</text>
												</text>
											</marquee>

										</view>
									</view>
									<view class="viedo-status1" v-if="item.status === 0">
										<view class="viedo-status-left">
											<view></view>
											休息中
										</view>
									</view>
								</view>
							</view>
							<view class="live" v-if="item.is_full !== true">
								<view class="live-title">{{item.title}}</view>
								<view class="live-name">
									<image class="img" :src="item.head_img" mode=""></image>
									<view>{{item.nickname}}</view>
									<img class="sli" @click="FX(item)" src="../../static/images/APP-qie12_0000_.png" />
								</view>
							</view>
							<view class="ShareOption_box" v-if="isShareOption" @click.stop="isShareOption = false">
								<view class="ShareOption">
									<view class="ShareOption_top">					
										<view 
											class="d_left" 
											@click.stop="wi(FXid)"
										>
											<image src="../static/images/APP-qie13_0001_schb.png" mode=""></image>
											<view>
												生成链接发送
											</view>
											<input class="optionInput" type="text" :value="copyText">
										</view>
										<view class="d_right" @click.stop="goLiveToShare(FXid)">
											<image src="../static/images/APP-qie13_0000_sclj.png" mode=""></image>
											<view class="">
												生成海报分享
											</view>
										</view>
									</view>
									<view class="ShareOption_bottom" @click.stop="isShareOption = false">
										取消
									</view>
								</view>
							</view>
						</view>
					</view>
					
					<view class="videoItemBox">
						<view class="viedoItem" v-for="(item,index) in d_getVideoList" :key="index">
							<view class="viedo">
								<view class="cover" >
									<view class="blankScreen" @click.stop="goPlayBack(item)" ></view>
									<view  class="d_mc"></view>
									<image :src="item.room_img" mode=""></image>
										
									<view class="viedo-status2" >
										<view class="viedo-status-left">
											<view></view>
											点击回放直播
										</view>
									</view>
								</view>
							</view>
							<view class="live" v-if="item.is_full !== true">
								<view class="live-title">{{item.room_title}}</view>
								<view class="live-name">
									<image class="img" :src="item.head_img" mode=""></image>
									<view>{{item.room_nickname}}</view>
									<image class="sli" @click="PlaybackVideoSharing(item)" src="../static/images/APP-qie12_0000_.png" mode=""></image>
								</view>
							</view>
							<view class="ShareOption_box" v-if="isShareOption1" @click.stop="isShareOption1 = false">
								<view class="ShareOption">
									<view class="ShareOption_top">					
										<view 
											class="d_left" 
											@click.stop="PlaybackVideo(HFid)"
											>
											<image src="../static/images/APP-qie13_0001_schb.png" mode=""></image>
											<view>
												生成链接发送
											</view>
											<input class="optionInput" type="text" :value="copyText1">
										</view>
										<view class="d_right" @click.stop="goPlayBackShare(HFid)">
											<image src="../static/images/APP-qie13_0000_sclj.png" mode=""></image>
											<view class="">
												生成海报分享
											</view>
										</view>
									</view>
									<view class="ShareOption_bottom" @click.stop="isShareOption = false">
										取消
									</view>
								</view>
							</view>
						</view>
					</view>					
				</view>
			</view>
		</view>
		<tabbarItem></tabbarItem>
	</view>
</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import config from '../../common/config.js';
	export default {
		components: {
			tabbarItem
		},
		onPullDownRefresh() { //下拉刷新
			this.getRoom()
		},
		onLoad() {
			wx.hideShareMenu()//禁止小程序右上方分享
			this.getRoom() 
		},
		onShareAppMessage(e) {
			let roomid = e.target.dataset.rid.roomid
			let customerInfo = uni.getStorageSync("customerInfo")
			if (e.from === 'button') {// 来自页面内分享按钮
				
			}
			return {
				title: '直播分享',
				// 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + roomid 
				path:'/wx_login/wx_login?wx_pid=' + customerInfo.customer_id + '&wx_type=4&roomid=' + roomid
			}
		},
		data() {
			return {
				liveRoom:[],
				titleIndex:0,
				titles: [{
						id: 0,
						title: "直播达人"
					},
					{
						id: 1,
						title: "精选素材"
					},
					{
						id: 2,
						title: "种草赚拍"
					}
				],
				BroadcastLiveOnState:null,
				HFroomId:null,//回放id
			};
		},
		methods: {
			async getRoom(){//直播间
				let [err,res] = await this.$http.post('/api/live/getAppletLiveRoomList',{
					start:0,
					limit:10
				})
				if(res.data.code === 200){
					this.liveRoom = res.data.data.room_info
					if(this.liveRoom.length === 0){
						return
					}
					for(let i = 0 ; i < this.liveRoom.length; i++){
						this.HFroomId = this.liveRoom[0].roomid
						// let livePlayer = requirePlugin('live-player-plugin')
						// livePlayer.getLiveStatus({ room_id: roomId })
						//         .then(res => {
						// 			console.log(2222)
						//         // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期 
						//             // console.log(res.liveStatus)
						// 			if(res.liveStatus == 101){
						// 				this.BroadcastLiveOnState = '直播中'
						// 			}else if(res.liveStatus == 102){
						// 				this.BroadcastLiveOnState = '未开始'
						// 			}else if(res.liveStatus == 103){
						// 				this.BroadcastLiveOnState = '已结束'
						// 			}else if(res.liveStatus == 104){
						// 				this.BroadcastLiveOnState = '禁播'
						// 			}else if(res.liveStatus == 105){
						// 				this.BroadcastLiveOnState = '暂停中'
						// 			}else if(res.liveStatus == 105){
						// 				this.BroadcastLiveOnState = '异常'
						// 			}else{
						// 				this.BroadcastLiveOnState = '已过期'
						// 			}
						//         })
						//         .catch(err => {
						//             console.log('get live status', err)
						//         })
					}
					uni.stopPullDownRefresh();
				}
			},
			goInLiveRoom(item){
				let roomId = item.roomid // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
				let customParams = encodeURIComponent(JSON.stringify({ path: 'share/share/live', pid: item.roomid })) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
				wx.navigateTo({
					url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`
				})
			},
			adb(item){
				if (item.id === 2) {
					uni.navigateTo({
						url: '/pages/share/share'
					});
				} else if (item.id === 1) {
					uni.navigateTo({
						url: '/pages/share/choiceness'
					});
				}
			}
		}	
	}
</script>

<style lang="scss" scoped>
	.liveAll{
		background:#FFFFFF;
		overflow: hidden;
	}
// 分享选择
.ShareOption_box{
	width:100%;
	height: 100vh;
	background: rgba(0,0,0,.1);
	position:fixed;
	top:0;
	left:0;
	z-index: 500;
	.ShareOption{
		width:100%;
		height: 280upx;
		background: #ffffff;
		position:absolute;
		bottom:0;
		left:0;
		overflow: hidden;
		border-top-left-radius:20upx ;
		border-top-right-radius:20upx ;
		.ShareOption_top{
			width:100%;
			height: 200upx;
			display: flex;
			.d_left{
				width:50%;
				height: 100%;
				padding-top:30upx;
				text-align: center;
				image{
					width:100upx;
					height:100upx;
				}
				view{
					font-size:24upx;
					color:#444444;
				}
				.optionInput{
					width:10upx;
					height: 10upx;
					display: none;
				}
			}
			.d_right{
				width:50%;
				height: 100%;
				padding-top:30upx;
				text-align: center;
				image{
					width:100upx;
					height:100upx;
				}
				view{
					font-size:24upx;
					color:#444444;
				}
			}
		}
		.ShareOption_bottom{
			width:100%;
			height: 80upx;
			background: #eeeeee;
			text-align: center;
			line-height: 80upx;
			color:#444444;
			font-size: 34upx;
		}
	}
}
	.Pop_up_barrage_box {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .1);
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.Pop_up_barrage {
		width: 100%;
		height: 80upx;
		background: #ffffff;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		padding: 15upx 20upx;
		.ensodi {
			width: 65%;
			height: 100%;
			line-height: 50upx;
			input {
				height: 50upx;
				width: 100%;
				line-height: 60upx;
				font-size: 26upx;
				color: #666666;
				padding-left: 30upx;
				-webkit-transform: translate3d(0, 0, 0);
			}
		}
		.sendDanmu1 {
			width: 100upx;
			height: 50upx;
			background: #F49C17;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #F2F2F2;
		}
	}
	.shopNumber {
		max-width: 380upx;
		background: #e1dfe0;
		height: 40upx;
		color: #454545;
		line-height: 40upx;
		font-size: 22upx;
		border-radius: 6upx;
		display: flex;
		padding: 0 15upx;
		margin-left: -400upx;
		opacity: 0.1;
		text {
			color: #fe5655;
			margin-right: 10upx;
		}
		.s_img_box {
			width: 30upx;
			height: 28upx;
			margin-top: 6upx;
			margin-right: 12upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.share-tab-box {
		width: 88%;
		height: 100%;
		padding: 0 20upx;
		background: #ffffff;
	}
	.newheight {
		height: 100upx !important;
		width: 100%;
		background: #53aefc;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
		padding: 0 28upx;
		display: flex;
		justify-content: space-around;
	}
	.share-tab {
		width: 100%;
		height: 160upx;
		background: #53aefc;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
		padding: 0 28upx;
		display: flex;
		justify-content: space-around;
	}
	.share-tab-item {
		width: 160upx;
		height: 100upx;
	}
	.tab-item-s {
		width: 160upx;
		height: 75upx;
		line-height: 75upx;
		color: #1d5f98;
		font-size: 28upx;
		text-align: center;
		&.active {
			font-weight: 900;
			font-size: 32upx;
			color: #ffffff;
		}
	}
	.tab-item-x {
		&.active {
			margin-left: 42upx;
			width: 76upx;
			height: 16upx;
			background: url(../static/images/son_0023_top-line.png) no-repeat;
			background-size: 76upx;
		}
	}
	//直播达人
	.myattention {
		width: 92%;
		height: 280upx;
		background: #ffffff;
		padding: 0 20upx;
		.m-top {
			width: 100%;
			height: 70upx;
			font-size: 28upx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 70upx;
			display: flex;
			.xian {
				display: inline-block;
				border-radius: 10upx;
				width: 6upx;
				height: 32upx;
				background: rgba(251, 67, 91, 1);
				margin-top: 20upx;
				margin-right: 10upx;
			}
		}
		.m-bottom {
			width: 92%;
			height: 180upx;
			background: url(../static/images/APP-qie9_0000_zhibo03.png) no-repeat;
			background-size: 100% 100%;
			border-radius: 10px;
			display: flex;
			padding: 16upx 40upx;
			.m-item {
				width: 92upx;
				height: 100%;
				margin-right: 20upx;
				.whiteBox {
					width: 89upx;
					height: 89upx;
					border: 1px solid #ffffff;
					border-radius: 100%;
					position: relative;
					overflow: hidden;
					.view {
						width: 90upx;
						height: 90upx;
						position: absolute;
						top: 0;
						left: 0;
						background: rgba(0, 0, 0, .5);
						z-index: 1;
						border-radius: 100%;
					}
					.vessel {
						width: 81upx;
						height: 81upx;
						border-radius: 50%;
						background: #007AFF;
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						overflow: hidden;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.m-name {
					width: 92upx;
					height: 56upx;
					font-size: 22upx;
					color: #ffffff;
					text-align: center;
					.d_name {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.peopleNumber {
						font-size: 19upx;
					}
				}
			}
		}
	}
	.m-recommend {
		width: 100%;
		height: 70upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 70upx;
		display: flex;
		padding: 0 20upx;
		.xian {
			display: inline-block;
			border-radius: 10upx;
			width: 6upx;
			height: 32upx;
			background: rgba(251, 67, 91, 1);
			margin-top: 20upx;
			margin-right: 10upx;
		}
	}
	.shade {
		width: 100vw;
		height: 100vh;
		background: rgba(255, 255, 255, 0.1);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
	}
	.addItem {
		width: 80upx;
		height: 80upx;
		position: absolute;
		right: 10upx;
		bottom: 120upx;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.videoItemBox:last-child{
		padding-bottom: 100upx;
	}
	.videoItemBox {
		width: 95%;
		height: 100%;
		padding: 0 20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.viedoItem {
			width: 100%;
			height: 600upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			margin-bottom: 20upx;
			overflow: hidden;
			.viedo {
				width: 100%;
				height: 410upx;
				background: #808080;
				position: relative;
				.cover {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: 100;				
					.d_mc{
						position:absolute;
						top:0;
						left: 0;
						width:100%;
						height: 100%;
						background: rgba(0,0,0,.2);
						z-index:1;
					}
					.d_imgs {
						width: 60upx;
						height: 60upx;
						position: absolute;
						top: 150upx;
						left: 324upx;
						z-index: 100;
					}
					.blankScreen {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						z-index: 999;
					}
					image {
						width: 100%;
						height: 100%;
					}
					.viedo-status {
						width: 100%;
						height: 60upx;
						position: absolute;
						top: 20upx;
						left: 0;
						z-index: 300;
						display: flex;
						justify-content: space-between;
						padding: 20upx;
						.viedo-status-left {
							width: 185upx;
							height: 59upx;
							border-radius: 30upx;
							border: 4upx solid #ffffff;
							font-size: 36upx;
							color: #ffffff;
							background: rgba(0, 0, 0, .3);
							text-align: center;
							line-height: 50upx;
							display: flex;
							justify-content: center;
							align-items: center;
							view {
								width: 16upx;
								height: 16upx;
								background: #fd3758;
								z-index: 400;
								border-radius: 100%;
								margin: 0upx 6upx 0 0upx;
							}
						}
						.viedo-status-right {
							width: 90upx;
							height: 32upx;
							display: flex;
							color: #ffffff;
							font-size: 18upx;
							line-height: 32upx;
							image {
								width: 22upx;
								height: 20upx;
								margin-top: 6upx;
								margin-right: 6upx;
							}
						}
					}
					.nextNotice_box {
						width: 100%;
						height: 80upx;
						padding: 0 24upx;
						position: absolute;
						top: 300upx;
						left: 0;
						z-index: 2;
						.nextNotice {
							width: 100%;
							height: 80upx;
							background: rgba(0, 0, 0, .5);
							border-radius: 60upx;
							line-height: 80upx;
							display: flex;
							align-items: center;
							font-size: 38upx;
							color: #ffffff;
							overflow: hidden;
							white-space: nowrap;
							padding-left: 80upx;
							position: relative;
							.viewss {
								width: 570upx;
								height: 80upx;
								display: flex;
							}
							image {
								width: 60upx;
								height: 60upx;
								z-index: 100;
								position: absolute;
								top: 10upx;
								left: 10upx;
							}
							.noticeTime {
								overflow: hidden;
								color: #f49e17;
								margin-left: 16upx;
							}
						}
					}
					.viedo-status1 {
						width: 100%;
						height: 60upx;
						position: absolute;
						top: 20upx;
						left: 20upx;
						z-index: 300;
						display: flex;
						justify-content: space-between;
						padding: 20upx;
						.viedo-status-left {
							width: 185upx;
							height: 59upx;
							border-radius: 30upx;
							border: 4upx solid #ffffff;
							font-size: 36upx;
							color: #ffffff;
							background: rgba(0, 0, 0, .3);
							text-align: center;
							line-height: 50upx;
							display: flex;
							justify-content: center;
							align-items: center;
							view {
								width: 16upx;
								height: 16upx;
								background: #999999;
								z-index: 400;
								border-radius: 100%;
								margin: 0upx 6upx 0 0upx;
							}
						}
						.viedo-status-right {
							width: 90upx;
							height: 32upx;
							display: flex;
							color: #ffffff;
							font-size: 18upx;
							line-height: 32upx;
							image {
								width: 22upx;
								height: 20upx;
								margin-top: 6upx;
								margin-right: 6upx;
							}
						}
						.playBack {
							width: 220upx;
							height: 50upx;
							border: 2upx solid #ffffff;
							color: #ffffff;
							font-size: 26upx;
							border-radius: 30upx;
							display: flex;
							align-items: center;
							.playBack_dian {
								width: 14upx;
								height: 14upx;
								background: #999999;
								border-radius: 100%;
								margin-left: 14upx;
								margin-right: 10upx;
							}
						}
					}
					.viedo-status2 {
						width: 340upx;
						height: 84upx;
						position: absolute;
						top: 160upx;
						left: 190upx;
						z-index: 300;
						display: flex;
						justify-content: space-between;
						.viedo-status-left {
							width: 340upx;
							height: 84upx;
							border-radius: 60upx;
							border: 4upx solid #ffffff;
							font-size: 40upx;
							color: #ffffff;
							background: rgba(0, 0, 0, .3);
							text-align: center;
							display: flex;
							justify-content: center;
							align-items: center;				
							view {
								width: 26upx;
								height: 26upx;
								background: #999999;
								z-index: 400;
								border-radius: 100%;
								margin: 0upx 6upx 0 0upx;
							}
						}				
						.viedo-status-right {
							width: 90upx;
							height: 32upx;
							display: flex;
							color: #ffffff;
							font-size: 18upx;
							line-height: 32upx;					
							image {
								width: 22upx;
								height: 20upx;
								margin-top: 6upx;
								margin-right: 6upx;
							}
						}					
						.playBack {
							width: 220upx;
							height: 50upx;
							border: 2upx solid #ffffff;
							color: #ffffff;
							font-size: 26upx;
							border-radius: 30upx;
							display: flex;
							align-items: center;					
							.playBack_dian {
								width: 14upx;
								height: 14upx;
								background: #999999;
								border-radius: 100%;
								margin-left: 14upx;
								margin-right: 10upx;
							}				
						}
					}
				}
				.kkk {
					width: 828upx;
					height: 1472upx;
					position: fixed;
					top: 0;
					left: 0;
					z-index: 101;
				}
				.actives {
					cursor: not-allowed;
					pointer-events: none;
				}
				video {
					width: 100%;
					height: 100%;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.live {
			width: 95%;
			height: 190upx;
			padding: 22upx;
			.live-title {
				width: 100%;
				height: 76upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 36upx;
				font-weight: 500;
				color: #444444;
				position: relative;
				.state {
					width: 100upx;
					height: 52upx;
					background: #1AAD19;
					position: absolute;
					top: 0;
					left: 0;
				}
			}
			.live-name {
				display: flex;
				width: 100%;
				height: 68upx;
				align-items: center;
				line-height: 68upx;
				button::after{ border: none;}
				image {
					width: 68upx;
					height: 68upx;
				}
				.img {
					width: 68upx;
					height: 68upx;
					border-radius: 100%;
				}
				.sli {
					width: 48upx;
					height: 48upx;
				}
				view {
					width: 80%;
					font-size: 34upx;
					color: #888888;
					margin: 0 10upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
	.attention-box {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		z-index: 299;
	}
	.attention {
		width: 750upx;
		height: 370upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0px 0px;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 300;
		text-align: center;
		.headerPortrait {
			width: 134upx;
			height: 134upx;
			background: #ffffff;
			border-radius: 100%;
			margin: 0 auto;
			text-align: center;
			margin-top: -65upx;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 94%;
				height: 94%;
				border-radius: 100%;
			}
		}
		.headerName {
			font-size: 24upx;
			color: #666666;
			line-height: 50upx;
		}
		.total {
			font-size: 18upx;
			color: #888888;
			line-height: 30upx;
		}
		.label {
			font-size: 18upx;
			color: #888888;
			text {
				margin: 0 14upx;
			}
		}
		.Ta {
			margin-top: 60upx;
			font-size: 24upx;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 52upx;
		}
		.fansNumber {
			font-size: 44upx;
			font-weight: 400;
			color: rgba(54, 158, 255, 1);
		}
		.d_attention {
			position: absolute;
			bottom: 44upx;
			right: 40upx;
			width: 176upx;
			height: 52upx;
			background: rgba(242, 242, 242, 1);
			border-radius: 10upx;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 52upx;
			font-size: 24upx;s
			text {
				font-size: 34upx;
				color: #53AEFC;
				margin-right: 27upx;
			}
		}

		.d_attention1 {
			position: absolute;
			bottom: 44upx;
			right: 40upx;
			width: 176upx;
			height: 52upx;
			background: rgba(242, 242, 242, 1);
			border-radius: 10upx;
			font-weight: 400;
			color: #666666;
			line-height: 52upx;
			font-size: 24upx;
		}
	}

	.notice {
		min-width: 400upx;
		max-width: 550upx;
		height: 46upx;
		padding-right: 20upx;
		background: #fe5454;
		line-height: 46upx;
		border-radius: 30upx;
		margin-top: 20upx;
		margin-left: -600upx;
		font-size: 24upx;
		color: #ffffff;
		display: flex;
		align-items: center;

		image {
			width: 40upx;
			height: 40upx;
			margin-left: 4upx;
			margin-right: 10upx;
		}
	}

	// 直播
	.shade-header-box {
		width: 100%;
		height: 90upx;
		padding: 10upx 20upx;
		display: flex;
		justify-content: space-between;;
		.header-message {
			
			height: 70upx;
			background: rgba(0, 0, 0, .5);
			border-radius: 60upx;
			display: flex;
			justify-content: space-between;
			padding: 6upx;

			image {
				width: 60upx;
				height: 60upx;
				border-radius: 50%;
			}

			.message-center {
				margin-right:10upx;
				height: 60upx;
				color: #ffffff;
				font-size: 18upx;
				margin-left: 14upx;

				.ads {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					width: 100%;
					height: 37upx;
					font-size: 24upx;
					line-height: 37upx;
				}

				.fans {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 16upx;
				}

				margin-right: 14upx;
			}

			.message-right {
				width: 100upx;
				height: 46upx;
				background: #ffffff;
				border-radius: 30upx;
				text-align: center;
				line-height: 46upx;
				font-size: 20upx;
				color: #ff5353;
				display: flex;
				justify-content: center;
				font-weight: 600;
				margin: 8upx;
				align-items: center;

				image {
					width: 34upx;
					height: 24upx;
					margin-right: 8upx;
				}
			}
		}

		.header-fans {
			display: flex;
			justify-content: space-between;

			.touxiang {
				width: 240upx;
				height: 56upx;
				overflow: hidden;
				display: flex;

				.img-box {
					width: 50upx;
					height: 50upx;
					overflow: hidden;
					border-radius: 100% 100%;
					background: #007AFF;
					margin-top: 4upx;
					margin-right: 10upx;

					.ads {
						width: 100%;
						height: 37upx;
						font-size: 24upx;
						line-height: 37upx;
					}

				}
			}

			.fans-number {
				width: 100upx;
				height: 56upx;
				background: rgba($color: #000000, $alpha: 0.3);
				border-radius: 30upx;
				text-align: center;
				line-height: 56upx;
				font-size: 20upx;
				color: #ffffff;
				margin: 0 22upx 0 16upx;
			}

			.image {
				width: 26upx;
				height: 26upx;
				line-height: 56upx;
				margin-top: 24upx;
			}
		}

	}

	//底部点赞
	.giveALink {
		width: 260upx;
		height: 260upx;
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 47upx 20upx 20upx;

		.love-box {
			width: 100%;
			height: 100upx;
			text-align: right;

			image {
				width: 68upx;
				height: 56upx;
			}

			.love-number {
				margin-left: 145upx;
				width: 76upx;
				text-align: center;
				height: 30upx;;
				color: #ffffff;
				font-size: 24upx;
				line-height: 30upx;
			}
		}

		.d-auction-box1 {
			width: 100%;
			height: 60upx;
			margin-top: 132upx;
			padding-left: 150upx;

			.d-imgbox1 {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .3);
				border-radius: 100%;
				text-align: center;
				line-height: 60upx;

				image {
					width: 36upx;
					height: 28upx;
				}
			}
		}

		.d-auction-box {
			width: 100%;
			height: 60upx;
			margin-top: 36upx;
			display: flex;
			justify-content: space-between;

			view {
				width: 60upx;
				height: 60upx;
				border-radius: 100%;
			}

			.d-auction {
				background: #339efe;
				text-align: center;
				line-height: 60upx;
				color: #ffffff;
				font-size: 20upx;
			}

			.d-imgbox {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .3);
				border-radius: 100%;
				text-align: center;
				line-height: 68upx;

				image {
					width: 40upx;
					height: 36upx;
				}
			}

			.d-imgbox1 {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .3);
				border-radius: 100%;
				text-align: center;
				line-height: 60upx;

				image {
					width: 36upx;
					height: 28upx;
				}
			}
		}
	}

	// 商品列表
	.liveProductList_box {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .1);
		position: fixed;
		top: 0;
		left: 0;

		.liveProductList {
			width: 100%;
			height: 625upx;
			position: absolute;
			bottom: 0;
			padding: 0 20upx;
		}

		.liveProductList_top {
			padding-left: 30upx;
			width: 100%;
			height: 44upx;
			line-height: 20upx;
			color: #ffffff;
			font-size: 24upx;

		}

		.liveProductList_bottom {
			width: 100%;
			height: 580upx;
			background: #ffffff;
			border-top-right-radius: 16upx;
			border-top-left-radius: 16upx;
			padding: 0 20upx;

			.liveProductList_bottom_item {
				width: 100%;
				height: 179upx;
				border-bottom: 2upx solid #eeeeee;
				padding: 20upx 0;
				display: flex;
				justify-content: space-between;

				.item_headUrling {
					width: 140upx;
					height: 140upx;
					border-radius: 10upx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.item_message {
					width: 508upx;
					height: 140upx;
					.item_message_title {
						width: 100%;
						height: 40upx;
						font-size: 30upx;
						line-height: 40upx;
						color: #444444;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.item_message_onsale {
						height: 48upx;
						font-size: 22upx;
						color: #ff5553;
					}

					.item_message_money {
						width: 100%;
						height: 50upx;
						line-height: 50upx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.d_money {
							font-size: 24upx;
							color: #f49c17;
							font-weight: 600;
						}

						.d_shop_car {
							width: 46upx;
							height: 46upx;
							background: #fe5454;
							border-radius: 100%;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 30upx;
								height: 28upx;
							}
						}
					}
				}
			}
		}
	}

	.d_scroll-Y {
		height: 625upx;
	}


	// 弹幕
	.fordanmu {
		width: 100%;
		padding: 20upx 20upx;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;

		#smallYelloCar {
			white-space: nowrap;
			position: relative;
			width: 100%;
			height: 150upx;
			background: #ffffff;
			border-radius: 8upx;
			padding: 15upx 10upx;
			margin-top: 20upx;
			overflow: hidden;

			#k-box {
				position: absolute;
				left: 0px;
				height: 120upx;

				#z-box {
					float: left;
					display: flex;
					width: 170px;
					height: 120upx;
					border-right: 1px solid #f4f4f4;
				}
			}

			.z-img-box {
				margin-left: 2px;
				width: 120upx;
				height: 120upx;
				background: #007AFF;
				border-radius: 10upx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.z-shop-box {
				margin-left: 10upx;
				width: 190upx;
				height: 120upx;
				.z-shop-box-top {
					width: 100%;
					height: 50%;
					display: flex;
					justify-content: space-between;

					.z-title {
						width: 100%;
						height: 90upx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 24upx;
						color: rgba(25, 17, 11, 1);
						line-height: 22upx;

						.qwe {
							width: 190upx;
							line-height: 30upx;
							height: 30upx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.gg {
							width: 190upx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							font-size: 16upx;
							line-height: 24upx;
							color: #888888;
							margin-top: 6upx;
						}
					}
				}

				.z-shop-box-bottom {
					width: 100%;
					height: 50%;
					display: flex;
					justify-content: space-between;

					.z-title-shopcar {
						padding-top: 18upx;
						height: 100%;

						// text-align: left;
						.moneyCar_right {
							width: 46upx;
							height: 46upx;
							border-radius: 100%;
							background: #53affc;
							text-align: center;
							line-height: 46upx;

							image {
								width: 30upx;
								height: 28upx;
							}
						}
					}

					.z-money {
						width: 60%;
						height: 100%;
						color: #F49C17;
						font-size: 24upx;
						padding-top: 30upx;
					}

					.z-go {
						width: 40%;
						height: 100%;
						padding-top: 20upx;
						padding-left: 30upx;

						.go {
							color: #53AEFC;
							font-size: 24upx;
						}
					}
				}
			}
		}

		.danmu-box {
			width: 350upx;
			height: 280upx;
			margin-top: 20upx;
			overflow: hidden;

			.danmu-content {
				.danmu-content-chat:last-child {
					margin-bottom: 30upx;
				}

				.danmu-content-chat {
					background: rgba(0, 0, 0, .5);
					border-radius: 6upx;
					padding: 10upx;
					margin-bottom: 10upx;
					padding-left: 16upx;

					.vip {
						width: 56upx;
						height: 24upx;
						margin-right: 6upx;
						marign-top: 4upx;
					}
				}

				font-size: 24upx;
				color: #ffffff;

				view {
					color: #fe5552
				}
			}

			.scroll-Y {
				height: 280upx;
			}
		}

		.button-box {
			display: flex;
			margin-top: 20upx;
			height: 60upx;
			position: relative;
			justify-content: space-between;

			.shop {
				width: 60upx;
				height: 60upx;
				background: rgba(0, 0, 0, .5);
				margin-right: 80upx;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.redDot {
					width: 20upx;
					height: 20upx;
					background: #ff1d1e;
					position: absolute;
					right: 0;
					top: 0;
					border-radius: 100%;
					font-size: 14upx;
					color: #ffffff;
					text-align: center;
					line-height: 20upx;
				}

				image {
					position: absolute;
					top: -42upx;
					left: -20upx;
					width: 160%;
					height: 160%;
				}
			}

			.fenxiang {
				width: 60upx;
				height: 60upx;
				position: absolute;
				right: 0;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0, 0, 0, .5);

				image {
					width: 34upx;
					height: 28upx;
				}
			}

			.mengceng {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background: rgba(0, 0, 0, 0)
			}
		}

		.danmu-button {
			width: 260upx;
			height: 60upx;
			border-radius: 30upx;
			line-height: 60upx;
			background: #231a1b;
			.danmu-input1 {
				height: 60upx;
				line-height: 60upx;
				font-size: 26upx;
				color: #ffffff;
				padding-left: 30upx;
				-webkit-transform: translate3d(0, 0, 0);
			}

			.danmu_active {
				z-index: 1;
				width: 100%;
				height: 80upx;
				background: #ffffff;
				position: fixed;
				bottom: 0;
				left: 0;
				display: flex;
				justify-content: space-between;
				padding: 15upx 120upx 15upx 20upx;

				line-height: 60upx;
				font-size: 26upx;
				color: #666666;
				-webkit-transform: translate3d(0, 0, 0);

			}

			.sendDanmu1 {
				z-index: 3;
				position: absolute;
				bottom: -6upx;
				right: 0;
				width: 100upx;
				height: 50upx;
				background: #F49C17;
				border-radius: 30upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26upx;
				color: #F2F2F2;
			}
		}

		.sendDanmu {
			width: 100upx;
			height: 60upx;
			margin-left: 30upx;
			background: #F49C17;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #F2F2F2;
		}
	}

	.wdlshare .video .video-item-box {
		font-size: 22upx;
		color: #999999;
		text-align: center;
		padding-top: 228upx;
	}

	.wdlshare {
		width: 100%;
		height: 100%;

		.nickname-box {
			.nickname-left {
				.kuang {
					overflow: hidden;
					background: #eeeeee;
					text-align: center;

					image {
						margin-top: 18upx;
						width: 70%;
						height: 70%;
					}
				}
			}

			.nickname-center {
				color: #53affc;
			}
		}
	}

	page {
		background: #f7f7f7;
	}

	.smallYelloCar1 {
		width: 70%;
		height: 150upx;
		background: #ffffff;
		border-radius: 8upx;
		padding: 15upx 10upx;
		margin-top: 20upx;
		display: flex;
		justify-content: space-between;

		.z-img-box {
			width: 120upx;
			height: 120upx;
			background: #007AFF;
			border-radius: 10upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.z-shop-box {
			width: 73%;
			height: 120upx;
			.z-shop-box-top {
				width: 100%;
				height: 50%;
				display: flex;
				justify-content: space-between;

				.z-title {
					width: 70%;
					height: 100%;
					font-size: 24upx;
					color: rgba(25, 17, 11, 1);
					line-height: 22upx;
					padding-top: 12upx;

					.qwe {
						line-height: 30upx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.gg {
						font-size: 16upx;
						color: #888888;
						margin-top: 6upx;
					}
				}

				.z-title-shopcar {
					width: 30%;
					height: 100%;
					.moneyCar_right {
						width: 46upx;
						height: 46upx;
						border-radius: 100%;
						background: #53affc;
						text-align: center;
						line-height: 46upx;
						margin-top: 12upx;

						image {
							width: 30upx;
							height: 28upx;
						}
					}
				}
			}

			.z-shop-box-bottom {
				width: 100%;
				height: 50%;
				display: flex;
				justify-content: space-between;

				.z-money {
					width: 60%;
					height: 100%;
					color: #F49C17;
					font-size: 24upx;
					padding-top: 24upx;
				}

				.z-go {
					width: 40%;
					height: 100%;
					padding-top: 20upx;
					padding-left: 30upx;

					.go {
						color: #53AEFC;
						font-size: 24upx;
					}
				}
			}
		}
	}

	// 主推
	.MainProducts_box {
		width: 100%;
		height: 510upx;
		margin-top: 20upx;
		padding: 0 20upx;

		.MainProducts {
			width: 100upx;
			background: rgba(0, 0, 0, .5);
			border-radius: 10upx;
			text-align: center;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			padding-top: 6upx;

			.MainProducts_item {
				width: 90upx;
				height: 90upx;
				overflow: hidden;
				border-radius: 6upx;
				margin-bottom: 6upx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.MainProducts_item_money {
					padding: 0 4upx;
					height: 22upx;
					position: absolute;
					background: rgba(0, 0, 0, .5);
					border-top-right-radius: 8upx;
					bottom: 0;
					left: 0;
					z-index: 1;
					font-size: 12upx;
					color: #ffffff;
					line-height: 22upx;
					font-weight: 600;
				}
			}

		}
	}

	//飘在商品列表上面的
	.SingleListItem_box {
		position: absolute;
		right: 20upx;
		bottom: 105upx;
		opacity: 0;
		width: 280upx;
		height: 110upx;

		.SingleListItem {
			width: 280upx;
			height: 100upx;
			background: #ffffff;
			border-radius: 8upx;
			padding: 10upx;
			display: flex;
			justify-content: space-between;

			.SingleListItem_img {
				width: 78upx;
				height: 78upx;
				border-radius: 8upx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.SingleListItem_message {
				width: 168upx;
				height: 78upx;

				.SingleListItem_message_title {
					width: 100%;
					line-height: 42upx;
					color: #1a110c;
					font-size: 22upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.SingleListItem_message_money {
					color: #f19d19;
					font-size: 18upx;
				}
			}
		}

		.dsj {
			position: absolute;
			right: 96upx;
			width: 0;
			height: 0;
			border-left: 18upx solid transparent;
			border-right: 18upx solid transparent;
			border-top: 20upx solid #ffffff;
		}
	}
</style>
