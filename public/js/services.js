var status = require('http-status');

exports.$cart = function($http) {
  var data = {
      name: "Donation",
      quantity: 1,
      price: 1000,
      totalprice: 1000
  };

  return data;
};