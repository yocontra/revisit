'use strict';

function toB64(type, buf) {
  return 'data:' + type + ';base64,' + buf.toString('base64');
}

module.exports = toB64;