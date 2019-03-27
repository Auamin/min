<?php
//注册功能
// 1、接收前端传来的参数；
// 2、链接数据库
// 3、插入数据，将结果返回给前端

//中文转义
header("content-type:text/html;charset=utf-8");

//接收前端传来的参数（post方法）
$goodsid=isset($_POST["goodsid"]) ? $_POST["goodsid"] : "";
$name=isset($_POST["name"]) ? $_POST["name"] : "";
$onenum=isset($_POST["goodsnum"]) ? $_POST["goodsnum"] : "";
$oneprice=isset($_POST["oneprice"]) ? $_POST["oneprice"] : "";

echo $goodsid,$name,$onenum,$oneprice;

//成功连接数据库
include 'connect.php';//(验证数据库是否成功连接)

//查询数据库插入数据
$sql = "INSERT INTO car (id,username,goodsnum,goodsprice) VALUES ('$goodsid','$name','$onenum','$oneprice')";
//得到结果集
$res=$conn->query($sql);

//判断向前端返回信息
if($res){
    echo "yes";
}else{
    echo "no";
}

?>