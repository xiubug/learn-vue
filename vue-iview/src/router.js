const routers = {
    // 首页路由
    '': {
        component(resolve) {
            require(['./views/area.vue'], resolve);
        }
    },
    // 商户管理
    '/shop': {
        component(resolve) {
            require(['./views/shop.vue'], resolve);
        },
        subRoutes: {
            '': {
                component(resolve) {
                    require(['./views/shop/article.vue'], resolve);
                }
            },
            '/comment': {
                component(resolve) {
                    require(['./views/shop/comment.vue'], resolve);
                }
            },
            '/left': {
                component(resolve) {
                    require(['./views/shop/left.vue'], resolve);
                }
            },
            '/lost': {
                component(resolve) {
                    require(['./views/shop/lost.vue'], resolve);
                }
            }

        }
    },
    // 蓝卡管理
    '/blue': {
        component(resolve) {
            require(['./views/blue.vue'], resolve);
        }
    },
    // 订单管理
    '/order': {
        component(resolve) {
            require(['./views/order.vue'], resolve);
        }
    },
    // 渠道管理
    '/channel': {
        component(resolve) {
            require(['./views/channel.vue'], resolve);
        }
    },
    // 数据管理
    '/data': {
        component(resolve) {
            require(['./views/data.vue'], resolve);
        }
    },
    // 会员管理
    '/member': {
        component(resolve) {
            require(['./views/member.vue'], resolve);
        }
    },
    '/area': {
        component(resolve) {
            require(['./views/area.vue'], resolve);
        }
    },
    '/staff': {
        component(resolve) {
            require(['./views/staff.vue'], resolve);
        },
        // 定义子路由
        subRoutes: {
            '/news': {
                component(resolve) {
                    require(['./views/tab1.vue'], resolve);
                }
            },
            '/message': {
                component(resolve) {
                    require(['./views/tab2.vue'], resolve);
                }
            }
        }
    }
};

export default routers;
