'use strict';

var revisit = require('../');
var map = require('through2-map');

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function glitch(opt) {
  return map(function(buf, idx){
    for (var i = 0; i < buf.length - 1; i++) {
      if (buf[i] !==  120) {
        continue;
      }
      buf[i] = rng(1, 254);
    }
    return buf;
  });
}

revisit.server(function(req){
  return glitch(req.query);
}).listen(8080, function(err){
  if (err) {
    return console.error(err);
  }
  console.log('Listening');
});
