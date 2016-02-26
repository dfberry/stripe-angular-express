exports.ConfirmController = function($scope, $cart, $customer, $http) {

    Stripe.setPublishableKey('pk_test_ArJPMDKT6lF2Ml4m4e8ILmiP');

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

    //console.log($scope.years);
    //console.log($scope.months);
 
    $scope.init = function(){
        $scope.cart = $cart;
        $scope.customer = $customer;
   }
    
    $scope.update = function() {
        $scope.cart.calcTotalPrice();
    }

    $scope.confirm = function() {
       $scope.error = null;
       
       $scope.stripeToken.name = $customer.name
       console.log($scope.stripeToken);
       /*
       Stripe.card.createToken($scope.stripeToken, function(status, response) {
            if (status.error) {
                console.log("stripe token not created");
                $scope.error = status.error;
                return;
            } else {
                $scope.stripe_token = response.id;
                console.log("stripe token created = " + response.id);
            }
        });
        */
    }
    
    $scope.init();
};


exports.CheckoutController = function($scope, $cart, $http) {

};
