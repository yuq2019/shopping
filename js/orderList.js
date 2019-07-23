define(['cPageView','bsCommon','text!page/temple/orderListItem.html'],
	function(cPageView, bsCommon, tempOrderListItem) {
	var orderList = cPageView.extend({
		events:{
			'click .picInfo':'gotoOrderDetail'
		},
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '我的订单'
				}
			});
			this.loadProducts();
		},
		// 加载商品列表
		loadProducts: function(){
			var data =[];
			data.push({
				orderId: 12345,
				orderDate: '2016-08-02 01:22:55',
				totalPrice: 169.50,
				state:'已完成',
				products: [{
					id: 100,
					url: 'http://i1.ucaiyuan.com/ugoods/117300000057/117300000057_750.jpg',
					title: '光明 莫斯利安酸奶 350g*6/箱',
				},{
					id: 101,
					url: 'http://i1.ucaiyuan.com/ugoods/117300000055/117300000055_750.jpg',
					title: '光明 莫斯利安酸奶 350g*6/箱',
				},{
					id: 102,
					url: 'http://i1.ucaiyuan.com/ugoods/216200000193/216200000193_750.jpg',
					title: '光明 莫斯利安酸奶 350g*6/箱',
				}],
				buyNum: 3
			});
			for(var i=1;i<3;i++){
				data.push({
					orderId:12345,
					orderDate:'2016-08-02 01:22:55',
					totalPrice:169.50,
					state:'已取消',
					products:[{
						id:100,
						url:'http://i1.ucaiyuan.com/ugoods/117300000057/117300000057_750.jpg',
						title:'光明 莫斯利安酸奶 350g*6/箱',
					}],
					buyNum:1
				});
			}
			$('.orderList').html(_.template(tempOrderListItem)({data:data}));
		},

		gotoOrderDetail: function(){
			Turtle.goTo('orderDetail.html');
		}
	})
	return new orderList();
});