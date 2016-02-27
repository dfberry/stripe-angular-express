exports.$charge = function($http, $myappconfig){
    
    var commit = function (charge, callback){
        
        var result = {};
  
        // my stripe test key
        Stripe.setPublishableKey($myappconfig.stripePublishableKey);
              
        // credit card info passed 
        // billing address passed as part of charge.card
        Stripe.card.createToken(charge.card, function(status, response) {
                        
            if (status.error) {
                console.log("stripe token not created");
                result.error = status.error;
                callback(result);
            } 

            // token (not credit card) passed
            // shipping address passed in charge.customer
            $http.
                post('/api/v1/checkout', { stripeToken: response.id, cart: charge.cart , customer: charge.customer}).
                then(function(data) { //success
                    console.log("success returned from api call");
                    console.log("services:data: " + JSON.stringify(data));
                    callback(null, data);
                },
                function(response){ //failure
                    console.log("failure returned from api call");
                    console.log("services:response - " +  JSON.stringify(response));
                    callback(response.data.error, response);
                });
            });
            
        }
    return {
      commit: commit
  };
}
