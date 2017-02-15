<style scoped lang="less">
</style>
<template>
    <div>
	    <Row type="flex" justify="center" align="middle">
	        <i-col span="24">
	            <h1>
	                <img src="../images/logo.png">
	            </h1>
	            <h2>message</h2>
	        </i-col>
	    </Row>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                loading: false,
                loading2: false
            }
        },
        methods: {
            toLoading () {
                this.loading = true;
            },
            toLoading2 () {
                this.loading2 = true;
            }
        }
    }
</script>
