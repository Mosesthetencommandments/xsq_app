<template>
	<view class="choAll">
		<view class="share" v-if="isSShow">
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
		</view>
		<tabbarItem></tabbarItem>
	</view>
</template>

<script>
	import tabbarItem from "../../components/tabbarItem/tabbar.vue"
	import config from '../../common/config.js';
	export default {
		components:{
			tabbarItem
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
				isSSSS:false,
				isFollow:true,
				isAttention:false,
				videoContext:null,
				preload:'auto',
				controls:false,
				playsinline:true,
				isSShow:true,
				openid:'',
				titleIndex:1,
				name:'',
				user_headimgurl:"",
				isSSS:true,
				titles:[
					{id:0,title:"直播达人"},
					{id:1,title:"精选素材"},
					{id:2,title:"种草赚拍"}
				],
				abc:false,
				danmuList: [],
				danmuValue: '',
				token:null,
				//websocket
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				userinfo:{},
				d_videoList:[],
				viedeoLiseId:null,
				isClick:true,
				isClick1:false,
				YellowCar:[],
				customer_id:null
			};
		},
		methods:{
			adb(item){
				if(item.id === 2){
					uni.navigateTo({
					    url: '/share/share/share'
					});
				}else if(item.id === 0){
					uni.navigateTo({
					    url: '/share/share/live'
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.choAll{
	background:#FFFFFF;
	height:100vh;
}
.share-tab-box{
	width: 88%;
	height: 100%;
	padding:0 20upx;
	background: #ffffff;
}
.newheight{
	height:100upx!important;
	width:100%;
	background: #53aefc;
	border-bottom-left-radius: 30upx;
	border-bottom-right-radius:30upx;
	padding:0 28upx;
	display: flex;
	justify-content:space-around;
}
.share-tab{
	width:100%;
	height: 160upx;
	background: #53aefc;
	border-bottom-left-radius: 30upx;
	border-bottom-right-radius:30upx;
	padding:0 28upx;
	display: flex;
	justify-content:space-around;
}
.share-tab-item{
	width:160upx;
	height: 100upx;
}
.tab-item-s{
	width:160upx;
	height: 75upx;
	line-height: 75upx;
	color:#1d5f98;
	
	font-size: 28upx;
	text-align: center;
	&.active{
		font-weight: 900;
		font-size: 32upx;
		color:#ffffff;
	}
}
.tab-item-x{
	&.active{
		margin-left:42upx ;
		width:76upx;
		height: 16upx;
		background: url(../static/images/son_0023_top-line.png) no-repeat;
		background-size:76upx;
	}
}
// 精选素材
.jx-bigbox{
	width:100%;
	height: 100%;
}
.commodity-box{
	width:100%;
	height: 508upx;
	background: #ffffff;
	margin-bottom: 8upx;
	padding: 0 48upx;
	.commodity{
		width:100%;
		height: 508upx;
		.commodity-top{
			width:100%;
			height: 134upx;
			overflow: hidden;
			display: flex;
			.kuangbox{
				width:82upx;
				height: 134upx;
				.kuang{
					width:68upx;
					height: 68upx;
					border-radius: 100%;
					border:2upx solid #5ea5ce;
					margin-left:6upx;
					margin-top: 20upx;
					overflow: hidden;
					image{
						width:100%;
						height: 100%;
					}
				}
			}
			.describe{
				width:512upx;
				height: 134upx;
				color:#666666;
				.describe-s{
					font-size:28upx;
					line-height: 36upx;
					margin-top:30upx;
					font-weight: 600;
				}
				.describe-x{
					font-size: 16upx;
					line-height: 20upx;
				}
			}
		}
		.commodity-img{
			width:512upx;
			height: 200upx;
			margin-left: 82upx;
			display: flex;
			justify-content: space-between;
			.img-item{
				width:166upx;
				height: 166upx;
				background: #0A98D5;
				image{
					width:100%;
					height: 100%;
				}
			}
		}
		.commodity-center{
			width:100%;
			height: 70upx;
			border-top:1px solid #f0f0f0;
			border-bottom:1px solid #f0f0f0;
			display: flex;
			.icon-box{
				width:66upx;
				height: 66upx;
				.tabCenter-icon{
					width:48upx;
					height: 48upx;
					border-radius: 50%;
					background:#53aefc;
					text-align: center;
					margin-left: 10upx;
					margin-top:10upx;
					overflow: hidden;
					position: relative;
					img{
						width:30upx;
						height: 28upx;
						text-align: center;
						line-height: 30upx;
						display: block;
						position:absolute ;
						top:12upx;
						left: 10upx;
					}
				}
			}
			.info-box{
				width:200upx;
				height: 66upx;
				padding-left: 16upx;
				.info-title{
					font-size:24upx;
					color:#19110b;
					line-height: 36upx;
					margin-top: 6upx;
				}
				.info-txt{
					font-size:20upx;
					color:#999999;
					line-height: 20upx;
				}
			}
			.c-money{
				width:282upx;
				height: 66upx;
				color:#333333;
				font-size: 24upx;
				line-height: 44upx;
				text{
					color:#f3b047;
				}
			}
			.go{
				width:105upx;
				height: 66upx;
				color:#f3b047;
				font-size:24upx;
				line-height: 50upx;
			}
		}
		.commodity-footer{
			width:100%;
			height: 104upx;
			display: flex;
			.footer-left{
				width:100%;
				height: 104upx;
				button{
					width:178upx;
					height: 54upx;
					font-size: 22upx;
					line-height: 60upx;
					color:#666666;
					margin:30upx 0 0 10upx;
					background: #f2f2f2;
					border-radius: 4upx;
					border: none;
					image{
						width:35upx;
						height: 35upx;
						margin: 0 1upx -10upx -18upx;
					}
				}
			}
			.footer-right{
				width:100%;
				height: 104upx;
				text-align: right;
				display: flex;
				overflow: hidden;
				.iconstitle{
					width:164upx;
					line-height: 104upx;
				}
				.icons{
					margin-left: 28upx;
					margin-top:34upx;
					display: flex;
					width:140upx;
					justify-content: space-between;
					image{
						width:36upx;
						height: 36upx;
						display: block;
					}
				}
			}
		}
	}
}
</style>
