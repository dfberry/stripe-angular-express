'use strict';
var unittest = true;

var config = require('../server/config.json')
    , assert = require('assert')
    , wagner = require('wagner-core')
    , dependencies = require('../server/dependencies')(wagner)
    , models = require('../server/models')(wagner,unittest);

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

describe('creditcard test', function() {
    
    var mydb = wagner.get('db'); 
    
    after(function(done) {
        //mydb.connection.close(); 
        console.log("end of after");
        done();
    });

    it('creditcard.token returns token.id', function(done){
        
        // ARRANGE Data 
        card = {
            card: {
                "number": '4242424242424242',
                "exp_month": 12,
                "exp_year": 2017,
                "cvc": '123'
            }
        };
        
        // ARRANGE SUT
        var ccService = require("../server/creditcard");
        
        // ARRANGE Dependency
        var Stripe =wagner.get("Stripe");

        // ACT
        ccService.token(card,Stripe, function(error, token){
            
            // ASSERT
            assert.ifError(error);
            assert.ok(token);
            assert.ok(token.id);
            
            done();
        });   
     });
     
     
     
    it('creditcard.charge returns success', function(done){
        
        // ARRANGE SUT
        var ccService = require("../server/creditcard");
        
        // ARRANGE Dependency
        var Stripe = wagner.get("Stripe");

        // ARRANGE DATA 1
        card = {
            card: {
                "number": '4242424242424242',
                "exp_month": 12,
                "exp_year": 2017,
                "cvc": '123'
            }
        };

        // ARRANGE - Get Token
        ccService.token(card,Stripe, function(error, token){
            console.log("token returned = " + token.id);
            assert.ifError(error);
            
            // ARRANGE DATA 2
            var chargeRequestObject = { 
                    stripeToken: token.id, 
                    cart: cart , 
                    customer: customer
            };
            
            // ARRANGE Dependency
            var Transaction = models.Transaction;
            
            // ACT
            ccService.charge(chargeRequestObject, "Mocha Test", Stripe, Transaction, function(err, result){
                
                // ASSERT
                assert.ifError(err);
                done();
            });
         });   
    });
});