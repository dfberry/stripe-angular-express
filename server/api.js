var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  /* Stripe Checkout API */
  api.post('/checkout', wagner.invoke(function(Stripe) {
            
    return function(req, res) {

    //console.log(JSON.stringify(req.body.stripeToken));  
    //console.log(JSON.stringify(req.body.cart));  
    //return res.json({ id: 1 });

      // Populate the products in the user's cart
//      req.user.populate({ path: 'data.cart.product', model: 'Product' }, function(error, user) {

        // Sum up the total price in USD
/*        var totalCostUSD = 0;
        _.each(user.data.cart, function(item) {
          totalCostUSD += item.product.internal.approximatePriceUSD *
            item.quantity;
        });
*/
        // And create a charge in Stripe corresponding to the price
        Stripe.charges.create(
          {
            // Stripe wants price in cents, so multiply by 100 and round up
            amount: req.body.cart.totalprice,
            currency: 'usd',
            source: req.body.stripeToken,
            description: req.body.cart.name
          },
          function(err, charge) {
              
            //console.log("err = " + JSON.stringify(err) + "\n\n");
            //console.log("charge=" + JSON.stringify(charge)+ "\n\n");  
              
            if (err) {

              return res.
                status(status.INTERNAL_SERVER_ERROR).
                json({ error: err.toString(), charge: err.raw.charge, request: err.requestId, type : err.type});
            }
         
            return res.json({ id: charge.id });
         
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
