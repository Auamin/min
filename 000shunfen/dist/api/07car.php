<?php
//查询用户名
//    1、接收前端传来的参数
//    2、查询数据库，返回结果

//中文转义
header("content-type:text/html;charset=utf-8");

//接收前端传来的参数（post方法）
$user=isset($_POST["name"]) ? $_POST["name"] : "";

// echo $user;

//查询数据库
include 'connect.php';//(验证数据库是否成功连接)

//查询语句
$sql="SELECT * FROM car where username = '$user'";

// //得到一个结果集
$res = $conn->query($sql); 
// //得到结果集里面的内容
$content = $res->fetch_all(MYSQLI_ASSOC);

//根据前端的需求将数据传给前端
echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>







