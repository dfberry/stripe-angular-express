'use strict';

var models = require('../server/models');
var wagner = require('wagner-core');
var express = require('express');
var config = require('../server/config.json');
var assert = require('assert');

var baseUrl = 'localhost:' + config.port.stage;

describe('Models', function() {
  var server;
  var Customer;

  before(function() {
    //var app = express();

    // Bootstrap server
    models = require('../server/models')(wagner);
    //app.use(require('../server/api')(wagner));

    //server = app.listen(config.port.stage);

    // Make Category model available in tests
    Customer = models.Customer;
  });

  after(function() {
    // Shut the server down when we're done
    //server.close();
  });
  
  beforeEach(function(done) {
    // Make sure customer are empty before each test
    Customer.remove({}, function(error) {
      assert.ifError(error);
      done();
    });
  });
  
  it('creates single customer', function(done) {
      
    // Create a single category
    Customer.create({ name: 'dina' }, function(error, doc) {
      assert.ifError(error);
      console.log(doc);
      done();
      });
    });
  });