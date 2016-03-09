'use strict';
/**
 * Create Token - for TESTING ONLY
 * @card json object for cc num, exp data, security code
 * @Stripe cc processing library
 * @callback (error, results)
 */
exports.token = function(card,Stripe,callback){
    
    Stripe.tokens.create(card, function(err, token) {
        if (err){
            callback(err);
        }
        callback(err, token);
    });
}
/**
 * Charge Credit Card
 * @charge contains json objects of cart, customer, and card
 * @storeName appears on credit card statement
 * @Stripe cc processing library
 * @dbCCTransaction mongo module for data collection
 * @callback (error, results)
 */
exports.charge = function(charge, storeName, Stripe, Transaction, callback) {

        // https://stripe.com/docs/api#capture_charge
        // shipping name is in the metadata so that it is easiy found on stripe's website 
        // statement_descriptor & description will show on credit card bill
        // receipt_email is sent but stripe isn't sending receipt - you still have to do that
        // shipping is sent only so you can pull information from stripe 
        // metadata: 20 keys, with key names up to 40 characters long and values up to 500 characters long
        var stripeCharge = {
            amount: charge.cart.totalprice,
            currency: 'usd',
            source: charge.stripeToken,
            description: charge.cart.name,
            metadata: {'ShipTo': charge.customer.shipping.name, 'BillTo': charge.customer.billing.name},
            receipt_email: charge.customer.email,
            statement_descriptor: storeName,
            shipping: charge.customer.shipping 
        };

        // Charge the card NOW
        Stripe.charges.create(stripeCharge,function(err, charge) {
            
            if (err) {
                callback ({ error: err.toString(), charge: err.raw.charge, request: err.requestId, type : err.type});
            }

                Transaction.create({
                    transaction: 'charge', 
                    request: stripeCharge, 
                    response: charge, 
                    error: err,
                    token: charge.stripeToken,
                    cart: charge.cart,
                    customer: charge.customer
                }, function(error, doc){
                    
                    if (error){
                        callback( error);
                    }
                    callback (null,charge);
                    
                });

        }); 

     };
  