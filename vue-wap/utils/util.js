import IScroll from '../assets/js/iscroll-probe.js';

// IScroll 初始化
export const scrollObj = (id) => {
	let myScroll = new IScroll(id, {
	    probeType: 3,
	    //momentum: false,//关闭惯性滑动
	    mouseWheel: true, //鼠标滑轮开启
	    scrollbars: true, //滚动条可见
	    scrollbars: 'custom',
	    interactiveScrollbars: true, //滚动条可拖动
	    shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
	    useTransform: true, //CSS转化
	    useTransition: true, //CSS过渡
	    bounce: true, //反弹
	    freeScroll: false, //只能在一个方向上滑动
	    startX: 0,
	    startY: 0
	});
	return myScroll;
};

// IScroll 刷新页面
export const onCompletion = (obj) => {
    setTimeout(function() {
        obj.refresh();
    }, 0);
};
