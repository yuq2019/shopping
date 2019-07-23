define(['cPageView','bsCommon'],
	function(cPageView, bsCommon) {
	var user = cPageView.extend({
		initialize: function() {
			bsCommon.renderHeader({
				center:{
					tagname: 'title',
					value: '关于我们'
				}
			});
		}
	})
	return new user();
});