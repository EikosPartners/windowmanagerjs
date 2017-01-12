import windowmanager from './global';
import './runtime/index';

// Make windowmanager global:
if (typeof global !== 'undefined' && global) { global.windowmanager = windowmanager; }
if (typeof window !== 'undefined' && window) { window.windowmanager = windowmanager; }

export default windowmanager;
