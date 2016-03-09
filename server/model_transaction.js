var mongoose = require('mongoose');

var transactionSchema = { 
  transaction: {
    type: String
  },
  request: {
  },
  response: {
  },
  token: {
  },
  error: {
  },
  customer:{},
  cart:{}
};

module.exports = new mongoose.Schema(transactionSchema);
module.exports.transactionSchema = transactionSchema;