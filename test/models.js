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
    var Transaction;

    before(function() {
        models = require('../server/models')(wagner);
        Customer = models.Customer;
        Transaction = models.Transaction;
    });

    after(function() {
        // Make sure customer are empty before each test
        Customer.remove({}, function(error) {
            assert.ifError(error);
            
        });
        
        Transaction.remove({transaction: "auto-test"}, function(error){
            assert.ifError(error);
            
        });
        
    });

    beforeEach(function(done) {
        // Make sure customer are empty before each test
        Customer.remove({}, function(error) {
            assert.ifError(error);
            
        });
        
        Transaction.remove({transaction: "auto-test"}, function(error){
            assert.ifError(error);
            done();
        });
        
    });

    it('creates single customer', function(done) {

        // Create a single category
        Customer.create({ name: 'dina' }, function(error, doc) {
            assert.ifError(error);
            done();
        });
    });

    it('should test through the api ');
    
    it('creates transaction', function(done){
        Transaction.create({
              transaction: "auto-test",
                request: {},
                response: {},
                token: {},
                error: {},
                customer:{},
                cart:{}
        }, function(error,doc){
            assert.ifError(error);
            done();
        });
    })
});