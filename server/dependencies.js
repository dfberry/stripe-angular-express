var fs = require('fs');
var Stripe = require('stripe');
var configFile = require('./config.json');


module.exports = function(wagner) {
  wagner.factory('Stripe', function(Config) {
    return Stripe(Config.stripeKey);
  });

  wagner.factory('Config', function() {
    return configFile;
  });
};