<template>
	<view>
		<view class="eait-box">
			<view class="eait">
				<input type="text" :value="newReceive_name" placeholder="收货人" @blur="getName" />
				<input type="number" :value="newPhone" maxlength="11" placeholder="手机号码" @blur="getPhone"/>
				<view class="Text" @tap="showMulLinkageThreePicker" v-if="isSS">{{pickerText}}</view>
				<view class="Text" @tap="showMulLinkageThreePicker" v-else>{{newProvince_name}} {{newCity_name}} {{newDistrict_name}}</view>
				<input class="details" type="text" color="#c2e2ff"  @blur="getAddress" :value="newAddress" placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等" />
			</view>
			<view class="default">
				<view class="zi">设为默认地址</view>
				<view class="swi">
					<switch @change="isButton" checked style="transform:scale(0.7)" />
				</view>
			</view>
			<view class="del" v-if="isDelete" @click="delAddress">删除收货地址</view>
		</view>
		<button type="primary" size="default" @tap="createCustomerAddress">修改</button>
		<mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		  @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		components:{
			mpvueCityPicker
		},
		onLoad(option) {
			this.d_integral = option.d_integral
			this.id = option.id
		},
		data() {
			return {
				cityPickerValueDefault:[0,0,1],
				pickerText:'所在地区',
				name:null,
				phone:null,
				postcode:null,
				province:null,
				city:null,
				district:null,
				address:null,
				is_default:null,
				isDelete:false,
				id:null,
				newid:null,
				newReceive_name:"",
				newPhone:"",
				newProvince_name:null,
				newCity_name:null,
				newDistrict_name:null,
				newAddress:"",
				isSS:true,
				d_integral:null
			};
		},
		methods:{
			//省市县三级联动
			showMulLinkageThreePicker(){
				this.$refs.mpvueCityPicker.show()
				
			},
			onConfirm(e){
				this.pickerText = e.label
				this.province = e.provinceCode
				this.city = e.cityCode
				this.district = e.areaCode
			},
			onBackPress() {
			  if (this.$refs.mpvueCityPicker.showPicker) {
			  	this.$refs.mpvueCityPicker.pickerCancel();
			    return true;
			  }
			},
			onUnload() {
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel()
				}
			},
			getName(e){
				this.name = e.detail.value
			},
			getPhone(e){
				this.phone = e.detail.value
			},
			getAddress(e){
				this.address = e.detail.value
			},
			isButton(e){
				if(e.detail.value === false){
					e.detail.value = 0
				}else{
					e.detail.value = 1
				}
				this.is_default = e.detail.value
				if(this.is_default === 0){
					this.isDelete = true
				}else{
					this.isDelete = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Text{
		width:100%;
		height:80upx;
		font-size:22upx;
		line-height: 80upx;
		color:#878787;
		border-bottom: 1px solid #f0f0f0;
	}
.eait-box{
	width:100%;
	height: 100%;
}
.eait{
	width:100%;
	height: 356upx;
	background:#ffffff;
	padding: 0 30upx;
	input{
		width:100%;
		height: 81upx;
		border-bottom: 1px solid #f0f0f0;
		color:#999999;
		font-size: 26upx;
	}
	.details{
		border:0;
	}
}
.default{
	width:100%;
	height: 84upx;
	background: #ffffff;
	margin-top:20upx;
	display: flex;
	margin-bottom:20upx;
	.zi{
		font-size:26upx;
		color:#444444;
		line-height: 84upx;
		margin-left: 30upx;
	}
	.swi{
		margin-left: 430upx;
		line-height: 84upx;
	}
}
.del{
	width:100%;
	height: 84upx;
	background: #ffffff;
	display: flex;
	font-size:26upx;
	color:#ec373e;
	line-height: 84upx;
	padding-left: 30upx;
}
button{
	width:100%;
	height: 100upx;
	border-radius: 0;
	border:0;
	line-height: 100upx;
	background: #369eff;
	position: fixed;
	bottom: 0;
}
</style>
