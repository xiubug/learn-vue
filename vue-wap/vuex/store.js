/**
 * Created by weichanghua on 16/9/9.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import film from './modules/film';
import app from './modules/app';
import createLogger from 'vuex/logger';

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
Vue.config.debug = debug;

export default new Vuex.Store({
  middlewares: debug ? [createLogger()] : [],
  modules: {
    film,
    app
  },
  strict: debug  // 这个属性如果设置true 一旦非mutation地方修改store里的值 就会提示error,意思就别随便动我的状态
});
