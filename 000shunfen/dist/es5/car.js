"use strict";

window.onload = function () {
    //1、菜单选项卡
    //获取节点
    var blis = document.getElementsByClassName("banner_con--hover");
    var atwos = document.getElementsByClassName("twomeum");
    var erjibtn = document.getElementsByClassName("yingcang")[0];
    var erjicon = document.getElementsByClassName(" banner_con")[0];

    // console.log(erjibtn);
    //调用封装好的函数
    options(blis, atwos);
    levelMeum(erjibtn, erjicon);

    //5、点击按钮回到顶部（缓慢） &&  滚动滑轮，菜单根据可视窗口的scrollY进行相对应高度的变化
    meumscroll();

    //6、数据渲染
    //1、通过cookie里面的用户名获取相应列表页的id
    // console.log(ckValue);
    var url = "../api/07car.php";
    var data = "name=" + ckValue;
    var cart = document.getElementById("cart");
    ajax("post", url, data, function (str) {
        var arr = JSON.parse(str);
        // console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            var listid = arr[i].id;
            // console.log(listid);
            var url = "../api/06listJump.php";
            var data = "id=" + listid;
            ajax("get", url, data, function (str) {
                var arr1 = JSON.parse(str);
                console.log(arr1);
                var res = arr1.map(function (item) {
                    return "<li class=\"goods\" data-id=\"" + item.id + "\">\n                                <p class=\"good_check\">\n                                    <input type=\"checkbox\" name=\"good\" value=\"\" />\n                                </p>\n                                <p class=\"good_name\">\n                                    <img src=\"" + item.img2 + "\" alt=\"\" class=\"goods-img\">\n                                    <i class=\"changdu\">" + item.name + "</i>\n                                </p>\n                                <p class=\"good_price\">\uFFE5" + item.price + "</p>\n                                <p class=\"good_youhui\">/</p>\n                                <p class=\"num\">\n                                    <span class=\"cutnum\">-</span>\n                                    <input class=\"nownum\" type=\"text\" value=\"1\" />\n                                    <span class=\"addnum\">+</span>\n                                </p>\n                                <p class=\"good_zhongliang\">" + item.pointer + "</p>\n                                <p class=\"good_total\">\uFFE5" + item.price + "</p>\n                                <p class=\"good_kucun\">\u73B0\u8D27</p>\n                                <p class=\"good_shoucang\">\u6536\u85CF</p>\n                                <p class=\"good_del\">\n                                    <a href=\"javascript:;\">\u5220\u9664</a>\n                                </p>\n                            </li>";
                }).join('');
                cart.innerHTML += res;
                //4.全选不选
                $('#allchecked input').on('click', function () {
                    if ($('#allchecked input').prop('checked')) {
                        //全选
                        $('.good_check input').prop('checked', true);
                    } else {
                        //全不选
                        $('.good_check input').prop('checked', false);
                    }
                    allNum();
                });

                //全选
                $('.good_check input').on('click', function () {
                    // console.log('ooooooo')
                    var checkLe = $('.good_check input:checked').size();
                    if (checkLe == $('.good_check input').size()) {
                        $('#allchecked input').prop('checked', true);
                    } else {
                        $('#allchecked input').prop('checked', false);
                    }
                    allNum();
                });

                //5.总数量和总价的更新
                var arr = [];
                function allNum() {
                    arr = []; //存被选中的复选框的下标
                    $('.good_check input').each(function (i, item) {
                        if ($('.good_check input').eq(i).prop('checked')) {
                            arr.push(i);
                        }
                    });
                    var num = 0; //假设存总数量
                    var priceAll = 0; //存总价的
                    arr.forEach(function (item) {
                        //item值：存的是下标
                        num += $('.nownum').eq(item).val() * 1;
                        priceAll += $('.good_total').eq(item).text().slice(2) * 1; //￥ 99
                    });
                    $('#allnum2').html('数量总计：已选中 ' + num + ' 件（不含运费）');
                    $('#allnum').html(num);
                    $('#totalprice span').html('￥ ' + priceAll.toFixed(2));
                }

                //7、清除购物车
                $('#alldel').on('click', function () {
                    var res = confirm('您确定要删除全部商品吗？');
                    if (res) {
                        $('#del').css('display', 'none');
                        $('#over').css('display', 'none');
                        $('.goods').css('display', 'none');
                        $('.disnone').css('display', 'block');
                    } else {
                        $('#del').css('display', 'block');
                        $('#over').css('display', 'block');
                        $('.goods').css('display', 'block');
                        $('.disnone').css('display', 'none');
                    }
                });
            });
        }

        var arr = [];
        function allNum() {
            arr = []; //存被选中的复选框的下标
            $('.good_check input').each(function (i, item) {
                if ($('.good_check input').eq(i).prop('checked')) {
                    arr.push(i);
                }
            });
            var num = 0; //假设存总数量
            var priceAll = 0; //存总价的
            arr.forEach(function (item) {
                //item值：存的是下标
                num += $('.nownum').eq(item).val() * 1;
                priceAll += $('.good_total').eq(item).text().slice(2) * 1; //￥ 99
            });
            $('#allnum2').html('数量总计：已选中 ' + num + ' 件（不含运费）');
            $('#allnum').html(num);
            $('#totalprice span').html('￥ ' + priceAll.toFixed(2));
        }

        //1.数量加和减
        // console.log($('#cart'), 999999999999999);
        $('#cart').on('click', '.addnum', function (event) {
            // console.log($('#cart'), 999999999999999, this, $(this).prev());
            var num = $(this).prev().val() * 1;
            // console.log(num, '00000')
            num++;
            if (num >= 100) {
                //设定100库存量
                num = 100;
            }
            $(this).prev().val(num); //赋值
            goodTotal($(this));
        });

        $('#cart').on('click', '.cutnum', function () {
            var num = $(this).next().val() * 1; //取值
            num--;
            if (num <= 1) {
                //数量不可以少于1
                num = 1;
            }
            $(this).next().val(num); //赋值
            goodTotal($(this));
        });

        //2.小计的计算
        function goodTotal(now) {
            var num = now.parent().find('input').val() * 1; //数量
            var price = now.parent().prev().prev().text().slice(1); //获取价格，截取单位只要数字
            var totalPrice = (num * price).toFixed(2); //保留两位小数
            now.parent().next().next().html('￥ ' + totalPrice);
            allNum();
        }

        //3.绑定事件
        $('#cart').on('input', '.nownum', function () {
            //onkeyup onchange onblur oninput
            goodTotal($(this));
        });

        //3.删除当行
        var ckValue = cookie.get('user');
        var getid = "";
        $('#cart').on('click', '.good_del', function () {
            var res = confirm('您确定要删除吗?');
            if (res) {
                var update = function update() {
                    if ($('#cart .addnum').size() <= 0) {
                        $('#del').css('display', 'none');
                        $('#over').css('display', 'none');
                        $('.disnone').css('display', 'block');
                    } else {
                        $('#del').css('display', 'block');
                        $('#over').css('display', 'block');
                        $('.disnone').css('display', 'none');
                    }
                };

                getid = $(this).parent().get(0).dataset.id;
                $(this).parent().remove();
                var url = "../api/10delcar.php";
                var data = "id=" + getid + "&user=" + ckValue;
                // console.log(getid, ckValue, 0000000000000);
                ajax("post", url, data, function (str) {
                    console.log(str);
                    if (str) {
                        alert("您已成功删除商品！");
                        var url = "../api/07car.php";
                        var data = "name=" + ckValue;
                        var cart = document.getElementById("cart");
                        ajax("post", url, data, function (str) {
                            var arr = JSON.parse(str);
                            // console.log(arr);
                            // for (var i = 0; i < arr.length; i++) {
                            //     var listid = arr[i].id;
                            //     // console.log(listid);
                            //     var url = "../api/06listJump.php"
                            //     var data = "id=" + listid;
                            //     ajax("get", url, data, function (str) {
                            //         var arr1 = JSON.parse(str);
                            //         console.log(arr1);
                            //         var res = arr1.map(function (item) {
                            //             return `<li class="goods" data-id="${item.id}">
                            //                         <p class="good_check">
                            //                             <input type="checkbox" name="good" value="" />
                            //                         </p>
                            //                         <p class="good_name">
                            //                             <img src="${item.img2}" alt="" class="goods-img">
                            //                             <i class="changdu">${item.name}</i>
                            //                         </p>
                            //                         <p class="good_price">￥${item.price}</p>
                            //                         <p class="good_youhui">/</p>
                            //                         <p class="num">
                            //                             <span class="cutnum">-</span>
                            //                             <input class="nownum" type="text" value="1" />
                            //                             <span class="addnum">+</span>
                            //                         </p>
                            //                         <p class="good_zhongliang">${item.pointer}</p>
                            //                         <p class="good_total">￥${item.price}</p>
                            //                         <p class="good_kucun">现货</p>
                            //                         <p class="good_shoucang">收藏</p>
                            //                         <p class="good_del">
                            //                             <a href="javascript:;">删除</a>
                            //                         </p>
                            //                     </li>`
                            //         }).join('');
                            //         cart.innerHTML += res;
                            //     })

                            // }
                        });
                    }
                    update(); //判断一次
                    allNum();
                });

                //6.全删
                $('#delall').on('click', function () {
                    // console.log(arr);
                    var res = confirm('您确定要删除选中的商品吗？');
                    if (res) {
                        for (var i = arr.length - 1; i >= 0; i--) {
                            //从末尾开始删除元素
                            $('#cart .goods').eq(arr[i]).remove();
                        }
                    }
                    arr = []; //删除了记得清空数组
                    update(); //状态改变
                    allNum();
                });
            }
        });
    });
};