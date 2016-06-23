// Install:
require('child_process').execSync('npm install');


// Start webserver:
const express = require("express");
const path = require("path");
const app = express();

app.use("/", express.static(path.resolve(__dirname, "../app")));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});