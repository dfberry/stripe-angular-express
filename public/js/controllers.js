exports.CheckoutController = function($scope, $cart, $card, $customer, $charge, $http) {

    $scope.donations = {
        donationOptions: [
            {id: '1000', name: '$10'},
            {id: '5000', name: '$50'},
            {id: '60000', name: '$600'}
        ]
    };
    $scope.donations.selectedOption = $scope.donations.donationOptions[0];
    
    $scope.months = {
        monthOptions: [
            {id: '01', name: '1'},
            {id: '02', name: '2'},
            {id: '03', name: '3'},
            {id: '04', name: '4'},
            {id: '05', name: '5'},
            {id: '06', name: '6'},
            {id: '07', name: '7'},
            {id: '08', name: '8'},
            {id: '09', name: '9'},
            {id: '10', name: '10'},
            {id: '11', name: '11'},
            {id: '12', name: '12'}
        ]};
        
    $scope.months.selectedOption = $scope.months.monthOptions[11];
        
    $scope.years = {
        yearOptions: [
            {id:'2016', name: '2016'},
            {id:'2017', name: '2017'},
            {id:'2018', name: '2018'}
        ]};
    $scope.years.selectedOption =  $scope.years.yearOptions[2];

    $scope.init = function(){
        $scope.cart = $cart;
        $scope.customer = $customer;
        $scope.card = $card;
        
        console.log("card=" + JSON.stringify($scope.card ));
        console.log("cart=" + JSON.stringify($scope.cart ));
        console.log("customer=" + JSON.stringify($scope.customer ));
   }
    
    $scope.update = function() {
        $scope.cart.calcTotalPrice();
    }

    $scope.checkout = function() {
       $scope.error = null;
       
       // update card
       $scope.card.data.name = $customer.name
       $scope.card.data.exp_month = $scope.months.selectedOption.id;
       $scope.card.data.exp_year = $scope.years.selectedOption.id;
       
       // update cart
       $scope.cart.data.price = $scope.donations.selectedOption.id;
       $scope.cart.calcTotalPrice();
       
       var charge = {
           "customer": $scope.customer,
           "card": $scope.card.data,
           "cart": $scope.cart.data
       }
       
       //console.log("charge=" + JSON.stringify(charge));    
    
       $charge.commit(charge, function(results){
           console.log("results=" + JSON.stringify(results));  
           return;  
       });
 
       return;
    }
    
    $scope.buttonTest = function(){
        console.log("buttonTest");
        return;
    }
    
  $scope.checkout2 = function() {
    
    $scope.error = null;
    
    $scope.hardcart = {
      name: "Donation",
      quantity: 1,
      price: 1000,
      totalprice: 1000
  };

    $scope.stripeToken = {
        number: '4242424242424242',
        cvc: '123',
        exp_month: '12',
        exp_year: '2016'
    };
    Stripe.setPublishableKey('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');
    Stripe.card.createToken($scope.stripeToken, function(status, response) {
        
        
      if (status.error) {
        console.log("stripe token not created");
        $scope.error = status.error;
        return;
      } else {
          console.log("stripe token created = " + response.id);
      }

      $http.
        post('/api/v1/checkout', { stripeToken: response.id, cart: $scope.hardcart }).
        then(function(data) {
          console.log("success returned from api call: " + data);
          $scope.checkedOut = true;
          
        },
        function(response){
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
  } 
    
    $scope.init();
};
