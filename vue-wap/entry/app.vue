<template>
    <div class="warpper">
        <download-nav></download-nav>
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">
    import downloadNav from '../components/layout/download-nav.vue';
    import store from '../vuex/store.js';
    import { getRouterName } from '../vuex/getters.js';
    export default {
        ready() {},
        data() {
            return {}
        },
        vuex: {
            getters: { }
        },
        components: {
            downloadNav
        },
        store  // 使用 ES6 和 babel 你可以这样写
    }
</script>

