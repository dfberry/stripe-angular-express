exports.CheckoutController = function($scope, $myappmodel, $myappconst, $myappconfig, $myservice, $http) {

    $scope.init = function(){
        
        // scope models
        $scope.cart = $myappmodel.cart;
        $scope.customer = $myappmodel.customer;
        $scope.card = $myappmodel.card;
        
        // scope consts
        $scope.years = $myappconst.years;
        $scope.years.selectedOption =  $myappconst.years_default;
        
        $scope.months = $myappconst.months;
        $scope.months.selectedOption = $myappconst.months_default;

        $scope.donations = $myappconst.donations.list;
        $scope.donations.selectedOption = $myappconst.donations_default;
        
   }

    $scope.checkout = function() {

       $scope.error = null;
       
       // update card from ddl
       $scope.card.exp_month = $scope.months.selectedOption.id;
       $scope.card.exp_year = $scope.years.selectedOption.id;
              
       // update cart from ddl & constants, calc total
       $scope.cart.name = $myappconfig.donationDescription;
       $scope.cart.price = $scope.donations.selectedOption.id;
       $scope.cart.quantity = 1;
       $scope.cart.totalprice = $scope.cart.price * $scope.cart.quantity;

       console.log($scope.cart);
       
       var completeCharge = {
           "customer": $scope.customer,
           "card": $scope.card,
           "cart": $scope.cart
      }
    
      console.log(completeCharge);
    
       $myservice.commit(completeCharge, function(error, results){
           
           if (error){
               $scope.error = error;
               $scope.checkedOut=false;
           } else {
               $scope.checkedOut=true;
               $scope.error = false;
           }
           
           $scope.charge = results.data.charge;
           $scope.request = results.data.request;
           
           return;  
       });
    }
    $scope.init();
};
