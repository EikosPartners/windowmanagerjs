# windowmanager.js
[![Build Status](https://travis-ci.org/EikosPartners/windowmanagerjs.svg?branch=master)](https://travis-ci.org/EikosPartners/windowmanagerjs)
[![devDependencies Status](https://david-dm.org/EikosPartners/windowmanagerjs/dev-status.svg)](https://david-dm.org/EikosPartners/windowmanagerjs?type=dev)
[![npm version](https://badge.fury.io/js/windowmanager.svg)](https://badge.fury.io/js/windowmanager)<br>
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
```

## Installation
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
Or manually download either one of the following scripts from the dist folder (which contains the latest nightly version), and add it to the your application.<br>
<b>NOTE:</b> Do not add it to a builder, since bundling or compiling with babelify will break the script.
  * [windowmanager](https://raw.githubusercontent.com/EikosPartners/windowmanagerjs/master/dist/windowmanager.js)
  * [windowmanager.min](https://raw.githubusercontent.com/EikosPartners/windowmanagerjs/master/dist/windowmanager.min.js)<br>
