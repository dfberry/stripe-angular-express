'use strict';

var wagner = require('wagner-core')
    , assert = require('assert')
    , models = require('../server/models')(wagner);

describe('Models', function() {

    var dbConnection;

    before(function() {

    });

    after(function(done) {
        wagner.get("db").close();
        done();
    });

    it('customer', function(done) {
        var Customer = models.Customer;
        var myobj = {name: 'test-name ' +  Date().toString()};
        
        Customer.create(myobj, function(error, doc){
            assert.ifError(error);        
            Customer.find(myobj, function (err, docs){
                
                assert.ifError(err);
                assert.equal(docs.length,1);
                assert.equal(docs[0].name, myobj.name);
            })    
            done();
        });
    });
});
