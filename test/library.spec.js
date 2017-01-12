import { assert } from 'chai';
import windowmanager from '../dist/windowmanager.js';

describe('windowmanager.js', function () {
    describe('windowmanager object', function () {
        it('should be defined', () => {
            assert.isDefined(windowmanager);
        });
        it('should contain version', () => {
            assert.isDefined(windowmanager.version);
        });
    });
});
