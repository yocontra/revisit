var revisit = require('../');
var fs = require('fs');
var path = require('path');

var data = fs.createReadStream(path.join(__dirname, 'contra.jpg'));

var glitch = revisit.transform('http://localhost:8080?intensity=1');
var txt = revisit.transform('http://localhost:8081?text=YO');

// write file to server
data
  .pipe(glitch())
  .pipe(txt())
  .pipe(fs.createWriteStream(path.join(__dirname, 'contra-glitched.jpg')));