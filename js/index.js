define(['cPageView','bsCommon', 'UIImageSlider','UISlider', 'UIHeader'],
	function(cPageView, bsCommon, UIImageSlider, UISlider, UIHeader) {
	var index = cPageView.extend({
		initialize: function() {
			bsCommon.renderHeader({back:false});
			bsCommon.renderFooter('index');

			this.imgSlider();
			this.hotProductSlider();
		},
		// 图片轮播
		imgSlider: function() {
			if (this.imgSlider01) return;
			var data = [
			  { id: 1, src: '../img/lb/1.jpg'},
			  { id: 2, src: '../img/lb/2.jpg'},
			  { id: 3, src: '../img/lb/3.jpg'}
			];
			this.imgSlider01 = new UIImageSlider({
				wrapper: $('.ad-slide ul'),
				datamodel: {
					data: data,
					itemFn: function(item) {
						return '<img data-src="' + item.src + '" src="' + item.src + '">';
					}
				},
				autoPlay:true,
				delaySec:3000,
				playTime:500
			});
			this.imgSlider01.show();
		},
		// 热销商品滚动
		hotProductSlider: function() {
			if (this.slider01)
				return;
			var data = [];
			for (var i = 0; i < 20; i++) {
				data.push({
					id: i+1,
					img: 'http://i1.ucaiyuan.com/ugoods/110400000114/110400000114_750.jpg',
					title: '山东红富士 8粒',
					price: 11.8,
					limitCount: 500
				})
			}

			this.slider01 = new UISlider({
				displayNum: 3,
				index: -1,
				needLoop: true,
				datamodel: {
					data: data,
					itemFn: function(item) {
					             return '<a href="product.html?id='+item.id+'" class="img_wrap">'+
			                          '<img src="'+item.img+'" class="auto_pos">'+
			                      '</a>'+
			                      '<h3 class="title">'+item.title+'</h3>'+
			                      '<div class="price_num">'+
			                          '<span class="price"><label>￥</label>'+item.price+'</span>'+
			                          '<span class="limit_count">仅'+item.limitCount+'份</span>'+
			                      '</div>';
					}
				},
				wrapper: $('.newProductList'),
				itemClick: function() {
					console.log('itemClick:当前选择：' + 'id: ' + item.id + ', ' + 'title: ' + item.title);
				},
				changed: function(item) {
					console.log('changed:当前选择：' + 'id: ' + item.id + ', ' + 'title: ' + item.title);
				}
			});
			this.slider01.show();
		}
	})
	return new index();
});