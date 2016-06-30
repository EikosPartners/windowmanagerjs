// TODO: Support UMD (CommonJS, AMD), Nodejs, and ES6 module loading.
//       Do this by stitching all scripts together, and wrap it in a define or something else.
//       Maybe after stitching, make it export windowfactory, and use babel-umd to compile to UMD?
// TODO: Offer a compilation output without ScaleJS. (To support non-ScaleJS applications)

/*global windowfactory*/
export default windowfactory;
if (typeof global !== "undefined" && global) { global.windowfactory = windowfactory; }
if (typeof window !== "undefined" && window) { window.windowfactory = windowfactory; }

if (typeof define !== "undefined" && define && define.amd) {
    require([
        "scalejs!core"
    ], function (
        core
    ) {
        core.registerExtension({
            windowfactory: windowfactory
        });
    });
}