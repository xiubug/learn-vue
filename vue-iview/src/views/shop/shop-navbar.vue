<style scoped lang="less">

</style>
<template>
	<div class="console-navbar navbar-full">
		<div class="product-nav-stage">
			<Menu :theme="theme" active-key="1">
		        <Menu-group title="内容管理">
		            <Menu-item key="1" v-link="{ path: '/shop'}">
		                文章管理
		            </Menu-item>
		            <Menu-item key="2" v-link="{ path: '/shop/comment'}">
		                评论管理
		            </Menu-item>
		            <Menu-item key="3" v-link="{ path: '/shop/left'}">
		                用户留存
		            </Menu-item>
		            <Menu-item key="4" v-link="{ path: '/shop/lost'}">
		                流失用户
		            </Menu-item>
		        </Menu-group>
		    </Menu>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                theme: 'light'
            }
        },
        ready() {
        },
        methods: {
        
        }
    }
</script>