// 引入静态资源
import 'normalize.css';

//引入flex
import 'flex.css';

import 'mint-ui/lib/style.css';
import '../assets/css/font.css';
import '../assets/css/styles.css';

import '../assets/css/LArea.css';

import app from './app.vue';

import routerMap from '../routers/router.js';

// 引入vue
import Vue from 'vue';
// 引入MintUI
import MintUI from 'mint-ui';
// 引入vue-router
import VueRouter from 'vue-router';
// 引入vue-resource
import VueResource from 'vue-resource';
import FastClick from '../assets/js/fastclick.js';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    hashbang: false
});
routerMap(router);

// 路由器需要一个根组件
const App = Vue.extend(app);

router.start(App, '#app');
