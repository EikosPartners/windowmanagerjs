# windowmanager.js
[![NPM Status](https://img.shields.io/npm/v/windowmanager.svg?style=flat)](https://www.npmjs.com/package/windowmanager)
[![Build Status](https://travis-ci.org/EikosPartners/windowmanagerjs.svg?branch=master)](https://travis-ci.org/EikosPartners/windowmanagerjs)
[![devDependencies Status](https://david-dm.org/EikosPartners/windowmanagerjs/dev-status.svg)](https://david-dm.org/EikosPartners/windowmanagerjs?type=dev)<br>
A framework to manage multiple dockable HTML windows.<br>
This extension is designed to support multiple different different encapsulation runtimes.<br>
See [API Documentation](https://eikospartners.github.io/windowmanagerjs/) for more information.

Runtimes supported:
* Modern Web Browsers (Chrome, Firefox, IE, Edge, Safari)
* [OpenFin](https://openfin.co/)
* [Electron](http://electron.atom.io/)

Future runtimes:
* [NW.js](http://nwjs.io/)

## Examples
You can see a live demo at [Eikos Partners Blotter Demonstration](http://blotter.eikospartners.com/install).<br>
An open source example can be found at: https://github.com/aesalazar/windowmanagerjsdemo<br>
A basic example to get started:
```javascript
// Create a new window:
let childWindow = new windowmanager.Window({
    url: "child.html", // Loads "child.html" based on the current window's url.
    width: 500,
    height: 500
});

// Execute code when window is ready for commands:
childWindow.onReady(() => {
    childWindow.focus(); // Set focus to childWindow.
});

// Use the layout manager.
let state = {
    width: 400, 
    height: 400,
    url: 'child.html',
    title: 'Child Window',
    frame: false 
};

let configs = [state, state, state];

let layout = new windowmanager.Layout('tabbed', 'layout-div', configs);
```
## Installation - NPM package / express server   
```bash
npm install --save windowmanager
```
Loading the package via `require` in node only gives you access to the script paths to make it easier to serve up the script:
```javascript
const windowmanager = require('windowmanager');
...
// Start windowmanager in this node instance:
windowmanager.start({
    // Optionally override the windowmanager package.json options for Electron's runtime:
    endpoint: "http://localhost:5000/",      // The starting window's page location
    config: "http://localhost:5000/app.json" // Where the OpenFin/Electron app.json startup file is
});
...
// Set up to access windowmanager debug, minified and map scripts via root url:
// Will give access to windowmanager through: example.com/windowmanager.js
app.use('/', express.static(windowmanager.distPath, { index: false }));

// Set up access to windowmanager.js via get:
app.get('/js/windowmanager.js', function (req, res) {
    res.sendFile(windowmanager.debug.scriptPath);
});
app.get('/js/windowmanager.min.js', function (req, res) {
    res.sendFile(windowmanager.min.scriptPath);
});
```
## Installation - dist script 
Manually download either one of the following scripts from the dist folder (which contains the latest nightly version), and add it to your application.<br>
<b>NOTE:</b> Bundling or compiling with babelify will break the script.
  * [windowmanager](https://raw.githubusercontent.com/EikosPartners/windowmanagerjs/master/dist/windowmanager.js)
  * [windowmanager.min](https://raw.githubusercontent.com/EikosPartners/windowmanagerjs/master/dist/windowmanager.min.js)<br>

#### Example installation with dist script and webpack 
* Download dist script
* Put in its own folder in root directory 
* in webpack config, under your `module:` `rules:` `test: /\.js$/,` make sure to `exclude:/folderName/`
* npm install `copy-webpack-plugin` and 
* in webpack config, import `const CopyWebpackPlugin = require('copy-webpack-plugin')`
* under plugins include
``` 
    new CopyWebpackPlugin([
      {from:'folderName',to:'folderName'} 
    ]),    
```
* in your entry point html page, include `<script src="./folderName/windowmanager.js></script>`
