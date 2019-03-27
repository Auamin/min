<?php
//排序接口
// 1、接收前端传来的数据
// 2、连接数据库，查询数据库，根据商品价格进行排序
// 3、返回前端所需要的数据

//中文转义
header("content-type:text/html;charset=utf-8");

//接收前端传来的参数
$x = isset($_GET["x"]) ? $_GET["x"] : "" ;
$y = isset($_GET["y"]) ? $_GET["y"] : "" ;
// echo $x,$y;

//链接数据库
include 'connect.php';//要测试是否成功链接数据库

//查询数据库
$sql = "SELECT * FROM imformation ORDER BY price LIMIT $x,$y";
//得到结果集
$res = $conn->query($sql);
//得到结果集里面的内容
$content = $res->fetch_all(MYSQLI_ASSOC);


//向前端返回所需要的数据
echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>