<?php
//验证用户名是否存在
//    1、接收前端传来的参数
//    2、查询数据库，返回结果

//中文转义
header("content-type:text/html;charset=utf-8");

//接收前端传来的参数（post方法）
$user=isset($_POST["username"]) ? $_POST["username"] : "";
// echo $user;

//查询数据库
include 'connect.php';//(验证数据库是否成功连接)

//查询语句
$sql="SELECT * FROM user where username = '$user'";
//结果集
$res=$conn->query($sql);
//获取结果集里面的内容部分
$row = $res->fetch_all(MYSQLI_ASSOC);
// var_dump($row);
if($row){
    echo "no";
}else{
    echo "yes";
}
?>