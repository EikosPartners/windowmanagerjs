const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const isMin = require('yargs').argv.p;
const packageJson = require('./package.json');

const libraryName = 'windowmanager';
let plugins = [];
let outputFile;
let config;

plugins.push(new webpack.DefinePlugin({
    VERSION: JSON.stringify(packageJson.version)
}));

if (isMin) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
        sourceMap: true
    }));
    outputFile = `${libraryName}.min.js`;
} else {
    outputFile = `${libraryName}.js`;
}

config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /(\.jsx|\.js)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }]
    },
    node: {
        global: false,
        process: false,
        __dirname: false,
        __filename: false
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    plugins: plugins
};

module.exports = config;
