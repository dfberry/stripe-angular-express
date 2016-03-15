'use strict';

var cli = true;

var wagner = require('wagner-core')
    , assert = require('assert')
    , models = require('../server/models')(wagner,cli);

describe('Models', function() {

    var dbModelGenerator;

    before(function() {
        dbModelGenerator = wagner.get('db');   
    });

    after(function(done) {
        //dbModelGenerator.close();  
        done();
    });

    it('customer', function(done) {
        this.timeout(5000);
        var Customer = dbModelGenerator.model('Customer');
        var myobj = {name: 'test-name ' +  Date().toString()};
              
        try {  
            Customer.create(myobj, function(error, doc){
                assert.ifError(error); 
                Customer.find(myobj, function (err, docs){
                    
                    assert.ifError(err);
                    assert.equal(docs.length,1);
                    assert.equal(docs[0].name, myobj.name);
                    done();
                })                
            });
        } catch (x) {
            console.log("caught - " + x);
            done(x);
        }
    });
});
