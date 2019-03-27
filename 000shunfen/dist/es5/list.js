"use strict";

window.onload = function () {
    //1、菜单选项卡
    //获取节点
    var blis = document.getElementsByClassName("banner_con--hover");
    var atwos = document.getElementsByClassName("twomeum");
    var erjibtn = document.getElementsByClassName("yingcang")[0];
    var erjicon = document.getElementsByClassName(" banner_con")[0];
    //调用封装好的函数
    options(blis, atwos);
    levelMeum(erjibtn, erjicon);

    //2、点击按钮回到顶部（缓慢） &&  滚动滑轮，菜单根据可视窗口的scrollY进行相对应高度的变化
    meumscroll();

    //3、手风琴
    var oBox = document.getElementsByClassName("mainl-ul1")[0]; //整个大盒子
    var h1s = document.getElementsByClassName("ul1-li"); //获取h1；
    // console.log(h1s);
    var uls = document.getElementsByClassName("ul1-ul"); //获取ul;
    // console.log(uls);
    for (var i = 0; i < h1s.length; i++) {
        h1s[i].index = i; //索引
        h1s[i].onmouseover = function () {
            //鼠标移过触发事件
            console.log(this.index);
            uls[this.index].style.display = "block";
        };
        h1s[i].onmouseout = function () {
            //鼠标移出触发事件
            uls[this.index].style.display = "none";
        };
    }

    //4、数据库渲染
    /*  需求：
            1.将本地数据获取渲染到页面；
            2.根据总内容数获取页码数，并且点击页码可以切换到相应内容；
        接口使用：
        post
           php/04list.php
           num : 每页的信息条数
           page : 页码（渲染页码第一页就可以啦）
           返回
               {
                  array：返回的数据信息
                       'total' => 数据库表格总的信息量,
                       'list' => 每条信息的具体内容,
                       'page' => 页码,
                       'items' => 每页的信息条数
               }
    */
    // 将数据渲染封装
    function show(arr) {
        var res = arr.map(function (item) {
            return "<li class=\"list-li\" data-id=\"" + item.id + "\">\n                        <img src=\"" + item.img1 + "\" alt=\"\" class=\"list-li-img\">\n                        <p class=\"listli-p1\">\xA5" + item.price + "</p>\n                        <p class=\"listli-p2\">" + item.name + "</p>\n                        <p class=\"listli-p3\">\u5DF2\u6709" + item.people + "\u4EBA\u8BC4\u4EF7\n                            <i>\u81EA\u8425</i>\n                        </p>\n                        <div class=\"amount_box fl\">\n                            <a href=\"javascript:;\" class=\"reduce reSty cutnum\">-</a>\n                            <input type=\"text\" value=\"1\" class=\"sum\">\n                            <a href=\"javascript:;\" class=\"plus addnum\">+</a>\n                        </div>\n                        <div class=\"listli-car fl\">\n                            <i></i>\n                            \u52A0\u5165\u8D2D\u7269\u8F66\n                        </div>\n                    </li>";
        }).join('');
        list.innerHTML = res;

        //数量的加减
        // var cart = document.getElementById("cart");

        var aUls = document.getElementById("list");
        var onename1 = cookie.get('user');
        aUls.onclick = function (e) {
            if (e.target.className.indexOf('listli-car') >= 0) {
                var _oneid = e.target.parentNode.getAttribute('data-id');
                var _oneprice = e.target.parentNode.getElementsByClassName('listli-p1')[0].innerText.slice(1);
                var num = e.target.parentNode.getElementsByClassName('sum')[0].value;
                var url = "../api/07car.php";
                var data = "name=" + onename1;
                ajax("post", url, data, function (str1) {
                    var arr2 = JSON.parse(str1);
                    var idArr = arr2.map(function (item) {
                        return item.id;
                    });
                    var isHave = idArr.indexOf(_oneid);
                    //存在该商品
                    if (isHave >= 0) {
                        var url = "../api/09changenum.php";
                        var data = "id=" + _oneid + "&changenum=" + num;
                        ajax("post", url, data, function (str2) {
                            if (str2) {
                                alert("已成功加入购物车！");
                            }
                        });
                    } else {
                        // console.log(oneprice1, oneid1, num, onename1, 111111111);
                        var url = "../api/08addcar.php";
                        var data = "goodsid=" + _oneid + "&name=" + onename1 + "&goodsnum=" + num + "&oneprice=" + _oneprice;
                        ajax("post", url, data, function (str3) {
                            if (str3) {
                                alert("已成功加入购物车！");
                            }
                        });
                    }
                });
            }
            if (e.target.className && e.target.className.indexOf('addnum') >= 0) {
                var sum = e.target.parentNode.getElementsByClassName('sum')[0];
                var _num = sum.value;
                _num++;
                sum.value = _num;
            }
            if (e.target.className && e.target.className.indexOf('cutnum') >= 0) {
                var _sum = e.target.parentNode.getElementsByClassName('sum')[0];
                var _num2 = _sum.value;
                _num2--;
                if (_num2 <= 1) {
                    _num2 = 1;
                }
                _sum.value = _num2;
            }
        };
        //点击加入购物车将数据加入数据库
        var listlicar = document.getElementsByClassName("listli-car")[0];
        var oneprice1 = arr[0].price;
        var oneid1 = arr[0].id;
        var onename1 = cookie.get('user');

        // 点击跳转详情页，并传送相对应的id名过去
        var aLis = list.getElementsByClassName("list-li-img");
        console.log(aLis);
        for (var i = 0; i < aLis.length; i++) {
            aLis[i].onclick = function () {
                console.log(this.parentNode.getAttribute('data-id')); //拿到对应id值
                var id = this.parentNode.getAttribute('data-id');
                location.href = 'goods.html?id=' + id;
            };
        }
    }

    // 打来页面即显示第一页的内容（渲染第一页）
    var list = getid('list');
    var pageBtn = getid('page');
    // 渲染页面功能 （页码）
    var ipage = 1; //页码
    var inum = 32; //每页的内容条数
    var data = 'page=' + ipage + '&num=' + inum;
    var url = '../api/04list.php';
    ajax("post", url, data, function (str) {
        // 渲染第一页的数据
        // console.log(str);
        var arr = JSON.parse(str);
        console.log(arr);
        show(arr.data);

        //根据总条数和每页显示条数，算出总页码
        var pages = Math.ceil(arr.total / arr.num); //向上取整
        // console.log(pages);
        var html = '';
        for (var i = 0; i < pages; i++) {
            // 注意：每个页码的内容都自增一，且从一开始哦
            html += "<span>" + (i + 1) + "</span>";
        }
        pageBtn.innerHTML = html; //页码的生成
        // 第一个高亮
        pageBtn.children[0].className = 'active';
    });

    //2.点击页码，跳转到对应的内容(利用接口渲染不同页面的数据，达到效果)
    pageBtn.onclick = function (ev) {
        var ev = ev || window.event;
        if (ev.target.tagName.toLowerCase() == 'span') {
            //在span上绑定节点
            var num2 = ev.target.innerHTML;
            console.log(num2);
            if (paiisok == true) {
                pai(num2);
                for (var i = 0; i < pageBtn.children.length; i++) {
                    pageBtn.children[i].className = '';
                }
                ev.target.className = 'active';
            } else {
                // var url = 'api/02football.php';
                var data = 'page=' + num2 + '&num=' + inum;
                ajax('post', url, data, function (str) {
                    // console.log(str);
                    var arr = JSON.parse(str);
                    show(arr.data);
                    //排他，当前高亮
                    for (var i = 0; i < pageBtn.children.length; i++) {
                        pageBtn.children[i].className = '';
                    }
                    ev.target.className = 'active';
                });
            }
        }
    };

    var paiisok = false;

    var priceChange = document.getElementById("pricechange");
    priceChange.onclick = function () {
        paiisok = true;
        pai(1);
        for (var i = 0; i < pageBtn.children.length; i++) {
            pageBtn.children[i].className = '';
        }
        ev.target.className = 'active';
    };

    function pai(ipage) {
        var data = 'page=' + ipage + '&num=' + inum + '&pai=paixu';
        var url = '../api/04list.php';
        ajax("post", url, data, function (str) {
            console.log(str);
            var arr = JSON.parse(str);
            show(arr.data);
            for (var i = 0; i < pageBtn.children.length; i++) {
                pageBtn.children[i].className = '';
            }
            ev.target.className = 'active';
        });
    }
};