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
        dbModelGenerator.close();  
        console.log("end of after");
        done();
    });

    it('customer', function(done) {
        this.timeout(5000);
        var Customer = dbModelGenerator.model('Customer');
        var myobj = {name: 'test-name ' +  Date().toString()};
       
        console.log("before try");
       
        try {  
            Customer.create(myobj, function(error, doc){
                assert.ifError(error); 
                console.log("after create");
                Customer.find(myobj, function (err, docs){
                    
                    assert.ifError(err);
                    assert.equal(docs.length,1);
                    assert.equal(docs[0].name, myobj.name);
                    console.log("end of it test");
                    done();
                })                
            });
        } catch (x) {
            console.log("caught - " + x);
            done(x);
        }
    });
});
