var revisit = require('../');
var fs = require('fs');

var data = fs.createReadStream('yo.jpg');

var glitch = revisit.transform('http://localhost:8080?direction=horizontal');

// write file to server
data
  .pipe(glitch())
  .pipe(fs.createWriteStream('yo-glitched.jpg'));