var app = require('../server/server')
    , config = require('../server/config.json')
var assert = require('assert');
var superagent = require('superagent');

var baseUrl = 'localhost:' + config.port.stage;

describe('basic server test', function() {
  var server;

  beforeEach(function() {
    server = app().listen(config.port.stage, function(){
    });
  });

  afterEach(function() {
    server.close(function(){
    });
  });

  it('prints out "/" when user goes to /', function(done) {
      
    var stringToFindInBody = "validTest";     
        
        superagent.get('http://' + baseUrl + '/', function(error, res) {
            assert.ifError(error);
            assert.equal(res.status, 200);
            
            done();
        });
  });
  it('404 everything else', function testPath(done) {
        superagent.get('http://' + baseUrl + '/foo/bar', function(error, res) {
        assert.ifError(!error);
        assert.equal(error, 'Error: Not Found');
        assert.equal(res.status, 404);
        done();
  });
});
});