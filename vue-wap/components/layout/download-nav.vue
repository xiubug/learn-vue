<template>
	<div v-show="show" class="download-nav" flex="cross:center">
		<div @click="closeDownloadNav" class="close-icon">
			<img src="../../assets/images/close-icon.png" />
		</div>
		<div class="app-logo"></div>
		<div class="download-introduce">
			<p>新用户免费抽取免单券大奖</p>
			<p>下载app用手机号登录抽奖</p>
		</div>
		<div @click="downloadApp" class="download-btn" flex="main:center cross:center">下载APP</div>
	</div>
</template>

<script type="text/javascript">
	import { changeDownloadNavState} from '../../vuex/actions';
	import { getDownloadNavState } from '../../vuex/getters.js';
	export default {
		vuex: {
	      	getters: {
            	show: getDownloadNavState
        	},
        	actions: {
        		changeDownloadNav: changeDownloadNavState
        	}
	    },
		ready() {},
		methods: {
			closeDownloadNav() {
				this.changeDownloadNav(false);
			},
			downloadApp() {
				
			}
		},
		data() {
			return {}
		},
		components: {
			
		}
	}
</script>