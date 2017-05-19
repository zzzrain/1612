var store = new Vuex.Store({
	//存储数据的地方
	state: {
		name: "新闻",
		author: "wscats",
		searchName: ""
	},
	mutations: {
		//改变值的方法
		changeName(state, a) {
			state.name = a
		},
		changeSearchName(state, a) {
			state.searchName = a
		}
	},
	//获取数据的方法
	getters: {
		getName(state) {
			return state.name
		},
		getSearchName(state) {
			return state.searchName
		}
	}
})