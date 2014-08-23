'use strict';

var revisit = require('../');
var glitch = require('glitch-jpg');

var server = revisit.server(function(buf, cb){
  cb(null, glitch(buf));
});

server.listen(8080);

module.exports = server;