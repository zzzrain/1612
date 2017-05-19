var $ = require("jquery")
$("p").css("color","red")
var angular = require("angular");
var app = angular.module("demo", []);
var indexCtrl = require("./controller/indexCtrl.js");
indexCtrl(app)

/*class obj {
	constructor(name){
		this.name = name
	};
	test(){
		console.log("test")
	}
}
let a = new obj("abc")

var str = `
	abc
	cbd
	def
`;*/
