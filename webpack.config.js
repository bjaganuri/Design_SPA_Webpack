const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifier = require('webpack-build-notifier');
const isProduction = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const EslintFriendlyFormatter = require("eslint-friendly-formatter");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

const ASSET_PATH = process.env.ASSET_PATH || '/';

const extractPlugin = new ExtractTextPlugin({
	filename: 'css/[name].bundle.css'
});

const pathsToClean = ['dist'];

module.exports = {
	devtool: 'source-map',
	entry: {
		vendor:SOURCE_PATH+'/public/vendor.js',
		app:SOURCE_PATH+'/public/app.js'
	},
	output: {
		path: DIST_PATH,
		filename: 'js/[name].bundle.js',
		publicPath: ASSET_PATH
	},
	module: {
		rules: [
			/*{	
				enforce: 'pre',
				test: /\.(js|json)?$/,
				include: [path.join(SOURCE_PATH , "app")],
				exclude: [path.join(__dirname, 'node_modules')],
				use: [{
					loader: "eslint-loader",
					options: { 
						fix: true,
						cache: true,
						formatter: EslintFriendlyFormatter,
						emitError: true,
						quiet: false,
						failOnWarning: false,
						failOnError: false,
						outputReport: {
							formatter: EslintFriendlyFormatter
						}
					}
				}]
			},*/
			{
				test: /\.css?$/,
				use: extractPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: [
					  {
						  loader: 'url-loader',
						  options: {
							  name: 'css/[name].[ext]',
							  limit: 100000
						  }
					  }
				]
			},
			{
				test: /\.(jpe?g)$/i,
				loader: 'url-loader',
				options: {
					  name: 'images/[name].[ext]',
					  limit: 100000
				 }
			}
		]
	},
	resolve : {
		extensions: ['.js', '.json'],
		modules: ['node_modules']
	},
	plugins: [
		new WebpackBuildNotifier(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		extractPlugin
	]
};
