"use strict";window.onload=function(){var s=document.getElementById("phone"),t=document.getElementById("one"),o=document.getElementById("two"),c=document.getElementById("three");s.onblur=function(){var e=s.value.trim();e?checkReg.tel(e)?(css(t,"display","none"),css(o,"display","inline-block"),t.innerHTML=""):(css(o,"display","none"),css(t,"display","block"),css(t,"background","url(../img/reg-no.png) no-repeat 0 center"),t.innerHTML="请输入11位有效手机号"):(css(o,"display","none"),css(t,"display","block"),css(t,"background","url(../img/reg-no.png) no-repeat 0 center"),t.innerHTML="请输入手机号")};var l=document.getElementById("makePassworld");c=document.getElementById("three");document.getElementById("regbtn").onclick=function(){var n=s.value.trim(),e=l.value.trim();ajax("post","../api/03login.php","name="+n+"&passw="+e,function(e){"no"==e?(css(t,"display","block"),css(t,"background","url(../img/reg/error_bg.png) no-repeat 0 center"),t.innerHTML="用户名与密码不匹配"):"yes"==e&&(css(o,"display","inline-block"),css(c,"display","inline-block"),css(t,"display","none"),c.innerHTML="",cookie.set("user",n,{path:"/000shunfen"}),location.href="../first.html?")})}};