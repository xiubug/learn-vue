<template>
    <mt-tabbar fixed v-show="show">
        <mt-tab-item id="index" v-link="{ path: '/index', activeClass: 'is-selected v-link-active' }">
            <img slot="icon" src="../../assets/images/100x100.png"> 首页
        </mt-tab-item>
        <mt-tab-item id="js" v-link="{ path: '/js', activeClass: 'is-selected v-link-active' }">
            <img slot="icon" src="../../assets/images/100x100.png"> JS组件
        </mt-tab-item>
        <mt-tab-item id="css" v-link="{ path: '/css', activeClass: 'is-selected v-link-active' }">
            <img slot="icon" src="../../assets/images/100x100.png"> CSS组件
        </mt-tab-item>
        <mt-tab-item id="my" v-link="{ path: '/my', activeClass: 'is-selected v-link-active' }">
            <img slot="icon" src="../../assets/images/100x100.png"> 我的
        </mt-tab-item>
    </mt-tabbar>
</template>


<script type="text/javascript">
	import { Tabbar, TabItem } from 'mint-ui';
    import { getFooterState } from '../../vuex/getters.js';
    import store from '../../vuex/store.js';
	export default {
		ready() {

		},
		data() {
			return {}
		},
        vuex: {
            getters: {
                show: getFooterState
            }
        },
		components: {
			Tabbar,
			TabItem
		}
	}
</script>

<style scoped>
    .mint-tab-item {
        text-decoration: none;
        color: #333;
    }
</style>