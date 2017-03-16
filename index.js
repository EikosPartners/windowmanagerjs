const path = require('path');

exports.debug = {
    scriptPath: path.join(__dirname, './dist/windowmanager.js'),
    sourceMapPath: path.join(__dirname, './dist/windowmanager.js.map')
};

exports.min = {
    scriptPath: path.join(__dirname, './dist/windowmanager.min.js'),
    sourceMapPath: path.join(__dirname, './dist/windowmanager.min.js.map')
};

exports.distPath = path.join(__dirname, './dist');

exports.start = function (config) {
    global.__windowmanagerConfig = config || {};
    require(path.resolve(__dirname, 'dist', 'windowmanager.js'));
};
