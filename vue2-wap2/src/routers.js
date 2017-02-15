// 引入组件(直接使用es6的语法)
const viewsPath = './views/';
export default [{
    path: '/life',
    meta: {
        auth: false
    },
    component: (resolve) => {
        require([viewsPath + 'life/index.vue'], resolve);
    }
}, {
    path: '/blueCard',
    component: (resolve) => {
        require([viewsPath + 'blueCard/index.vue'], resolve);
    }
}, {
    path: '/schoolCost',
    component: (resolve) => {
        require([viewsPath + 'schoolCost/index.vue'], resolve);
    }
}, {
    path: '/my',
    component: (resolve) => {
        require([viewsPath + 'my/index.vue'], resolve);
    }
}, {
    path: '*',
    redirect: '/life'
}];
