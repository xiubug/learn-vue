<style scoped lang="less">
    .console-topbar {
        position: fixed;
        top: 0;
        left: 0;
	    z-index: 101;
	    clear: both;
	    height: 50px;
	    font-size: 12px;
        width: 100%;
	    .ivu-col {
	    	background: #09C;
	    	height: 50px;
	    	color: #fff;
    		font-size: 14px;
    		line-height: 50px;
            .topbar-home {
                position: relative;
                display: block;
                width: 50px;
                background: #0087b4;
                font-size: 28px;
                color: #FFF;
                text-align: center;
                height: 50px;
                line-height: 50px;
                overflow: hidden;
                float: left;
                &:before {
                    content: '';
                    position: absolute;
                    width: 28px;
                    height: 28px;
                    left: 11px;
                    top: 11px;
                    display: inline-block;
                    background: url(../../images/logo.png) no-repeat center center;
                }
            }
            .topbar-home-link {
                display: inline-block;
                height: 50px;
                box-sizing: border-box;
                padding: 0 20px;
                color: #fff;
                font-size: 14px;
                line-height: 50px;
                border-right: 1px solid #008fbf;
            }
            .topbar-info {
                float: right;
                width: 100px;
                line-height: 50px;
                padding: 0 10px;
                height: 50px;
                display: block;
                z-index: 2;
                background: #09c;
                color: #fff;
                font-size: 14px;
                border-left: 1px solid #008fbf;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                .user-name {
                    display: block;
                    width: 100%;
                    color: #fff;
                    font-size: 14px;
                }
                .ivu-select-dropdown {
                    padding: 0 !important;
                    .ivu-dropdown-item {
                        padding: 0 10px;
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
	    }
    }
</style>
<template>
    <Row class="console-topbar" type="flex">
        <i-col :xs="12" :sm="12" :md="12" :lg="12">
            <a class="topbar-home" target="_blank" href="http://www.crazpay.com/"></a>
            <a href="/" target="_self" class="topbar-home-link">
                <span>管理控制台</span>
            </a>
        </i-col>
        <i-col :xs="12" :sm="12" :md="12" :lg="12">
            <Dropdown trigger="click" class="topbar-info">
                <a href="javascript:void(0)" class="user-name">
                    admin
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <Dropdown-menu slot="list">
                    <Dropdown-item>个人中心</Dropdown-item>
                    <Dropdown-item>重置密码</Dropdown-item>
                    <Dropdown-item>退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
        </i-col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
               
            }
        },
        methods: {
        
        }
    }
</script>