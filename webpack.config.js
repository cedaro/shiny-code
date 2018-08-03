const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const mode = process.env.NODE_ENV || 'development';

const editorCSSPlugin = new ExtractTextPlugin( {
	filename: 'build/css/editor.css'
} );

const themesCSSPlugin = new ExtractTextPlugin( {
	filename: 'build/[name]'
} );

const extractConfig = {
	use: [
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				plugins: [
					require( 'autoprefixer' ),
				],
			},
		},
		{
			loader: 'sass-loader'
		},
	],
};

const config = {
	mode: mode,
	entry: {
		'js/editor.js': './blocks/editor.js',
		'css/themes/atom-one-dark/prism.css': './blocks/code/scss/themes/atom-one-dark/prism.scss',
		'css/themes/atom-one-light/prism.css': './blocks/code/scss/themes/atom-one-light/prism.scss',
		'css/themes/atom-one-dark/codemirror.css': './blocks/code/scss/themes/atom-one-dark/codemirror.scss',
		'css/themes/atom-one-light/codemirror.css': './blocks/code/scss/themes/atom-one-light/codemirror.scss'
	},
	output: {
		path: __dirname,
		filename: 'build/[name]'
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
				test: /editor\.s?css$/,
				include: [
					/blocks/,
				],
				use: editorCSSPlugin.extract( extractConfig ),
			},
			{
				test: /.*\.scss$/,
				include: [
					/scss\/themes/,
				],
				use: themesCSSPlugin.extract( extractConfig ),
			}
		]
	},
	plugins: [
		editorCSSPlugin,
		themesCSSPlugin,
	]
};

if ( 'production' === mode ) {
	config.plugins.push( new webpack.LoaderOptionsPlugin( { minimize: true } ) );
} else {
	config.devtool = process.env.SOURCEMAP || 'source-map';
}

module.exports = config;
