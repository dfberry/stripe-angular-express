'use strict';

var wagner = require('wagner-core')
    , models = require('../server/models')(wagner);
    
var mydb = wagner.get('db');    
    
var Customer = mydb.model('Customer');
var Customer2 = wagner.get('Customer');
var Customer3 = models.Customer;



//console.log(Customer);

//this works
/*
Customer.create({'name': 'test-name create ' + Date()}, function(err,doc){
    if (err){
        console.log("create failed" + err);
    }else {
        console.log("created");
    }
});
*/

// doesn't work
/*
Customer2.create({'name': 'test-name create ' + Date()}, function(err,doc){
    if (err){
        console.log("create 2 failed" + err);
    }else {
        console.log("created 2");
    }
});
*/

// doesn't work
Customer3.create({'name': 'test-name create ' + Date()}, function(err,doc){
    if (err){
        console.log("create 3 failed" + err);
    }else {
        console.log("created 3");
    }
    mydb.connection.close();
});


    


