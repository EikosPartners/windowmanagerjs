# scalejs.windowfactory
An extension for scalejs to manage multiple dockable HTML windows.  
This extension is designed to support multiple different different encapsulation runtimes.  


Runtimes supported:  
* [OpenFin](https://openfin.co/)  
* [Electron](http://electron.atom.io/)  

Future runtimes:  
* [NW.js](http://nwjs.io/)  
* Web Browsers (Chrome, Firefox, IE, Edge, ect.)  

## Running the Example Demo
See example/README.md

## Installing via Bower Install
`bower install https://github.com/EikosPartners/scalejs.windowfactory.git`

## Installing in Script Folder
1. Download either one of the following scripts from the dist folder (which contains the latest stable version):
  * [scalejs.windowfactory](https://raw.githubusercontent.com/EikosPartners/scalejs.windowfactory/master/dist/scalejs.windowfactory.js)
  * [scalejs.windowfactory.min](https://raw.githubusercontent.com/EikosPartners/scalejs.windowfactory/master/dist/scalejs.windowfactory.min.js)
  * Or one of the scripts in the build folder. The build folder contains nightlies of the repository and may often be broken.
2. Add the script to the `/Scripts/` folder in your scalejs application.
3. [Optional] Add the script to your `config.js` paths to shorten the define. Example:  
`"scalejs.windowfactory": "Scripts/scalejs.windowfactory",`

## API Information
[API Wiki](https://cdn.rawgit.com/EikosPartners/scalejs.windowfactory/master/doc/index.html)
