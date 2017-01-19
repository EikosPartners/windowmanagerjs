/* global fin */
import './ready';

// TODO: Add runtime checks here for OpenFin and Electron
let runtime;

if ((typeof process !== 'undefined' && process && process.versions &&
    (process.versions.electron || process.versions.node)) ||
    (typeof window !== 'undefined' && window && window.nodeRequire && window.nodeRequire.runtime)) {
    // We are running in an Electron Runtime:
    runtime = require('./electron/index');
} else if (typeof fin !== 'undefined' && fin && fin.desktop && fin.desktop.main) {
    // We are running in an OpenFin Runtime:
    runtime = require('./openfin/index');
} else {
    // We are running in an Browser Runtime:
    runtime = require('./browser/index');
}

export default runtime;
