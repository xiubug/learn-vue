<template>
	<div class="main-content">
		<mt-header fixed title="我的">
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
		<div class="cell-group">
			<mt-cell title="我的财富"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="我的借款"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="我的账单"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="我的银行卡"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="我的卡券"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="邀请好友"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
		</div>
		<div class="cell-group">
			<mt-cell title="我的合同"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="帮助中心"  href="https://www.baidu.com/" is-link>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="客服咨询"  href="https://www.baidu.com/" is-link>
			  <span>400-8849-365</span>
			  <img slot="icon" src="../assets/images/100x100.png" width="24" height="24">
			</mt-cell>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { changeFooterState, changeRouterName } from '../vuex/actions';
	export default {
		vuex: {
	      actions:{
	        changeFooterState,
	        changeRouterName
	      }
	    },
		ready() {
			this.changeFooterState(true);
			this.changeRouterName(this.$route.path);
		},
		data() {
			return {}
		},
		components: {
			
		}
	}
</script>
<style scoped>
	.footer-layout {
		padding-bottom: 15px;
	}
	.cell-group {
		margin-top: 15px;
	}
</style>