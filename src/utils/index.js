import EventHandler from './EventHandler';
import SyncCallback from './SyncCallback';
import load from './load';

const genUIDE7 = (() => {
    let lut = [];

    for (let i = 0; i < 256; i += 1) { lut[i] = (i < 16 ? '0' : '') + (i).toString(16); }

    return () => {
        let d0 = Math.random() * 0xffffffff | 0;
        let d1 = Math.random() * 0xffffffff | 0;
        let d2 = Math.random() * 0xffffffff | 0;
        let d3 = Math.random() * 0xffffffff | 0;

        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    };
})();

function getUniqueWindowName() {
    return 'window' + genUIDE7() + (new Date()).getTime();
};

export default {
    getUniqueWindowName,
    EventHandler,
    SyncCallback,
    load
};
