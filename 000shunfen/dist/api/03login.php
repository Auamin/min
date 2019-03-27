<?php
//验证用户名是否存在
//    1、接收前端传来的参数
//    2、查询数据库，返回结果

//中文转义
header("content-type:text/html;charset=utf-8");

//接收前端传来的参数（post方法）
$name=isset($_POST["name"]) ? $_POST["name"] : "";
$passw=isset($_POST["passw"]) ? $_POST["passw"] : "";

// echo $user;

//查询数据库
include 'connect.php';//(验证数据库是否成功连接)

//查询语句
$sql1="SELECT * FROM user where username = '$name'";
$sql2="SELECT * FROM user where passwor = '$passw'";
//结果集
$res1=$conn->query($sql1);
$res2=$conn->query($sql2);
//获取结果集里面的内容部分
$row1 = $res1->fetch_all(MYSQLI_ASSOC);
$row2 = $res2->fetch_all(MYSQLI_ASSOC);
// var_dump($row);
if($row1 && $row2){
    echo 'yes';
}else{
    echo "no";
}
?>