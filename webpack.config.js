const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: __dirname + "/src/js", // or path: path.join(__dirname, "dist/js"),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'react']
				},
				exclude: /node_modules/
			},
      { test: /(\.css$)/, loaders: ['style-loader', 'css-loader'] }, { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' }
		]
	}
};
