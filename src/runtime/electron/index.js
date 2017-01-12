import windowmanager from './global'; // Setup windowmanager runtime variables for Electron
// TODO: Determine if renderer should be setup using the startup script, and have renderer be a NOOP

if (windowmanager._isNode) {
    // We are running in an Electron's main script:
    require('./node/index');
} else if (windowmanager._isRenderer) {
    // We are running in an Electron renderer:
    require('./renderer/index');
}
