define(['cPageView','bsCommon', 'text!page/temple/addressItem.html'],
	function(cPageView, bsCommon, tempAddressItem) {
	var user = cPageView.extend({
		events:{
			'click .modifybtn,.addAddress':'gotoAddressEdit',
			'click .accountSafety .info':'addressClick'
		},
		initialize: function() {
			this.from=Turtle.getQueryString('from');
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '收货地址'
				}
			});
			this.loadAddressList();
		},
		// 加载商品列表
		loadAddressList: function(){
			var data =[{
				name:'殷路辉',
				phone: '131****8090',
				address: '乳山路98号1号楼5楼',
				isDefault:true
			},{
				name:'邓国兴',
				phone: '158****7164',
				address: '上海市 长宁区 金钟路98号',
				isDefault:false
			}];
			$('.accountSafety').html(_.template(tempAddressItem)({data: data}));
		},
		gotoAddressEdit:function(e){
			if($(e.currentTarget).hasClass('modifybtn')){
				Turtle.goTo('addressEdit.html?id=124' + (this.from ? '&from=' + this.from : ''));
			}else{
				Turtle.goTo('addressEdit.html' + (this.from ? '?from=' + this.from : ''));
			}
		},
		addressClick:function(){
			var from = Turtle.getQueryString('from');
			if(from){
				Turtle.goTo(from);
			}
		}
	})
	return new user();
});