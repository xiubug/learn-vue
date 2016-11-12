# vue-demos
重温Vue.js，并将二次学习成果整理成demo分享给大家(v2.0.5)

### Demo01: 该示例主要对Vue.js做一个大致的介绍，大致展示了以下几个功能：

[demo01](https://github.com/sosout/vue-demos/blob/master/demos/demo01.html) 

1. 将数据和DOM已经被绑定在一起({{  }})。
1. 将元素节点的title属性和Vue实例的message属性绑定到一起(v-bind)。
1. 使用v-if指令进行绑定DOM结构到数据(v-if)。
1. 使用v-for循环指令进行绑定数据到数据来渲染列表(v-for)。
1. 使用v-on指令进行绑定监听事件(v-on)。
1. 使用v-model指令进行双向数据绑定(v-model)
1. 用组件构建(应用)

### Demo02: 该示例主要对Vue.js实例做一个大致的介绍，大致展示了以下几个功能：
[demo02](https://github.com/sosout/vue-demos/blob/master/demos/demo02.html) 
* 知识点一、构造器

```js
// 1、通过构造函数Vue创建一个Vue的根实例
var vm = new Vue({
	// 选项
})

// 2、扩展Vue构造器，从而用预定义选项创建可复用的组件构造器
var MyComponent = Vue.extend({
  // 扩展选项
})

// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()

```

* 知识点二、属性与方法
* 知识点三、实例生命周期
