<!--back-end 后端-->
<?php
	$con = mysql_connect("localhost","root","");
	mysql_select_db("asm", $con);
	mysql_query("set character set 'utf8'");//读库 
	$result = mysql_query("select * from news");
	//var_dump($result);
	$res = [];
	while($row = mysql_fetch_array($result)){
		array_push($res,$row);
	};
	//var_dump($res);
?>
<!--ajax jsonp websocke-->
<!--font-end 前端-->
<html>
	<head>
		<meta charset="utf-8" />
	</head>
	<body>
		<!--{{}} == <?php echo "";?>-->
		<h1><?php echo $res[0]['text']; ?></h1>
		<p>你好</p>
		<ul style="color:<?php echo "red"; ?>">
			<?php
				$i = 0;
				for(;$i<count($res);$i++){
					echo "<li>".$res[$i]['title']."-------".$res[$i]['text']."</li>";
				}
				?>
		</ul>
		<p></p>
	</body>
</html>