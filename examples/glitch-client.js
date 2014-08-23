var revisit = require('../');
var fs = require('fs');
var path = require('path');

var data = fs.createReadStream(path.join(__dirname, 'yo.jpg'));

var glitch = revisit.transform('http://localhost:8080?direction=horizontal');

// write file to server
data
  .pipe(glitch())
  .pipe(fs.createWriteStream(path.join(__dirname, 'yo-glitched.jpg')));