"use strict";

window.onload = function () {
    // 1、菜单选项卡
    // 获取节点
    // var blis = document.getElementsByClassName("banner_con--hover");
    // var atwos = document.getElementsByClassName("twomeum");
    // var erjibtn = document.getElementsByClassName("yingcang")[0];
    // var erjicon = document.getElementsByClassName(" banner_con")[0];
    //调用封装好的函数
    // options(blis, atwos);
    // levelMeum(erjibtn, erjicon);


    // 2、点击按钮回到顶部（缓慢） &&  滚动滑轮，菜单根据可视窗口的scrollY进行相对应高度的变化
    meumscroll();

    //4.获取网址上面的id值，搜索id对应的内容，进行页面渲染
    var res = location.search.slice(1); //？id=001  id=001
    var idnum = res.split('=')[1]; //001
    console.log(idnum);
    var url = "../api/06listJump.php";
    var data = "id=" + idnum;
    var goodscon = document.getElementById("goodscon");
    ajax("get", url, data, function (str) {
        var arr = JSON.parse(str);
        console.log(arr);
        var res = arr.map(function (item) {
            return "<div class=\"main_top fl\">\n                        <ul>\n                            <li>\n                                <span class=\"main_topul\">\u7CD6\u679C/\u5DE7\u514B\u529B</span>></li>\n                            <li>\n                                <span>\u7CD6\u679C</span>></li>\n                            <li>\n                                <span>" + item.name + "</span>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class=\"main_center fl\">\n                        <div class=\"left-pro\">\n                            <div class=\"t1\">\n                                <img src=\"../img/gotop.gif\" id=\"gotop\" />\n                                <div id=\"showArea\">\n                                    <a href=\"" + item.img2 + "\" rel=\"zoom1\" rev=\"" + item.img2 + "\">\n                                        <img src=\"" + item.img2 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img3 + "\" rel=\"zoom1\" rev=\"" + item.img3 + "\">\n                                        <img src=\"" + item.img3 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img4 + "\" rel=\"zoom1\" rev=\"" + item.img4 + "\">\n                                        <img src=\"" + item.img4 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img2 + "\" rel=\"zoom1\" rev=\"" + item.img2 + "\">\n                                        <img src=\"" + item.img2 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img3 + "\" rel=\"zoom1\" rev=\"" + item.img3 + "\">\n                                        <img src=\"" + item.img3 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img4 + "\" rel=\"zoom1\" rev=\"" + item.img4 + "\">\n                                        <img src=\"" + item.img4 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img2 + "\" rel=\"zoom1\" rev=\"" + item.img2 + "\">\n                                        <img src=\"" + item.img2 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img3 + "\" rel=\"zoom1\" rev=\"" + item.img3 + "\">\n                                        <img src=\"" + item.img3 + "\" />\n                                    </a>\n                                    <a href=\"" + item.img4 + "\" rel=\"zoom1\" rev=\"" + item.img4 + "\">\n                                        <img src=\"" + item.img4 + "\" />\n                                    </a>\n                                </div>\n                                <img src=\"../img/gobottom.gif\" id=\"gobottom\" />\n                            </div>\n                            <div class=\"t2\">\n                                <a href=\"" + item.img2 + "\" id=\"zoom1\" class=\"MagicZoom MagicThumb\">\n                                    <img src=\"" + item.img2 + "\" id=\"main_img\" class=\"main_img\" style=\"width:330px; height:330px;\" />\n                                </a>\n                            </div>\n                        </div>\n                        <div class=\"right-pro\">\n                            <h3>\n                                <i>\u81EA\u8425</i>" + item.name + "</h3>\n                            <div class=\"bd\">\n                                <div class=\"price\" style=\"height: 40px;\">\n                                    <b class=\"fl\">" + item.price + "</b>\n                                    <span class=\"fl shangou\">\u95EA\u8D2D</span>\n                                    <a href=\"###\" class=\"goShop fr\">\n                                        <span class=\"fl\">\u8FDB\u5165\u5E97\u94FA</span>\n                                        <span class=\"jianTou fr\">></span>\n                                    </a>\n                                </div>\n                                <p class=\"num\">\n                                    <b>\u5546\u54C1\u7F16\u53F7</b>\n                                    <span>" + item.code + "</span>\n                                </p>\n                                <p class=\"shou\">\n                                    <b>\u6708\u9500</b>\n                                    <span>" + item.buy + "</span>\n                                </p>\n                                <p class=\"cuxiao\" style=\"height:40px;line-height: 40px;\">\n                                    <span>\u4FC3\u9500</span>\n                                    <span style=\"margin-left: 20px;color: #f29348;border: 1px solid #f29348;\">\u6EE1\u51CF</span>\n                                    <span style=\"margin: 0 10px;\">\u7ACB\u51CF100\u5143</span>\n                                    <span style=\"color: #669900;font-size: 12px;cursor: pointer\">\u8BE6\u60C5 > ></span>\n                                </p>\n                                <div class=\"dui\">\n                                    <p class=\"number\">\n                                        <b>\u8D2D\u4E70\u6570\u91CF</b>\n                                        <label id=\"cart\">\n                                            <a class=\"jian cutnum\">-</a>\n                                            <input type=\"text\" id=\"buycount\" value=\"1\">\n                                            <a class=\"jia addnum\">+</a>\n                                        </label>\n                                    </p>\n                                </div>\n                                <div class=\"btn\">\n                                    <a href=\"###\" class=\"a2\" id=\"btnAddShoppingCart\">\u52A0\u5165\u8D2D\u7269\u8F66</a>\n                                    <a href=\"../html/car.html\" class=\"a1\" id=\"btnBuy\">\u7ACB\u5373\u8D2D\u4E70</a>\n                                </div>\n                                <p class=\"pleasecallme\">\u62E8\u6253\n                                    <span>4008-678-888</span>\uFF0C\u53EF\u8BED\u97F3\u4E0B\u5355~\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"main_center2 fl\">\n                        <ul class=\"center2-ul\">\n                            <li>\n                                <img src=\"../img/goods1.png\" alt=\"\">\n                            </li>\n                            <li>\n                                <img src=\"../img/goods2.png\" alt=\"\">\n                            </li>\n                            <li class=\"no-border\">\n                                <img src=\"../img/goods3.png\" alt=\"\">\n                            </li>\n                        </ul>\n                        <p class=\"center2-p1\">\u54C1\u724C\uFF1A" + item.pingpai + "</p>\n                        <p>\u4EA7\u5730\uFF1A" + item.place + "</p>\n                        <p>\u89C4\u683C\uFF1A" + item.sizenum + "</p>\n                        <p>\u91CD\u91CF\uFF1A" + item.pointer + "</p>\n                        <p>\u5546\u54C1\u7F16\u53F7\uFF1A" + item.code + "</p>\n                        <p>\u597D\u8BC4\u7387\uFF1A" + item.good + "</p>\n                        <p class=\"center2-p2\" style=\"color: #669900\">\n                            <i>\u4F18\u9009\u5361</i>\u652F\u6301\u4F18\u9009\u5361\u652F\u4ED8</p>\n                    </div>\n                    <div class=\"main_bottom fl\">\n                        <div class=\"mainb-left fl\">\n                            <dl>\n                                <h6>\u76F8\u5173\u5206\u7C7B</h6>\n                                <dt>\u7CD6\u679C</dt>\n                                <dd>\u679C\u5473\u8F6F\u7CD6</dd>\n                                <dd>\u725B\u5976\u7CD6</dd>\n                                <dd>\u53EF\u4E50\u7CD6</dd>\n                                <dd>\u68C9\u82B1\u7CD6</dd>\n                                <dd>\u679C\u5473\u8F6F\u7CD6</dd>\n                                <dd>\u725B\u5976\u7CD6</dd>\n                                <dd>\u53EF\u4E50\u7CD6</dd>\n                                <dd>\u68C9\u82B1\u7CD6</dd>\n                            </dl>\n                            <dl class=\"mainb-left-dl\">\n                                <h6>\u76F8\u5173\u54C1\u724C</h6>\n                                <dd>\u535A\u6CF0</dd>\n                                <dd>\u4E0D\u4E8C\u5BB6</dd>\n                                <dd>\u963F\u5C14\u5351\u65AF</dd>\n                                <dd>\u535A\u6CF0</dd>\n                                <dd>\u4E0D\u4E8C\u5BB6</dd>\n                                <dd>\u963F\u5C14\u5351\u65AF</dd>\n                            </dl>\n                        </div>\n                        <div class=\"mainb-right fl\">\n                            <ul class=\"top\">\n                                <li class=\"tleft\">\u5546\u54C1\u8BE6\u60C5</li>\n                                <li class=\"tright\">\u89C4\u683C\u53C2\u6570</li>\n                            </ul>\n                            <div class=\"bottom\">\n                                <img src=\"../img/goodsda.jpg\" alt=\"\" class=\"i\">\n                                <ul class=\"bul\">\n                                    <li>\u3010\u5546\u54C1\u7F16\u7801\u3011\n                                        <i class=\"one1\">" + item.code + "</i>\n                                    </li>\n                                    <li>\u3010\u54C1\u724C\u3011\n                                        <i class=\"one2\">" + item.pingpai + "</i>\n                                    </li>\n                                    <li>\u3010\u4E3B\u54C1\u3011\n                                        <i class=\"one3\">\u7CD6\u679C*1</i>\n                                    </li>\n                                    <li>\u3010\u5236\u9020\u5546\u3011\n                                        <i class=\"one4\">" + item.name + "</i>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>";
        }).join('');
        goodscon.innerHTML = res;
        //数量的加减
        var cart = document.getElementById("cart");
        var buycount = document.getElementById("buycount");
        var addnum = document.getElementsByClassName("addnum")[0];
        var cutnum = document.getElementsByClassName("cutnum")[0];
        var num = buycount.value;
        addnum.onclick = function () {
            num++;
            buycount.value = num;
        };
        cutnum.onclick = function () {
            num--;
            if (num <= 1) {
                num = 1;
            }
            buycount.value = num;
        };
        //点击加入购物车将数据加入数据库
        var addToCar = document.getElementById("btnAddShoppingCart");
        var oneprice1 = arr[0].price;
        var oneid1 = arr[0].id;
        var onename1 = cookie.get('user');

        addToCar.onclick = function () {
            var url = "../api/07car.php";
            var data = "name=" + onename1;
            ajax("post", url, data, function (str1) {
                var arr2 = JSON.parse(str1);
                console.log(arr2, 9999999999999999);
                var idArr = arr2.map(function (item) {
                    return item.id;
                });
                var isHave = idArr.indexOf(oneid1);
                console.log(isHave, '2222');
                //存在该商品
                if (isHave >= 0) {
                    var url = "../api/09changenum.php";
                    var data = "id=" + oneid1 + "&changenum=" + num;
                    ajax("post", url, data, function (str2) {
                        if (str2) {
                            alert("已成功加入购物车！");
                        }
                    });
                } else {
                    // console.log(oneprice1, oneid1, num, onename1, 111111111);
                    var url = "../api/08addcar.php";
                    var data = "goodsid=" + oneid1 + "&name=" + onename1 + "&goodsnum=" + num + "&oneprice=" + oneprice1;
                    ajax("post", url, data, function (str3) {
                        if (str3) {
                            alert("已成功加入购物车！");
                        }
                    });
                }
            });
        };

        //3、底部选项卡
        var bimg = document.getElementsByClassName("tleft")[0];
        // console.log(bimfor);
        var bimfor = document.getElementsByClassName("tright")[0];
        var bul = document.getElementsByClassName("bul")[0];
        // console.log(bul);
        var i = document.getElementsByClassName("i")[0];
        bimfor.onclick = function () {
            css(bimfor, "background", " #fff");
            css(bimfor, "color", " #669900");
            css(bimfor, "border", " none");
            css(bimfor, "border-top", " 2px solid #669900");
            css(bimfor, "border-right", " 1px solid #d6d6d6");
            css(bimg, "border", " 1px solid #d6d6d6");
            css(bimg, "background", " #f5f5f5");
            css(bimg, "color", " #333");
            css(bul, "display", "block");
            css(i, "display", "none");
        };
        bimg.onclick = function () {
            css(bimg, "background", " #fff");
            css(bimg, "color", " #669900");
            css(bimg, "border", " none");
            css(bimg, "border-top", " 2px solid #669900");
            css(bimg, "border-left", " 1px solid #d6d6d6");
            css(bimfor, "border", " 1px solid #d6d6d6");
            css(bimfor, "background", " #f5f5f5");
            css(bimfor, "color", " #333");
            css(bul, "display", "none");
            css(i, "display", "inline-block");
        };

        function jQuery(e) {
            return document.getElementById(e);
        }
        document.getElementsByClassName = function (cl) {
            var retnode = [];
            var myclass = new RegExp('\\b' + cl + '\\b');
            var elem = this.getElementsByTagName('*');
            for (var i = 0; i < elem.length; i++) {
                var classes = elem[i].className;
                if (myclass.test(classes)) retnode.push(elem[i]);
            }
            return retnode;
        };
        var MyMar;
        var speed = 1; //速度，越大越慢
        var spec = 1; //每次滚动的间距, 越大滚动越快
        var ipath = '../img/'; //图片路径
        var thumbs = document.getElementsByClassName('thumb_img');
        for (var i = 0; i < thumbs.length; i++) {
            thumbs[i].onmouseover = function () {
                jQuery('main_img').src = this.rel;jQuery('main_img').link = this.link;
            };
            thumbs[i].onclick = function () {
                location = this.link;
            };
        }
        jQuery('main_img').onclick = function () {
            location = this.link;
        };
        jQuery('gotop').onclick = function () {
            this.src = ipath + 'gotop2.gif';MyMar = setInterval(gotop, speed);
        };
        jQuery('gotop').onmouseout = function () {
            this.src = ipath + 'gotop.gif';clearInterval(MyMar);
        };
        jQuery('gobottom').onclick = function () {
            this.src = ipath + 'gobottom2.gif';MyMar = setInterval(gobottom, speed);
        };
        jQuery('gobottom').onmouseout = function () {
            this.src = ipath + 'gobottom.gif';clearInterval(MyMar);
        };
        function gotop() {
            jQuery('showArea').scrollTop -= spec;
        }
        function gobottom() {
            jQuery('showArea').scrollTop += spec;
        }
    });
};