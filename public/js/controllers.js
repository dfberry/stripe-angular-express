
exports.CheckoutController = function($scope, $cart, $http) {

  // For checkout
  Stripe.setPublishableKey('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');

  $scope.cart = $cart;

  $scope.stripeToken = {
    number: '4242424242424242',
    cvc: '123',
    exp_month: '12',
    exp_year: '2016'
  };

    console.log(JSON.stringify($scope.stripeToken));
    console.log(JSON.stringify($scope.cart)); 

  $scope.checkout = function() {
    
    $scope.error = null;



    Stripe.card.createToken($scope.stripeToken, function(status, response) {
        
        
      if (status.error) {
        console.log("stripe token not created");
        $scope.error = status.error;
        return;
      } else {
          console.log("stripe token created = " + response.id);
      }

      $http.
        post('/api/v1/checkout', { stripeToken: response.id, cart: $scope.cart }).
        then(function(data) {
          console.log("success returned from api call: " + JSON.stringify(data));
          $scope.checkedOut = true;
          
        },
        function(response){
            
            console.log(JSON.stringify(response));
            
            console.log("failure from checkout in controllers.js --");
            console.log("response.status=" + response.status);            
            console.log("response.data=" + JSON.stringify(response.data));            
            console.log("response.header=" + response.header);            
            console.log("response.config=" + JSON.stringify(response.config));            
            console.log("charge:" + response.data.charge);
            console.log("reqeust:" + response.data.request);
            
            $scope.error = response.data.error;
            $scope.charge = response.data.charge;
            $scope.request = response.data.request;
        });
    });
    
  };
};
