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
            
    console.log("checkout api called \n");        
            
    return function(req, res) {

        console.log("checkout api function called \n");

        console.log(JSON.stringify(req.body));  

        // https://stripe.com/docs/api#capture_charge
        // shipping name is in the metadata so that it is easiy found on stripe's website 
        var stripeCharge = {
            amount: req.body.cart.totalprice,
            currency: 'usd',
            source: req.body.stripeToken,
            description: req.body.cart.name,
            metadata: {'ShipTo': req.body.customer.shipping.name},
            receipt_email: req.body.customer.email,
            statement_descriptor: config.Characters22_StoreName,
            shipping: req.body.customer.shipping 
        };

        // And create a charge in Stripe corresponding to the price
        Stripe.charges.create(stripeCharge,function(err, charge) {
                
            console.log("err = " + JSON.stringify(err) + "\n\n");
            console.log("charge=" + JSON.stringify(charge)+ "\n\n");  
                
            if (err) {
                console.log("Error for requestId: " + err.requestId);
                
                return res.
                status(status.INTERNAL_SERVER_ERROR).
                json({ error: err.toString(), charge: err.raw.charge, request: err.requestId, type : err.type});
            }
            
            console.log("Success for chargeId: "  + charge.id);
            
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
