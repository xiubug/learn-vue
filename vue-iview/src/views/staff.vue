<style scoped lang="less">
    .index{
        width: auto;
        position: absolute;
        top: 50px;
        bottom: 0;
        left: 180px;
        text-align: center;
        padding: 20px 30px;
        min-width: 750px;
    	min-height: 500px;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
        }
        .ivu-row{
            height: 100%;
        }
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
<template>
    <div class="index">
    	<div class="nav"></div>
    	<i-col span="24" class="demo-tabs-style2">
	    	<Tabs type="card" closable :animated="false">
		        <Tab-pane label="messages">
		        	<indexcomponent></indexcomponent>
		        </Tab-pane>
		        <Tab-pane label="news">
		        	<testcomponent></testcomponent>
		        </Tab-pane>
		    </Tabs>
		</i-col>
	</div>
</template>
<script>
	import indexcomponent from "./tab2.vue";
	import testcomponent from "./tab1.vue";
    export default {
        data () {
            return {
            }
        },
        methods: {
        },
        components: {
        	indexcomponent,
        	testcomponent
        }
    }
</script>
