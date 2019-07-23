define(['cPageView','bsCommon','text!page/temple/categoryItem.html','comUtil','flyPlug','lazyLoading'],
	function(cPageView, bsCommon, tempCategoryItem, comUtil, flyPlug, lazyLoading) {
	var search = cPageView.extend({
		events:{
			'click .productNav .imgSpan,.productInfo .tit':'gotoProduct',
			'click .filterBar>span':'filterClick',
			'click .productNav .buyNum .add':'addBuyNum',
			'click .productNav .buyNum .del':'delBuyNum',
			'click .mycart':'gotoCart'
		},
		initialize: function() {
			bsCommon.renderHeader();
			this.loadProducts();
		},
		// 加载商品列表
		loadProducts: function(){
			var data =[];
			for(var i=1;i<20;i++){
				data.push({
					img:'http://img01.bqstatic.com/upload/goods/000/000/4374/0000004374_03140.jpg@200w_200h_90Q',
					title:'伊利优酸乳草莓味伊利优酸乳草莓味伊利优酸乳草莓味',
					nowPrice:12.5,
					marketPrice:18.4,
					buyNum:0 //购物车数量
				})
			}
			$('.productNav').html(_.template(tempCategoryItem)({data:data,issearch:true,iscart:false}));
			lazyLoading.init();
		},
		filterClick:function(e){
			var targetFilter = $(e.currentTarget);
			targetFilter.siblings().removeClass('select');
			targetFilter.addClass('select');
		},
		gotoProduct:function(){
			Turtle.goTo('product.html');
		},
		gotoCart:function(){
			Turtle.goTo('cart.html');
		},
		// 增加商品数量
		addBuyNum:function(e){
			var addObj = $(e.currentTarget),
				numObj = addObj.siblings('.num'),
				cartNum = $(".mycart .cartNum");

			var _sourceImg = addObj.closest('.productInfo').prev().find('img');
			flyPlug.objectFlyIn(_sourceImg, cartNum, function(){
				cartNum.text(+cartNum.text()+1);
			});
			numObj.text(+numObj.text()+1);
		},

		// 减少商品数量
		delBuyNum:function(e){
			var delObj = $(e.currentTarget),
				numObj = delObj.siblings('.num'),
				cartNum = $(".mycart .cartNum");

			if(+numObj.text()>0){
				cartNum.text(+cartNum.text() - 1);
				var _sourceImg = delObj.closest('.productInfo').prev().find('img');
				flyPlug.objectFlyOut(_sourceImg, cartNum);
				numObj.text(+numObj.text() - 1);
			}
		}
	})
	return new search();
});