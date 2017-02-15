<template>
	<div class="js-container">
		<mt-header fixed title="简短的消息提示框">
			<mt-button v-link="'/js'" icon="back" slot="left"></mt-button>
		</mt-header>
		<div class="toast-container">
			<mt-button class="mg-top15" size="large" type="primary" @click="basedToast">点击弹出普通消息提示框</mt-button>
			<mt-button class="mg-top15" size="large" type="primary" @click="iconToast">点击弹出带icon的消息提示框</mt-button>
			<mt-button class="mg-top15" size="large" type="primary" @click="positionToast">点击弹出自定义位置的消息提示框</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { changeFooterState, changeRouterName } from '../../vuex/actions';
	import { Toast } from 'mint-ui';
	export default {
		vuex: {
	      actions:{
	        changeFooterState,
	        changeRouterName
	      }
	    },
		ready() {
			this.changeFooterState(false);
			this.changeRouterName(this.$route.path);
		},
		methods: {
			basedToast() {
				Toast({
					message: '普通提示框',
					duration: 1000
				});
				return false;
			},
			iconToast() {
				Toast({
				  message: '带icon提示框',
				  iconClass: 'icon icon-success',
				  duration: 1000
				});
				return false;
			},
			positionToast() {
				Toast({
				  message: '自定义位置提示框',
				  position: 'bottom',
				  duration: 1000
				});
				return false;
			}
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
	.toast-container {
		padding: 44px 15px 55px 15px;
	}
	.cell-group {
		margin-top: 15px;
	}
</style>