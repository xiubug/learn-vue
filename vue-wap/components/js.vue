<template>
	<div class="js-container">
		<mt-header title="自定义一些常用JS组件"></mt-header>
		<div class="cell-group">
			<mt-cell title="简短的消息提示框"  v-link="{ path: '/js/toast'}" is-link>
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
	.js-container {
		padding-bottom: 15px;
	}
	.cell-group {
		margin-top: 15px;
	}
</style>