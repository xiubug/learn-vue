<template>
    <!-- col-xs-12 -->
    <div class="col-xs-12 col-md-9">
        <section class="vuestrap-docs-demo" id="alert">
            <!-- Meta title -->
            <h2 class="meta-title">正蓝钱包h5相关文档</h2>
            <div class="m-b"></div>
            <div class="m-b-md"></div>
            <accordion :one-at-atime="true" type="info">
                <panel header="正蓝钱包邀好友 领现金(banner页)" type="success">
                    <receive-cash201699></receive-cash201699>
                </panel>
                <panel header="正蓝钱包新人专享取现零费用(banner页)" type="success">
                    <new-activities201699></new-activities201699>
                </panel>
                <panel header="正蓝钱包九月免息活动" type="success">
                    <interest-free201691></interest-free201691>
                </panel>
                <panel header="正蓝钱包二" type="success">
                    ...
                </panel>
            </accordion>
        </section>
    </div>
    <!-- /col-xs-12 -->
</template>
<script>
import interestFree201691 from './qianbao/interestFree201691.vue';
import newActivities201699 from './qianbao/newActivities201699.vue';
import receiveCash201699 from './qianbao/receiveCash201699.vue';
import {
    accordion,
    panel
} from 'vue-strap/dist/vue-strap.js';
export default {
    replace: false,
    ready() {},
    data() {
        return {
            
        }
    },
    components: {
        accordion,
        panel,
        interestFree201691,
        newActivities201699,
        receiveCash201699
    }
}
</script>
