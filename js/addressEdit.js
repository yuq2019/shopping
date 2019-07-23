define(['cPageView','bsCommon'],
	function(cPageView, bsCommon) {
	var user = cPageView.extend({
		events:{
			'click .selectCitys':'initCitys',
			'click .btnWrap a':'saveClick'
		},
		initialize: function() {
			this.from = Turtle.getQueryString('from');
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '添加/修改收货地址'
				}
			});
		},
		// 省市区联动
		initCitys:function(){
			var cityobj = $('.selectCitys strong');
			Turtle.showGroupAddressListSelect({
				defaultData: cityobj.text().indexOf('-')>-1?cityobj.text():'河南省-商丘市-梁园区',
				title: '选择地址',
				tips: '',
				onOkAction: function(items) {
					cityobj.text(items[0].name + '-' + items[1].name + '-' + items[2].name);
				}
			});
		},
		saveClick:function(){
			Turtle.goTo('address.html' + (this.from ? '?from=' + this.from : ''));
		}
	})
	return new user();
});