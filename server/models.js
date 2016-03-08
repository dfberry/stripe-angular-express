'use strict';

var mongoose = require('mongoose');
var _ = require('underscore');
var config = require('./config.json');

module.exports = function(wagner) {
  mongoose.connect(config.model.url);

  wagner.factory('db', function() {
    return mongoose;
  });

  //var Charge =
    //mongoose.model('Category', require('./model_charge'), 'charges');
  var Customer =
    mongoose.model('Customer', require('./model_customer'), 'customers');

  var models = {
    //Charge: Charge,
    Customer: Customer
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  //wagner.factory('Product', require('./product'));

  return models;
};