define(['cPageView','bsCommon', 'UIHrefList', 'comUtil'],
	function(cPageView, bsCommon, UIHrefList, comUtil) {
	var userm = cPageView.extend({
		events:{
			'click #exitAccount':'exitLogin'
		},
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '用户管理'
				}
			});
			// bsCommon.renderFooter('user');
			this.initSelectItem();
		},
		initSelectItem:function(){
			if(!this.navList){
				var modeldata = [{
					titles: '绑定手机',
					tip: '131****8090',
					url: 'checkPhone.html?for=modifyphone.html'
				}
				// , {
				// 	titles: '修改登录密码',
				// 	tip: '******',
				// 	url: 'checkPhone.html?for=modifypwd.html'
				// }
				];
				this.navList = new UIHrefList({
					wrapper: $('.accountSafety'),
					datamodel:{
						data:modeldata
					}
				});	
			}
			this.navList.show()
		},
		exitLogin:function(){
			var confirm = Turtle.showConfirm({
				datamodel: {
					content: '确认退出吗？'
				},
				okAction: function() {
					confirm.destroy();
					comUtil.setLoginInfo('');
					Turtle.goTo('index.html');
					// Turtle.ajax.GetJson(AJAXORI + "/common/user_exit.do", {}, function(t) {
					// 	if (t.success) {
					// 		comUtil.setLoginInfo('');
					// 		comUtil.refreshPage();
					// 	} else {
					// 		Turtle.showToast('退出失败，请重新操作！');
					// 	}
					// });
				}.bind(this)
			});
		}
	})
	return new userm();
});