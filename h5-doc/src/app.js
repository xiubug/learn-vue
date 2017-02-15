// 引入静态资源
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

import app from './app.vue';

import routerMap from './routers/router.js';

// 引入vue
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';



Vue.config.debug = process.env.NODE_ENV !== 'production';

Vue.use(VueRouter);

const router = new VueRouter({
	hashbang: false
});
routerMap(router);

// 路由器需要一个根组件
const App = Vue.extend(app);

router.start(App, '#app');
