<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 50px;
        bottom: 0;
        left: 0;
        text-align: center;
        padding: 20px;
        padding-left: 180px;
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
        .option-top{
        	width: 98%;
        	height: 100px;
        	margin: 0 auto;
        	border: 1px solid #ccc;
        	text-align: left;
        }
        .table{
        	width: 98%;
        	margin: 0 auto;
        }
    }
</style>
<template>
    <div class="index">
    	<div class="nav"></div>
    	<Row type="flex" justify="center" align="middle" class="option-top">
    		<i-col span="3">
    			<i-button type="info">编辑区域</i-button>
    		</i-col>
    		<i-col span="4"><selectcomponent></selectcomponent></i-col>
    		<i-col span="4"><selectcomponent></selectcomponent></i-col>
    		<i-col span="4"><i-input :value.sync="value" placeholder="请输入..." style="width: 200px"></i-input></i-col>
    		<i-col span="2"><i-button type="success">重置</i-button></i-col>
    		<i-col span="2"><i-button type="info">查询</i-button></i-col>
    		<i-col span="2"><i-button>导出</i-button></i-col>
    	</Row>
    	<div class="table">
    		<tablecomponent></tablecomponent>
    	</div>
	</div>
</template>
<script>
    import tablecomponent from "../components/main-container/table.vue";
    import selectcomponent from "../components/main-container/select.vue";
    export default {
        data () {
            return {
            }
        },
        methods: {
            toLoading () {
                this.loading = true;
            },
            toLoading2 () {
                this.loading2 = true;
            }
        },
        components:{tablecomponent,selectcomponent}
    }
</script>
