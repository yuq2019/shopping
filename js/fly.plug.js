define(function() {
	var fly = {
		/*
		 * jquery.fly
		 * 
		 * 抛物线动画
		 * @github https://github.com/amibug/fly
		 * Copyright (c) 2014 wuyuedong
		 * copy from tmall.com
		 */
		// (function($) {
			fly: function(options){
				var flyEle = options.flyEle;
				return flyEle.each(function() {
					if (undefined == $(flyEle).data('fly')) {
						$(flyEle).data('fly', new this._init(flyEle, options));
					}
				}.bind(this));
			},
			_init: function(flyElement, options) {
				// 默认值
				var defaults = {
					version: '1.0.0',
					autoPlay: true,
					vertex_Rtop: 20, // 默认顶点高度top值
					speed: 2,
					start: {}, // top, left, width, height
					end: {},
					onEnd: $.noop
				};

				var self = this,
					$element = $(flyElement);

				/**
				 * 初始化组件，new的时候即调用
				 */
				self.init = function(options) {
					this.setOptions(options);
					!!this.settings.autoPlay && this.play();
				};

				/**
				 * 设置组件参数
				 */
				self.setOptions = function(options) {
					this.settings = $.extend(true, {}, defaults, options);
					var settings = this.settings,
						start = settings.start,
						end = settings.end;

					$element.css({
						marginTop: '0px',
						marginLeft: '0px',
						position: 'fixed'
					}).appendTo('body');
					// 运动过程中有改变大小
					if (end.width != null && end.height != null) {
						$.extend(true, start, {
							width: $element.width(),
							height: $element.height()
						});
					}
					// 运动轨迹最高点top值
					var vertex_top = Math.min(start.top, end.top) - Math.abs(start.left - end.left) / 3;
					if (vertex_top < settings.vertex_Rtop) {
						// 可能出现起点或者终点就是运动曲线顶点的情况
						vertex_top = Math.min(settings.vertex_Rtop, Math.min(start.top, end.top));
					}

					/**
					 * ======================================================
					 * 运动轨迹在页面中的top值可以抽象成函数 y = a * x*x + b;
					 * a = curvature
					 * b = vertex_top
					 * ======================================================
					 */

					var distance = Math.sqrt(Math.pow(start.top - end.top, 2) + Math.pow(start.left - end.left, 2)),
						// 元素移动次数
						steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / settings.speed),
						ratio = start.top == vertex_top ? 0 : -Math.sqrt((end.top - vertex_top) / (start.top - vertex_top)),
						vertex_left = (ratio * start.left - end.left) / (ratio - 1),
						// 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
						curvature = end.left == vertex_left ? 0 : (end.top - vertex_top) / Math.pow(end.left - vertex_left, 2);

					$.extend(true, settings, {
						count: -1, // 每次重置为-1
						steps: steps,
						vertex_left: vertex_left,
						vertex_top: vertex_top,
						curvature: curvature
					});
				}.bind(this);

				/**
				 * 开始运动，可自己调用
				 */
				self.play = function() {
					this.move();
				};

				/**
				 * 按step运动
				 */
				self.move = function() {
					var settings = this.settings,
						start = settings.start,
						count = settings.count,
						steps = settings.steps,
						end = settings.end;
					// 计算left top值
					var left = start.left + (end.left - start.left) * count / steps,
						top = settings.curvature == 0 ? start.top + (end.top - start.top) * count / steps : settings.curvature * Math.pow(left - settings.vertex_left, 2) + settings.vertex_top;
					// 运动过程中有改变大小
					if (end.width != null && end.height != null) {
						var i = steps / 2,
							width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
							height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
						$element.css({
							width: width + "px",
							height: height + "px"
						});
					}
					$element.css({
						left: left + "px",
						top: top + "px"
					});
					settings.count++;
					// 定时任务
					var time = window.requestAnimationFrame($.proxy(this.move, this));
					if (count == steps) {
						window.cancelAnimationFrame(time);
						// fire callback
						settings.onEnd.apply(this);
					}
				};

				/**
				 * 销毁
				 */
				self.destroy = function() {
					$element.remove();
				};

				self.init(options);
			},
			/**
			 * 对象飞入
			 *
			 */
			objectFlyIn: function(_sourceImg, _target, _back) {
				_back = _back || function(){};
				var targetOffset = _target.offset(),
					sourceOffset = _sourceImg.offset();

				var img = _sourceImg;
				var flyer = null;
				if(img.attr('src')){
					flyer = $('<img style="display: block;width: 50px;height: 50px;border-radius: 50px;position: fixed;z-index: 100000;" src="' + img.attr('src') + '"/>');
				}else{
					flyer = $('<span style="display: block;font-size:12px;width: 50px;height: 50px;border-radius: 50px;position: fixed;z-index: 100000;">'+img.text()+'</span>');
				}
				var X, Y;

				if (sourceOffset) {
					X = sourceOffset.left - $(window).scrollLeft();
					Y = sourceOffset.top - $(window).scrollTop();
				}
				this.fly({
					flyEle:flyer,
					start: {
						left: X + img.width() / 2 - 25, //开始位置（必填）
						top: Y + img.height() / 2 - 25 //开始位置（必填）
					},
					end: {
						left: targetOffset.left - $(window).scrollLeft() + 10, //结束位置（必填）
						top: targetOffset.top - $(window).scrollTop() + 10, //结束位置（必填）
						width: 10, //结束时宽度
						height: 10 //结束时高度
					},
					onEnd: function() { //结束回调
						this.destroy(); //移除dom
						_back();
					}
				});
			},

			/**
			 * 对象飞出
			 *
			 */
			objectFlyOut: function(_sourceImg, _target, _back) {
				_back = _back || function(){};
				var addOffset = _target.offset();

				var img = _sourceImg;
				var flyer = null;
				if(img.attr('src')){
					flyer = $('<img style="display: block;width: 50px;height: 50px;border-radius: 50px;position: fixed;z-index: 100000;" src="' + img.attr('src') + '"/>');
				}else{
					flyer = $('<span style="display: block;font-size:12px;overflow: hidden;width: 50px;height: 50px;border-radius: 50px;position: fixed;z-index: 100000;">'+img.text()+'</span>');
				}
				this.fly({
					flyEle:flyer,
					start: {
						left: addOffset.left - $(window).scrollLeft()-20, //开始位置（必填）
						top: addOffset.top - $(window).scrollTop()-20 //开始位置（必填）
					},
					end: {
						left: addOffset.left - $(window).scrollLeft() - 50, //结束位置（必填）
						top: addOffset.top - $(window).scrollTop() - 50, //结束位置（必填）
						width: 5, //结束时宽度
						height: 5 //结束时高度
					},
					onEnd: function() { //结束回调
						this.destroy(); //移除dom
						_back();
					}
				});
			}

			// add the plugin to the jQuery.fn object
			// $.fn.fly = function(options) {
			// 	return this.each(function() {
			// 		if (undefined == $(this).data('fly')) {
			// 			$(this).data('fly', new $.fly(this, options));
			// 		}
			// 	});
			// };
		// })(jQuery);

	};
	return fly;
});