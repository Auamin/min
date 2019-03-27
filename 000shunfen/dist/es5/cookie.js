"use strict";

//获取cookie
var ckValue = cookie.get('user');
var li1 = document.getElementById("welcome");
var gobye = document.getElementById("gobye");
var li2 = document.getElementsByClassName("pleacelogin")[0];
var li3 = document.getElementsByClassName("free")[0];
var cart = document.getElementById("carcont-ul");
var carhover = document.getElementsByClassName("car--hover")[0];
var car = document.getElementsByClassName("car")[0];
var carcont = document.getElementsByClassName("carcont")[0];
var anum = document.getElementById("allnum");
var aprice = document.getElementById("allprice");
var anum1 = document.getElementsByClassName("car_num")[0];
//判断是否登陆信息（cookie）
if (ckValue) {
    //截取用户名信息
    var char = '';
    for (var i = 0, len = ckValue.length - 7; i < len; i++) {
        char += '*';
    }
    newStr = ckValue.substr(0, 3) + char + ckValue.substr(7, 4);
    console.log(newStr);
    //用户名渲染
    css(li2, "display", "none");
    css(li3, "display", "none");
    css(gobye, "display", "block");
    li1.innerHTML = newStr + ",欢迎您！";
    gobye.onclick = function () {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = "user" + "=" + escape("") + ";expires=" + exp.toUTCString() + ";path=/000shunfen";
        css(li2, "display", "block");
        css(li3, "display", "block");
        css(gobye, "display", "none");
        li1.innerHTML = "嘿，欢迎来顺丰优选！";
    };

    //购物车渲染
    //1、通过cookie里面的用户名获取相应列表页的id
    console.log(ckValue);
    var url = "../api/07car.php";
    var data = "name=" + ckValue;
    ajax("post", url, data, function (str5) {
        console.log(str5, 1111);
        var arr = JSON.parse(str5);
        console.log(arr, 88888);
        var allnum = 0;
        var allprice = 0;
        var iunm = document.getElementById("inum");
        for (var i = 0; i < arr.length; i++) {
            var listid = arr[i].id;
            var goodsnum = arr[i].goodsnum * 1;
            var goodsprice = arr[i].goodsprice * 1;
            var zonghe = goodsnum * goodsprice;
            allnum += goodsnum;
            allprice += zonghe;
            console.log(allprice, zonghe);

            // console.log(listid);
            var url = "../api/06listJump.php";
            var data = "id=" + listid;
            ajax("get", url, data, function (str4) {
                var arr1 = JSON.parse(str4);
                // console.log(arr1);
                var res = arr1.map(function (item) {
                    return "<li>\n                                <img src=\"" + item.img2 + "\" alt=\"\" class=\"carcont-ulimg\">\n                                <p class=\"carcont-ulp1\">" + item.name + "</p>\n                                <p class=\"carcont-ulp2\">" + item.price + " <i id=\"inum\">x1</i></p>\n                            </li>";
                }).join('');
                cart.innerHTML += res;
            });
        }
        anum.innerHTML = allnum;
        anum1.innerHTML = allnum;
        aprice.innerHTML = allprice.toFixed(2);
    });
    car.onmouseover = function () {
        css(carcont, "display", "block");
    };
    car.onmouseout = function () {
        css(carcont, "display", "none");
    };
} else {
    car.onmouseover = function () {
        css(carhover, "display", "block");
    };
    car.onmouseout = function () {
        css(carhover, "display", "none");
    };
}