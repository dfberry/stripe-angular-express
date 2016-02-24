
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
        success(function(data) {
          console.log("returned from api call");
          $scope.checkedOut = true;
          
        });
    });
    
  };
};
