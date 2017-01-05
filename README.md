# windowmanager.js v0.10.0
An extension for scalejs to manage multiple dockable HTML windows.  
This extension is designed to support multiple different different encapsulation runtimes.


Runtimes supported:
* Modern Web Browsers (Chrome, Firefox, IE, Edge, Safari)
* [OpenFin](https://openfin.co/)
* [Electron](http://electron.atom.io/)

Future runtimes:
* [NW.js](http://nwjs.io/)

## Live Example
You can see a live demo at [Eikos Partners Blotter Demonstration](http://blotter.eikospartners.com/install).  
An open source example will be available soon.

## Installing via npm
`npm install --save https://github.com/EikosPartners/windowmanagerjs.git`

## Installing in Script Folder
1. Download either one of the following scripts from the dist folder (which contains the latest stable version):
  * [windowmanager](https://raw.githubusercontent.com/EikosPartners/windowmanagerjs/master/dist/windowmanager.js)
  * [windowmanager.min](https://raw.githubusercontent.com/EikosPartners/windowmanagerjs/master/dist/windowmanager.min.js)
  * Or one of the scripts in the build folder. The build folder contains nightlies of the repository and may often be broken.
2. Add the script to the `/Scripts/` folder in your scalejs application.
3. [Optional] Add the script to your `config.js` paths to shorten the define. Example:
`"windowmanager": "Scripts/windowmanager",`

## API Information
[API Wiki](https://eikospartners.github.io/windowmanagerjs/)