// 这时一个模块
// 定义一个有依赖的模块
// 这个模块依赖jquery
define(['jquery','home'],function($,home){
	// return一个函数/对象
	return {
		getData:function(data){
			$('.datalist').html('list模块');
			home();
		}
	}
});