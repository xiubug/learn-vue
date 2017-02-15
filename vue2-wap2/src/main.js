// 引入静态资源
import './assets/css/reset.css'; // reset
import 'flex.css'; // flex

import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routers';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes: routes
});

router.beforeEach(({ meta, path }, from, next) => {
    next();
});

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
