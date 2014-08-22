'use strict';

var defaults = require('lodash.defaults');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var toBuffer = require('data-uri-to-buffer');

function noopTransform(data, opt, cb) {
  cb(null, data);
}

function validate(body) {
  if (!body) {
    return 'Missing body';
  }
  if (!body.content || typeof body.content.data !== 'string') {
    return 'Missing content.data in body';
  }
  if (body.meta && typeof body.meta !== 'object') {
    return 'Invalid meta in body';
  }
}

function toB64(type, buf) {
  return 'data:' + type + ';base64,' + buf.toString('base64');
}

function createServer(opt) {
  var options = defaults({
    transform: noopTransform,
    limit: '2mb'
  }, opt);

  if (!options.name) {
    throw new Error('Missing name option');
  }
  if (!options.description) {
    throw new Error('Missing description option');
  }

  var app = express();
  app.disable('x-powered-by');
  app.use(bodyParser.json({limit: options.limit}));
  app.use(methodOverride());
  app.post('/service', handleInput);
  return app;

  function handleInput(req, res){
    // input validation
    var validationError = validate(req.body);
    if (validationError) {
      return res.status(400)
        .send({error: validationError})
        .end();
    }

    var file = {
      type: req.body.content.type,
      data: toBuffer(req.body.content.data)
    };

    options.transform(file, req.body.meta, function(err, newFile){
      if (err) {
        res.status(500);
        res.json({error: err});
        return res.end();
      }

      // if they return a buffer instead of the struct
      // just convert it
      if (Buffer.isBuffer(newFile)) {
        newFile = {
          data: newFile
        };
      }

      // fill in missing data
      var fileType = newFile.type || file.type;
      var fileMeta = newFile.meta || file.meta;
      var fileData = toB64(fileType, newFile.data);

      var formattedFile = {
        content: {
          type: fileType,
          data: fileData
        },
        meta: fileMeta
      };

      res.status(200);
      res.json(formattedFile);
      res.end();
    });
  }
}

module.exports = createServer;