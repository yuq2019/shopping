define(['cPageView','bsCommon','text!page/temple/orderDetailContent.html'],
	function(cPageView, bsCommon, tempOrderDetailContent) {
	var orderDetail = cPageView.extend({
		events:{
			// 'click .productNav .imgSpan':'gotoProduct'
		},
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '订单详情'
				}
			});
			this.loadProducts();
		},
		// 加载商品列表
		loadProducts: function(){
			var data = {
				orderId: 12,
				orderNo: 1608020186812977, //订单号
				addressInfo: {
					name: '殷路辉',
					phone: 13162028090,
					address: '上海市 长宁区 金钟路98号'
				},
				sendDate: '2016-08-06', //配送时间
				orderDate: '2016-08-02 01:22:55', //下单时间
				productPrice: 156.00, //商品总金额
				discountPrice: 10, //优惠金额
				freightPrice: 10, //运费
				totalPrice: 136.00, //应付款
				payment: '线上支付',
				state: '已完成', // 待付款、待收货、已完成
				products: [{
					id: 100,
					url: 'http://i1.ucaiyuan.com/ugoods/117300000057/117300000057_750.jpg',
					title: '光明 莫斯利安酸奶 350g*6/箱',
					price: 78,
					buyNum: 1
				}, {
					id: 100,
					url: 'http://i1.ucaiyuan.com/ugoods/117300000057/117300000057_750.jpg',
					title: '光明 莫斯利安酸奶 350g*6/箱',
					price: 78,
					buyNum: 3
				}, {
					id: 100,
					url: 'http://i1.ucaiyuan.com/ugoods/117300000057/117300000057_750.jpg',
					title: '光明 莫斯利安酸奶 350g*6/箱',
					price: 78,
					buyNum: 5
				}]
			}
			$('.content').html(_.template(tempOrderDetailContent)({data:data}));
		}
	})
	return new orderDetail();
});