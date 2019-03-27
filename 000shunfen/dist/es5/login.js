"use strict";

window.onload = function () {
    //一、正则验证
    //1、手机号码验证+注册验证
    var phonebtn = document.getElementById("phone");
    var cont = document.getElementById("one");
    var cont1 = document.getElementById("two");
    var cont2 = document.getElementById("three");
    phonebtn.onblur = function () {
        var res = phonebtn.value.trim();
        //非空验证
        if (res) {
            //正则验证
            if (checkReg.tel(res)) {
                css(cont, "display", "none");
                css(cont1, "display", "inline-block");
                cont.innerHTML = "";
            } else {
                css(cont1, "display", "none");
                css(cont, "display", "block");
                css(cont, "background", "url(../img/reg-no.png) no-repeat 0 center");
                cont.innerHTML = "请输入11位有效手机号";
            }
        } else {
            css(cont1, "display", "none");
            css(cont, "display", "block");
            css(cont, "background", "url(../img/reg-no.png) no-repeat 0 center");
            cont.innerHTML = "请输入手机号";
        }
    };

    //2、连接数据库，登陆接口验证
    //获取密码节点
    var mpbtn = document.getElementById("makePassworld");
    var cont2 = document.getElementById("three");
    var regbtn = document.getElementById("regbtn");
    /*
        登录功能
        post
           php/03login.php
           name : 用户名
           passw : 密码
           返回
               {
                   yes : 登录成功；
                   no : 登录失败
               }
    */
    regbtn.onclick = function () {
        var url = "../api/03login.php";
        var res1 = phonebtn.value.trim();
        var res2 = mpbtn.value.trim();
        // console.log(res1);
        // console.log(res2);
        var data = "name=" + res1 + "&passw=" + res2;
        ajax("post", url, data, function (str) {
            // console.log(str);
            if (str == "no") {
                css(cont, "display", "block");
                css(cont, "background", "url(../img/reg/error_bg.png) no-repeat 0 center");
                cont.innerHTML = "用户名与密码不匹配";
            } else if (str == "yes") {
                css(cont1, "display", "inline-block");
                css(cont2, "display", "inline-block");
                css(cont, "display", "none");
                cont2.innerHTML = "";
                //验证成功，用绝对路径实现跳转
                cookie.set("user", res1, { path: "/000shunfen" });
                location.href = '../first.html?';
            }
        });
    };
};