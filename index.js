'use strict';

var createServer = require('./lib/createServer');
var createClient = require('./lib/createClient');

module.exports = {
  server: createServer,
  client: createClient
};