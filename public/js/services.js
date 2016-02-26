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

exports.$charge = function($http){
    
    var commit = function (charge, callback){
        
        console.log("charge: " + JSON.stringify(charge));
        
        var result = {};
        callback(result);

/*

        Stripe.setPublishableKey('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');
        
        Stripe.card.createToken(donationCharge.stripeToken, function(status, response) {
            
            
            if (status.error) {
                console.log("stripe token not created");
                result.error = status.error;
                callback(result);
            } else {
                result.token.response_id = response.id;
                console.log("stripe token created = " + response.id);
            }

            $http.
                post('/api/v1/checkout', { stripeToken: result.token.response_id, cart: donationCharge.cart }).
                then(function(data) {
                    
                    result.charge.result = data;
                    console.log("success returned from api call: " + JSON.stringify(data));
                    callback(result);
                },
                function(response){
                    
                    result.charge.result.error = response;
                    
                    console.log(JSON.stringify(response));
                    
                    console.log("failure from checkout in controllers.js --");
                    console.log("response.status=" + response.status);            
                    console.log("response.data=" + JSON.stringify(response.data));            
                    console.log("response.header=" + response.header);            
                    console.log("response.config=" + JSON.stringify(response.config));            
                    console.log("charge:" + response.data.charge);
                    console.log("reqeust:" + response.data.request);
                    
                    //$scope.error = response.data.error;
                    //$scope.charge = response.data.charge;
                    //$scope.request = response.data.request;
                    callback(result);
                });
            });
            */
        }
    return {
      commit: commit
  };
}