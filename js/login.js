define(['cPageView','bsCommon', 'comUtil', 'UIInputList'],
	function(cPageView, bsCommon, comUtil, UIInputList) {
	var login = cPageView.extend({
		events:{
			'click .self_yzmbtn:not(.lg_noclick)':'sendMsgClick',
			'click  .loginbtn':'loginbtnClick'
		},
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '登陆/注册'
				}
			});
			bsCommon.renderFooter('user');
			this.initSelectItem();
		},
		initSelectItem:function(){
			if (!this.inputList1) {
				var modeldata = [{
					item: [{
						id: 'tel',
						txt: '手机号码',
						placeholder: '请输入手机号码！'
					}, {
						id: 'msgcode',
						txt: '验证码',
						itemFn: function() {
							return '<div class="cm-inputlist-input-box self_yzm">' +
										'<input id="txtPwd" placeholder="短信验证码" type="text">' +
									'</div>' +
									'<a href="javascript:;" class="self_yzmbtn">发送短信</a>';
						}
					}]
				}];
				this.inputList1 = new UIInputList({
					wrapper: $('.lg_box'),
					datamodel: {
						data: modeldata
					}
				});
			}
			this.inputList1.show();
		},
		// 发送短信按钮
		sendMsgClick: function(e) {
			var $target = comUtil.getthis(e);
			var mobileNo = $('#tel').val();
			if (!mobileNo) {
				Turtle.showToast('请输入手机号码！');
				return;
			}
			this.sendMsg(mobileNo);
			var secondsNum = 60;
			$target.addClass('lg_noclick').text(secondsNum + '秒');
			var inter = setInterval(function() {
				secondsNum--;
				if (secondsNum == 0) {
					clearInterval(inter);
					$target.removeClass('lg_noclick').text('重新发送');
				} else {
					$target.text(secondsNum + '秒');
				}
			}.bind(this), 1000);
		},
		// 短信发送
		sendMsg: function(mobileNo){
			// Turtle.ajax.GetJson(AJAXORI+"/sms/sendCode.do", {mobile:mobileNo}, function(t) {
			// 	if (!t.success) {
			// 		Turtle.showToast(t.msg);
			// 	}
			// });
		},
		loginbtnClick:function(){
			var params = {
				mobileNo: $('#tel').val(),
				msgcode: $('#txtPwd').val()
			}
			if (!params.mobileNo) {
				Turtle.showToast('请输入手机号码！');
				return;
			}
			if (!params.msgcode) {
				Turtle.showToast('请输入短信验证码！');
				return;
			}
			comUtil.setLoginInfo(params.mobileNo);
			Turtle.goTo('index.html');
		}
	})
	return new login();
});