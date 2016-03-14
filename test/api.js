'use strict';

var app = require('../server/server')
    , config = require('../server/config.json')
    , assert = require('assert')
    , superagent = require('superagent')
    , wagner = require('wagner-core')
    , dependencies = require('../server/dependencies')(wagner);

var baseUrl = 'localhost:' + config.port.stage;

// cart designed for stripe charge only
var cart = {
    name: "Server Mocha creditcard.js test",
    quantity: 1,
    price: 1000,
    totalprice: 1000
};

// name = name on card
// address is billing address
var card = {
    number: '4242424242424242',
    cvc: '123',
    exp_month: '',
    exp_year: '',
    name: 'Barbara Jones',
    address_city: 'Seattle',
    address_line1: '5678 Nine Street',
    address_line2: 'Box 3',
    address_country:'USA',
    address_state:'WA',
    address_zip:'98105'
};

// pass to server & then stripe
var customer = {
    
    // shipping object
    shipping: {
        address: {
            city: 'Seattle',
            country: 'USA',
            line1: '1234 Five Lane',
            line2: 'Floor 2',
            postal_code: '98101',
            state: 'WA'
        },
        name: 'Bob Smith',
        phone: ''
    },
    billing: {
        address: {
            city: 'Seattle',
            country: 'USA',
            line1: '5678 Nine Street',
            line2: 'Box 3',
            postal_code: '98105',
            state: 'WA'
        },
        name: 'Barbara Jones',
        phone: '206-555-1212'
    },
    email: 'bob@company.com'   
};

var getTokenId = function(card, callback){
    
  //console.log("top of getTokenId");  
    

    
    var ccService = require("../server/creditcard");
    var Stripe =wagner.get("Stripe");

    //console.log("about to get token");

    ccService.token(card,Stripe, function(error, token){
        console.log("token returned = " + token.id);
        assert.ifError(error);
        callback(error,token.id);
    }); 
}

describe('api test', function() {
    
    var server=null;

    before(function() {
        server = app().listen(config.port.stage, function() {
            //console.log("server started");
        });
    });

    after(function() {
        server.close(function() {
            //console.log("server stopped");
        });
    });
    
    
    it('charge is successful, returns 200', function(done){
        
        //console.log("top of charge test");
 
        card = {
            card: {
                "number": '4242424242424242',
                "exp_month": 12,
                "exp_year": 2017,
                "cvc": '123'
            }
        };
        
        // ARRANGE token id
        getTokenId(card, function(err,tokenId){
                        
            //console.log("getTokenId returned = " + tokenId);
            
            assert.ifError(err);
                        
                        
            // ARRANGE charge data
            var chargeRequestObject = { 
                stripeToken: tokenId, 
                cart: cart , 
                customer: customer
            };   
            
            // ACT
            superagent.post("http://localhost:3000/api/v1/checkout/")
                .set('Content-Type', 'application/json')
                .send(chargeRequestObject)
                .end(function(error,res){
                    
                    // ASSERT
                    assert.ifError(error);
                    assert.equal(res.status, 200);
                    assert.equal(res.body.paid, true);
                    assert.equal(res.body.captured, true);

                    done();                
            });
        });
    });
});