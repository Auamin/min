"use strict";function jQuery(t){return document.getElementById(t)}var MyMar;document.getElementsByClassName=function(t){for(var o=[],e=new RegExp("\\b"+t+"\\b"),n=this.getElementsByTagName("*"),i=0;i<n.length;i++){var s=n[i].className;e.test(s)&&o.push(n[i])}return o};for(var speed=1,spec=1,ipath="../img/",thumbs=document.getElementsByClassName("thumb_img"),i=0;i<thumbs.length;i++)thumbs[i].onmouseover=function(){jQuery("main_img").src=this.rel,jQuery("main_img").link=this.link},thumbs[i].onclick=function(){location=this.link};function gotop(){jQuery("showArea").scrollTop-=spec}function gobottom(){jQuery("showArea").scrollTop+=spec}jQuery("main_img").onclick=function(){location=this.link},jQuery("gotop").onclick=function(){this.src=ipath+"gotop2.gif",MyMar=setInterval(gotop,speed)},jQuery("gotop").onmouseout=function(){this.src=ipath+"gotop.gif",clearInterval(MyMar)},jQuery("gobottom").onclick=function(){this.src=ipath+"gobottom2.gif",MyMar=setInterval(gobottom,speed)},jQuery("gobottom").onmouseout=function(){this.src=ipath+"gobottom.gif",clearInterval(MyMar)};