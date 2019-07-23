/**
 * 重用工具和方法
 */
define(function() {
	var util ={
		// 获取当前点击的元素jquery对象
		getthis:function(e){
			return $(e.target || e.srcElement);
		},
		// 简化手机号码
		getMobileInfo:function(mobile){
			if(mobile.length==11){
					return mobile.substr(0,3) +'****'+ mobile.substr(mobile.length-4);
			}else{
				return mobile;
			}
		},
		// 设置登录信息
		setLoginInfo:function(value){
			return Turtle.setCookie('loginInfo',value);
		},
		// 获取登录信息
		getLoginInfo:function(){
			return Turtle.getCookie('loginInfo');
		},
		// 刷新页面
		refreshPage:function(){
			window.location.reload();
		}		
	};
	return util;
});