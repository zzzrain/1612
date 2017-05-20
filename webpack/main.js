//var $ = require("jquery");
//require  module.exports
//import export
import $ from "jquery";
window.$ = $;
//import "weui";
//require("weui");
//cnpm install vue
import Vue from "vue";
//cnpm install vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Vuex from 'vuex'
Vue.use(Vuex)
	//引入mui
require("./mui/css/mui.css")
window.mui = require("mui")
	//组件
	//首页
var index = require("./components/index.vue")
	//主题
import topics from "./components/index/topics.vue"
//收藏
import collect from "./components/index/collect.vue"
//详细页面
import detail from "./components/detail.vue"

var home = require("./components/home.vue")
var weui = require("./components/weui.vue")
var muiCp = require("./components/mui/mui.vue")
var muiCp2 = require("./components/mui/mui2.vue")
	//路由
var router = new VueRouter({
		routes: [{
			path: "/index",
			component: index,
			children: [{
				path: "topics",
				component: topics,
			}, {
				path: "collect",
				component: collect,
			}]
		}, {
			path: "/detail",
			component: detail
		},{
			path: "/home",
			component: home
		}, {
			path: "/weui",
			component: weui
		}, {
			path: "/mui",
			component: muiCp
		}, {
			path: "/mui2",
			component: muiCp2
		}]
	})
	//状态管理
var store = new Vuex.Store({
	state: {
		exchange: "测试"
	},
	mutations: {
		setExchange(state, data) {
			state.exchange = data
		}
	},
	getters: {
		getExchange(state) {
			return state.exchange
		}
	}
});
new Vue({
	el: "#demo",
	template: `
			<router-view></router-view>
	`,
	router,
	store,
	data: {
		name: "wscats"
	},
})

//vue vue-loader vue-resource vuex ui es6 webpack/gulp sass/less jquery/zepto