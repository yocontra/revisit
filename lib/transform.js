'use strict';

var request = require('request');

function transform(url){
  return function(){
    var rOpt = {
      method: 'post',
      url: url
    };

    return request(rOpt);
  };
}

module.exports = transform;