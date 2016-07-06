## To Run Example in Electron

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/EikosPartners/scalejs.windowfactory
# Go into the repository
cd scalejs.windowfactory/example/app
# Install dependencies and run the app
npm install && npm start
``` 

## To Run Example in OpenFin

To clone and run this repository you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) and the [OpenFin Runtime](https://openfin.co/openfin-runtime-introduction/) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/EikosPartners/scalejs.windowfactory

# To run the openfin webserver, go into the repository
cd scalejs.windowfactory/example/openfinBackend
# Install dependencies and run the openfinBackend
npm install && npm start

# To run the openfin app, go into the repository
cd scalejs.windowfactory/example/app
# Install dependencies and run the openfinBackend
%localappdata%/OpenFin/OpenFinRVM.exe --config=http://localhost:3000/app.json
```
