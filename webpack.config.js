// TODO: Determine which auto release system like:
//       https://github.com/semantic-release/semantic-release
//       https://github.com/webpro/release-it
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;
var packageJson = require('./package.json');

var libraryName = 'windowmanager';

var plugins = [], outputFile, config;

plugins.push(new webpack.DefinePlugin({
    VERSION: JSON.stringify(packageJson.version)
}));

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

config = {
    entry: [__dirname + '/src/index.js'],
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    node: {
        global: false,
        process: false,
        __dirname: false,
        __filename: false
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins
};

module.exports = config;
