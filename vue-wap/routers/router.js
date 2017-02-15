import credit from '../components/credit.vue';
import login from '../components/login.vue';
import authent from '../components/authent.vue';
import my from '../components/my.vue';
import jsToast from '../components/js/toast.vue';

// 路由
export default function(router) {
    // 定义路由映射
    router.map({
        '*': {
            name: 'credit',
            component: credit
        },
        '/credit': {
            // 定义路由的名字，方便使用
            name: 'credit',
            // 引用的组件名称，对应上面使用‘import’导入的组件
            component: credit
                // component: require('../components/credit.vue') 还可以直接使用这样的方式也是没问题的。不过没有import集中引入那么直观
        },
        '/login': {
            name: 'login',
            component: login
        },
        '/authent': {
            name: 'authent',
            component: authent
        },
        '/my': {
            name: 'my',
            component: my
        },
        '/js/toast': {
            name: jsToast,
            component: jsToast
        }
    });
    //定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    router.redirect({
        '*': '/credit' //重定向任意未匹配路径到/com
    });

    router.beforeEach(({ to, from, next }) => {
        let toPath = to.path;
        if (toPath == '/credit') {
            document.title = '授信认证';
        } else if (toPath == '/login') {
            document.title = '注册/登录';
        } else if (toPath == '/authent') {
            document.title = '我的认证';
        } else if (toPath == '/my') {
            document.title = '我的';
        } else if (toPath == '/js/toast') {
            document.title = '简短的消息提示框';
        } else if (toPath == '/js/indicator') {

        }
        let iframe = document.createElement('iframe');
        iframe.src = '/screen_icon.png';
        iframe.style.display = 'none';
        (document.body || document.documentElement).appendChild(iframe);
        iframe.onload = function() {
            setTimeout(function() {
                iframe.remove()
            }, 0);
        }

        next();
    });

    router.afterEach(function({ to }) {
        console.log(`成功浏览到: ${to.path}`)
    });
}
