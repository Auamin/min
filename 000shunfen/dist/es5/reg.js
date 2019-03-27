"use strict";

window.onload = function () {

    //2、正则验证
    var isok1 = 0;
    var isok2 = 0;
    var isok3 = 0;
    var isok4 = 0;
    var isok5 = 1;
    //手机号码验证+注册验证
    var phonebtn = document.getElementById("phone");
    var cont2 = document.getElementById("one");
    phonebtn.onblur = function () {
        var res = phonebtn.value.trim();
        console.log();
        //非空验证
        if (res) {
            //正则验证
            if (checkReg.tel(res)) {
                //ajax针对数据接口的处理（验证用户名）
                // 验证用户名
                /*
                    post
                    php/01check.php
                    username : 要验证的用户名
                    返回
                        {
                            yes : 成功；
                            no : 失败
                        }
                 */
                var url = "../api/01check.php";
                var data = "username=" + res;
                ajax("post", url, data, function (str) {
                    // console.log(str);
                    if (str == "no") {
                        css(cont2, "display", "block");
                        css(cont2, "background", "url(../img/reg-no.png) no-repeat 0 center");
                        cont2.innerHTML = "该手机号已注册";
                    } else if (str == "yes") {
                        css(cont2, "display", "block");
                        css(cont2, "background", "url(../img/reg-yes.jpg) no-repeat 0 center");
                        cont2.innerHTML = "";
                        isok1 = 1;
                    }
                });
            } else {
                css(cont2, "display", "block");
                css(cont2, "background", "url(../img/reg-no.png) no-repeat 0 center");
                cont2.innerHTML = "请输入11位有效手机号";
            }
        } else {
            css(cont2, "display", "block");
            css(cont2, "background", "url(../img/reg-no.png) no-repeat 0 center");
            cont2.innerHTML = "请输入手机号码";
        }
    };

    //图片验证码验证
    var verifyCode = new GVerify("v_container");
    var picturebtn = document.getElementById("my_button");
    var cont1 = document.getElementById("two");
    picturebtn.onblur = function () {
        var res = verifyCode.validate(picturebtn.value);
        if (res) {
            css(cont1, "display", "block");
            css(cont1, "background", "url(../img/reg-yes.jpg) no-repeat 0 center");
            cont1.innerHTML = "";
            isok2 = 1;
        } else {
            cont1.innerHTML = "图片验证错误";
            css(cont1, "display", "block");
            css(cont1, "background", "url(../img/reg-no.png) no-repeat 0 center");
        }
    };

    //设置密码验证
    var mpbtn = document.getElementById("makePassworld");
    var cont3 = document.getElementById("three");
    mpbtn.onblur = function () {
        var res = mpbtn.value.trim();
        if (res) {
            if (checkReg.password(res)) {
                css(cont3, "display", "block");
                css(cont3, "background", "url(../img/reg-yes.jpg) no-repeat 0 center");
                cont3.innerHTML = "";
                isok3 = 1;
                // console.log(isok3);
            } else {
                css(cont3, "display", "block");
                css(cont3, "background", "url(../img/reg-no.png) no-repeat 0 center");
                cont3.innerHTML = "密码格式错误";
            }
        } else {
            css(cont3, "display", "block");
            css(cont3, "background", "url(../img/reg-no.png) no-repeat 0 center");
            cont3.innerHTML = "请输入设置密码";
        }
    };

    //确认密码验证
    var cpbtn = document.getElementById("confirmPassworld");
    var cont4 = document.getElementById("four");
    cpbtn.onblur = function () {
        var yes = mpbtn.value.trim();
        var res = cpbtn.value.trim();
        if (res) {
            if (res == yes) {
                css(cont4, "display", "block");
                css(cont4, "background", "url(../img/reg-yes.jpg) no-repeat 0 center");
                cont4.innerHTML = "";
                isok4 = 1;
                // console.log(isok4);
            } else {
                css(cont4, "display", "block");
                css(cont4, "background", "url(../img/reg-no.png) no-repeat 0 center");
                cont4.innerHTML = "两次输入的密码不一致";
            }
        } else {
            css(cont4, "display", "block");
            css(cont4, "background", "url(../img/reg-no.png) no-repeat 0 center");
            cont4.innerHTML = "请输入确认密码";
        }
    };

    //复选框验证
    var checkbox = document.getElementById("checkbox");
    var regbtn = document.getElementById("regbtn");
    checkbox.onclick = function () {
        if (checkbox.checked) {
            css(regbtn, "background", "#dc0f50");
            // isok5 = 1;
            console.log(isok5);
        } else {
            css(regbtn, "background", "#999999");
        }
    };

    //4、注册功能
    /*
        post
        php/02reg.php
        name : 需要注册的用户名
        passw : 需要注册的密码
        返回
            {
                yes : 成功；
                no : 失败
            }
     */

    var regbtn = document.getElementById("regbtn");
    regbtn.onclick = function () {

        if (isok1 == 1 && isok2 == 1 && isok3 == 1 && isok4 == 1 && isok5 == 1) {
            var phonebtn = document.getElementById("phone");
            // var mpbtn = document.getElementById("makePassworld");
            var usern = phonebtn.value.trim();
            console.log(phonebtn);

            var passwo = mpbtn.value.trim();
            console.log(passwo);
            var url = "../api/02reg.php";
            var data = "name=" + usern + "&passw=" + passwo;
            ajax("post", url, data, function (str) {
                location.href = 'login.html?';
            });
        } else {
            alert("您还未完成注册所需内容的填写");
        }
    };
};