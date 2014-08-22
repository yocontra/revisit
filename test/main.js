'use strict';

var should = require('should');
var revisit = require('../');

require('mocha');

describe('revisit', function() {
  describe('server()', function() {
    it('should return a server with no options', function(done) {
      var server = revisit.server();
      should.exist(server);
      done();
    });
  });
});
