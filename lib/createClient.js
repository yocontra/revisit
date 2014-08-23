'use strict';

var request = require('request');

function createClient(url){
  return {
    transform: transform
  };

  function transform(file, cb) {
    if (typeof file.type !== 'string') {
      throw new Error('file type must be a string');
    }
    if (typeof file.data !== 'string') {
      throw new Error('file data must be a string');
    }
    if (file.meta && typeof file.meta !== 'object') {
      throw new Error('file meta must be an object');
    }

    var rOpt = {
      method: 'post',
      url: url,
      json: true,
      body: file
    };

    return request(rOpt, function(err, body, res){
      if (err) {
        return cb(err);
      }
      if (body && body.error) {
        return cb(new Error(body.error));
      }
      if (res.statusCode !== 200) {
        return cb(new Error(res.statusCode));
      }
      if (!body) {
        return cb(new Error('Missing Body'));
      }

      cb(null, body);
    });
  }
}

module.exports = createClient;