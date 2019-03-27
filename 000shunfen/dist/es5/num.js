'use strict';

$(function () {
    //1.数量加和减
    $('#cart').on('click', '.addnum', function () {
        //		console.log($(this));
        var num = $(this).prev().html() * 1; //取值
        num++;
        if (num >= 100) {
            //假设库存量
            num = 100;
        }
        $(this).prev().html(num); //赋值
        //		console.log(num);
        // goodTotal($(this));
    });

    $('#cart').on('click', '.cutnum', function () {
        //		console.log($(this));
        var num = $(this).next().html() * 1; //取值
        num--;
        if (num <= 1) {
            //假设库存量
            num = 1;
        }
        $(this).next().html(num); //赋值
        // //		console.log(num);
        //         goodTotal($(this));
    });
});