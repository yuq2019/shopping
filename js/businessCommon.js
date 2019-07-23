/**
 * 公共业务处理
 */
define(['cPageView','UIHeader','text!page/temple/footNav.html', 'UISearchLayer','comUtil'],
	function(cPageView,UIHeader, tempFootNav, UISearchLayer, comUtil) {
		var bsCommon = cPageView.extend({
			events: {

			},
			initialize: function() {},

			// 渲染头部
			renderHeader: function(params) {
				if (!this.header) {
					var hDom = $('.header');
					this.header = new UIHeader({
						'root': hDom,
						'wrapper': hDom
					});
					var scope = this;
					this.header.set(_.extend({
						back: true,
						center: {
							tagname: 'search',
							callback:function(e){
								if(this.searchlayer){
									this.searchlayer.destroy();
								}
								this.searchlayer = new UISearchLayer({
									datamodel:{
										placeholder: '输入关键字搜索，如“苹果”', // 搜索输入框placeholder值
										hotSearchTxt: '热门搜索', // 热门搜索标题，如：‘大家都在查、热门搜索等’
										searchTxt: '搜索', // 搜索按钮文本
										targetUrl: 'search.html?keyword=', // 搜索结果页url，关键字会拼接到此url后面
										// 热门搜索信息
										hotSearchList:[{name:'金奇异果'},{name:'脐橙'},{name:'柚子'},{name:'苹果'},{name:'牛油果'},{name:'火龙果'},{name:'丸子'},{name:'樱桃'}],
									},
									// 搜索输入值改变时触发
									changeHandler:function(keyword,callback){
										callback = callback||function(){};
										// 根据关键字查询数据的方法
										var sourceDatas = [{name: "美国苹果"}, {name: "苹果"}, {name: "姬娜苹果"}, {name: "阿克苏苹果"}, {name: "冰糖心苹果"}, {name: "青苹果"},
										{name: "美国苹果"}, {name: "苹果"}, {name: "姬娜苹果"}, {name: "阿克苏苹果"}, {name: "冰糖心苹果"}, {name: "青苹果"},
										{name: "美国苹果"}, {name: "苹果"}, {name: "姬娜苹果"}, {name: "阿克苏苹果"}, {name: "冰糖心苹果"}, {name: "青苹果"},
										{name: "美国苹果"}, {name: "苹果"}, {name: "姬娜苹果"}, {name: "阿克苏苹果"}, {name: "冰糖心苹果"}, {name: "青苹果"},
										{name: "美国苹果"}, {name: "苹果"}, {name: "姬娜苹果"}, {name: "阿克苏苹果"}, {name: "冰糖心苹果"}, {name: "青苹果"},
										{name: "美国苹果"}, {name: "苹果"}, {name: "姬娜苹果"}, {name: "阿克苏苹果"}, {name: "冰糖心苹果"}, {name: "青苹果"}];
										var resultDatas = _.filter(sourceDatas,function(data){
											return data.name.indexOf(keyword)>-1;
										});
										callback(resultDatas);
									}
								});
								this.searchlayer.show();
							}
						}
					},params||{}));
				}
				this.header.$el.css({
					"min-width": "320px",
    				"max-width": "640px",
					"margin": "0 auto"
				});
				this.header.show();
			},
			// 渲染底部导航
			renderFooter: function(selectMark) {
				var data ={};
				data[selectMark]='selected';
				data.islogin = comUtil.getLoginInfo() ? true : false;
				$('.footer').html(_.template(tempFootNav)({data:data}));
			}
		});
		return new bsCommon();
	});