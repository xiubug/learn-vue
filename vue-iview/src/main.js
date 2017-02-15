import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './app.vue'; // 路由挂载
import Routers from './router'; // 路由列表
import Env from './config/env';
import iView from 'iview';
import 'iview/dist/styles/iview.css'; // 使用css

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
let router = new VueRouter({
    // 是否开启History模式的路由,默认开发环境开启,生产环境不开启。如果生产环境的服务端没有进行相关配置,请慎用
    history: Env != 'production'
});

router.map(Routers);

router.beforeEach(() => {
    window.scrollTo(0, 0);
});

router.afterEach(() => {

});

router.redirect({
    '*': ''
});
router.start(App, '#app');
