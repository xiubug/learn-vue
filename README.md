# vue-demos
###重温Vue.js，并将二次学习成果整理成demo分享给大家(v2.0.5)
Vue.js团队对v2.0版本一次“完全改写”。
##收集了Vue开发中遇到的各种坑、注意事项以及相对解决方案
知识点一、Vue实例只有这些被代理的属性是响应的。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。详细请参考[响应系统](http://cn.vuejs.org/v2/guide/reactivity.html)。

知识点二、不要在实例属性或者回调函数中（如 vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为箭头函数绑定父上下文，所以 this 不会像预想的一样是 Vue 实例，而是 this.myMethod 未被定义。

知识点三、使用 v-once 指令执行一次性地插值，当数据改变时，插值处的内容不会更新。但请注意这会影响到该节点上所有的数据绑定

知识点四、注意：你不能使用v-html来复合局部模板，因为Vue不是基于字符串的模板引擎。组件更适合担任UI重用与复合的基本单元。你的站点上动态渲染的任意HTML可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用HTML插值，绝不要对用户提供的内容插值。

##二次学习整理成的demo
### Demo01: 该示例主要对Vue.js做一个大致的介绍，大致展示了以下几个功能：
[demo01](https://github.com/sosout/vue-demos/blob/master/demos/demo01.html) 

* 知识点一、将数据和DOM已经被绑定在一起(Mustache” 语法（双大括号）)。
* 知识点二、将元素节点的title属性和Vue实例的message属性绑定到一起(v-bind)。
* 知识点三、使用v-if指令进行绑定DOM结构到数据(v-if)。
* 知识点四、使用v-for循环指令进行绑定数据到数据来渲染列表(v-for)。
* 知识点五、使用v-on指令进行绑定监听事件(v-on)。
* 知识点六、使用v-model指令进行双向数据绑定(v-model)
* 知识点七、用组件构建(应用)

### Demo02: 该示例主要对Vue实例做一个大致的介绍，大致展示了以下几个功能：
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

// 所有的`MyComponent`实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

* 知识点二、属性与方法

```js
// 1、每个Vue实例都会代理其data对象里所有的属性：
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3

// 2、除了data属性， Vue实例暴露了一些有用的实例属性与方法
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在`vm.a`改变后调用
})
```

* 知识点三、实例生命周期

```js
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a); // -> "a is: 1"
  }
});
// 也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed 。钩子的 this 指向调用它的 Vue 实例。
```
* 知识点四、生命周期图示
![](https://github.com/sosout/vue-demos/blob/master/demos/images/lifecycle.png)
![](https://github.com/sosout/vue-demos/blob/master/demos/images/lifecycle-hooks.png)

### Demo03: 该示例主要对Vue模板语法做一个大致的介绍，大致展示了以下几个功能：
[demo03](https://github.com/sosout/vue-demos/blob/master/demos/demo03.html) 
* 知识点一、插值

#### 文本
```js
// 数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值
<span>Message: {{ msg }}</span>

// 通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上所有的数据绑定
<span v-once>This will never change: {{ msg }}</span>
```
#### 属性
```js
// Mustache 不能在 HTML 属性中使用，应使用 v-bind 指令
<div v-bind:id="dynamicId"></div>
// 这对布尔值的属性也有效 —— 如果条件被求值为 false 的话该属性会被移除
<button v-bind:disabled="someDynamicCondition">Button</button>
```
####使用JavaScript表达式
```js
// vue.js 都提供了完全的 JavaScript 表达式支持。
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
// 有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
// 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。
```
####过滤器
```js
// Vue.js 允许你自定义过滤器，被用作一些常见的文本格式化。过滤器应该被添加在 mustache 插值的尾部，由“管道符”指示：
{{ message | capitalize }}
// 过滤器函数总接受表达式的值作为第一个参数
new Vue({
  // ...
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
// 过滤器可以串联
{{ message | filterA | filterB }}
// 过滤器是 JavaScript 函数，因此可以接受参数
{{ message | filterA('arg1', arg2) }}
// 这里，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。
```
####指令
######指令（Directives）是带有 v- 前缀的特殊属性。指令属性的值预期是单一 JavaScript 表达式（除了v-for，之后再讨论）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上。
```js
<p v-if="seen">Now you see me</p>
```
####参数
######一些指令能接受一个“参数”，在指令后以冒号指明。例如， v-bind指令被用来响应地更新 HTML 属性：
```js
<p v-if="seen">Now you see me</p>
```
######另一个例子是 v-on 指令，它用于监听 DOM 事件：
```js
<a v-on:click="doSomething">
```
####修饰符
######修饰符（Modifiers）是以半角句号 . 指明的特殊后缀，用于指出一个指定应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
```js
<form v-on:submit.prevent="onSubmit"></form>
```
####缩写
######v-bind缩写
```js
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```
######v-on缩写
```js
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```