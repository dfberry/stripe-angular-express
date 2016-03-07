exports.$myservice = /*@ngInject*/ function($http,$myappconfig){
    
    var commit = function (completeCharge, callback){
        
        var result = {};
  
        // my stripe test key
        Stripe.setPublishableKey($myappconfig.stripePublishableKey);
              
        // credit card info passed 
        // billing address passed as part of charge.card
        Stripe.card.createToken(completeCharge.card, function(status, response) {

            if (status.error) {
                console.log("stripe token not created");
                result.error = status.error;
                callback(result);
            } 

            var chargeRequestObject = { 
                    stripeToken: response.id, 
                    cart: completeCharge.cart , 
                    customer: completeCharge.customer
            };

            // token (not credit card) passed
            // shipping address passed in charge.customer
            $http.
                post('/api/v1/checkout', chargeRequestObject).
                then(function(data) { //success
                    callback(null, data);
                },
                function(response){ //failure
                    callback(response.data.error, response);
                });
            });
        }
    
    return {
      commit: commit
    };    
    
} 
