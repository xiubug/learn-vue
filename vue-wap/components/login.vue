<template>
	<div class="login-container">
		<div class="login-logo"></div>
		<div class="login-form">
			<div class="login-input">
				<div class="input-label top3">手机号</div>
				<div flex="cross:center" class="input-mobile">
					<input @focus="getFocus(0)" @blur="getBlur(0)" maxlength="11" type="tel" name="mobile" />
				</div>
			</div>
			<div class="login-input">
				<div class="input-label top3">验证码</div>
				<div flex="cross:center" class="input-code">
					<input @focus="getFocus(1)" @blur="getBlur(1)" maxlength="4" type="tel" name="mobile" />
				</div>
				<div class="code-about">
					<p @click="getCode" class="get-code">{{codeText}}&nbsp;&nbsp;</p>
					<p class="forget-code">收不到验证码？</p>
				</div>
			</div>
			<div flex="main:center cross:center" class="login-btn">登录</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { changeDownloadNavState, changeRouterName } from '../vuex/actions';
	export default {
		vuex: {
	      actions:{
	        changeDownloadNavState,
	        changeRouterName
	      }
	    },
		ready() {
			this.changeDownloadNavState(false);
			this.changeRouterName(this.$route.path);
		},
		data() {
			return { 
				codeText: '获取验证码'
			}
		},
		methods: {
			getFocus(index) {
				return;
			},
			getBlur(index) {
				return;
			},
			getCode() {
				return;
			}
		},
		components: {
		}
	}
</script>