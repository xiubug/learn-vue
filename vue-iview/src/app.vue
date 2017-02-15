<style scoped>
    @import './styles/common.css';
    .console-body {
        position: absolute;
        width: 100%;
        top: 50px;
        bottom: 0px;
        background-color: #fff;
        z-index: 100;
    }
</style>
<template>
    <div class="console-body console-sidebar-full">
        <console-topbar></console-topbar>
        <console-sidebar></console-sidebar>
        <router-view></router-view>
    </div>
</template>
<script>
    import ConsoleTopbar from './components/layout/console-topbar';
    import ConsoleSidebar from './components/layout/console-sidebar';
    export default {
        data () {
            return {
            }
        },
        ready () {

        },
        beforeDestroy () {

        },
        components: {
            ConsoleTopbar,
            ConsoleSidebar
        },
        methods: {

        }
    }
</script>
