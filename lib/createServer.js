'use strict';

var defaults = require('lodash.defaults');
var express = require('express');
var toobusy = require('toobusy');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function noopTransform(file, meta, cb) {
  cb(null, file);
}

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
    url: '',
    transform: noopTransform,
    limit: '2mb'
  }, opt);

  var app = express();
  app.disable('x-powered-by');
  app.use(throttleTraffic);
  app.use(methodOverride());
  app.use(bodyParser.raw({limit: options.limit}));
  app.post('/'+options, handleInput);
  return app;

  function handleInput(req, res){
    options.transform(req.body, function(err, newBody){
      if (err) {
        res.status(500);
        res.json({error: err});
        return res.end();
      }

      // TODO: content type
      res.status(200);
      res.send(newBody);
      res.end();
    });
  }
}

module.exports = createServer;