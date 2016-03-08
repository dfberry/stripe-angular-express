var app = require('./server/index');
var assert = require('assert');
var superagent = require('superagent');

describe('server', function() {
  var server;

  beforeEach(function() {
    server = app().listen(3001);
  });

  afterEach(function() {
    server.close();
  });

  it('prints out "Hello, world" when user goes to /', function(done) {
    superagent.get('http://localhost:3001/', function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.text, "Hello, world!");
      done();
    });
  });
});