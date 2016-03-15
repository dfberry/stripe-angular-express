'use strict';

var wagner = require('wagner-core')
    , models = require('../server/models')(wagner);
    
    
console.log(models);
//var dbModelGenerator = wagner.get('db');    
    
// create on this object works
//var Customer = dbModelGenerator.model('Customer');

// create on these 2 objects fails
//var Customer2 = wagner.get('Customer');
var Customer3 = models.Customer;



//console.log(Customer);
//console.log("\n");

//console.log(Customer2);
//console.log("\n");

console.log(Customer3);
console.log("\n");

