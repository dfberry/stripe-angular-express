var status = require('http-status');

exports.$cart = function($http) {

  var calcTotalPrice = function(){
      console.log("calcTotalPrice=" + data.totalprice);
      data.totalprice = data.quantity * data.price;
      console.log("calcTotalPrice=" + data.totalprice);
  } 

  var data = {
      name: "Donation",
      quantity: 1,
      price: 1000,
      totalprice: 0
  };
  

  calcTotalPrice();

  return {
      data: data,
      calcTotalPrice: calcTotalPrice
  };
};
exports.$card = function(){
    
    var data = {
        number: '4242424242424242',
        cvc: '123',
        exp_month: '',
        exp_year: ''
    };
    
  return {
      data: data
  };    
};
  
exports.$customer = function($http){
    
    var data = {
        name: "Dina Berry",
        address_line1: "1515 State Street",
        address_line2: "5th Floor",
        address_city: "Seattle",
        address_state: "WA",
        address_zip: "98220",
        address_country: "USA"
    };
    
    return data;
    
}
  /* $charge */
  /*
  {"customer":{"name":"Dina Berry","address_line1":"1515 State Street","address_line2":"5th Floor","address_city":"Seattle","address_state":"WA","address_zip":"98220","address_country":"USA"},"card":{"number":"4242424242424242","cvc":"123","exp_month":"12","exp_year":"2018","name":"Dina Berry"},"cart":{"name":"Donation","quantity":1,"price":"1000","totalprice":1000}}
  */
exports.$charge = function($http){
    
    var commit = function (charge, callback){
        
        console.log("services::$charge - top");
        
        var result = {};
        
 
        Stripe.setPublishableKey('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');
        
        console.log("services::$charge - after setPublishableKey");
        console.log("services::$charge - charge.card = " + JSON.stringify(charge.card));       
        Stripe.card.createToken(charge.card, function(status, response) {
            
            console.log("services::$charge - inside create token");
            
            console.log("services - status: " + JSON.stringify(status));
            console.log("services - response: " + JSON.stringify(response));
            
            if (status.error) {
                console.log("stripe token not created");
                result.error = status.error;
                callback(result);
            } else {
                //result.token_id = response.id;
                console.log("stripe token created = " + response.id);
            }

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
