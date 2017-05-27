//cnpm install vue
import Vue from "vue";
//cnpm install vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Vuex from 'vuex'
Vue.use(Vuex)

//var $ = require("jquery");
//require  module.exports
import $ from "jquery";
window.$ = $;

//import "weui";
//require("weui");

//引入mui
require("./mui/css/mui.css")
window.mui = require("mui")

//首页
import index from "./components/index.vue"
//主题
import topics from "./components/index/topics.vue"
//收藏
import collect from "./components/index/collect.vue"
//详细页面
import detail from "./components/detail.vue"

import home from "./components/home.vue"
import weui from "./components/weui.vue"
import muiCp from "./components/mui/mui.vue"
import muiCp2 from "./components/mui/mui2.vue"

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