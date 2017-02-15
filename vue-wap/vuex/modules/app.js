/**
 * Created by weichanghua on 16/10/13.
 */
import {
    CHANGE_LEFTNAV_STATE,
    START_LOADING,
    FINISH_LOADING,
    CHANGE_DOWNLOADNAV_STATE,
    CHANGE_ROUTER_NAME
} from '../mutation-type'

const state = {
    leftNavState: false,
    loading: false,
    downloadNavState: false,
    routerName: '*'
}

const mutations = {
    //切换左侧导航的显示状态
    [CHANGE_LEFTNAV_STATE](state, isShow) {
        state.leftNavState = isShow
    },
    [START_LOADING](state) {
        state.loading = true
    },
    [FINISH_LOADING](state) {
        state.loading = false
    },
    [CHANGE_DOWNLOADNAV_STATE](state, isShow) {
        state.downloadNavState = isShow;
    },
    [CHANGE_ROUTER_NAME](state, routerName) {
        state.routerName = routerName;
    }
}

export default {
    state,
    mutations
}
