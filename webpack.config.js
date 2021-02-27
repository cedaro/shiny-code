const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const mode = process.env.NODE_ENV || 'development';

const config = {
	mode: mode,
	entry: {
		'js/editor': './blocks/editor.js',
		'css/editor': './blocks/code/editor.scss',
		'css/themes/atom-one-dark/prism': './blocks/code/scss/themes/atom-one-dark/prism.scss',
		'css/themes/atom-one-light/prism': './blocks/code/scss/themes/atom-one-light/prism.scss',
		'css/themes/atom-one-dark/codemirror': './blocks/code/scss/themes/atom-one-dark/codemirror.scss',
		'css/themes/atom-one-light/codemirror': './blocks/code/scss/themes/atom-one-light/codemirror.scss'
	},
	output: {
		path: __dirname,
		filename: 'build/[name].js'
	},
	externals: {
		_: '_',
		backbone: 'Backbone',
		jquery: 'jQuery',
		underscore: '_',
		wp: 'wp'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /.*\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin( {
			filename: 'build/[name].css'
		} )
	]
};

if ( 'production' === mode ) {
	config.plugins.push( new webpack.LoaderOptionsPlugin( { minimize: true } ) );
} else {
	config.devtool = process.env.SOURCEMAP || 'source-map';
}

module.exports = config;
