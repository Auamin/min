<?php
//数据库删除
//    1、接收前端传来的参数
//    2、查询数据库，删除数据

//中文转义
header("content-type:text/html;charset=utf-8");
//接收前端传来的参数（post方法）
$id=isset($_POST["id"]) ? $_POST["id"] : "";
$user=isset($_POST["user"]) ? $_POST["user"] : "";
echo $user;

//查询数据库
include 'connect.php';//(验证数据库是否成功连接)
//查询语句
$sql="DELETE FROM car WHERE id='$id' AND username='$user'";
$res=$conn->query($sql);
echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>