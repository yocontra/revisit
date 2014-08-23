'use strict';

var defaults = require('lodash.defaults');
var express = require('express');
var toobusy = require('toobusy');
var methodOverride = require('method-override');

function throttleTraffic(req, res, next) {
  if (toobusy()) {
    return res.status(503).end();
  }
  next();
}

function createServer(opt) {
  if (typeof opt === 'function') {
    opt = {
      transform: opt
    };
  }
  var options = defaults({
    url: ''
  }, opt);

  if (!options.transform) {
    throw new Error('Missing transform stream');
  }

  var app = express();
  app.disable('x-powered-by');
  app.use(throttleTraffic);
  app.use(methodOverride());
  app.post('/'+options.url, handleInput);
  return app;

  function handleInput(req, res){
    req
      .pipe(options.transform(req))
      .pipe(res);
  }
}

module.exports = createServer;