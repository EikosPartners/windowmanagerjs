// TODO: Support UMD (CommonJS, AMD), Nodejs, and ES6 module loading.
//       Do this by stitching all scripts together, and wrap it in a define or something else.
//       Maybe after stitching, make it export windowfactory, and use babel-umd to compile to UMD?
// TODO: Offer a compilation output without ScaleJS. (To support non-ScaleJS applications)

/*global windowfactory*/
export default windowfactory;

function registerOnCore(core) {
    core.registerExtension({
        windowfactory: windowfactory
    });
}

if (typeof define !== "undefined" && define && define.amd) {
    // Scalejs 1.0
    if (require.defined("scalejs!core")) { require(["scalejs!core"], registerOnCore); }
    // Scalejs 2.0
    if (require.defined("scalejs.core")) { require(["scalejs.core"], registerOnCore); }
}