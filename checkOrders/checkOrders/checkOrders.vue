<template>
	<view>
		<view class="isloading">
			<img src="../../static/images/loading.gif" alt="" >
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		onLoad(option) {
			this.orders_id = parseInt(option.orders_id)
			if(option.shop_goods_id !== undefined && option.shop_goods_id !== 'undefined' && option.shop_goods_id !== null && option.shop_goods_id !== ''){
				this.shop_goods_id = option.shop_goods_id
			}
			if(this.orders_id){
				this.getCheckOrders()
			}
		},
		onPullDownRefresh() {//下拉刷新
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
				orders_id:null,
				shop_goods_id:null
			};
		},
		methods:{
			async getCheckOrders(){
				let [err,res] = await this.$http.post("/api/orders/checkOrdersPaymentStatus",{orders_id:this.orders_id});
				if(res.data.code == 200){
					if(res.data.data.pay_status === 0){
						if(res.data.data.pay_type == 1){
							let[err,res] = await this.$http.post("/api/orders/balancePay",{
								orders_id:this.orders_id,
								pay_password:123456
							});
							if(res.data.code == 200){
								let[err,res] = await this.$http.post("/api/orders/updateOrdersPaymentStatus",{
									orders_id:this.orders_id,
								});
								if(this.shop_goods_id !== null && this.shop_goods_id !== undefined && this.shop_goods_id !== '' && this.shop_goods_id !== 'undefined'){
									let[err,res] = await this.$http.post('/api/customer/updateShopGoodsIntegral',{
										shop_goods_id:this.shop_goods_id,
										orders_id:this.orders_id,
									});
									if(res.data.code === 200){
										uni.showToast({
										    title: '支付成功',
										    duration: 500
										});
										setTimeout(()=> {
											uni.redirectTo({
												url: '/logistics-details/logistics-details/logistics-details?orders_id=' + this.orders_id
											});
										}, 500);
									}
								}else{
									uni.showToast({
									    title: '支付成功',
									    duration: 500
									});
									setTimeout(()=> {
										uni.redirectTo({
											url: '/logistics-details/logistics-details/logistics-details?orders_id=' + this.orders_id
										});
									}, 500);
								}
								
							} else {
								uni.showToast({
									title: '支付失败',
									duration: 300
								});
								setTimeout( ()=> {
									uni.redirectTo({
										url: '/logistic-details/logistics-details/logistics-details?orders_id=' + this.orders_id
									});
								}, 700);
							}
						}else if(res.data.data.pay_type == 2){
							let [err,res] = await this.$http.post("/api/orders/getWeixinMiniAppPayParams",{orders_id:this.orders_id});
							if(res.data.code == 200){
								const temp_orders_id = this.orders_id
								const d_shop_goods_id = this.shop_goods_id
								uni.requestPayment({
								    provider: 'wxpay',
								    timeStamp: "" + res.data.data.timestamp,
								    nonceStr: "" + res.data.data.nonce_str,
								    package: "" + res.data.data.package,
								    signType: 'MD5',
								    paySign: "" + res.data.data.pay_sign,
								    success: function (res) {
										  const token = uni.getStorageSync('token')
										  uni.request({
											url:config.webUrl +"/api/orders/updateOrdersPaymentStatus",
											method:'POST',
											header:{
												'shop': 7, //自定义请求头信息
												'Authorization': token,
											},
											data:{
												orders_id: temp_orders_id
											},
											success:(res) =>{
												if (res.data.code !== 200) {
													  uni.showToast({
														  title: '支付错误' + res.data.code,
														  duration: 500
													  });
													  return
												}
												uni.showToast({
													title: '支付成功',
													duration: 500
												});
												if(d_shop_goods_id !== null && d_shop_goods_id !== undefined && d_shop_goods_id !== '' && d_shop_goods_id !== 'undefined'){
												uni.request({
													url:config.webUrl + "/api/customer/updateShopGoodsIntegral",
													method:'POST',
													header:{
														'shop':7,
														'Authorization':token,
													},
													data:{
														shop_goods_id:d_shop_goods_id,
														orders_id:this.orders_id
													},
													success:(res1)=>{
														if(res.data.code == 200){
															
														}
													}
												})
												}
												setTimeout(()=> {
													uni.redirectTo({
														url: '/logistics-details/logistics-details/logistics-details?orders_id=' + temp_orders_id
													});
												}, 500);
											},
										  })
										
								    },
								    fail: function (err) {
								    }
								});
							}
						}
					} else {
						let[err,res] = await this.$http.post("/api/orders/updateOrdersPaymentStatus",{
							orders_id:this.orders_id,
						});
						uni.showToast({
						    title: '支付成功',
						    duration: 500
						});
						setTimeout(()=> {
							uni.redirectTo({
								url: 'logistics-details/logistics-details/logistics-details?orders_id=' + this.orders_id
							});
						}, 500);
					}
				}
			}
			
		}
	}
</script>

<style lang="scss">
.isloading{
	width:100%;
	height:100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	img{
		width:40%;
	}
}
</style>
