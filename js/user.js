define(['cPageView','bsCommon', 'UIHrefList'],
	function(cPageView, bsCommon, UIHrefList) {
	var user = cPageView.extend({
		events:{
			// 'click .productNav .imgSpan':'gotoProduct'
		},
		initialize: function() {
			// bsCommon.renderHeader();
			bsCommon.renderFooter('user');
			this.initSelectItem();
		},
		initSelectItem:function(){
			if(!this.navList){
				var modeldata = [{
					titles: '账户管理',
					titleIcon: '&#xe68a;',
					url: 'userManage.html'
				}, {
					titles: '收货地址',
					titleIcon: '&#xe651;',
					url: 'address.html'
				}, {
					titles: '关于我们',
					titleIcon: '&#xe736;',
					url: 'aboutUs.html'
				}];
				this.navList = new UIHrefList({
					wrapper: $('.menuList'),
					datamodel:{
						data:modeldata
					}
				});	
			}
			this.navList.show()
		},
		// gotoProduct:function(){
		// 	Turtle.goTo('product.html');
		// }
	})
	return new user();
});