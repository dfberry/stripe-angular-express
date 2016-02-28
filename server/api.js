var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var config = require('./config.json');

module.exports = function(wagner) {
  
  var api = express.Router();

  api.use(bodyparser.json());

  /* Stripe Checkout API */
  api.post('/checkout', wagner.invoke(function(Stripe) {
            
    return function(req, res) {

        // https://stripe.com/docs/api#capture_charge
        // shipping name is in the metadata so that it is easiy found on stripe's website 
        // statement_descriptor & description will show on credit card bill
        // receipt_email is sent but stripe isn't sending receipt - you still have to do that
        // shipping is sent only so you can pull information from stripe 
        // metadata: 20 keys, with key names up to 40 characters long and values up to 500 characters long
        var stripeCharge = {
            amount: req.body.cart.totalprice,
            currency: 'usd',
            source: req.body.stripeToken,
            description: req.body.cart.name,
            metadata: {'ShipTo': req.body.customer.shipping.name, 'BillTo': req.body.customer.billing.name},
            receipt_email: req.body.customer.email,
            statement_descriptor: config.Characters22_StoreName,
            shipping: req.body.customer.shipping 
        };

        // Charge the card NOW
        Stripe.charges.create(stripeCharge,function(err, charge) {
            if (err) {
                return res.
                status(status.INTERNAL_SERVER_ERROR).
                json({ error: err.toString(), charge: err.raw.charge, request: err.requestId, type : err.type});
            }
            return res.json(charge);
        }); 

     };
  }));

  return api;
};

function handleOne(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}

function handleMany(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
