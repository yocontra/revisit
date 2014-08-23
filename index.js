'use strict';

var createServer = require('./lib/createServer');
var transform = require('./lib/transform');

module.exports = {
  server: createServer,
  transform: transform
};