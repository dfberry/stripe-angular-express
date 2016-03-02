exports.$myservice = function($http,$myappconfig){
    
    var test = function(teststring){ return teststring;}
    
    var commit = function (completeCharge, callback){
        
        var result = {};
  
        // my stripe test key
        Stripe.setPublishableKey($myappconfig.stripePublishableKey);
              
        console.log("client stripe token request = " + JSON.stringify(completeCharge.card)+ "\n");      
              
        // credit card info passed 
        // billing address passed as part of charge.card
        Stripe.card.createToken(completeCharge.card, function(status, response) {

        console.log("client stripe token response.status = " + JSON.stringify(status)+ "\n");      
        console.log("client stripe token response.response = " + JSON.stringify(response)+ "\n");      

                        
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
            
            console.log("client charge request object = " + JSON.stringify(chargeRequestObject)+ "\n"); 

            // token (not credit card) passed
            // shipping address passed in charge.customer
            $http.
                post('/api/v1/checkout', chargeRequestObject).
                then(function(data) { //success
                    console.log("success returned from api call");
                    console.log("client charge response success data: " + JSON.stringify(data)+ "\n");
                    callback(null, data);
                },
                function(response){ //failure
                    console.log("failure returned from api call");
                    console.log("client charge response failure data: " + JSON.stringify(response)+ "\n");
                    callback(response.data.error, response);
                });
            });
            
        }
    
    return {
      commit: commit,
      test: test
    };    
    
} 
