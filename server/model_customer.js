var mongoose = require('mongoose');

var customerSchema = { 
  name: {
    type: String
  },
  email: {
    type: String,
    match: /.+@.+\..+/,
    lowercase: true
  },
  shipping_address:{
      address_line1: {type: String},
      address_line2: {type: String},
      city: {type: String},
      state: {type: String},
      country: {type: String},
      zipcode: {type: String}
  },
  billing_address:{
      address_line1: {type: String},
      address_line2: {type: String},
      city: {type: String},
      state: {type: String},
      country: {type: String},
      zipcode: {type: String}      
  }
};

module.exports = new mongoose.Schema(customerSchema);
module.exports.customerSchema = customerSchema;