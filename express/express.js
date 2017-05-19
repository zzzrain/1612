//引入express框架
var express = require("express");
var mysql = require("mysql");

var bodyParser = require('body-parser')
//创建连接
var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "asm"
})
//执行数据库连接 .close();
connection.connect();
//创建应用
var app = express();
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

//views, 放模板文件的目录，比如： 
app.set('views', './views')
//view engine, 模板引擎
app.set('view engine', 'jade')

//匹配路由 /
app.get('/', function(req, res) {
	connection.query("select * from news",function(err,data){
		console.log(data)
		var content = "123";
		res.render("qianfeng",{
			//model
			name:'xie',
			name2:'lan',
			news:data
		})
	})
	//res.send("<p style='color:red'>"+content+"</p>");
})
//匹配路由 /add
app.get('/add/:id/:age', function(req, res) {
	//追加请求头
	res.append("Access-Control-Allow-Origin","*");
	//?id=xx&age=xxx
	console.log(req.query)
	//:id/:age
	console.log(req.params)
	res.send("增加信息");
})
//匹配路由 /add
app.post('/add', function(req, res) {
	//追加请求头
	res.append("Access-Control-Allow-Origin","*");
	//?id=xx&age=xxx
	//console.log(req.query)
	//:id/:age
	//console.log(req.params)
	console.log(req.body);
	connection.query("insert into news (title,text) values ('" + req.body.title + "','" + req.body.text + "')",function(err,data){
		console.log(data)
	})
	res.send("增加信息");
	
})
//用3000端口打开
app.listen(3000);