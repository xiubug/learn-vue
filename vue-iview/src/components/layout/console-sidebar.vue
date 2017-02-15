<style scoped lang="less">
    .console-sidebar {
        position: fixed;
        top: 50px;
        bottom: 0px;
        background-color: #293038;
        z-index: 102;
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
        width: 0px;
        .sidebar-content {
            width: 200px !important;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            background: #293038;
            .sidebar-fold {
                height: 30px;
                width: 180px;
                background: #394555;
                color: #aeb9c2;
                text-align: center;
                line-height: 30px !important;
                font-size: 24px;
                user-select: none;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
            }
        }
        .ivu-menu, .ivu-menu-item {
            font-size: 12px;
        }
        .ivu-menu .v-link-active {
            border-right: none;
            color: #fff;
            background: #0099cc !important;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {
            color: #fff;
            background: #37424f 0 0!important;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
            background: #0099cc !important;
        }

        .ivu-menu-submenu {
            background: #37424f;
            border-bottom: 1px solid #414d5c;
        }

        .ivu-menu-submenu > .ivu-menu-submenu-title {
            position: absolute;
        }

        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
            background: #22282e !important;
        }

        .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
            padding: 11px 24px 11px 44px;
        }
    }
    .console-sidebar-full .sidebar-full {
        width: 180px;
    }
</style>
<template>
    <div class="console-sidebar sidebar-full">
        <Menu :theme="theme" :open-keys="['1']" class="sidebar-content" accordion>
            <div class="sidebar-fold">
                <Icon type="android-more-vertical"></Icon>
            </div>
            <Submenu key="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    产品与服务
                </template>
                <Menu-item key="1-1" v-link="{ path: '/shop'}"><Icon type="ios-paper"></Icon>商户管理</Menu-item>
                <Menu-item key="1-2" v-link="{ path: '/blue'}"><Icon type="ios-paper"></Icon>蓝卡管理</Menu-item>
                <Menu-item key="1-3" v-link="{ path: '/order'}"><Icon type="ios-paper"></Icon>订单管理</Menu-item>
                <Menu-item key="1-4" v-link="{ path: '/channel'}"><Icon type="ios-paper"></Icon>渠道管理</Menu-item>
                <Menu-item key="1-5" v-link="{ path: '/data'}"><Icon type="ios-paper"></Icon>数据管理</Menu-item>
            </Submenu>
            <Submenu key="2">
                <template slot="title">
                    <Icon type="ios-people"></Icon>
                    用户中心
                </template>
                <Menu-item key="2-1" v-link="{ path: '/member'}"><Icon type="ios-paper"></Icon>会员管理</Menu-item>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme: 'dark'
            }
        },
        ready() {
        },
        methods: {
        
        }
    }
</script>