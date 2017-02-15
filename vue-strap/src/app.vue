<template>
    <div>
        <top-layout></top-layout>
        <!--row-->
            <div class="container">
                <div class="row row-offcanvas row-offcanvas-right">
                    <router-view></router-view>
                    <!-- sidebar -->
                        <right-nav></right-nav>
                    <!--/sidebar-->
                </div>
            </div>
        <!--/row-->
    </div>
</template>

<script type="text/javascript">
  import topLayout from './components/layout/top-layout.vue';
  import rightNav from './components/layout/right-nav.vue';
  export default {
    ready() {

    },
    data() {
      return {
        isApp: true
      }
    },
    components: {
      topLayout,
      rightNav
    }
  }
</script>
