var webpack = require("webpack");
module.exports = {
	//用于调试，告知错误发生地点
	devtool:"source-map",
	//入口文件
	entry: __dirname + "/main.js",
	//导出文件
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},
	//vue2.0加上这句，然后暴露全局的vue函数
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js',
		}
	},
	module: {
		loaders: [{
			//cnpm install babel-loader
			//cnpm install babel-core babel-preset-es2015 //安装babel  实现 ES6 到 ES5
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}, {
			//cnpm install html-loader
			test: /\.html$/,
			loader: "html-loader"
		}, {
			//cnpm install vue-loader vue-template-compiler
			test: /\.vue$/,
			loader: "vue-loader"
		}, {
			//cnpm install css-loader style-loader
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			//cnpm install sass-loader node-sass
			test: /\.scss$/,
			loader: "sass-loader"
		}, {
			//cnpm install less-loader less
			test: /\.less$/,
			loader: "less-loader"
		}, {
			//cnpm install less-loader less
			test: /\.(jpg|png|gif|jpeg)$/,
			loader: "url-loader"
		}, {
			//cnpm install file-loader
			test: /\.(ttf|svg|woff|eot)$/,
			loader: "file-loader"
		}]
	},
	//配置服务器
	devServer: {
		//服务器文件夹
		contentBase: "./public",
		//port
		//实时更新
		inline: true
	},
	plugins: [
		//代码压缩
		//new webpack.optimize.UglifyJsPlugin()
	]
}