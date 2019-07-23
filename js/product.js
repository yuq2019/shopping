define(['cPageView','bsCommon','text!page/temple/productContent.html', 'UIImageSlider', 'lazyLoading', 'flyPlug'],
	function(cPageView, bsCommon, tempProductContent, UIImageSlider, lazyLoading, flyPlug) {
	var V ={
		productData:{}
	}
	var category = cPageView.extend({
		events:{
			"click .cart": "gotoCart",
			'click .buyNum .add':'addBuyNum',
			'click .buyNum .del':'delBuyNum',
		},
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '商品详情页'
				}
			});
			this.loadProducts();
			this.imgSlider();

			$('#mainCategory .content').height($(window).height()-$('.header').height()-$('.footer').height());
		},
		// 加载商品列表
		loadProducts: function(){
			V.productData ={
				imgList:[
				  { id: 1, src: '../img/lb/1.jpg'},
				  { id: 2, src: '../img/lb/2.jpg'},
				  { id: 3, src: '../img/lb/3.jpg'}
				],
				title:'伊利优酸乳草莓味',
				nowPrice:12.5,
				marketPrice:18.4,
				buyNum:2, //已购买当前产品的数量
				buyNumCart:12, //购物车商品总数量
				content:'<table style="width: 100%;" border="0" cellpadding="0" cellspacing="0"><tbody><tr class="firstRow"><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d1_750.jpg"></td></tr><tr><td style="vertical-align:middle;width:50%;text-align:right"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_b1.jpg"></td><td style="vertical-align: middle; width: 50%; word-break: break-all;"><p>&nbsp;&nbsp; 商品名称：法国巴黎 天然含气矿泉水（原味）330ml</p><p>&nbsp;&nbsp; 商品品牌：巴黎</p><p>&nbsp;&nbsp; 商品规格：330ml</p><p>&nbsp;&nbsp; 产地：法国</p><p>&nbsp;&nbsp; 保质期限：720天</p><p>&nbsp;&nbsp; 储存方法：常温干燥</p></td></tr><tr><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d2_750.jpg"></td></tr><tr><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d3_750.jpg"></td></tr><tr><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d4_750.jpg"></td></tr><tr><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d5_750.jpg"></td></tr><tr><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d6_750.jpg"></td></tr><tr><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d7_750.jpg"></td></tr><tr><td colspan="2" style="text-align:center;vertical-align:middle"><img style="vertical-align:top;" src="http://i1.ucaiyuan.com/ugoods/60004168/60004168_d8_750.jpg"></td></tr></tbody></table>'
			}
			// 图片设置懒惰加载
			V.productData.content = V.productData.content.replace(/(<img[^>]+\s+)(src\s*=)([^>]+>)/gi, function(rs, $1, $2, $3) {
				return $1 + 'data-echo=' + $3;
			});

			$('.content').html(_.template(tempProductContent)({data:V.productData}));
			lazyLoading.init();
			$('.buyNum .num').text(V.productData.buyNum);
			$('.cart .cartNum').text(V.productData.buyNumCart);
		},
		// 图片轮播
		imgSlider: function() {
			if (this.imgSlider02) return;
			this.imgSlider02 = new UIImageSlider({
				wrapper: $('.imgSlider ul'),
				datamodel: {
					data: V.productData.imgList,
					itemFn: function(item) {
						return '<img data-src="' + item.src + '" src="' + item.src + '">';
					}
				},
				autoPlay:true,
				delaySec:3000,
				playTime:500
			});
			this.imgSlider02.show();
		},
		gotoCart:function(){
			Turtle.goTo('cart.html');
		},
		// 增加商品数量
		addBuyNum:function(e){
			var addObj = $(e.currentTarget),
				numObj = addObj.siblings('.num'),
				cartNum = $(".cartNum");

			var _sourceImg = $('.detailContent img').eq(0);
			flyPlug.objectFlyIn(_sourceImg, cartNum, function(){
				cartNum.text(+cartNum.text()+1);
			});
			numObj.text(+numObj.text()+1);
		},
		// 减少商品数量
		delBuyNum:function(e){
			var delObj = $(e.currentTarget),
				numObj = delObj.siblings('.num'),
				cartNum = $(".cartNum");

			if(+numObj.text()>0){
				cartNum.text(+cartNum.text() - 1);
				var _sourceImg = $('.detailContent img').eq(0);
				flyPlug.objectFlyOut(_sourceImg, cartNum);
				numObj.text(+numObj.text() - 1);
			}
		}

	})
	return new category();
});