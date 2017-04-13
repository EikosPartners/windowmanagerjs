const packageObject = require('./package.json');
const path = require('path');

exports.version = packageObject.version;

exports.distPath = path.join(__dirname, './dist');

exports.debug = {
    scriptPath: path.join(exports.distPath, 'windowmanager.js'),
    sourceMapPath: path.join(exports.distPath, 'windowmanager.js.map')
};

exports.release = {
    scriptPath: path.join(exports.distPath, 'windowmanager.min.js'),
    sourceMapPath: path.join(exports.distPath, 'windowmanager.min.js.map')
};

exports.start = function (config) {
    global.__windowmanagerConfig = config || {};
    require(path.resolve(exports.distPath, 'windowmanager.js'));
};
