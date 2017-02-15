<template>
    <mt-tabbar fixed class="footer-nav">
	    <router-link to="life" class="mint-tab-item">
		    <mt-tab-item>
		    	<p slot="icon" class="img-icon"></p>
	    		生活
			</mt-tab-item>	
	    </router-link>
	    <router-link to="blueCard" class="mint-tab-item">
		    <mt-tab-item>
		    	<img slot="icon" src="../assets/images/common/ic-bluecard.png">
	    		蓝卡
			</mt-tab-item>	
	    </router-link>
	    <router-link to="schoolCost" class="mint-tab-item">
		    <mt-tab-item>
		    	<img slot="icon" src="../assets/images/common/ic-xkh.png">
	    		校花
			</mt-tab-item>	
	    </router-link>
	    <router-link to="my" class="mint-tab-item">
		    <mt-tab-item>
		    	<img slot="icon" src="../assets/images/common/ic-my.png">
	    		我的
			</mt-tab-item>	
	    </router-link>
	</mt-tabbar>
</template>
<script type="text/javascript">
	import { Tabbar, TabItem } from 'mint-ui';
	export default {
		ready() {

		},
		data() {
			return {}
		},
		components: {
			MtTabbar: Tabbar,
			MtTabItem: TabItem
		}
	}
</script>
<style lang="scss">
	.mint-tabbar {
		width: 7.5rem;
		left: 50% !important;
		margin-left: -3.75rem;
	}

	.img-icon {
		background: url(../assets/images/common/ic-life-selected.png) no-repeat center center;
		background-size: cover;
	}

	.mint-tab-item-icon {
		width: .48rem !important;
		height: .48rem !important;
	}
	.mint-tabbar>.mint-tab-item.is-selected {
	    background-color: #eaeaea;
	    color: #26a2ff;
	}
	.mint-tab-item {
		font-size: .2rem;
		color: #969696;
		.mint-tab-item-label {
			font-size: .24rem;
		}
	}
</style>