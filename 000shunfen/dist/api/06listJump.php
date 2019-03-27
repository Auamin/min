<?php
//列表页点击跳转到详情页 
// 1、接收前端传来的参数
// 2、成功连接数据库，查询数据库语句
// 3、根据前端的需求，为其提供需要的数据

//中文转义
header("content-type:text/html;charset=utf-8");

//接收前端传来的参数
$id = isset($_GET["id"]) ? $_GET["id"] : "";
// echo $id;

//成功链接数据库
include 'connect.php';//要测试是否成功链接数据库

//查询数据库语句（查询id）
$sql = "SELECT * FROM goodlists WHERE id = $id";
// // var_dump($sql);
// //得到一个结果集
$res = $conn->query($sql); 
// //得到结果集里面的内容
$content = $res->fetch_all(MYSQLI_ASSOC);

//根据前端的需求将数据传给前端
echo json_encode($content,JSON_UNESCAPED_UNICODE);

?>