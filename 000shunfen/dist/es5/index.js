"use strict";

window.onload = function () {
    //1、菜单选项卡
    //获取节点
    var blis = document.getElementsByClassName("banner_con--hover");
    var atwos = document.getElementsByClassName("twomeum");
    //调用封装好的函数
    options(blis, atwos);

    //2、banner里面的轮播图（直接调用封装好的函数common里面）
    carouse("bmiddle-top", "active1");

    //3、倒计时抢购
    //获取节点
    var spanTime = document.getElementsByClassName("flaseLtop-span2")[0];
    //设置截止时间
    var endtime = '2019-3-26 12:20:20';
    var endTime = new Date(endtime); //转成时间格式
    function show() {
        //获取系统时间
        var nowtime = new Date();
        var dis = parseInt((endTime - nowtime) / 1000); //秒
        //转成需要的格式：调用封装好的函数=>xx天xx时xx分xx秒
        var time = setTime(dis);
        //将数字转化为字符串
        var days = "" + time.days;
        //将天、时、分、秒各截取成两部分
        var days1 = days.slice(0, 1);
        var days2 = days.slice(1);
        var hours = "" + time.hours;
        var hours1 = hours.slice(0, 1);
        var hours2 = hours.slice(1);
        var mins = "" + time.mins;
        var mins1 = mins.slice(0, 1);
        var mins2 = mins.slice(1);
        var secs = "" + time.secs;
        var secs1 = secs.slice(0, 1);
        var secs2 = secs.slice(1);
        // console.log(days2);
        //将数据渲染到节点里面
        spanTime.innerHTML = "\u8FD8\u5269<i class=\"flaseLtop-i1\">" + days1 + "</i>\n             <i class=\"flaseLtop-i2\">" + days2 + "</i>\u5929\n             <i class=\"flaseLtop-i1\">" + hours1 + "</i>\n             <i class=\"flaseLtop-i2\">" + hours2 + "</i>\u65F6\n             <i class=\"flaseLtop-i1\">" + mins1 + "</i>\n             <i class=\"flaseLtop-i2\">" + mins2 + "</i>\u5206\n             <i class=\"flaseLtop-i1\">" + secs1 + "</i>\n             <i class=\"flaseLtop-i2\">" + secs2 + "</i>\u79D2 &nbsp;\u7ED3\u675F</span>";
        //达到临界点:替换图片，清除定时器 ，清空时间数据
        // if (dis <= 0) {
        //     css(end, "display", "block");
        //     css(endW, "display", "block");
        //     clearInterval(timer);
        // }
    }
    show();
    //计算最终的时间差
    var timer = setInterval(show, 1000);

    //4、banner里面的轮播图（直接调用封装好的函数common里面）
    carousel1("lunbo2b-l", "active2");

    //5、点击按钮回到顶部（缓慢） &&  滚动滑轮，菜单根据可视窗口的scrollY进行相对应高度的变化
    meumscroll();

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
        var url = "api/07car.php";
        var data = "name=" + ckValue;
        ajax("post", url, data, function (str) {
            var arr = JSON.parse(str);
            console.log(arr);
            var allnum = 0;
            var allprice = 0;
            for (var i = 0; i < arr.length; i++) {
                var listid = arr[i].id;
                var goodsnum = arr[i].goodsnum * 1;
                var goodsprice = arr[i].goodsprice * 1;
                var zonghe = goodsnum * goodsprice;
                allnum += goodsnum;
                allprice += zonghe;
                console.log(allprice, zonghe);

                // console.log(listid);
                var url = "api/06listJump.php";
                var data = "id=" + listid;
                ajax("get", url, data, function (str) {
                    var arr1 = JSON.parse(str);
                    // console.log(arr1);
                    var res = arr1.map(function (item) {
                        return "<li>\n                                <img src=\"" + item.img8 + "\" alt=\"\" class=\"carcont-ulimg\">\n                                <p class=\"carcont-ulp1\">" + item.name + "</p>\n                                <p class=\"carcont-ulp2\">" + item.price + " <i>x1</i></p>\n                            </li>";
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
};