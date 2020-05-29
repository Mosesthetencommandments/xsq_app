<template>
    <div class="tabbar">
        <TabItem txt="首页" mark="pages/index/index" :sel="selected" @change-selected="changeSelected">
            <image slot="normalImg" src="../../static/images/APP-01_0007_DI-1.png" alt=""></image>
            <image slot="activeImg" src="../../static/images/APP-01_0003_DI-choose1.png" alt=""></image>
        </TabItem>
        <TabItem txt="直播" 
			mark="share/share/live" 
			:sel="selected" 
			@change-selected="changeSelected">
            <image slot="normalImg" src="../../static/images/APP-01_0006_DI-2.png" alt=""></image>
            <image slot="activeImg" src="../../static/images/APP-01_0002_DI-choose2.png" alt=""></image>
        </TabItem>
        <TabItem txt="会员中心" mark="vip/vip/vip" :sel="selected" @change-selected="changeSelected" class="a">
            <image slot="normalImg" src="../../static/images/blue.png" alt=""></image>
            <image slot="activeImg" src="../../static/images/orange.png" alt=""></image>
        </TabItem>
        <TabItem txt="口袋" mark="pocket/pocket/pocket" :sel="selected" @change-selected="changeSelected">
            <image slot="normalImg" src="../../static/images/APP-01_0005_DI-3.png" alt=""></image>
            <image slot="activeImg" src="../../static/images/APP-01_0001_DI-choose3.png" alt=""></image>
        </TabItem>
        <TabItem txt="我的" mark="mine/mine/mine" :sel="selected" @change-selected="changeSelected">
            <image slot="normalImg" src="../../static/images/APP-01_0004_DI-4.png" alt=""></image>
            <image slot="activeImg" src="../../static/images/APP-01_0000_DI-choose4.png" alt=""></image>
        </TabItem>
    </div>
</template>

<script>
import TabItem from "./tabbarItem"
export default {
    data(){
        return {
            selected:getCurrentPages()[getCurrentPages().length - 1].route,
        }
    },
    methods:{
        changeSelected(sel){
            this.selected = sel;
        },
    },
    components:{
        TabItem
    }
}
</script>

<style lang="scss">
    .tabbar{
        position: fixed;
        width:100%;
        height:100upx;
        left:0;
        bottom:0;
        background: #fff;
        display: flex;
		justify-content: space-around;
		border-top:2upx solid #999999;
		z-index:200;
		.a{
			image{
				border-radius:50%;
				width:80upx;
				height:80upx;
				border :10upx solid #fff;
				margin-top:-60upx;
			}
			span{
				margin-bottom:10upx;
			}
		}
    }
</style>
