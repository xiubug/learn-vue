<style scoped lang="less">

</style>
<template>
    <div class="console-product">
    	<shop-navbar></shop-navbar>
		<div class="console-product-body">
			<router-view></router-view>
		</div>
    </div>
</template>
<script>
	import ShopNavbar from './shop/shop-navbar.vue';
    export default {
    	ready() {
    		
    	},
        data () {
            return {
            }
        },
        components: {
        	ShopNavbar
        },
        methods: {

        }
    }
</script>
