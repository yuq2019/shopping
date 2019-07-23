define(['cPageView', 'bsCommon', 'UIHrefList', 'text!page/temple/categoryItem.html', 'UIRadioList', 'flyPlug', 'comUtil','lazyLoading'],
	function(cPageView, bsCommon, UIHrefList, tempCategoryItem, UIRadioList, flyPlug, comUtil, lazyLoading) {
	var cart = cPageView.extend({
		events:{
			'click .productNav .imgSpan,.productInfo .tit':'gotoProduct',
			'click .productNav .checkboxwaper':'checkboxSelect',
			'click .checkall':'checkboxSelectAll',
			'click .payMethod':'showPayMethod',
			'click .receiveTime':'showReceiveTime',
			'click .productNav .buyNum .add':'addBuyNum',
			'click .productNav .buyNum .del':'delBuyNum'
		},
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '购物车'
				}
			});
			bsCommon.renderFooter('cart');
			this.loadProducts();
		},
		// 选择支付方式
		showPayMethod:function(){
			if (!this.payMethod) {
				var demodata = [{id:'toPay', name: '货到付款' }, {id:'aplipay', name: '支付宝' }, {id:'weixin', name: '微信支付' }];
				this.payMethod = new UIRadioList({
					datamodel: {
						title: '选择支付方式',
						data: demodata,
					},
					displayNum: 5,
					onClick: function(data, index) {
						$('.payMethod .selectText').text(data.name);
						this.hide();
					}
				});
			}
			this.payMethod.show();
		},
		// 选择收货时间
		showReceiveTime:function(){
			if (!this.receiveTime) {
				var demodata = [
					{name: '2016-12-4 上午' }, 
					{name: '2016-12-4 下午' }, 
					{name: '2016-12-5 上午' }, 
					{name: '2016-12-5 下午' }, 
					{name: '2016-12-6 上午' }, 
					{name: '2016-12-6 下午' }, 
					{name: '2016-12-7 上午' }, 
					{name: '2016-12-7 下午' }, 
					{name: '2016-12-8 上午' }, 
					{name: '2016-12-8 下午' }, 
					{name: '2016-12-9 上午' },
					{name: '2016-12-9 下午' }];

				this.receiveTime = new UIRadioList({
					datamodel: {
						title: '选择收货时间',
						data: demodata,
					},
					displayNum: 5,
					onClick: function(data, index) {
						$('.receiveTime .selectText').text(data.name);
						this.hide();
					}
				});
			}
			this.receiveTime.show();
		},
		// 加载商品列表
		loadProducts: function(){
			var ajaxData ={
				data:[],
				totalPrice:0
			};
			for(var i=1;i<9;i++){
				ajaxData.data.push({
					img:'http://img01.bqstatic.com/upload/goods/000/000/4374/0000004374_03140.jpg@200w_200h_90Q',
					title:'伊利优酸乳草莓味',
					nowPrice:12.5,
					marketPrice:18.4,
					buyNum:0 //购物车数量
				});
				ajaxData.totalPrice+=0;
			}
			$('.productNav').html(_.template(tempCategoryItem)({data:ajaxData.data,issearch:false,iscart:true}));
			lazyLoading.init();
			$('.toOrder .ttprice i').text(ajaxData.totalPrice);
		},
		gotoProduct:function(){
			Turtle.goTo('product.html');
		},
		// 增加商品数量
		addBuyNum:function(e){
			var addObj = $(e.currentTarget),
				numObj = addObj.siblings('.num'),
				cartNum = $(".footer .cartNum"),
				totalPrice = $('.ttprice i');

			var _sourceImg = addObj.closest('.productInfo').prev().find('img');
			flyPlug.objectFlyIn(_sourceImg, cartNum, function(){
				cartNum.text(+cartNum.text()+1);
			});
			numObj.text(+numObj.text()+1);
			var price = +addObj.closest('.productInfo').find('.price .now h3').text();
			totalPrice.text(+totalPrice.text()+price);
		},

		// 减少商品数量
		delBuyNum:function(e){
			var delObj = $(e.currentTarget),
				numObj = delObj.siblings('.num'),
				cartNum = $(".footer .cartNum"),
				totalPrice = $('.ttprice i');

			if(+numObj.text()>0){
				cartNum.text(+cartNum.text() - 1);
				var _sourceImg = delObj.closest('.productInfo').prev().find('img');
				flyPlug.objectFlyOut(_sourceImg, cartNum);
				numObj.text(+numObj.text() - 1);
				var price = +delObj.closest('.productInfo').find('.price .now h3').text();
				totalPrice.text(+totalPrice.text()-price);
			}
		},
		checkboxSelect: function(e){
			var checkbox = $(e.currentTarget).find('.cm_checkbox');
			if(checkbox.hasClass('checked')){
				checkbox.removeClass('checked');
			}else{
				checkbox.addClass('checked');
			}
		},
		checkboxSelectAll: function(e){
			var checkbox = $(e.currentTarget).find('.cm_checkbox'),
				checkboxitem = $('.productNav .checkboxwaper .cm_checkbox');
			if(checkbox.hasClass('checked')){
				checkbox.removeClass('checked');
				checkboxitem.removeClass('checked');
			}else{
				checkbox.addClass('checked');
				checkboxitem.addClass('checked');
			}

		}
		// gotoProduct:function(){
		// 	Turtle.goTo('product.html');
		// }
	})
	return new cart();
});