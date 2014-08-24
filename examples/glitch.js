'use strict';

var revisit = require('../');
var map = require('through2-map');

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var jpgRand = rng.bind(null, 1, 254);

function glitch(opt) {
  // invert within 1
  // so 3 = 0.7, 5 = 0.5, 2 = 0.8, etc.
  var intensity = (parseInt(opt.intensity) || 1)/10;
  return map(function(buf, idx){
    for (var i = 0; i < buf.length - 1; i++) {
      if (buf[i] !== jpgRand()) {
        continue;
      }

      if (Math.random() >= intensity) {
        continue;
      }
      buf[i] = jpgRand();
    }
    return buf;
  });
}

revisit.server(glitch).listen(8080);
