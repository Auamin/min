"use strict";

/*
	 选项卡：二级菜单
	 功能 —— 1、鼠标滑过一级菜单，显示二级菜单
			  2、鼠标滑过二级菜单，出现相应内容
 */
function options(num1, num2) {
    // li绑定索引下标
    for (var i = 0; i < num1.length; i++) {
        num1[i].arr = i;
        num1[i].onmouseover = function () {
            // 循环清除排他
            for (var i = 0; i < num2.length; i++) {
                num2[i].style.display = "none";
                num1[i].id = "";
            }
            // 当前的显示，添加属性
            num2[this.arr].style.display = "block";
            this.id = "active";
        };
        num1[i].onmouseout = function () {
            num2[this.arr].style.display = "none";
        };
    }
}
function levelMeum(num1, num2) {
    // 一级导航隐藏显示
    num1.onmouseover = function () {
        num2.style.display = "block";
    };
    num1.onmouseout = function () {
        num2.style.display = "none";
    };
}

// function move(blis, twomeum) {
//     var scroll = window.scrollY; //声明变量获取窗口垂直高度；
//     // 滚轮滚动事件
//     window.onscroll = function () {
//         // 判断条件
//         if (scroll >= 200) {
//             for (var i = 0; i < blis.length; i++) {
//                 // 给每个li绑定索引
//                 blis[i].arr = i;
//                 // 循环遍历排他
//                 for (i = 0; i < twomeum.length; i++) {
//                     twomeum[i].style.top = "0";
//                     blis[i].id = "";
//                 }
//                 var scrollres = scroll - 200;
//                 twomeum[this.arr].style.top = "scrollres";
//                 this.id = "active";
//             }
//         }
//     } 
// }
// move(blis, atwos);