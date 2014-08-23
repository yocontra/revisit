'use strict';

var createServer = require('./lib/createServer');
var createClient = require('./lib/createClient');
var toB64 = require('./lib/toB64');

module.exports = {
  data: toB64,
  server: createServer,
  client: createClient
};