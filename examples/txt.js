'use strict';

var revisit = require('../');
var gm = require('gm');
var duplex = require('duplexify');
var through = require('through2');

function glitch(opt) {
  console.log(opt.text);
  var write = through();
  var read = gm(write, 'img.jpg')
    .stroke('#ffffff')
    .fontSize(60)
    .drawText(300, 200, opt.text)
    .stream();

  return duplex(write, read);
}

revisit.server(glitch).listen(8081, function(err){
  if (err) {
    return console.error(err);
  }
  console.log('Listening');
});
