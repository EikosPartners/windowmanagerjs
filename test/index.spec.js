/* eslint-disable max-len */
import { assert } from 'chai';
import windowmanager from '../index';
import fs from 'fs';

describe('index.js', function () {
    describe('windowmanager object', function () {
        it('should be defined', () => {
            assert.isDefined(windowmanager, 'windowmanager is not defined');
            assert.isObject(windowmanager, 'windowmanager is not an Object');
        });
        it('should contain version', () => {
            assert.isDefined(windowmanager.version, 'windowmanager.version is not defined');
            assert.isString(windowmanager.version, 'windowmanager.version is not a String');
        });
        it('should contain dist path', () => {
            assert.isDefined(windowmanager.distPath, 'windowmanager.distPath is not defined');
            assert.isString(windowmanager.distPath, 'windowmanager.distPath is not a String');
            assert.isTrue(fs.existsSync(windowmanager.distPath), 'windowmanager.distPath pathname doesn\'t exist');
        });
        it('should contain debug paths', () => {
            assert.isDefined(windowmanager.debug, 'windowmanager.debug is not defined');
            assert.isObject(windowmanager.debug, 'windowmanager.debug is not an Object');
            assert.isDefined(windowmanager.debug.scriptPath, 'windowmanager.debug.scriptPath is not defined');
            assert.isDefined(windowmanager.debug.sourceMapPath, 'windowmanager.debug.sourceMapPath is not defined');
            assert.isString(windowmanager.debug.scriptPath, 'windowmanager.debug.scriptPath is not a String');
            assert.isString(windowmanager.debug.sourceMapPath, 'windowmanager.debug.sourceMapPath is not a String');
            assert.isTrue(fs.existsSync(windowmanager.debug.scriptPath), 'windowmanager.debug.scriptPath pathname doesn\'t exist');
            assert.isTrue(fs.existsSync(windowmanager.debug.sourceMapPath), 'windowmanager.debug.sourceMapPath pathname doesn\'t exist');
        });
        it('should contain minified/release paths', () => {
            assert.isDefined(windowmanager.release, 'windowmanager.release is not defined');
            assert.isObject(windowmanager.release, 'windowmanager.release is not an Object');
            assert.isDefined(windowmanager.release.scriptPath, 'windowmanager.release.scriptPath is not defined');
            assert.isDefined(windowmanager.release.sourceMapPath, 'windowmanager.release.sourceMapPath is not defined');
            assert.isString(windowmanager.release.scriptPath, 'windowmanager.release.scriptPath is not a String');
            assert.isString(windowmanager.release.sourceMapPath, 'windowmanager.release.sourceMapPath is not a String');
            assert.isTrue(fs.existsSync(windowmanager.release.scriptPath), 'windowmanager.release.scriptPath pathname doesn\'t exist');
            assert.isTrue(fs.existsSync(windowmanager.release.sourceMapPath), 'windowmanager.release.sourceMapPath pathname doesn\'t exist');
        });
        it('should contain library start', () => {
            assert.isDefined(windowmanager.start, 'windowmanager.start is not defined');
            assert.isFunction(windowmanager.start, 'windowmanager.start is not a Function');
        });
    });
});
