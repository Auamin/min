<?php
//  后端：
//      *接收前端传来的参数；
//      *查询数据库，根据前端需求，获取相对于数据；
//      *echo数据给前端

// 中文转义
header("content-type:text/html;charset=utf-8");

//接收前端的数据
$page = isset($_POST["page"]) ? $_POST["page"] : "";
$num = isset($_POST["num"]) ? $_POST["num"] : "";
$pai = isset($_POST["pai"]) ? $_POST["pai"] : "";
// echo $page,$num;


//成功连接数据库
include 'connect.php';

//查询语句
$index = ($page - 1) * $num;

if($pai!=""){
	$sql = "SELECT * FROM goodlists ORDER BY price LIMIT $index,$num";
}
if($pai==""){
	$sql = "SELECT * FROM goodlists LIMIT $index,$num";
}

// echo $sql;

//结果集
$res = $conn->query($sql);

//获取结果集里面的内容部分
$arr = $res->fetch_all(MYSQLI_ASSOC);//对象格式  [{},{},{}]

//获取总条数
$sql2 = "SELECT * FROM goodlists";
	
//执行sql
$res2 = $conn->query($sql2);
	
//获取总行数
$alln = $res2->num_rows;
	
//	var_dump($row);

$list = array(
	'total' => $alln,//总条数
	'data' => $arr,//查询的数据内容
	'page' => $page,//第几页
	'num' => $num//每页显示多少条
);
	
	//把对象转成字符串，echo给前端
	echo json_encode($list,JSON_UNESCAPED_UNICODE);

	// //关闭
	// $res->close();
	// $res2->close();
	// $conn->close();
?>
