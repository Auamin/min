$(function () {
	/*
	 	原理：每次运动4个图距离，运动出去的图片，剪切拼接到末尾
	 	
	 	1、ul的宽度：图片的宽度*图片个数
	 	2、开定时器，每次运动4个图距离，往左边运动：-4*iW
	 	3、出去的图片剪切拼接到后面
	 	4、上下按钮可以点击切换
	 	
	 */

	//1、ul的宽度：图片的宽度*图片个数
	var wNum = $('#moveimg li').size() * $('#moveimg li').eq(0).outerWidth();
	$('#moveimg').css('width', wNum);
	var iW = $('#moveimg li').eq(0).outerWidth() * 4;//运动距离

	//2、开定时器，每次运动4个图距离，往左边运动：-4*iW
	var timer = null;
	clearInterval(timer);
	// timer = setInterval(next, 5000);//间隔时间

	function next() {//动画时间间隔：5000-2000
		$('#moveimg').stop().animate({ 'left': -iW }, 1000, function () {
			//出去的图片，剪切放到末尾
			$('#moveimg li:lt(4)').insertAfter($('#moveimg li:last'));
			//ul归位
			$('#moveimg').css('left', 0);
		});
	}


	function prev() {
		//先剪切最后的四个图插入到ul首位
		//		$('#moveimg li:gt(4)').insertBefore($('#moveimg li:first'));
		for (var i = 0; i < 4; i++) {
			$('#moveimg li:last').insertBefore($('#moveimg li:first'));
		}
		//预留4个图位置
		$('#moveimg').css('left', -iW);
		//挪到可视区
		$('#moveimg').stop().animate({ 'left': 0 }, 1000);
	}

	//3、上下按钮可以点击切换
	$('#carousel_two').hover(function () {
		clearInterval(timer);
	}, function () {
		clearInterval(timer);
		timer = setInterval(next, 1000);//间隔2秒切一个图
	});

	//点击切换下一页：四张图
	$('#next').click(function () {
		next();
	});

	$('#prev').click(function () {
		prev();
	});

});
