import config from './config.js';
export default{
	wx_login(){
		// const openid = uni.getStorageSync('wx_open_id');
		// if (openid) {
		// 	return
		// }
		// uni.reLaunch({
		// 	url:'/wx_login/wx_login.vue'
		// })
		uni.getProvider({
			service: 'oauth',
			success: (res)=> {
				// console.log(res.provider)
				if (~res.provider.indexOf('weixin')) {
					uni.login({
						provider: 'weixin',
						success: (loginRes)=> {
							let code = loginRes.code;
							// console.log(code);
							// 获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: (infoRes)=> {
									// console.log(infoRes);
								},
								fail(err) {
									console.log(err)
								}
							});
							 //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
							uni.request({
								url: config.webUrl + '/api/customer/getAppletOpenId',
								data: {
									code: code,
								},
								method: 'POST',
								header: {
									'shop': 1
								},
								success: (res) => {
									//openId、或SessionKdy存储//隐藏loading
									uni.setStorageSync('wx_open_id', res.data.data.data.openid);
									uni.setStorageSync('wx_union_id', res.data.data.data.unionid);
									uni.request({
										url: config.webUrl + '/api/customer/wxAppletLogin',
										data: {
											wx_applet_open_id:res.data.data.data.openid,
											wx_union_id:res.data.data.data.unionid
										},
										method: 'POST',
										header: {
											'shop': 1
										}, 
										success: (res) => {
											if(res.data.data.success_message == 'success' ){
												uni.setStorageSync('token', res.data.data.token);
											}else{
												uni.request({
													url: config.webUrl + '/api/customer/wxAppletRegister',
													data: {
														wx_applet_open_id:res.data.data.data.openid,
														wx_union_id:res.data.data.data.unionid
													},
													method: 'POST',
													header: {
														'shop': 1
													}, 
													success: (res) => {
														//openId、或SessionKdy存储//隐藏loading
														console.log(res)
														if(res.data.data.success_message === "success"){
															uni.setStorageSync('token', res.data.data.token);
														}
													}
												});
											}
										}
									});
								}
							});
						}
					});
				}
			}
		});
	}
}

	
