<template>
    <!-- col-xs-12 -->
    <div class="col-xs-12 col-md-9">
        <section class="vuestrap-docs-demo" id="alert">
            <!-- Meta title -->
            <h2 class="meta-title">校开花商户版h5相关文档</h2>
            <div class="m-b"></div>
            <div class="m-b-md"></div>
            <accordion :one-at-atime="true" type="info">
                <panel header="校开花商户版九月免息活动" type="success">
                    <interest-free201691></interest-free201691>
                </panel>
                <panel header="校开花商户版二" type="success">
                    ...
                </panel>
                <panel header="校开花商户版三" type="success">
                    ...
                </panel>
                <panel header="校开花商户版四" type="success">
                    ...
                </panel>
                <panel header="校开花商户版五" type="success">
                    ...
                </panel>
            </accordion>
        </section>
    </div>
    <!-- /col-xs-12 -->
</template>
<script>
import interestFree201691 from './qianbao/interestFree201691.vue';
import {
    accordion,
    panel
} from 'vue-strap/dist/vue-strap.js';
export default {
    replace: false,
    data() {
        return {
            text: 'vue'
        }
    },
    components: {
        accordion,
        panel,
        interestFree201691
    }
}
</script>
