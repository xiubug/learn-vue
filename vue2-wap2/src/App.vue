<template>
	<div id="app" class="warpper">
	  <!-- 路由出口 -->
	  <!-- 路由匹配到的组件将渲染在这里 -->
	  <router-view></router-view>
	  <footer-nav></footer-nav>
	</div>
</template>

<script>
	import FooterNav from './components/footer-nav';
	export default {
		ready() {
			
		},
		components: {
			FooterNav
		}
	};
</script>

<style lang="scss">
	.warpper {
	    position: relative;
	    width: 7.5rem;
	    height: 100%;
	    margin: 0 auto;
	    background-color: #f8f8f8;
	}
</style>