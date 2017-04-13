// TODO: Determine which auto release system like:
//       https://github.com/semantic-release/semantic-release
//       https://github.com/webpro/release-it
const failPlugin = require('webpack-fail-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.mode;
const packageJson = require('./package.json');

const libraryName = 'windowmanager';
let plugins = [failPlugin];
let outputFile;
let config;

plugins.push(new webpack.DefinePlugin({
    VERSION: JSON.stringify(packageJson.version)
}));

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = `${libraryName}.min.js`;
} else {
    outputFile = `${libraryName}.js`;
}

config = {
    entry: [`${__dirname}/src/index.js`],
    devtool: 'source-map',
    output: {
        path: `${__dirname}/dist`,
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
