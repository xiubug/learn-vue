<template>
	<div class="col-xs-12 col-md-3 sidebar-offcanvas hidden-sm-down">
        <div class="vuestrap-docs-search list-group">
            <!-- search -->
            <div class="list-group-item list-group-search">
                <input type="text" class="form-control" placeholder="Search..." autocomplete="off">
            </div>
            <!-- components -->
            <a class="list-group-item" v-link="{ path: '/qianbao', activeClass: 'active' }">正蓝钱包</a>
            <a class="list-group-item" v-link="{ path: '/jieneng', activeClass: 'active' }">正蓝节能</a>
            <a class="list-group-item" v-link="{ path: '/xkhuser', activeClass: 'active' }">校开花用户版</a>
            <a class="list-group-item" v-link="{ path: '/xkhshop', activeClass: 'active' }">校开花商户版</a>
        </div>
    </div>
</template>

<script type="text/javascript">
	export default {
		ready() {

		},
		data() {
			return {
				
			}
		},
		components: {
			
		}
	}
</script>
