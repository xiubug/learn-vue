<template>
  <div class="credit-container">
    <div flex="cross:center" class="credit-tip1">目前只支持<em class="city">杭州</em>地区在校大学生认证！</div>
    <mt-field class="b-bottom" label="真实姓名" placeholder="请输入真实姓名"></mt-field>
    <mt-field label="身份证号" placeholder="请输入与姓名匹配的身份证号"></mt-field>
    <div flex="cross:center" class="credit-tip2">以上信息用于芝麻信用授权</div>
    <div class="credit-form">
      <ul> 
        <li>
          <span class="credit-name">学校名称</span> 
          <p id="showPicker1" data-schooleid="0" class="credit-content">请选择学校名称<em class="credit-icon"></em></p>
        </li> 
        <li>
          <span class="credit-name">学历层次</span> 
          <p id="showPicker2" data-degreetype="0" class="credit-content">请选择学历层次<em class="credit-icon"></em></p> 
        </li> 
        <li>
          <span class="credit-name">学类类型</span> 
          <p id="showPicker3" data-categorytype="0" class="credit-content">请选择学类类型<em class="credit-icon"></em></p> 
        </li> 
        <li>
          <span class="credit-name">入学时间</span> 
          <p id="showPicker4" data-enterdate="0" class="credit-content">请选择入学时间<em class="credit-icon"></em></p>
        </li> 
      </ul> 
      <div class="credit-btn">下一步</div> 
    </div>
  </div>
</template>
<script type="text/javascript">
	import { changeDownloadNavState, changeRouterName } from '../vuex/actions';
	export default {
		vuex: {
	      actions:{
	        changeDownloadNavState,
	        changeRouterName
	      }
	    },
		ready() {
			this.changeDownloadNavState(true);
			this.changeRouterName(this.$route.path);
		},
		data() {
			return { }
		},
		methods: {
			downloadApp() {
				return false;
			}
		},
		components: {
		}
	}
</script>