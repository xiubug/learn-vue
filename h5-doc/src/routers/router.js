import qianbao from '../components/qianbao.vue';
import jieneng from '../components/jieneng.vue';
import xkhShop from '../components/xkh-shop.vue';
import xkhUser from '../components/xkh-user.vue';

// 路由
export default function(router) {
	// 定义路由映射
	router.map({
		'*': {
			name: 'qianbao',
			component: qianbao,
			params: {
				userId: 123
			}
		},
		'/qianbao': {
			// 定义路由的名字，方便使用
			name: 'qianbao', 
			// 引用的组件名称，对应上面使用‘import’导入的组件
			component: qianbao
			// component: require('../components/com.vue') 还可以直接使用这样的方式也是没问题的。不过没有import集中引入那么直观
		},
		'/jieneng': {
			name: 'jieneng',
			component: jieneng
		},
		'/xkhshop': {
			name: 'xkhshop',
			component: xkhShop
		},
		'/xkhuser': {
			name: 'xkhuser',
			component: xkhUser
		}
	});
	//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
	router.redirect({
		'*': '/qianbao' //重定向任意未匹配路径到/com
	});

    router.beforeEach(({to, from, next}) => {
    	document.documentElement.style.overflowY='scroll';
	    let toPath = to.path;
	    let fromPath = from.path;
	    if(toPath == '/qianbao') {
	    	document.title = '正蓝钱包';
	    } else if(toPath == '/jieneng') {
	    	document.title = '正蓝节能';
	    } else if(toPath == '/xkhshop') {
	    	document.title = '校开花用户版';
	    } else if(toPath == '/xkhuser') {
	    	document.title = '校开花商户版';
	    }
	    next()
    })

    router.afterEach(function ({to}) {
    	console.log(`成功浏览到: ${to.path}`)
  	})
}