'use strict';

var mongoose = require('mongoose');
var _ = require('underscore');
var config = require('./config.json');

// @wagner dependency injection
// @cli true if called from cli, false if called from http
// @cli needs N connections, http does not
module.exports = function(wagner, cli) {
    
var mongoOptions =
{
    db: {safe: true},
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
  if (cli){
      var db = mongoose.createConnection(config.model.url, mongoOptions);
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function(){
        //console.log("Connected to DB");
    //do operations which involve interacting with DB.

      });
  }  else {
      var db = mongoose.connect(config.model.url, mongoOptions);
  }

    wagner.factory('db', function() {
        return db;
    });

  var Transaction =
    mongoose.model('Transaction', require('./model_transaction'), 'transactions');
  var Customer =
    mongoose.model('Customer', require('./model_customer'), 'customers');

  var models = {
    Transaction: Transaction,
    Customer: Customer
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};