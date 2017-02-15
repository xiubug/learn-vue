<template>
	<div class="authent-container"></div>
</template>
<script type="text/javascript">
	import { changeRouterName } from '../vuex/actions';
	export default {
		vuex: {
	      actions:{
	        changeRouterName
	      }
	    },
		ready() {
			this.changeRouterName(this.$route.path);
		},
		data() {
			return {}
		},
		methods: {
			primary() {
				return false;
			}
		},
		components: {
		}
	}
</script>