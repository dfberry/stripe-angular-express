var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner) {
  
  var api = express.Router();

  api.use(bodyparser.json());

  /* Stripe Checkout API */
  /*
  charge object
  
  {"customer":{"name":"Dina Berry","address_line1":"1515 State Street","address_line2":"5th Floor","address_city":"Seattle","address_state":"WA","address_zip":"98220","address_country":"USA"},"card":{"number":"4242424242424242","cvc":"123","exp_month":"12","exp_year":"2018","name":"Dina Berry"},"cart":{"name":"Donation","quantity":1,"price":"1000","totalprice":1000}}
  
  stripeToken: result.token.response_id, cart: charge.cart , customer: charge.customer
  */
  
  api.post('/checkout', wagner.invoke(function(Stripe) {
            
    console.log("checkout api called \n");        
            
    return function(req, res) {

        console.log("checkout api function called \n");

        console.log(JSON.stringify(req.body));  

var from_address = {
  name:    'Pete Keen',
  street1: '618 NW Glisan Ave',
  city:    'Portland',
  state:   'OR',
  zip:     '97211',
  country: 'US',
  email:   'pete@petekeen.net'
};
/*
to_address = EasyPost::Address.create(
  name:    params[:to_name],
  street1: params[:to_street1],
  city:    params[:to_city],
  state:   params[:to_state],
  zip:     params[:to_zip],
  country: params[:to_country],
  email:   params[:email],
)

parcel = EasyPost::Parcel.create(
  length: 10,
  width: 10,
  height: 6,
  weight: 30,
)
*/
var shipment = {
  to_address: {},
  from_address: from_address,
  parcel: {}
};

        // https://stripe.com/docs/api#capture_charge
        var stripeCharge = {
            amount: req.body.cart.totalprice,
            currency: 'usd',
            source: req.body.stripeToken,
            description: req.body.cart.name,
            metadata: {'cart': 'test of metadata'},
            receipt_email: 'dinaberry@outlook.com',
            statement_descriptor: 'Stripe Credit Store',
            shipping: {
                //name: "Billy Bob"
            }
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
