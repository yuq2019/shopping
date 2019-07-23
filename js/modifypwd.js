define(['cPageView','bsCommon', 'comUtil', 'UIInputList'],
	function(cPageView, bsCommon, comUtil, UIInputList) {
	var userm = cPageView.extend({
		events:{
			'click  .savebtn':'savebtnClick'
		},
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '修改密码'
				}
			});
			// bsCommon.renderFooter('user');
			this.initSelectItem();
		},
		initSelectItem:function(){
			if (!this.inputList1) {
				var modeldata = [{
					item: [{
						txt: '当前密码',
						itemFn: function() {
							return '<div class="cm-inputlist-input-box">' +
										'<input id="nowpwd" placeholder="请输入当前密码" type="password">' +
										'<a class="cm-inputlist-clear" href="javascript:;" style="display: none;"><span></span></a>' +
									'</div>';
						}
					}, {
						txt: '新密码',
						itemFn: function() {
							return '<div class="cm-inputlist-input-box">' +
										'<input id="newpwd" placeholder="请输入新密码" type="password">' +
										'<a class="cm-inputlist-clear" href="javascript:;" style="display: none;"><span></span></a>' +
									'</div>';
						}
					}, {
						txt: '确认新密码',
						itemFn: function() {
							return '<div class="cm-inputlist-input-box">' +
										'<input id="newpwd2" placeholder="请再次输入新密码" type="password">' +
										'<a class="cm-inputlist-clear" href="javascript:;" style="display: none;"><span></span></a>' +
									'</div>';
						}
					}]
				}];
				this.inputList1 = new UIInputList({
					wrapper: $('.mpwd_box'),
					datamodel: {
						data: modeldata
					}
				});
			}
			this.inputList1.show();
		},
		savebtnClick:function(){
			var params = {
				nowpwd: $('#nowpwd').val(),
				newpwd: $('#newpwd').val(),
				newpwd2: $('#newpwd2').val()
			}
			if (!params.nowpwd) {
				Turtle.showToast('请输入当前密码');
				return;
			}
			if (!params.newpwd) {
				Turtle.showToast('请输入新密码');
				return;
			}
			if (!params.newpwd2) {
				Turtle.showToast('请再次输入新密码');
				return;
			}
			if (params.newpwd !== params.newpwd2) {
				Turtle.showToast('两次新密码输入不一致');
				return;
			}
			Turtle.showMessage({
				datamodel: {
					content: '保存成功'
				},
				okAction: function() {
					Turtle.goTo('userManage.html');
				}
			});			
		}
	})
	return new userm();
});